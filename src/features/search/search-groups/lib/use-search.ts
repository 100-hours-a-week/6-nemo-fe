"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/lib/use-debounce";

export const useSearch = () => {
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // 디바운스된 검색어 (500ms 지연)
  const debouncedSearchText = useDebounce(searchText, 500);

  // URL의 keyword 파라미터로 초기값 설정
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchText(keyword);
    }
  }, [searchParams]);

  // 디바운스된 검색어가 변경될 때 URL 업데이트
  useEffect(() => {
    if (debouncedSearchText.trim()) {
      router.push(
        `/groups/search?keyword=${encodeURIComponent(debouncedSearchText.trim())}`
      );
    }
  }, [debouncedSearchText, router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
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
