import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const response = NextResponse.json(
            {
                code: 201,
                message: "세션이 성공적으로 생성되었습니다.",
                data: {
                    sessionId: sessionId
                }
            },
            { status: 201 }
        );

        response.cookies.set('chatbot_session_id', sessionId, {
            path: '/recommendations/questions',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        return response;
    } catch (error) {
        console.error('세션 생성 오류:', error);
        return NextResponse.json(
            {
                code: 500,
                message: "세션 생성에 실패했습니다.",
                data: null
            },
            { status: 500 }
        );
    }
}
