import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

const PROTECTED_PATHS = ['/home', '/my-nemo', '/my-profile', '/chatbot'];

const PUBLIC_PATHS = ['/login', '/groups', '/notifications', '/'];

// 로그인이 필요한 경로인지 확인
function isProtectedPath(pathname: string): boolean {
    return PROTECTED_PATHS.some(path => pathname.startsWith(path));
}

// 공개 경로인지 확인
function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some(path => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    });
}

// 토큰 갱신 시도 - 백엔드에서 HttpOnly 쿠키로 새 토큰 발급
async function refreshAccessToken(request: NextRequest): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        console.log("미들웨어에서 토큰 갱신 처리됨")

        return response.ok;
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    const response = NextResponse.next();
    const accessToken = request.cookies.get('access-token')?.value;
    const refreshToken = request.cookies.get('refresh-token')?.value;

    // 공개 경로는 토큰 없이도 접근 허용
    if (isPublicPath(pathname)) {
        return response;
    }

    // 보호된 경로 접근 시 인증 체크
    if (isProtectedPath(pathname)) {
        if (!accessToken) {
            // 리프레시 토큰이 있다면 갱신 시도
            if (refreshToken) {
                const refreshSuccess = await refreshAccessToken(request);
                if (refreshSuccess) {
                    return response;
                }
            }

            // 액세스 토큰도 없고 갱신도 실패한 경우 로그인 페이지로
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            const redirectResponse = NextResponse.redirect(loginUrl);

            redirectResponse.cookies.delete('access-token');
            redirectResponse.cookies.delete('refresh-token');

            return redirectResponse;
        }

        // 액세스 토큰이 있는 경우는 일단 통과
        // 실제 유효성은 API 호출 시 백엔드에서 검증하고, 401 에러 나면 클라이언트에서 갱신 처리
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * 다음을 제외한 모든 요청 경로에서 실행:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

