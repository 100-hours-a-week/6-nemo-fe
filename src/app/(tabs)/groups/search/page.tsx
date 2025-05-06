// src/app/(tabs)/groups/search/page.tsx
import { Suspense } from "react";
import { SearchBar } from "@/features/search";
import { GroupsList } from "@/widgets/group-list";
import { searchGroups } from "@/widgets/group-list/api/get-groups";
import { SearchParams } from "@/entities/group/model/types";

type SearchPageProps = {
  searchParams: {
    keyword?: string;
    category?: string;
    page?: string;
    size?: string;
  };
};

// 서버 컴포넌트에서 초기 데이터 페칭
async function GroupsResults({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params: SearchParams = {
    keyword: searchParams.keyword,
    category: searchParams.category,
    page: 0, // 첫 페이지만 서버에서 가져옴
    size: searchParams.size ? parseInt(searchParams.size) : 10,
  };

  try {
    const data = await searchGroups(params);

    return (
      <div className="mt-4">
        {searchParams.keyword && (
          <div className="text-body-2 text-label-normal mb-4">
            "{searchParams.keyword}" 검색 결과 ({data.data.totalElements}개)
          </div>
        )}
        <GroupsList initialData={data.data} params={params} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-error py-8 text-center">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="p-ctn-md flex flex-col gap-4">
      <SearchBar />
      <Suspense
        fallback={
          <div className="py-10 text-center">검색 결과를 불러오는 중...</div>
        }
      >
        <GroupsResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
