import { Group } from "@/entities/group/model/types";

export type GroupDetailHeaderProps = {
    group: Group;
};


export type GroupDetailResponse = {
    code: number;
    message: string;
    data: Group;
};

// 일정 데이터 타입 정의
export type Schedule = {
    id: number;
    title: string;
    startAt: string;
    address: string;
    description: string;
    ownerName: string;
    ScheduleStatus: 'RECRUITING' | 'CLOSED';
    currentUserCount: number;
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
