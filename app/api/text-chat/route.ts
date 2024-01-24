import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages } = await req.json();

	const initialMessages = messages.slice(0, -1);
	const currentMessage = messages[messages.length - 1];

	const prompt = `
		When asked a question that means "Please give me a sample video." or "Could you give me a sample video?", please respond as follows:
		{
			"requestType": 3,
			"data": "https://www.w3schools.com/html/mov_bbb.mp4"
		}		
	
		When asked a question that means "What services do you provide?", please respond as follows:
		{
			"requestType": 4,
			"data": [
				{
					"id": 1,
					"content": "service01",
					"prompt": "I am interested in service01."
				},
				{
					"id": 2,
					"content": "service02",
					"prompt": "I am interested in service02."
				},
				{
					"id": 3,
					"content": "service03",
					"prompt": "I am interested in service03."
				}
			]
		}

		Only give me JSON data.

		Otherwise, return with requestType set to 1 and data set to the message you generated.
	`;

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			stream: true,
			max_tokens: 1000,
			messages: [
				...initialMessages,
				{
					role: 'system',
					content: prompt,
				},
				{
					...currentMessage,
					content: [{ type: 'text', text: currentMessage.content }],
				},
			],
		});

		const stream = OpenAIStream(response);
		return new StreamingTextResponse(stream);

	} catch (error) {

		if (error instanceof OpenAI.APIError) {
			const { name, status, headers, message } = error;
			return NextResponse.json({ name, status, headers, message }, { status });
		} else {
			throw error;
		}

	}
}
