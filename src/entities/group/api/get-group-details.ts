"use server"

import { BASE_URL } from "@/shared/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GroupDetailsResponse } from "../model/types";

export const getGroupDetails = async (groupId: number | string): Promise<GroupDetailsResponse> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access-token')?.value;

    const response = await fetch(`${BASE_URL}/api/v1/groups/${groupId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include"
    });
    const data = await response.json();

    // 토큰이 만료된 경우 임시 리다이렉트 처리 (미들웨어 리팩토링 전)
    if (data.code === 401) {
        redirect('/login');
    }

    if (data.code !== 200) {
        throw new Error(data.message || "모임 정보를 불러오는데 실패했습니다.");
    }

    return data.data;
};
