import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administração · Acesso | PDW",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <AdminLoginForm lang={lang} />
    </div>
  );
}
