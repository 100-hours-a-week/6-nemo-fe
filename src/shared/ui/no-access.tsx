import Image from "next/image";
import { sorry } from "../assets/images";

export const NoAccess = ({ contents }: { contents?: string }) => {
  return (
    <div className="flex min-h-[80vh] w-full flex-col justify-center gap-4">
      <div className="bg-primary-light mx-auto mb-6 flex items-center justify-center rounded-full">
        <Image src={sorry} alt="공사 중" width={160} height={160} />
      </div>
      <h1 className="text-title-3 mb-2 text-center font-bold text-gray-800">
        준비 중인 페이지
      </h1>
      <p className="text-body-1 mb-8 text-center text-gray-600">
        불편을 드려 죄송합니다.
        <br /> 해당 페이지는 현재 준비 중입니다. <br />더 나은 서비스로 곧
        찾아뵙겠습니다. 감사합니다.
      </p>
      <p className="text-body-2 text-center text-gray-500">{contents}</p>
    </div>
  );
};
