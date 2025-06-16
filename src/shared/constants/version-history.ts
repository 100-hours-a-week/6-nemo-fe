type VersionItem = {
    version: string;
    date: string;
    changes: {
        type: "수정" | "추가";
        content: string;
    }[];
};

export const versionHistory: VersionItem[] = [
    {
        version: "2.0.0",
        date: "2025.06.11",
        changes: [
            { type: "추가", content: "프로필 이미지 변경 기능 추가" },
            { type: "추가", content: "닉네임 수정 기능 추가" },
            { type: "추가", content: "로그아웃 기능 기능 추가" },
            { type: "수정", content: "일정 상세 페이지 진입 시 간헐적 버그 발생 수정" },
            { type: "추가", content: "나의 모임 조회 페이지 추가" },
            { type: "추가", content: "나의 일정 조회 페이지 추가" },
        ],
    },
    {
        version: "2.1.0",
        date: "2025.06.16",
        changes: [
            { type: "추가", content: "모임 대표 사진 변경 기능 추가" },
            { type: "추가", content: "모임원관리 기능 추가" },
            { type: "추가", content: "모임 해체 기능 추가" },
            { type: "추가", content: "모임 진입 시 권한별 버튼 UI 추가" },
        ],
    },
];
