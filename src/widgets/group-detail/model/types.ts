import { Group } from "@/entities/group/model/types";

export type GroupDetailHeaderProps = {
    group: Group;
};

export type GroupInfoTabsProps = {
    activeTab: "info" | "schedule";
    onTabChange: (tab: "info" | "schedule") => void;
};

export type MembersListProps = {
    groupId: string;
};

export type GroupPlanProps = {
    plan: string;
};

export type Member = {
    id: string;
    name: string;
    profileImage?: string;
    role: "admin" | "member";
};

export type MembersResponse = {
    code: number;
    message: string;
    data: {
        members: Member[];
        totalCount: number;
    };
};

export type GroupDetailResponse = {
    code: number;
    message: string;
    data: Group;
};
// 일정 상태 타입 정의
export type ScheduleStatus = 'RECRUITING' | 'CLOSED';

// 일정 데이터 타입 정의
export type Schedule = {
    id: number;
    title: string;
    startAt: string;
    address: string;
    description: string;
    ownerName: string;
    ScheduleStatus: ScheduleStatus;
    currentUserCount: number;
    maxUserCount?: number;
};

// 일정 응답 타입 정의
export type SchedulesResponse = {
    code: number;
    message: string;
    data: {
        schedules: Schedule[];
        totalPages: number;
        totalElements: number;
        pageNumber: number;
        isLast: boolean;
    };
};

// 일정 목록 프로퍼티 타입 정의
export type ScheduleListProps = {
    groupId: string;
};