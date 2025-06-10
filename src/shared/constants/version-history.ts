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
        version: "1.1.0",
        date: "2025.06.10",
        changes: [
            { type: "추가", content: "프로필 이미지 변경 기능" },
            { type: "추가", content: "닉네임 수정 기능" },
            { type: "추가", content: "로그아웃 기능 기능" },
            { type: "수정", content: "일정 상세 페이지 진입 시 간헐적으로 Client side 에러 발생하는 버그 수정" },
            { type: "추가", content: "나의 모임 조회 페이지 추가" },
            { type: "추가", content: "나의 일정 조회 페이지 추가" },
        ],
    },
];
