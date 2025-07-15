import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleQuery } from "@/entities/schedule/api/schedule.query";
import { CreateScheduleRequest } from "@/entities/schedule/model/types";
import { errorToast, GAerrorTracking, post, successToast } from "@/shared/lib";
import { CREATE_SCHEDULE_MESSAGES } from "../model/constants";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateScheduleRequest) => {
      const response = await post("/api/v1/schedules", data);
      const result = await response.json();

      if (result.code !== 201) {
        throw new Error(result.message);
      }

      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: scheduleQuery.list(variables.groupId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQuery.myList().queryKey,
      });

      successToast(CREATE_SCHEDULE_MESSAGES.SUCCESS);
    },
    onError: (error) => {
      GAerrorTracking("api_error", error, "schedule_creation");
      errorToast(CREATE_SCHEDULE_MESSAGES.ERROR, error.message);
    },
  });
};
