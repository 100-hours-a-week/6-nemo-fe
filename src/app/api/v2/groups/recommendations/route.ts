import { NextRequest, NextResponse } from 'next/server';

const MOCK_GROUPS = [
    {
        groupId: 101,
        name: "강남 러닝 크루",
        category: "스포츠",
        summary: "평일 저녁 강남에서 함께 러닝하는 모임입니다.",
        description: "건강한 러닝 습관을 만들고 싶은 분들을 위한 모임입니다. 초보자부터 경험자까지 모두 환영합니다. 매주 화, 목요일 저녁 7시에 강남역에서 시작해서 한강까지 달립니다.",
        location: "강남역",
        currentUserCount: 12,
        maxUserCount: 20,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop",
        tags: ["러닝", "운동", "건강", "초보환영"]
    },
    {
        groupId: 102,
        name: "개발자 스터디 모임",
        category: "IT/개발",
        summary: "함께 성장하는 개발자들의 학습 공간입니다.",
        description: "프론트엔드, 백엔드 상관없이 개발에 관심있는 모든 분들을 환영합니다. 매주 토요일 오후에 만나서 코딩 테스트 문제를 풀고, 프로젝트를 함께 진행합니다.",
        location: "판교",
        currentUserCount: 8,
        maxUserCount: 15,
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop",
        tags: ["개발", "프로그래밍", "스터디", "프로젝트"]
    },
    {
        groupId: 103,
        name: "독서 토론 클럽",
        category: "독서/토론",
        summary: "책을 읽고 함께 이야기 나누는 모임입니다.",
        description: "매월 선정된 도서를 읽고 깊이 있는 토론을 나누는 모임입니다. 다양한 장르의 책을 통해 새로운 관점을 얻고 사고의 폭을 넓혀보세요.",
        location: "홍대",
        currentUserCount: 6,
        maxUserCount: 12,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
        tags: ["독서", "토론", "책", "인문학"]
    },
    {
        groupId: 104,
        name: "요리 배우기 모임",
        category: "취미/여가",
        summary: "함께 요리를 배우고 맛있는 음식을 나누는 모임입니다.",
        description: "요리 초보자부터 경험자까지 모두 환영합니다. 매주 다른 요리를 배우고 함께 만들어 먹으며 즐거운 시간을 보냅니다.",
        location: "신촌",
        currentUserCount: 10,
        maxUserCount: 16,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
        tags: ["요리", "음식", "취미", "배우기"]
    },
    {
        groupId: 105,
        name: "사진 촬영 동호회",
        category: "문화/예술",
        summary: "사진 촬영을 좋아하는 사람들의 모임입니다.",
        description: "DSLR, 미러리스, 스마트폰 상관없이 사진 촬영에 관심있는 모든 분들을 환영합니다. 주말마다 서울 곳곳을 다니며 사진을 찍고 서로의 작품을 공유합니다.",
        location: "서울 전역",
        currentUserCount: 15,
        maxUserCount: 25,
        imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop",
        tags: ["사진", "촬영", "예술", "출사"]
    }
];

const RECOMMENDATION_REASONS = [
    "선택하신 활동 유형과 시간대가 완벽하게 일치합니다.",
    "비슷한 관심사를 가진 멤버들이 많이 활동하고 있습니다.",
    "초보자도 부담없이 참여할 수 있는 분위기입니다.",
    "선호하시는 지역과 모임 규모에 잘 맞습니다.",
    "활발한 활동으로 만족도가 높은 모임입니다."
];

// 세션별 답변을 기반으로 추천 모임 선택
function selectRecommendedGroup(answers: string[]): { group: any; reason: string } {
    let selectedGroup;
    let reason;

    if (answers.some(answer => answer.includes('운동') || answer.includes('피트니스'))) {
        selectedGroup = MOCK_GROUPS[0]; // 러닝 크루
        reason = "운동에 대한 관심을 표현하셨기 때문에 건강한 러닝 활동을 추천드립니다.";
    } else if (answers.some(answer => answer.includes('학습') || answer.includes('스터디'))) {
        selectedGroup = MOCK_GROUPS[1]; // 개발자 스터디
        reason = "학습에 대한 열정을 보이셨기 때문에 함께 성장할 수 있는 개발 스터디를 추천드립니다.";
    } else if (answers.some(answer => answer.includes('취미') || answer.includes('여가'))) {
        selectedGroup = MOCK_GROUPS[3]; // 요리 모임
        reason = "취미 활동에 관심을 보이셨기 때문에 실용적이면서 즐거운 요리 모임을 추천드립니다.";
    } else if (answers.some(answer => answer.includes('소규모'))) {
        selectedGroup = MOCK_GROUPS[2]; // 독서 토론
        reason = "소규모 모임을 선호하신다고 하셔서 깊이 있는 대화가 가능한 독서 토론 클럽을 추천드립니다.";
    } else {
        // 기본 추천
        selectedGroup = MOCK_GROUPS[4]; // 사진 촬영
        reason = "다양한 경험을 쌓을 수 있는 사진 촬영 동호회를 추천드립니다.";
    }

    return { group: selectedGroup, reason };
}

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('chatbot_session_id')?.value ||
            request.headers.get('sessionId') ||
            'default_session';

        const { group, reason } = selectRecommendedGroup([
            "운동과 피트니스", 
            "주말 오후",
            "소규모 (5명 이하)"
        ]);

        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

        return NextResponse.json(
            {
                code: 200,
                message: "모임 추천이 성공적으로 완료되었습니다.",
                data: {
                    group: group,
                    reason: reason
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('추천 요청 오류:', error);
        return NextResponse.json(
            {
                code: 500,
                message: "추천 요청에 실패했습니다.",
                data: null
            },
            { status: 500 }
        );
    }
}
