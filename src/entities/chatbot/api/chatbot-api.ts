import { get, post } from "@/features/auth/login";
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
export const createChatbotSession = async (): Promise<void> => {
    try {
        const response = await post("/api/v2/groups/recommendations/session", {});
        const data = await response.json();

        if (data.code !== 204) {
            throw new Error(data.message || "세션 생성에 실패했습니다.");
        }

    } catch (error) {
        console.error('세션 생성 오류:', error);
        throw error;
    }
};

// 질문 생성 요청
export const generateQuestion = async (answer: string | null = null): Promise<QuestionResponse> => {
    try {
        const response = await post("/api/v2/groups/recommendations/questions", { answer });
        const data: ChatbotQuestionResponse = await response.json();

        if (data.code !== 200) {
            throw new Error(data.message || "질문 생성에 실패했습니다.");
        }

        return {
            question: data.data.question,
            answer: data.data.options,
        };
    } catch (error) {
        console.error('질문 생성 오류:', error);
        throw error;
    }
};

// 모임 추천 요청
export const getRecommendation = async (): Promise<RecommendationResponse> => {
    try {
        const response = await get("/api/v2/groups/recommendations");
        const data: ChatbotRecommendationResponse = await response.json();

        if (data.code !== 200) {
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
