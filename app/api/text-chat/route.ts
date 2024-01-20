import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages } = await req.json()

	const initialMessages = messages.slice(0, -1)
	const currentMessage = messages[messages.length - 1]

	const response = await openai.chat.completions.create({
		model: 'gpt-4',
		stream: true,
		max_tokens: 1000,
		messages: [
			...initialMessages,
			{
				...currentMessage,
				content: [{ type: 'text', text: currentMessage.content }],
			},
		],
	});

	const stream = OpenAIStream(response);

	return new StreamingTextResponse(stream);
}
