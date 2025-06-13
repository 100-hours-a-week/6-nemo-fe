import { GroupItem } from "@/entities/group/model/types";

export type GroupDetailResponse = {
    code: number;
    message: string;
    data: GroupItem;
};
