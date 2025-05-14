import { useMutation } from "@tanstack/react-query";
import { CreateScheduleRequest } from "./types";
import { createSchedule } from "../api/create-schedule";

export const useCreateSchedule = () => {
    return useMutation({
        mutationFn: (data: CreateScheduleRequest) => createSchedule(data),
    });
};