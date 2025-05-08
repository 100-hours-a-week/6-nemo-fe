"use client";

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { cn } from "lib/utils";
import { CATEGORIES } from "../model/constants";

export const CategoryFilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 카테고리 (기본값은 'ALL')
  const currentCategory = searchParams.get("category") || "전체";

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === "전체") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    // 카테고리가 변경되면 페이지 리셋
    params.delete("page");

    // 정렬은 유지
    if (!params.has("sort")) {
      params.set("sort", "createdAt");
    }

    // 사이즈 설정
    if (!params.has("size")) {
      params.set("size", "10");
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  // 현재 선택된 카테고리로 스크롤 이동 (컴포넌트 마운트 시)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(
        `[data-category="${currentCategory}"]`,
      );
      if (selectedElement) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const elementLeft = (selectedElement as HTMLElement).offsetLeft;
        const elementWidth = (selectedElement as HTMLElement).offsetWidth;

        // 선택된 항목이 컨테이너 중앙에 오도록 스크롤 조정
        scrollContainerRef.current.scrollLeft =
          elementLeft - containerWidth / 2 + elementWidth / 2;
      }
    }
  }, [currentCategory]);

  return (
    <div
      ref={scrollContainerRef}
      className="no-scrollbar flex overflow-x-auto"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="flex gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            data-category={category.id}
            onClick={() => handleCategoryChange(category.label)}
            className={cn(
              "flex flex-col items-center justify-center",
              "transition-transform",
              currentCategory === category.id ? "scale-110" : "opacity-80",
            )}
          >
            <div
              className={cn(
                "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full",
              )}
            >
              <Image
                src={category.icon}
                alt={category.label}
                width={currentCategory === category.label ? 24 : 22}
                height={currentCategory === category.label ? 24 : 22}
                className="object-contain"
              />
            </div>
            <span
              className={cn(
                "pb-2 text-[0.675rem] whitespace-nowrap",
                currentCategory === category.label || !currentCategory
                  ? "text-primary text-[0.775rem] font-semibold"
                  : "text-caption-2 text-label-normal",
              )}
            >
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
