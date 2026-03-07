import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/img/logo.png";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/get-dictionary";

interface HeaderProps {
    lang: Locale;
    dictionary: Dictionary;
}

export default function Header({ lang, dictionary }: HeaderProps) {
    return (
        <header className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10/12 bg-background flex items-center justify-between p-4">
            <div className="flex w-full">
                <div>
                    <Link href={`/${lang}`} prefetch={false}>
                        <Image src={Logo} alt="Logo" width={50} height={50} />
                    </Link>
                </div>
                <div>
                    <Link href={`/${lang}/about`} prefetch={false}>{dictionary.header.about}</Link>
                </div>
                <div>
                    {/* prefetch={false} prevents loading other language bundle until clicked */}
                    <Link href={`/${lang === 'en' ? 'bn' : 'en'}`} prefetch={false}>
                        {lang === 'en' ? 'বাংলা' : 'English'}
                    </Link>
                </div>
            </div>
        </header>
    );
}
