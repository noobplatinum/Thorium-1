import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse('OpenAI API Key not configured', { status: 500 });
        }

        if (!messages) {
            return new NextResponse('Messages are required', { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        
        if(!freeTrial && !isPro){
            return new NextResponse('The trial has expired!', { status: 403 })
        }

        const systemMessage = {
            role: "system",
            content: "You are a code generator. You must only answer in markdown code snippets. Use code comments for explanation. Also, you can give 1-3 sentences at the end or start of your response to open and explain your code snippet. Be polite and respectful."
        };

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...messages]
        });
        
        if(!isPro)
        {await increaseApiLimit();}
        
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log('[CODE_ERROR]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}