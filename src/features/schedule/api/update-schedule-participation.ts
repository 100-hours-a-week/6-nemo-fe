import { patch } from "@/features/auth/model/auth-client";

export type ParticipationStatus = "ACCEPTED" | "REJECTED";

export const updateScheduleParticipation = async (
    scheduleId: number,
    status: ParticipationStatus
) => {
    const response = await patch(`/api/v1/schedules/${scheduleId}/participants`, { status });
    const result = await response.json();

    if (result.code !== 204) {
        throw new Error(result.message || '일정 참여 상태 변경에 실패했습니다.');
    }

    return result.data;
};