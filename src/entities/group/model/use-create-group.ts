// src/entities/group/model/use-create-group.ts
import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../api/create-group";
import { CreateGroupRequest } from "./types";

export const useCreateGroup = () => {
    return useMutation({
        mutationFn: (data: CreateGroupRequest) => createGroup(data),
    });
};