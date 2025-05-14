import { Member } from "@/entities/group";

export type Schedule = {
    id: number;
    title: string;
    startAt: string;
    address: string;
    description: string;
    ownerName: string;
    scheduleStatus?: 'RECRUITING' | 'CLOSED';
    currentUserCount?: number;
};

export type ScheduleDetials = Schedule & {
    createdAt: string;
    group: {
        groupId: number;
        name: string;
        currentUser: number
    }
    participants: ScheduleParticipant[]
}

export type ScheduleParticipant = {
    id: number;
    user: Member;
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