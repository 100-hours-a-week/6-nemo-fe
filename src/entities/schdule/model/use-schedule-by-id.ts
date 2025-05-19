// src/widgets/group-details/lib/use-group.ts
import { useQuery } from "@tanstack/react-query";
import { getScheduleDetails } from "../api/get-schedule-details";

export const useScheduleById = (scheduleId: number) => {
    return useQuery({
        queryKey: ["group", scheduleId],
        queryFn: () => getScheduleDetails(scheduleId),
        enabled: !!scheduleId,
        staleTime: 1000 * 60 * 5, //3600ms
    });
};