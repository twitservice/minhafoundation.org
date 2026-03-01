import Image from "next/image";

export default function Banner() {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      {/* এটিই এখন আপনার ব্যাকগ্রাউন্ড ইমেজ */}
      <Image
        src={`${cdnUrl}/assets/img/minhafoundation-slider-01.webp`}
        alt="Background"
        fill
        priority
        className="object-cover -z-10" // -z-10 দিলে ইমেজটি সবার নিচে থাকবে
      />

      {/* ইমেজের ওপরের কন্টেন্ট */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Minha Foundation</h1>
      </div>
    </section>
  );
}