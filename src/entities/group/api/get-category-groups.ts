import { BASE_URL } from "@/shared/constants";
import { GroupListResponse } from "../model/types";

export const getCategoryGroups = async (category: string, page: number): Promise<GroupListResponse> => {
    const res = await fetch(
        `${BASE_URL}/api/v1/groups?category=${category}&page=${page}&size=10&sort=createdAt`
    );
    const json = await res.json();
    const { groups, totalPages, totalElements, pageNumber, isLast } = json.data;
    return { groups, totalPages, totalElements, pageNumber, isLast };
};
