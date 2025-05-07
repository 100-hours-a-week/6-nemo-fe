'use client'

import { useState, useEffect } from "react";
import { Schedule } from "../model/types";
import mockSchedules from "mocks/group-schedules.json";

export const useSchedules = (groupId: number) => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setIsLoading(true);

                // 실제 API 호출 (주석 처리)
                // const response = await fetch(`/api/v1/groups/${groupId}/schedules?page=${currentPage}`);
                // const data: SchedulesResponse = await response.json();
                // if (data.code === 200) {
                //   setSchedules((prev) => 
                //     currentPage === 0 ? data.data.schedules : [...prev, ...data.data.schedules]
                //   );
                //   setTotalCount(data.data.totalElements);
                //   setIsLastPage(data.data.isLast);
                // } else {
                //   throw new Error(data.message || "일정 목록을 불러오는데 실패했습니다.");
                // }

                // Mock 데이터 사용
                if (mockSchedules.code === 200) {
                    // 명시적 타입 변환을 통해 Schedule 배열로 캐스팅
                    const scheduleData = mockSchedules.data.schedules as Schedule[];

                    setSchedules((prev) =>
                        currentPage === 0
                            ? scheduleData
                            : [...prev, ...scheduleData]
                    );
                    setTotalCount(mockSchedules.data.totalElements);
                    setIsLastPage(mockSchedules.data.isLast);
                } else {
                    throw new Error("일정 목록을 불러오는데 실패했습니다.");
                }

                setIsLoading(false);
            } catch (error) {
                console.error("일정 목록을 불러오는 중 오류 발생:", error);
                setError(error as Error);
                setIsLoading(false);
            }
        };

        fetchSchedules();
    }, [groupId, currentPage]);

    // 더 많은 일정 불러오기
    const loadMoreSchedules = () => {
        if (!isLastPage && !isLoading) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return {
        schedules,
        isLoading,
        error,
        totalCount,
        isLastPage,
        loadMoreSchedules
    };
};