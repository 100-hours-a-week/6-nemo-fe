// src/widgets/my-schedules/model/types.ts
export type MyScheduleItem = {
    schedule: {
        scheduleId: number;
        groupName: string;
        title: string;
        address: string;
        currentUserCount: number;
        ownerName: string;
        startDate: string;
        status: "PENDING" | "ACCEPTED" | "REJECTED";
    };
};

export type MySchedulesResponse = {
    notResponded: MyScheduleItem[];
    respondedOngoing: MyScheduleItem[];
    respondedCompleted: MyScheduleItem[];
};

export type ScheduleTabType = "notResponded" | "respondedOngoing" | "respondedCompleted";

export type MySchedulesProps = {
    className?: string;
};