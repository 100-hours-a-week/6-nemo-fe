"use client";

import { cn } from "lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { left } from "../assets/images";

export const BackButton = ({
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
        className
      )}
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <Image
        src={left}
        alt="back icon"
        width={16}
        height={16}
        className="relative -left-[1px]"
      />
    </div>
  );
};
