module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 커밋 메시지 최대 길이
    "header-max-length": [2, "always", 100],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-case": [0], // 대소문자 규칙 비활성화
    "subject-case": [0], // 제목 대소문자 자유

    // 허용되는 커밋 타입들
    "type-enum": [
      2,
      "always",
      [
        "Feat", // 새로운 기능
        "Fix", // 버그 수정
        "Docs", // 문서 수정
        "Design", // UI 수정
        "Refactor", // 리팩토링
        "Remove", // 삭제
        "Test", // 테스트 추가/수정
        "Chore", // 기타 작업
        "Setting", // CI 등 설정 작업
        "Perf", // 성능 개선
      ],
    ],
  },
};
