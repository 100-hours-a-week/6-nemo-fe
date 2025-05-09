import { useState, useEffect } from "react";
import { GroupDetails } from "@/entities/group/model/types";
import { BASE_URL } from "@/shared/constants";

export const useGroup = (groupId: number) => {
    const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${BASE_URL}/api/v1/groups/${groupId}`);
                console.log(BASE_URL)
                const data = await response.json();
                if (data.code === 200) {
                    setGroupDetails(data.data);
                } else {
                    throw new Error(data.message || "모임 정보를 불러오는데 실패했습니다.");
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

    return { groupDetails, isLoading, error };
};