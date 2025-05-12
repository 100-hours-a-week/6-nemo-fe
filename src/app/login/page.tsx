import LoginButton from "@/features/auth/ui/login-button";
import { bg_post } from "@/shared/assets/images";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="p-ctn-lg flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-title-1 text-label-strong-2 text-right font-extralight">
        네가 찾는 모임,
        <br />
        <span className="text-display-1 text-primary-strong font-bold">
          네모!
        </span>
      </h1>
      {/* <Image src={nemo_logo} alt="Logo" width={192} height={192} /> */}
      <Image
        src={bg_post}
        alt="배경 이미지"
        width={318}
        height={318}
        className="mt-10 ml-15"
      />
      <LoginButton platform="kakao" />
    </div>
  );
}
