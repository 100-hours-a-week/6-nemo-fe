// src/entities/group/api/get-group-details.ts
import { BASE_URL } from "@/shared/constants";
import { GroupDetailsResponse } from "../model/types";

export const getGroupDetails = async (groupId: number | string): Promise<GroupDetailsResponse> => {
    const response = await fetch(`${BASE_URL}/api/v1/groups/${groupId}`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "모임 정보를 불러오는데 실패했습니다.");
    }

    return data.data;
};
