import { getSchedules } from "./get-schedules";

export const schedulesQueryKeys = {
    all: (groupId: number) => ["schedules", groupId] as const,
    detail: (groupId: number, scheduleId: number) =>
        ["schedules", groupId, scheduleId] as const,
};

export const schedulesQueryFns = {
    list: ({ groupId, pageParam }: { groupId: number; pageParam: number }) =>
        getSchedules({ groupId, pageParam }),

    detail: ({ groupId, scheduleId }: { groupId: number; scheduleId: number }) =>
        fetch(`/api/groups/${groupId}/schedules/${scheduleId}`).then((res) =>
            res.json()
        ),
};
