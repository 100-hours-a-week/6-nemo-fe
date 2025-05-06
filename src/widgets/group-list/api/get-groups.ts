import { SearchParams, SearchResponse } from "@/entities/group/model/types";

export const getGroups = async (params: SearchParams): Promise<SearchResponse> => {
    const queryParams = new URLSearchParams();

    if (params.keyword) queryParams.set('keyword', params.keyword);
    if (params.category) queryParams.set('category', params.category);
    if (params.page !== undefined) queryParams.set('page', params.page.toString());
    if (params.size !== undefined) queryParams.set('size', params.size.toString());

    const url = `${process.env.NEXT_PUBLIC_API_URL}/groups/search?${queryParams.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('그룹 검색 API 호출 중 오류 발생:', error);
        throw error;
    }
};