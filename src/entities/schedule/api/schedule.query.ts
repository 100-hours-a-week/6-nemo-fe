import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getMySchedules } from "./get-my-schedules";
import { getScheduleDetails } from "./get-schedule-details";
import { getSchedules } from "./get-schedules";

export const scheduleQuery = {
    all: () => ["schedule"] as const,
    group: (groupId: number) => ["group", groupId] as const,

    lists: () => [...scheduleQuery.all(), "list"] as const,

    // 모임의 일정 리스트 조회
    list: (groupId: number) =>
        infiniteQueryOptions({
            queryKey: [...scheduleQuery.group(groupId), ...scheduleQuery.lists()],
            queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
                getSchedules({ groupId, pageParam }),
            getNextPageParam: (lastPage: any) => {
                return lastPage.isLast ? undefined : lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
            enabled: !!groupId,
            staleTime: 1000 * 60 * 3,
        }),

    // 일정 상세 조회
    details: () => ["schedule", "detail"] as const,
    detail: (scheduleId: number) =>
        queryOptions({
            queryKey: [...scheduleQuery.details(), scheduleId],
            queryFn: () => getScheduleDetails(scheduleId),
            enabled: !!scheduleId,
            staleTime: 1000 * 60 * 5,
        }),

    // 나의 일정 조회
    myList: () =>
        queryOptions({
            queryKey: [...scheduleQuery.lists(), "me"],
            queryFn: () => getMySchedules(),
            staleTime: 1000 * 60 * 5,
        }),
}
