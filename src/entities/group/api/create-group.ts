import { BASE_URL } from "@/shared/constants";
import { getAuthHeader } from "@/shared/lib/auth-header";
import { CreateGroupRequest, GroupDetails } from "../model/types";

export const createGroup = async (data: CreateGroupRequest): Promise<GroupDetails> => {
    const response = await fetch(`${BASE_URL}/api/v1/groups`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.code !== 201) {
        throw new Error(result.message || "모임 생성에 실패했습니다.");
    }

    return result.data;
};