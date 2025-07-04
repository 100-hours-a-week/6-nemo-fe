import Image from "next/image";
import Link from "next/link";
import { nemo_logo } from "../assets/images";

export default function LogoHeader() {
  return (
    <header className="flex justify-between px-6 pt-6 pb-4">
      <Link href="/">
        <Image
          src={nemo_logo}
          alt="logo"
          width={64}
          height={64}
          className="object-contain"
        />
      </Link>
    </header>
  );
}
