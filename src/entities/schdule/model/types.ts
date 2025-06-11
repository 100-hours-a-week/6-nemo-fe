export type Schedule = {
    scheduleId: number;
    title: string;
    startAt: string;
    address: string;
    description: string;
    ownerName: string;
    status: 'RECRUITING' | 'CLOSED';
    currentUserCount?: number;
};

export type ScheduleDetails = Schedule & {
    createdAt: string;
    group: {
        groupId: number;
        name: string;
        currentUser: number
    }
    participants: ScheduleParticipant[]
}

export type ScheduleParticipant = {
    user: {
        userId: string;
        nickname: string;
        profileImageUrl: string | null;
    }
    status: "ACCEPTED" | "REJECTED" | "PENDING";
}

export type CreateScheduleRequest = {
    groupId: number;
    title: string;
    description: string;
    address: string;
    addressDetail: string;
    startAt: string;
};

export type MyScheduleItem = Schedule & {
    groupName: string;
    groupId: string;
};

export type MySchedulesResponse = {
    notResponded: { schedule: MyScheduleItem; }[];
    respondedOngoing: { schedule: MyScheduleItem; }[];
};
