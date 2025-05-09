import { BASE_URL } from "@/shared/constants";

export const getSchedules = async ({
    groupId,
    pageParam = 0,
}: {
    groupId: number;
    pageParam?: number;
}) => {
    const res = await fetch(
        `${BASE_URL}/api/v1/groups/${groupId}/schedules?sort=createdAt&page=${pageParam}&size=10`
    );
    const json = await res.json();

    if (json.code !== 200) {
        throw new Error(json.message || "일정 데이터를 불러오지 못했습니다.");
    }

    return json.data;
};
