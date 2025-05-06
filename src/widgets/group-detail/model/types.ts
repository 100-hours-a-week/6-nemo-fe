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