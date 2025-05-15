"use client";

import { cn } from "lib/utils";
import { useRouter } from "next/navigation";

const BackButton = ({
  href,
  fill = false,
  className,
}: {
  href?: string;
  fill?: boolean;
  className?: string;
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "z-10 flex h-9 w-9 items-center justify-center rounded-full",
        fill ? "bg-common-100 shadow-md" : "",
        className,
      )}
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BackButton;
