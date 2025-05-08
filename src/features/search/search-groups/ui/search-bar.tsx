"use client";

import Image from "next/image";
import { cn } from "lib/utils";
import { magnifying_glass_icon } from "@/shared/assets/images";
import { SearchBarProps } from "../model/types";
import { useSearch } from "../lib/use-search";

export const SearchBar = ({ className }: SearchBarProps) => {
  const { searchText, handleSubmit, handleChange } = useSearch();

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-common-100 rounded-ctn-sm flex w-full items-center gap-2 overflow-hidden border border-gray-200 px-4 py-2",
        className,
      )}
    >
      <button type="submit" className="flex-shrink-0">
        <Image
          src={magnifying_glass_icon}
          alt="검색"
          width={20}
          height={20}
          className="object-contain opacity-60"
        />
      </button>
      <input
        type="text"
        value={searchText as string}
        onChange={handleChange}
        placeholder="어떤 모임을 찾으시나요?"
        className="text-label-1 w-full flex-1 bg-transparent outline-none placeholder:text-gray-400"
      />
    </form>
  );
};
