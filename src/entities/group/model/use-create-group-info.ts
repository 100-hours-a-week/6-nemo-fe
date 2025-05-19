import { useMutation } from "@tanstack/react-query";
import { CreateGroupInfoRequest } from "./types";
import { createGroupInfo } from "../api/create-group-info";

export const useCreateGroupInfo = () => {
    return useMutation({
        mutationFn: (data: CreateGroupInfoRequest) => createGroupInfo(data)
    });
};