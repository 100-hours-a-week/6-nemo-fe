import { useInfiniteQuery } from "@tanstack/react-query";
import { getSchedules } from "../../../entities/schdule/api/get-schedules";

export const useInfiniteSchedules = (groupId: number) => {
    return useInfiniteQuery({
        queryKey: ["schedules", groupId],
        queryFn: ({ pageParam }) => getSchedules({ groupId, pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
    });
};