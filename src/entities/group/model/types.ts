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