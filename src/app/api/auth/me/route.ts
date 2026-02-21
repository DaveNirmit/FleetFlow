import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fleetflow-super-secret-jwt-key-change-in-production-2024'
);

export async function GET(req: NextRequest) {
    const token = req.cookies.get('fleetflow_token')?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return NextResponse.json({
            authenticated: true,
            user: {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                role: payload.role,
            },
            tokenInfo: {
                issuedAt: new Date((payload.iat as number) * 1000).toISOString(),
                expiresAt: new Date((payload.exp as number) * 1000).toISOString(),
            },
        });
    } catch {
        return NextResponse.json({ authenticated: false, user: null, error: 'Token expired or invalid' }, { status: 401 });
    }
}
