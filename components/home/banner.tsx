export default function Banner() {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const bgImage = `${cdnUrl}/assets/img/minhafoundation-slider-01.webp`;

  return (
    <section 
      className="h-[500px] bg-cover bg-center" 
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <h1 className="text-white">Minha Foundation</h1>
    </section>
  );
}