import Image from "next/image";


export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-red-500">Site Under Constuction</h1>
        <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/img/minhafoundation-slider-01.png`} alt="Banner" width={200} height={100} />
        <nav>
            {/* <a href="/" className="mr-4">Home</a> */}
            <a href="/about">About</a>
        </nav>
    </header>
    );
}
