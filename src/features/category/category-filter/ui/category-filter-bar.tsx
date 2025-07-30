"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "lib/utils";
import { useHorizontalDragScroll } from "../lib/useHorizontalDragScroll";
import { CATEGORIES } from "../model/constants";

export const CategoryFilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 드래그 스크롤 훅 사용
  const { containerRef, onMouseDown, isDragging } = useHorizontalDragScroll();

  // 현재 선택된 카테고리 (기본값은 '전체')
  const currentCategory = searchParams.get("category") || "전체";

  const handleCategoryChange = (categoryLabel: string) => {
    if (isDragging.current) return;

    const params = new URLSearchParams(searchParams.toString());

    if (categoryLabel === "전체") {
      params.delete("category");
    } else {
      params.set("category", categoryLabel);
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  // 현재 선택된 카테고리로 스크롤 이동 (컴포넌트 마운트 시)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(
        `[data-category="${currentCategory}"]`
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
      ref={containerRef}
      className={cn("no-scrollbar flex overflow-x-scroll", "cursor-grab")}
      style={{
        scrollBehavior: isDragging.current ? "auto" : "smooth",
        userSelect: isDragging.current ? "none" : "auto",
      }}
      onMouseDown={onMouseDown}
    >
      <div className="mt-2 flex gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={`category-${category.id}`}
            data-category={category.label}
            onClick={() => handleCategoryChange(category.label)}
            className={cn(
              "flex flex-col items-center justify-center",
              "opacity-90 transition-transform",
              "pointer-events-auto" // 버튼 클릭 보장
            )}
            style={{
              pointerEvents: isDragging.current ? "none" : "auto",
            }}
          >
            <div
              className={cn(
                "relative flex h-12 w-12 items-center justify-center overflow-hidden"
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
                  : "text-caption-2 text-label-normal"
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
