import { post } from "@/features/auth/model/auth-client";
import { CreateScheduleRequest } from "../model/types";

export const createSchedule = async (data: CreateScheduleRequest) => {
    const response = await post("/api/v1/schedules", data);
    const result = await response.json();

    if (result.code !== 201) {
        throw new Error(result.message || '일정 생성에 실패했습니다.');
    }

    return result.data;
};