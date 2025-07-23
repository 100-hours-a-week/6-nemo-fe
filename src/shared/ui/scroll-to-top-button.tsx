"use client";
import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-[430px]">
      <button
        onClick={handleClick}
        className="bg-common-100 text-label-assistive border-line-solid-normal pointer-events-auto absolute right-4 bottom-40 z-30 flex h-13 w-13 items-center justify-center rounded-full border shadow-lg transition-opacity hover:bg-gray-200"
        aria-label="최상단으로 이동"
      >
        ↑
      </button>
    </div>
  ) : null;
};
