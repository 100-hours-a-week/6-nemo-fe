"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useSearch = () => {
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchText) {
            router.push(`/groups/search?keyword=${searchText}`);
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
