import { BASE_URL } from "@/shared/constants";
import { ScheduleDetails } from "../model/types";

export const getScheduleDetails = async (scheduleId: number): Promise<ScheduleDetails> => {
    const response = await fetch(`${BASE_URL}/api/v1/schedules/${scheduleId}`);
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "일정 정보를 불러오는데 실패했습니다.");
    }

    return data.data;
};
