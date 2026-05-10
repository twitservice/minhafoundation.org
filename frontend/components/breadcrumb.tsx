interface BreadcrumbProps {
    breadcrumbImg: string;
    breadcrumbTitle?: string;
}


export default async function Breadcrumb({breadcrumbImg, breadcrumbTitle }: BreadcrumbProps) {


    return (
        <>
            <div
                className="relative bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('${breadcrumbImg}')` }}
            >
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(48,84,53,0.85) 100%, rgba(48,84,53,0.45) 100%, rgba(48,84,53,0.2) 100%)",
                    }}
                />

                {/* Centered content */}
                <div className="relative z-20 w-full text-center py-28 md:py-36">
                    {breadcrumbTitle && (
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {breadcrumbTitle}
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
}

