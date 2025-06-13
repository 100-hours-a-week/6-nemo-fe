export type GroupItem = {
    groupId: number;
    name: string;
    category: string;
    summary: string;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
    imageUrl: string | null;
    tags: string[];
}

export type GroupListResponse = {
    groups: GroupItem[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
    isLast: boolean;
};

export type GroupDetailsResponse = {
    name: string;
    category: string;
    summary: string;
    description: string;
    plan: string | null;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
    imageUrl: string | null;
    tags: string[];
    ownerName: string;
    role: "LEADER" | "MEMBER" | "NON_MEMBER" | "GUEST";
}

export type Member = {
    userId: string;
    nickname: string;
    profileImageUrl: string | null;
    role: "LEADER" | "MEMBER";
};

// 모임 정보 생성 요청 타입
export type CreateGroupInfoRequest = {
    name: string;
    goal: string;
    category: string;
    location: string;
    period: string;
    maxUserCount: number;
    isPlanCreated: boolean;
}

// 모임 정보 생성 응답 타입
export type CreateGroupInfoResponse = {
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
    plan?: string | null;
    imageUrl: string | null;
}

// 모임 생성 요청 타입
export type CreateGroupRequest = {
    name: string;
    summary: string;
    description: string;
    category: string;
    location: string;
    maxUserCount: number;
    imageUrl: string | null;
    tags: string[];
    plan?: string | null;
}

// 모임 생성 응답 타입
export type CreateGroupResponse = {
    groupId: number;
    name: string;
    category: string;
    summary: string;
    description: string;
    plan: string | null;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
    imageUrl: string | null;
    tags: string[];
}
