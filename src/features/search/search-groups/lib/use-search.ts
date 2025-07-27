// src/features/search/search-groups/lib/use-search.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL의 keyword 파라미터로 초기값 설정
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchText(keyword);
    }
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    // 실시간 검색: 입력 즉시 URL 변경
    if (newSearchText.trim()) {
      router.push(
        `/groups/search?keyword=${encodeURIComponent(newSearchText.trim())}`
      );
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // submit은 이제 실제로는 사용하지 않지만 기존 인터페이스 유지
    if (searchText.trim()) {
      router.push(
        `/groups/search?keyword=${encodeURIComponent(searchText.trim())}`
      );
    } else {
      router.push("/groups");
    }
  };

  return {
    searchText,
    handleChange,
    handleSubmit,
  };
};
