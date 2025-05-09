import { Group } from "@/entities/group/model/types";

export type GroupDetailHeaderProps = {
    group: Group;
};


export type GroupDetailResponse = {
    code: number;
    message: string;
    data: Group;
};