import { BASE_URL } from "@/shared/constants";
import { getAuthHeader } from "@/shared/lib/auth-header";
import { CreateGroupInfoRequest, GeneratedGroupData } from "../model/types";

export const createGroupInfo = async (data: CreateGroupInfoRequest): Promise<GeneratedGroupData> => {
    const response = await fetch(`${BASE_URL}/api/v1/groups/ai-generate`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.code !== 200) {
        throw new Error(result.message || "모임 정보 생성에 실패했습니다.");
    }

    return result.data;
};