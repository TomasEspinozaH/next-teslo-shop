import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if ( !session ) {
    const { origin } = req.nextUrl;
    const requestedPage = req.page.name;
    return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
  }

  return NextResponse.next();
}