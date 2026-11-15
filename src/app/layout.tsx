import "./globals.css";
import {headers} from "next/headers";
import type {Metadata} from "next";
import { SiteBackground } from '@/components/background/SiteBackground';
export const metadata: Metadata = {title:{default:"SapiHive | Workforce-as-a-Service",template:"%s | SapiHive"},description:"Human Intelligence, organized like a Hive."};
export default async function RootLayout({children}:{children:React.ReactNode}){
const h=await headers(); const locale=h.get("x-sapihive-locale")==="ar"?"ar":"en";
return (
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<body>
{' '}
<SiteBackground />      
<div className="relative z-10 min-h-screen">{children}</div>
</body>
</html>
);
}
