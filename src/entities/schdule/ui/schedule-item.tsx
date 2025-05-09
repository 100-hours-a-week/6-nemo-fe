import { Schedule } from "../model/types";

type ScheduleItemProps = {
  schedule: Schedule;
  onClick?: () => void;
};

// 날짜 및 시간 포맷 유틸리티 함수 (추후 lib에 분리)
const formatDatetime = (dateTimeStr: string) => {
  try {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  } catch (e) {
    return { date: "", time: "" };
  }
};

export const ScheduleItem = ({ schedule, onClick }: ScheduleItemProps) => {
  const { date, time } = formatDatetime(schedule.startAt);

  // 일정 상태에 따른 태그 스타일
  const getStatusStyle = () => {
    switch (schedule.ScheduleStatus) {
      case "RECRUITING":
        return "bg-primary-light text-primary";
      case "CLOSED":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  // 일정 상태 한글 표시
  const getStatusText = () => {
    switch (schedule.ScheduleStatus) {
      case "RECRUITING":
        return "모집중";
      case "CLOSED":
        return "마감됨";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div
      className="bg-common-100 mb-3 rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
      onClick={onClick}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-headline-1 line-clamp-1 font-semibold">
          {schedule.title}
        </h3>
        <span
          className={`text-caption-1 rounded-full px-2 py-0.5 ${getStatusStyle()}`}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="mb-2 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-gray-500"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span className="text-body-2 text-label-normal">
            {date} {time}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-gray-500"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-body-2 text-label-normal line-clamp-1">
            {schedule.address}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-gray-500"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-body-2 text-label-normal">
            {schedule.currentUserCount}명 참가
          </span>
        </div>
      </div>

      <div className="text-body-2 text-label-normal line-clamp-2 rounded-md bg-gray-50 p-1">
        {schedule.description}
      </div>

      <div className="mt-2 text-right">
        <span className="text-caption-1 text-primary">
          개설자: {schedule.ownerName}
        </span>
      </div>
    </div>
  );
};
