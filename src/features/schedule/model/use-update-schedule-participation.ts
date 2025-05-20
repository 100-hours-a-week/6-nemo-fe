import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ParticipationStatus, updateScheduleParticipation } from "../api/update-schedule-participation";
import { toast } from "sonner";

export const useUpdateScheduleParticipation = (scheduleId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (status: ParticipationStatus) =>
            updateScheduleParticipation(scheduleId, status),
        onSuccess: () => {
            toast.success("일정 참여 응답을 완료하였습니다");
            // 성공 시 일정 상세 정보 쿼리를 무효화하여 다시 불러오게 함
            queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
        },
        onError: (error) => {
            toast.error(`${error}`);
        },
    });
};