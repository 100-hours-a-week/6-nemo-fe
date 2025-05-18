import { useQuery } from "@tanstack/react-query";
import { getMySchedules } from "../api/get-my-schedules";

export const useMySchedules = () => {
    return useQuery({
        queryKey: ["my-schedules"],
        queryFn: getMySchedules,
        staleTime: 1000 * 60 * 5,
    });
};