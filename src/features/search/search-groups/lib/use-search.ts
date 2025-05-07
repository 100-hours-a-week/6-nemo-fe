'use client'

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchText, setSearchText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 기존 검색 파라미터를 유지
        const params = new URLSearchParams(searchParams.toString());

        if (searchText) {
            params.set("keyword", searchText);
        } else {
            params.delete("keyword");
        }

        // 페이지 파라미터 초기화 (새 검색 시)
        params.delete("page");

        const queryString = params.toString();
        const url = `/groups/search${queryString ? `?${queryString}` : ''}`;

        router.push(url);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return {
        searchText,
        handleSubmit,
        handleChange,
    };
};