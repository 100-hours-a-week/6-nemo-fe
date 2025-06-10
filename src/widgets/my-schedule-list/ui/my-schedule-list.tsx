"use client";

import { MyScheduleCard, scheduleQuery } from "@/entities/schdule";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const MyScheduleList = () => {
  const router = useRouter();

  const {
    data: mySchedules,
    isLoading,
    error,
  } = useQuery(scheduleQuery.mySchedules());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error py-8 text-center">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const totalSchedules =
    (mySchedules?.notResponded?.length || 0) +
    (mySchedules?.respondedOngoing?.length || 0);

  if (!mySchedules || totalSchedules === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-primary-light mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        </div>
        <h3 className="text-heading-2 text-label-strong-1 mb-2 font-semibold">
          참여한 일정이 없어요
        </h3>
        <p className="text-body-2 text-label-normal mb-6 text-center">
          모임에 참여하고 일정을 확인해보세요!
        </p>
        <button
          onClick={() => router.push("/groups")}
          className="bg-primary text-common-100 hover:bg-primary-strong rounded-full px-6 py-3 font-medium transition"
        >
          모임 둘러보기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 응답 대기 일정 */}
      {mySchedules.notResponded && mySchedules.notResponded.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-heading-2 font-semibold text-yellow-700">
              응답 대기 중
            </h3>
            <span className="text-caption-1 rounded-full bg-yellow-100 px-2 py-1 font-medium text-yellow-700">
              {mySchedules.notResponded.length}
            </span>
          </div>
          <div className="space-y-3">
            {mySchedules.notResponded.map((item) => (
              <MyScheduleCard
                key={`not-responded-${item.schedule.scheduleId}`}
                schedule={item.schedule}
              />
            ))}
          </div>
        </div>
      )}

      {/* 참여 중인 일정 */}
      {mySchedules.respondedOngoing &&
        mySchedules.respondedOngoing.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-heading-2 text-primary font-semibold">
                참여 중인 일정
              </h3>
              <span className="bg-primary-light text-primary text-caption-1 rounded-full px-2 py-1 font-medium">
                {mySchedules.respondedOngoing.length}
              </span>
            </div>
            <div className="space-y-3">
              {mySchedules.respondedOngoing.map((item) => (
                <MyScheduleCard
                  key={`responded-ongoing-${item.schedule.scheduleId}`}
                  schedule={item.schedule}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
