export type Group = {
    id?: number;
    name: string;
    summary: string;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
    category: string;
    imageUrl?: string;
    tags?: string[];
}

export type GroupDetails = Group & {
    plan?: string;
}

export type SearchParams = {
    keyword?: string;
    category?: string;
    page?: number;
    size?: number;
    sort?: string;
};

export type SearchResponse = {
    code: number;
    message: string;
    data: {
        groups: Group[];
        totalPages: number;
        totalElements: number;
        pageNumber: number;
        isLast: boolean;
    };
};

export type Member = {
    userId: string;
    nickname: string;
    profileImageUrl?: string;
    role: "LEADER" | "MEMBER";
};