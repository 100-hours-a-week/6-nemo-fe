import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleQuery } from "@/entities/schdule/api/schedule.query";
import { patch } from "@/features/auth/login";
import { errorToast, successToast } from "@/shared/lib";
import { RESPOND_SCHEDULE_MESSAGES } from "../model/constants";

export type ParticipationStatus = "ACCEPTED" | "REJECTED";

export const useUpdateScheduleResponse = (scheduleId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (status: ParticipationStatus) => {
            const response = await patch(`/api/v1/schedules/${scheduleId}/participants`, { status });
            const result = await response.json();

            if (result.code !== 204) {
                throw new Error(result.message);
            }

            return result.data;
        },
        onSuccess: () => {
            // 참여 응답 완료 후 즉시 참석자 UI 업데이트 (Refetch)
            queryClient.refetchQueries({
                queryKey: scheduleQuery.detail(scheduleId).queryKey
            });
            queryClient.invalidateQueries({
                queryKey: scheduleQuery.myList().queryKey
            });

            successToast(RESPOND_SCHEDULE_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            errorToast(RESPOND_SCHEDULE_MESSAGES.ERROR, error.message);
        }
    });
};
