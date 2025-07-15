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
      {
        type: "수정",
        content: "일정 상세 페이지 진입 시 간헐적 버그 발생 수정",
      },
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
    changes: [{ type: "추가", content: "챗봇 페이지 및 모임 추천 기능 추가" }],
  },
  {
    version: "2.2.1",
    date: "2025.06.25",
    changes: [
      { type: "수정", content: "모임 대표사진 수정 권한 확대 (모임장,모임원)" },
      {
        type: "수정",
        content: "챗봇의 질문 생성 중 새로하기 버튼 클릭 비활성화",
      },
      { type: "추가", content: "나의 일정 리스트에서 불참 응답 일정도 포함" },
      { type: "수정", content: "프로필 이미지 하단 잘림 이슈 해결" },
    ],
  },
  {
    version: "2.3.3",
    date: "2025.07.07",
    changes: [
      { type: "추가", content: "모임정보 생성 실패 시 재시도 버튼 추가" },
      {
        type: "수정",
        content: "모임 생성 성공 페이지 이후 뒤로 가기 버튼 개선",
      },
    ],
  },
  {
    version: "2.4.0",
    date: "2025.07.15",
    changes: [
      {
        type: "추가",
        content: "챗봇 질문/추천 메세지 실시간 스트리밍 방식으로 전환",
      },
    ],
  },
  {
    version: "2.4.1",
    date: "2025.07.15",
    changes: [
      { type: "추가", content: "나의 거절한 일정 리스트 추가" },
      { type: "수정", content: "일정 카드 제목 줄바꿈 방지" },
      {
        type: "수정",
        content: "URL 공유 시 뒤로가기 버튼이 동작하지 않는 문제",
      },
      {
        type: "추가",
        content: "일정 생성 시 나의 일정 리스트에도 목록 자동 최신화",
      },
      { type: "수정", content: "'home' 탭 제거" },
    ],
  },
];
