import { get } from "@/features/auth/model/auth-client";
import { MySchedulesResponse } from "../model/types";

export const getMySchedules = async (): Promise<MySchedulesResponse> => {
    const response = await get("/api/v1/schedule/me");
    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.message || "일정 목록을 불러오는데 실패했습니다.");
    }

    return data.data;
};