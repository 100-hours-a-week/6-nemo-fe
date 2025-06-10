import { queryOptions } from "@tanstack/react-query";
import { UserProfile } from "../model/types";
import { getUserProfile } from "./get-user-profile";

export const profileQuery = {
    profile: () =>
        queryOptions({
            queryKey: ["user", "profile"],
            queryFn: (): Promise<UserProfile> => getUserProfile(),
            staleTime: 1000 * 60 * 5, // 5분
        }),
};
