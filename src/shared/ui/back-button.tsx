import { cn } from "lib/utils";
import Link from "next/link";

const BackButton = ({ href, fill }: { href: string; fill: boolean }) => {
  return (
    <Link
      href={href}
      className={cn(
        "absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md",
        fill ? "bg-common-100" : "",
      )}
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
    </Link>
  );
};

export default BackButton;
