export type Group = {
    id?: number;
    ownerName?: string;
    name: string;
    summary: string;
    description?: string;
    category: string;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
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

// 모임 정보 생성에 필요한 사용자 입력 데이터
export type CreateGroupInfoRequest = {
    name: string;
    goal: string;
    category: string;
    location: string;
    period: string;
    isPlanCreated: boolean;
}

// 사용자 입력 데이터를 통해 생성된 모임 정보
export type GeneratedGroupData = {
    name: string;
    goal: string;
    category: string;
    location: string;
    period: string;
    maxUserCount: number;
    isPlanCreated: boolean;
    summary: string;
    description: string;
    tags: string[];
    plan?: string;
    imageUrl?: string;
}

export type CreateGroupRequest = {
    name: string;
    summary: string;
    description: string;
    category: string;
    location: string;
    maxUserCount: number;
    imageUrl?: string;
    tags?: string[];
    plan?: string;
}