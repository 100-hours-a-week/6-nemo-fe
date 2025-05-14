import { BASE_URL } from "@/shared/constants";
import { CreateScheduleRequest } from "../model/types";

export const createSchedule = async (data: CreateScheduleRequest) => {
    const response = await fetch(`${BASE_URL}/api/v1/schedules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.code !== 200) {
        throw new Error(result.message || '일정 생성에 실패했습니다.');
    }

    return result.data;
};