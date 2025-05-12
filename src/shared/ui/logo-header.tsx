import Image from "next/image";
import Link from "next/link";
import { bell_bk_icon, nemo_logo } from "../assets/images";

export default function LogoHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <header className="space-y-4 px-2">
      <div className="flex justify-between px-4 pt-6">
        <Image
          src={nemo_logo}
          alt="logo"
          width={64}
          height={64}
          className="object-contain"
        />
        <Link href={`/notifications`}>
          <Image
            src={bell_bk_icon}
            alt="검색"
            width={18}
            height={18}
            className="object-contain opacity-70"
          />
        </Link>
      </div>
      {children}
    </header>
  );
}
