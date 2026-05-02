import { redirect } from "next/navigation";

export default async function ConnectPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/connect/donor`);
}
