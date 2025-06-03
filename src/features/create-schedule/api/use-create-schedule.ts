import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/features/auth/model/auth-client";
import { CreateScheduleRequest } from "@/entities/schdule/model/types";
import { scheduleQuery } from "@/entities/schdule/api/schedule.query";
import { errorToast, successToast } from "@/shared/lib";
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
                queryKey: scheduleQuery.lists(variables.groupId)
            });

            successToast(CREATE_SCHEDULE_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            errorToast(CREATE_SCHEDULE_MESSAGES.ERROR, error.message);
        }
    });
};