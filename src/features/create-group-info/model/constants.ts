export const CREATE_GROUP_INFO_MESSAGES = {
    ERROR: "모임 정보 생성에 실패했습니다.",
} as const;

// 모임 기간 옵션
export const PERIOD_OPTIONS = [
    { id: "LESS_THAN_1_MONTH", label: "1개월 이하" },
    { id: "ONE_TO_THREE_MONTHS", label: "1~3개월" },
    { id: "THREE_TO_SIX_MONTHS", label: "3~6개월" },
    { id: "SIX_TO_TWELVE_MONTHS", label: "6~12개월" },
    { id: "MORE_THAN_1_YEAR", label: "1년 이상" },
];