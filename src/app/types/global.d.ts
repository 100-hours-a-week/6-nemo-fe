declare global {
    var chatbotSessions: Map<string, {
        sessionId: string;
        messages: Array<{
            role: 'ai' | 'user';
            text: string;
            options?: string[];
            timestamp: string;
        }>;
        answers: string[];
        createdAt: string;
    }> | undefined;
}

export { };
