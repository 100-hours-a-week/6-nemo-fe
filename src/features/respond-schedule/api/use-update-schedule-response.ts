import { scheduleQuery } from "@/entities/schedule/api/schedule.query";
import { errorToast, GAbuttonClick, GAerrorTracking, GAscheduleAction, patch, successToast } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

            GAbuttonClick(
                `schedule_response_${status.toLowerCase()}`,
                "schedule_detail"
            );
            GAscheduleAction(
                `response_attempt_${status.toLowerCase()}`,
                scheduleId.toString()
            );

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

            GAscheduleAction(`response_success`, scheduleId.toString());

        },
        onError: (error) => {
            errorToast(RESPOND_SCHEDULE_MESSAGES.ERROR, error.message);

            GAerrorTracking('schedule_response_failed', error);

        }
    });
};
