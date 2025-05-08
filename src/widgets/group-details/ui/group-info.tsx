import Image from "next/image";
import Link from "next/link";
import { GroupDetailHeaderProps } from "../model/types";
import {
  bg_group2,
  crown_yello,
  location_icon,
  users,
  users_bk_icon,
  users_icon,
} from "@/shared/assets/images";

export const GroupInfo = ({ group }: GroupDetailHeaderProps) => {
  return (
    <div className="relative">
      {/* 뒤로가기 버튼 */}
      <Link
        href="/groups"
        className="bg-common-100 absolute top-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md"
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
            <h1 className="text-title-3 text-label-strong-1 mb-1 font-bold">
              {group.name}
            </h1>
            <p className="text-body-2 text-label-normal">{group.location}</p>
            <div className="mt-3 flex gap-1">
              {group.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-caption-2 bg-strong text-label-normal rounded-full px-2 py-0.5"
                >
                  # {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-primary-light text-primary text-body-2 rounded-full px-3 py-1">
            {group.category}
          </div>
        </div>

        {/* 모임 정보 요약 */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-primary-light flex flex-col items-center gap-2 rounded-lg p-3">
            <span className="text-label-2 text-label-normal block">인원</span>
            {/* <Image src={users} alt={group.name} width={32} height={32} /> */}
            <span className="text-headline-2 text-label-assistive block font-medium">
              {group.currentUserCount}/{group.maxUserCount}명
            </span>
          </div>
          <div className="bg-primary-light flex flex-col items-center gap-2 rounded-lg p-3 text-center">
            <span className="text-label-2 text-label-normal block">지역</span>
            {/* <Image
              src={location_icon}
              alt={group.name}
              width={32}
              height={32}
            /> */}
            <span className="text-body-2 text-label-assistive block font-medium">
              {group.location}
            </span>
          </div>
          <div className="bg-primary-light flex flex-col items-center gap-2 rounded-lg p-3 text-center">
            <span className="text-label-2 text-label-normal block">모임장</span>
            {/* <Image src={crown_yello} alt={group.name} width={32} height={32} /> */}
            <span className="text-headline-1 text-label-assistive block font-medium">
              Ray
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
