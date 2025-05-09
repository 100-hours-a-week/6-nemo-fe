import Image from "next/image";
import { no_access } from "../assets/images";

export const NoAccess = () => {
  return (
    <div className="text-display-2 flex h-[100vh] w-full items-center justify-center gap-4">
      <Image
        src={no_access}
        alt="공사 중"
        width={64}
        height={64}
        className="text-cetner"
      />
      공 사 중
    </div>
  );
};
