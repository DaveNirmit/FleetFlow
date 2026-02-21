import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fleetflow-super-secret-jwt-key-change-in-production-2024'
);

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/vehicles', '/dispatch', '/maintenance', '/drivers', '/expenses', '/reports'];

// Routes that are only for unauthenticated users (redirect to dashboard if logged in)
const AUTH_ROUTES = ['/'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('fleetflow_token')?.value;

    const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    // Verify JWT token
    let isValidToken = false;
    if (token) {
        try {
            await jwtVerify(token, JWT_SECRET);
            isValidToken = true;
        } catch {
            isValidToken = false;
        }
    }

    // If trying to access protected route without valid token → redirect to home (login)
    if (isProtected && !isValidToken) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // If already logged in and visiting home → redirect to dashboard
    if (isAuthRoute && isValidToken) {
        const url = req.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
