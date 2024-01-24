import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
});

export async function GET(req: NextRequest) {

	const userInput = req.nextUrl.searchParams.get("request");

	const prompt = `You need to parse the user's request to determine the requestType for the user's request and return it.
	requestType must be one of the following values: 1, 2, 3, 4, or 5.
	Only numbers should be returned.
	
	The criteria for determining requestType are as follows:
	1. If a text response must be returned for the request entered by the user, set requestType to 1.
	2. If an image needs to be created for the request entered by the user, set requestType to 2.
	3. If a video needs to be created for the request entered by the user, set requestType to 3.
	4. If the answer to the request entered by the user is analyzed in various ways, set requestType to 4.
	5. If the request entered by the user is analyzed to generate an image based on HTML code, set requestType to 5.
	
	The important thing is to analyze the user's request and return only numbers.`;

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: prompt,
			},
			{ role: "user", content: userInput as string },
		],
		model: "gpt-4",
	});
	
	return NextResponse.json({ requestType: completion.choices[0].message.content });
}