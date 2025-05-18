import { BASE_URL } from "@/shared/constants";
import { CreateScheduleRequest } from "../model/types";
import { getAuthHeader } from "@/shared/lib/auth-header";

export const createSchedule = async (data: CreateScheduleRequest) => {
    const response = await fetch(`${BASE_URL}/api/v1/schedules`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.code !== 201) {
        throw new Error(result.message || '일정 생성에 실패했습니다.');
    }

    return result.data;
};