import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ParticipationStatus, updateScheduleParticipation } from "../api/update-schedule-participation";

export const useUpdateScheduleParticipation = (scheduleId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (status: ParticipationStatus) =>
            updateScheduleParticipation(scheduleId, status),
        onSuccess: () => {
            // 성공 시 일정 상세 정보 쿼리를 무효화하여 다시 불러오게 함
            queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
        },
    });
};