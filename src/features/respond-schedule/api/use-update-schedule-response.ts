import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patch } from "@/features/auth/model/auth-client";
import { scheduleQuery } from "@/entities/schdule/api/schedule.query";
import { toast } from "sonner";

export type ParticipationStatus = "ACCEPTED" | "REJECTED";

export const useUpdateScheduleResponse = (scheduleId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (status: ParticipationStatus) => {
            const response = await patch(`/api/v1/schedules/${scheduleId}/participants`, { status });
            const result = await response.json();

            if (result.code !== 204) {
                throw new Error(result.message || '일정 참여 상태 변경에 실패했습니다.');
            }

            return result.data;
        },
        onSuccess: () => {
            toast.success("일정 참여 응답을 완료하였습니다");

            // 참여 응답 완료 후 즉시 참석자 UI 업데이트 (Refetch)
            queryClient.refetchQueries({
                queryKey: scheduleQuery.detail(scheduleId).queryKey
            });
        },
        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "일정 참여 응답에 실패하였습니다.",
                {
                    description: "잠시 후 다시 시도해주세요.",
                    position: "top-center",
                },
            );
        }
    });
};