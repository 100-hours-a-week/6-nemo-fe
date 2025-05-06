"use client";

import Link from "next/link";
import Image from "next/image";
import { BottomNavigationItemProps } from "../model/types";
import { usePathname } from "next/navigation";

export const BottomNavigationItem = ({
  href,
  activeIcon,
  inactiveIcon,
  label,
}: BottomNavigationItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={"flex flex-1 flex-col items-center justify-center pt-2 pb-1"}
    >
      <div className="relative h-6 w-6">
        <Image
          src={isActive ? activeIcon : inactiveIcon}
          alt={label}
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
    </Link>
  );
};
