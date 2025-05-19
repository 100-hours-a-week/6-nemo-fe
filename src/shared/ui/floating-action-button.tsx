// src/shared/ui/floating-action-button.tsx
import Link from "next/link";
import { cn } from "lib/utils";

type FloatingActionButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const FloatingActionButton = ({
  href,
  children,
  className,
}: FloatingActionButtonProps) => {
  return (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-[430px]">
      <Link
        href={href}
        className={cn(
          "bg-primary hover:bg-primary-strong text-common-100 pointer-events-auto absolute right-4 bottom-24 z-10 flex h-14 w-14 items-center justify-center rounded-full leading-none shadow-lg transition-colors",
          className,
        )}
      >
        {children}
      </Link>
    </div>
  );
};
