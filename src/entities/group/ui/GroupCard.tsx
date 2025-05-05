import Image from "next/image";
import Link from "next/link";
import { cn } from "lib/utils";
import { bg_group2, users_icon } from "@/shared/assets/images/index";
import { GroupCardProps } from "../model/types";

export const GroupCard = ({ group, className }: GroupCardProps) => {
  return (
    <Link href={`/groups/${group.id}`} className={cn("block", className)}>
      <div className="rounded-ctn-md overflow-hidden shadow-md">
        <div className="relative h-40 w-full">
          {group.imageUrl && (
            <Image
              src={bg_group2}
              alt={group.name}
              fill
              sizes="100%"
              className="object-cover"
            />
          )}
          <div className="bg-primary-strong text-common-100 text-caption-1 absolute top-2 right-2 rounded-full px-2 py-1 opacity-75">
            {group.category}
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-2 line-clamp-1 flex-1 font-semibold">
              {group.name}
            </h3>
            <span className="text-label-2 text-label-normal">
              · {group.location}
            </span>
          </div>
          <p className="text-label-1 text-label-assistive mt-1 line-clamp-2">
            {group.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-caption-1 text-label-assitive flex items-center gap-1">
              <Image src={users_icon} alt={group.name} width={16} height={16} />
              {group.maxUserCount
                ? `${group.currentUserCount}/${group.maxUserCount}명`
                : `${group.currentUserCount}명`}
            </div>
            {group.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {group.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-caption-2 bg-strong text-label-normal rounded-full px-2 py-0.5"
                  >
                    #{tag}
                  </span>
                ))}
                {group.tags.length > 2 && (
                  <span className="text-caption-2 text-lebel-assistive">
                    +{group.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
