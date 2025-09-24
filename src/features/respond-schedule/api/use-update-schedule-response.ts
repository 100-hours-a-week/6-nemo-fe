import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQuery } from "@/entities/profile";
import { scheduleQuery } from "@/entities/schedule/api/schedule.query";
import { ScheduleDetails } from "@/entities/schedule/model/types";
import {
  errorToast,
  GAbuttonClick,
  GAerrorTracking,
  GAscheduleAction,
  patch,
  successToast,
} from "@/shared/lib";
import { RESPOND_SCHEDULE_MESSAGES } from "../model/constants";

export type ParticipationStatus = "ACCEPTED" | "REJECTED";

export const useUpdateScheduleResponse = (scheduleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: ParticipationStatus) => {
      const response = await patch(
        `/api/v1/schedules/${scheduleId}/participants`,
        { status }
      );
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
    onMutate: async (status: ParticipationStatus) => {
      // 서버 요청 전에 관련 쿼리 취소 및 스냅샷 저장
      await queryClient.cancelQueries({
        queryKey: scheduleQuery.detail(scheduleId).queryKey,
      });

      const previousDetail = queryClient.getQueryData<ScheduleDetails>(
        scheduleQuery.detail(scheduleId).queryKey
      );

      const me = queryClient.getQueryData<unknown>(
        profileQuery.profile().queryKey
      ) as { nickname?: string } | undefined;
      const myNickname = me?.nickname;

      if (previousDetail && myNickname) {
        const updatedParticipants = previousDetail.participants.map((p) => {
          if (p.user.nickname === myNickname) {
            return { ...p, status };
          }
          return p;
        });

        const optimisticDetail: ScheduleDetails = {
          ...previousDetail,
          participants: updatedParticipants,
        };

        queryClient.setQueryData(
          scheduleQuery.detail(scheduleId).queryKey,
          optimisticDetail
        );
      }

      // 롤백을 위한 컨텍스트 반환
      return { previousDetail };
    },
    onError: (error, _variables, context) => {
      // 롤백
      if (context?.previousDetail) {
        queryClient.setQueryData(
          scheduleQuery.detail(scheduleId).queryKey,
          context.previousDetail
        );
      }
      errorToast(RESPOND_SCHEDULE_MESSAGES.ERROR, (error as Error).message);
      GAerrorTracking("api_error", error as Error, "schedule_response");
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: scheduleQuery.detail(scheduleId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQuery.myList().queryKey,
      });

      successToast(RESPOND_SCHEDULE_MESSAGES.SUCCESS);

      GAscheduleAction(`response_success`, scheduleId.toString());
    },
  });
};
