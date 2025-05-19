import Image from "next/image";
import { GroupDetailHeaderProps } from "../model/types";
import {
  bg_group2,
  crown_yello,
  location_icon,
  users_icon,
} from "@/shared/assets/images";

export const GroupInfo = ({ group }: GroupDetailHeaderProps) => {
  return (
    <div className="relative">
      {/* 이미지 배경 */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={group.imageUrl ?? bg_group2}
          alt={group.name}
          fill
          className="object-cover"
          sizes="100%"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* 모임 정보 */}
      <div className="bg-common-100 relative -mt-4 rounded-t-2xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1
              className="text-title-3 text-label-strong-1 mb-1 font-bold"
              title={group.name}
            >
              {group.name}
            </h1>
            <p
              className="text-body-2 text-label-normal line-clamp-1"
              title={group.summary}
            >
              {group.summary}
            </p>
            <div className="mt-3 flex gap-1">
              {group.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-caption-2 bg-coolNeutral-98 text-label-assistive rounded-full px-2 py-0.5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-primary-light text-primary text-body-2 rounded-full px-3 py-1 whitespace-nowrap">
            {group.category}
          </div>
        </div>

        {/* 모임 정보 요약 */}

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Image
              src={crown_yello}
              alt="모임장"
              width={20}
              height={20}
              className="text-gray-500"
            />
            <span className="text-label-1 text-label-normal">모임장</span>
            <span className="text-body-2 text-label-assistive ml-1 font-medium">
              {group.ownerName || "등록된 모임장 없음"}
            </span>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <Image
              src={users_icon}
              alt="인원"
              width={20}
              height={20}
              className="text-gray-500"
            />
            <span className="text-label-1 text-label-normal">인원</span>
            <span className="text-body-2 text-label-assistive ml-1 font-medium">
              {group.currentUserCount}/{group.maxUserCount}명
            </span>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <Image
              src={location_icon}
              alt="위치"
              width={20}
              height={20}
              className="text-gray-500"
            />
            <span className="text-label-1 text-label-normal">위치</span>

            <span className="text-body-2 text-label-assistive ml-1 line-clamp-1 font-medium">
              {group.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
