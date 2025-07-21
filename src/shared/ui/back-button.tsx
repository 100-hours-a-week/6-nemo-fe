"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "lib/utils";
import { left } from "../assets/images";

export const BackButton = ({
  className,
  navigateTo,
  fill = false,
}: {
  className?: string;
  navigateTo?: () => void;
  fill?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "z-10 flex h-9 w-9 items-center justify-center rounded-full transition hover:opacity-70",
        fill ? "bg-common-100 shadow-md" : "",
        className
      )}
      onClick={navigateTo ? navigateTo : () => router.back()}
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
