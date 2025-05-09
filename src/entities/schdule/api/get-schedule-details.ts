// src/entities/group/api/get-group-details.ts
import { BASE_URL } from "@/shared/constants";
import { ScheduleDetials } from "../model/types";

export const getScheduleDetails = async (scheduleId: number): Promise<ScheduleDetials> => {
    const response = await fetch(`${BASE_URL}/api/v1/schedules/${scheduleId}`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "일정 정보를 불러오는데 실패했습니다.");
    }

    return data.data;
};