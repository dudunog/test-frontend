import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl

  if (pathname == '/') {
    return NextResponse.redirect('/clients')
  }

  return NextResponse.next()
}
