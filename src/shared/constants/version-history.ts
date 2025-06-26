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
    {
        version: "2.2.0",
        date: "2025.06.25",
        changes: [
            { type: "추가", content: "챗봇 페이지 및 모임 추천 기능 추가" },
        ],
    },
    {
        version: "2.2.1",
        date: "2025.06.25",
        changes: [
            { type: "수정", content: "모임 대표사진 수정 권한 확대 (모임장,모임원)" },
            { type: "수정", content: "챗봇의 질문 생성 중 새로하기 버튼 클릭 비활성화" },
            { type: "추가", content: "나의 일정 리스트에서 불참 응답 일정도 포함" },
            { type: "수정", content: "프로필 이미지 하단 잘림 이슈 해결" },
        ],
    },
];
