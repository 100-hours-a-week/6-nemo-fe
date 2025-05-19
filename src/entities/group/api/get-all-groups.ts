import { BASE_URL } from "@/shared/constants";

export const getAllGroups = async (page: number) => {
    const res = await fetch(`${BASE_URL}/api/v1/groups?page=${page}&size=10&sort=createdAt`);
    const json = await res.json();
    const { groups, pageNumber, isLast } = json.data;
    return { groups, pageNumber, isLast };
};
