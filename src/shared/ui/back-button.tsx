"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "lib/utils";
import { left } from "../assets/images";

type Props = {
  className?: string;
  navigateTo?: () => void;
  pagename?: string;
  fill?: boolean;
};

export const BackButton = ({
  className,
  navigateTo,
  pagename,
  fill = false,
}: Props) => {
  const router = useRouter();
  if (pagename) {
    navigateTo = () => router.push(pagename);
  }

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
