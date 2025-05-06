import { Group, SearchParams } from "@/entities/group/model/types";

export type GroupsListProps = {
    initialData?: {
        groups: Group[];
        totalPages: number;
        totalElements: number;
        pageNumber: number;
        isLast: boolean;
    };
    params?: SearchParams;
};