export type ChatbotQuestionRequest = {
    answer: string | null;
};

export type ChatbotQuestionResponse = {
    code: number;
    message: string;
    data: {
        question: string;
        options: string[];
    };
};

export type ChatbotRecommendationResponse = {
    code: number;
    message: string;
    data: {
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
};

export type ChatbotSessionResponse = {
    code: number;
    message: string;
    data: null;
};
