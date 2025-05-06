import { useRouter } from "next/navigation";
import { ScheduleListProps } from "../model/types";
import { useSchedules } from "../lib/use-schedules";
import { ScheduleItem } from "./schedule-item";

export const ScheduleList = ({ groupId }: ScheduleListProps) => {
  const router = useRouter();
  const {
    schedules,
    isLoading,
    error,
    totalCount,
    isLastPage,
    loadMoreSchedules,
  } = useSchedules(groupId);

  // 일정 상세 페이지로 이동
  const handleScheduleClick = (scheduleId: number) => {
    router.push(`/groups/${groupId}/schedules/${scheduleId}`);
  };

  if (isLoading && schedules.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-body-1 text-error bg-error-container mt-4 rounded-md p-4 text-center">
        일정 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-body-1 text-label-normal mb-4">
          등록된 일정이 없습니다.
        </p>
        <button
          className="bg-primary text-common-100 rounded-full px-6 py-2"
          onClick={() => router.push(`/groups/${groupId}/schedules/create`)}
        >
          일정 만들기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-heading-2 text-label-strong-1 font-semibold">
          일정 목록 ({totalCount})
        </h3>
        <button
          className="bg-primary text-common-100 rounded-full px-4 py-1 text-sm"
          onClick={() => router.push(`/groups/${groupId}/schedules/create`)}
        >
          + 일정 만들기
        </button>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
            onClick={() => handleScheduleClick(schedule.id)}
          />
        ))}
      </div>

      {!isLastPage && (
        <div className="mt-4 text-center">
          <button
            onClick={loadMoreSchedules}
            className="text-body-2 text-label-normal rounded-md border border-gray-200 px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? "로딩 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
};
