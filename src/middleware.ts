import { BASE_URL } from '@/shared/constants';
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/home', '/my-nemo', '/my-profile', '/chatbot', '/groups'];

const PUBLIC_PATHS = ['/login', '/login/success', '/notifications', '/'];

function isProtectedPath(pathname: string): boolean {
    return PROTECTED_PATHS.some(path => pathname.startsWith(path));
}

function isPublicPath(pathname: string): boolean {
    return PUBLIC_PATHS.some(path => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    });
}

async function refreshAccessToken(request: NextRequest): Promise<boolean> {
    try {
        console.log('토큰 갱신 시도 중...');

        const response = await fetch(`${BASE_URL}/api/v1/auth/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('cookie') || '', // 🔧 수정
            },
        });

        console.log('갱신 응답 상태:', response.status);
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
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    // 공개 경로는 토큰 없이도 접근 허용
    if (isPublicPath(pathname)) {
        return response;
    }

    // 보호된 경로 접근 시 인증 체크
    if (isProtectedPath(pathname)) {
        // 인증 토큰이 없을 시
        if (!accessToken) {
            // 리프레시 토큰이 있을 시 갱신 시도
            if (refreshToken) {
                const refreshSuccess = await refreshAccessToken(request);
                if (refreshSuccess) {
                    return response;
                }
            }

            // 리프레시 토큰이 없을 시
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            const redirectResponse = NextResponse.redirect(loginUrl);

            redirectResponse.cookies.delete('access_token');
            redirectResponse.cookies.delete('refresh_token');

            return redirectResponse;
        }

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

