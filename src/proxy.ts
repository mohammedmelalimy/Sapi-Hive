import {NextRequest,NextResponse} from "next/server";
import {defaultLocale,isLocale} from "@/i18n/config";
export function proxy(request:NextRequest){
 const path=request.nextUrl.pathname;
 if(path==="/"){return NextResponse.redirect(new URL(`/${defaultLocale}`,request.url));}
 const segment=path.split("/")[1];
 if(!isLocale(segment)) return NextResponse.redirect(new URL(`/${defaultLocale}${path}`,request.url));
 const headers=new Headers(request.headers);headers.set("x-sapihive-locale",segment);
 return NextResponse.next({request:{headers}});
}
export const config={matcher:["/((?!api|_next|.*\..*).*)"]};
