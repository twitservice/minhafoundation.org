import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/img/logo.png";


export default function Header() {
    return (
        <header className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10/12 bg-background flex items-center justify-between p-4">
            <div className="flex w-full">
                <div>
                    <Link href="/">
                        <Image src={Logo} alt="Logo" width={50} height={50} />
                    </Link>
                </div>
                <div>2</div>
                <div>3</div>
            </div>
        </header>
    );
}
