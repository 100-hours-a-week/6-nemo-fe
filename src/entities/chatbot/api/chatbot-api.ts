import { ChatbotQuestionResponse, ChatbotRecommendationResponse } from "../model/types";

export type QuestionResponse = {
    question: string;
    answer: string[];
};

export type RecommendationResponse = {
    group: {
        groupId: number;
        name: string;
        category: string;
        summary: string;
        description: string;
        location: string;
        currentUserCount: number;
        maxUserCount: number;
        imageUrl: string | null;
        tags: string[];
    };
    reason: string;
};

// 새로운 세션 생성
export const createChatbotSession = async (): Promise<string> => {
    try {
        const response = await fetch("/api/v2/groups/recommendations/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 201 && data.code === 201 && data.data?.sessionId) {
            console.log('세션 ID 추출 성공:', data.data.sessionId);
            return data.data.sessionId;
        }

        console.error('세션 생성 실패:', data);
        throw new Error(data.message || "세션 생성에 실패했습니다.");

    } catch (error) {
        console.error('세션 생성 오류:', error);
        throw error;
    }
};

// 질문 생성 요청
export const generateQuestion = async (sessionId: string, answer: string | null = null): Promise<QuestionResponse> => {
    try {
        const response = await fetch("/api/v2/groups/recommendations/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answer,
                sessionId
            }),
        });

        const data: ChatbotQuestionResponse = await response.json();
        console.log('질문 생성 응답 데이터:', data);

        if (data.code !== 200) {
            console.error('질문 생성 실패:', data);
            throw new Error(data.message || "질문 생성에 실패했습니다.");
        }

        return {
            question: data.data.question,
            answer: data.data.answer,
        };
    } catch (error) {
        console.error('질문 생성 오류:', error);
        throw error;
    }
};

// 모임 추천 요청
export const getRecommendation = async (sessionId: string): Promise<RecommendationResponse> => {
    try {
        const response = await fetch(`/api/v2/groups/recommendations?sessionId=${sessionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data: ChatbotRecommendationResponse = await response.json();

        if (data.code !== 200) {
            console.error('추천 실패:', data);
            throw new Error(data.message || "추천 요청에 실패했습니다.");
        }

        return {
            group: data.data.group,
            reason: data.data.reason,
        };
    } catch (error) {
        console.error('추천 요청 오류:', error);
        throw error;
    }
};
