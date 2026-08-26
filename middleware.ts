import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Определяем твой основной домен (впиши сюда свой!)
  const rootDomain = 'tvoj-domen.com';

  if (hostname.includes(rootDomain) && hostname !== rootDomain && hostname !== `www.${rootDomain}`) {
    const subdomain = hostname.replace(`.${rootDomain}`, '');
    
    // Перенаправляем на внутреннюю страницу перехода, передавая поддомен в параметрах
    url.pathname = `/redirect`;
    url.searchParams.set('sub', subdomain);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
