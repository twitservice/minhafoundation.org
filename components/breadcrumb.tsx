import { i18n, type Locale } from "@/lib/i18n-config";
import type { CommonDictionary } from "@/lib/get-dictionary";


interface BreadcrumbProps {
    lang: Locale;
    dictionary: CommonDictionary;
}


export default async function Breadcrumb({ lang, dictionary }: BreadcrumbProps) {


    return (
        <>
            <div
                className="relative min-h-[480px] md:min-h-[620px] lg:min-h-[720px] bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url('${dictionary.images.breadcrumb}')` }}
            >
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.2) 100%)",
                    }}
                />

                {/* Centered content */}
                <div className="relative z-20 mx-auto md:w-8/12 px-4 sm:px-6 lg:px-8 text-left md:text-left pb-28 md:pb-36">
                    <div className="mt-30 md:mt-unset">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {/* {dictionary.title} */}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}

