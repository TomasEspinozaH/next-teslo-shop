import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { origin } = req.nextUrl;
  
  if ( !session ) {
    const requestedPage = req.page.name;
    return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
  }

  const validRole = ['admin', 'super-user', 'SEO'];

  if ( !validRole.includes( session.user.role ) ) {
    return NextResponse.redirect(`${origin}`);
  }

  return NextResponse.next();
}