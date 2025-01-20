import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(
    req: Request) 
    {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!prompt) {
            return new NextResponse('Music prompt is required', { status: 400 })
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        
        if(!freeTrial && !isPro){
            return new NextResponse('The trial has expired!', { status: 403 })
        }

        const response = await replicate.run
        ("tencent/hunyuan-video:8283f26be7ce5dc0119324b4752cbfd3970b3ef1b923c4d3c35eb6546518747a", 
            { input: {
                prompt
            }});
        
        if(!isPro)
        {await increaseApiLimit();}
        
        return NextResponse.json(response)
    } catch (error) {
        console.log('[VIDEO_ERROR', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}