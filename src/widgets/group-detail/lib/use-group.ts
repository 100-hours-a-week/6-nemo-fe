import { useState, useEffect } from "react";
import { Group } from "@/entities/group/model/types";
import mockGroupDetail from "mocks/group-detail.json";

export const useGroup = (groupId: number) => {
    const [group, setGroup] = useState<Group | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setIsLoading(true);

                // 실제 API 호출
                // const response = await fetch(`/api/v1/groups/${groupId}`);
                // const data = await response.json();
                // if (data.code === 200) {
                //   setGroup(data.data);
                // } else {
                //   throw new Error(data.message || "모임 정보를 불러오는데 실패했습니다.");
                // }

                // Mock 데이터 사용
                if (mockGroupDetail.code === 200) {
                    // mock 데이터를 Group 타입에 맞게 변환
                    const groupData = mockGroupDetail.data as Group;
                    groupData.id = groupId; // ID 추가
                    setGroup(groupData);
                } else {
                    throw new Error("모임 정보를 불러오는데 실패했습니다.");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("그룹 정보를 불러오는 중 오류 발생:", error);
                setError(error as Error);
                setIsLoading(false);
            }
        };

        fetchGroup();
    }, [groupId]);

    return { group, isLoading, error };
};