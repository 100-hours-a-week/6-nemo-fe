import Image from "next/image";
import { no_access } from "../assets/images";

const NoAccess = () => {
  return (
    <div className="h-full w-full">
      <Image
        src={no_access}
        alt="접근금지"
        width={64}
        height={64}
        className="text-cetner"
      />
    </div>
  );
};
export default NoAccess;
