// import Image from "next/image";


export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-red-500">Site Under Constuction</h1>
        
        <nav>
            {/* <a href="/" className="mr-4">Home</a> */}
            <a href="/about">About</a>
        </nav>
    </header>
    );
}
