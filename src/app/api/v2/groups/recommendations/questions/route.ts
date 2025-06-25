import { NextRequest, NextResponse } from 'next/server';

const MOCK_QUESTIONS = [
    {
        question: "어떤 종류의 활동에 관심이 있으신가요?",
        answers: [
            "운동과 피트니스",
            "학습과 스터디",
            "취미와 여가활동",
            "네트워킹과 친목"
        ]
    },
    {
        question: "주로 언제 모임에 참여하고 싶으신가요?",
        answers: [
            "평일 저녁",
            "주말 오전",
            "주말 오후",
            "언제든 상관없음"
        ]
    },
    {
        question: "선호하는 모임 규모는 어떻게 되시나요?",
        answers: [
            "소규모 (5명 이하)",
            "중간 규모 (6-15명)",
            "큰 규모 (16명 이상)",
            "규모는 상관없음"
        ]
    }
];

const sessionStore = new Map<string, {
    questionIndex: number;
    answers: string[];
}>();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { answer } = body;

        const sessionId = request.cookies.get('chatbot_session_id')?.value ||
            request.headers.get('sessionId') ||
            'default_session';

        let sessionData = sessionStore.get(sessionId);
        if (!sessionData) {
            sessionData = {
                questionIndex: 0,
                answers: []
            };
        }

        if (answer !== null && answer !== undefined) {
            sessionData.answers.push(answer);
            sessionData.questionIndex++;
        }

        if (sessionData.questionIndex >= MOCK_QUESTIONS.length) {
            return NextResponse.json(
                {
                    code: 400,
                    message: "모든 질문이 완료되었습니다. 추천을 요청해주세요.",
                    data: null
                },
                { status: 400 }
            );
        }

        const currentQuestion = MOCK_QUESTIONS[sessionData.questionIndex];

        sessionStore.set(sessionId, sessionData);

        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        return NextResponse.json(
            {
                code: 200,
                message: "질문이 성공적으로 생성되었습니다.",
                data: {
                    question: currentQuestion.question,
                    answer: currentQuestion.answers
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('질문 생성 오류:', error);
        return NextResponse.json(
            {
                code: 500,
                message: "질문 생성에 실패했습니다.",
                data: null
            },
            { status: 500 }
        );
    }
}
