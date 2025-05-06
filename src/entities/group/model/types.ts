export type Group = {
    id?: string;
    name: string;
    description: string;
    category: string;
    location: string;
    currentUserCount: number;
    maxUserCount: number;
    imageUrl?: string;
    tags: string[];
    plan?: string;
}

export type GroupCardProps = {
    group: Group;
    className?: string;
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

export type SearchParams = {
    keyword?: string;
    category?: string;
    page?: number;
    size?: number;
};