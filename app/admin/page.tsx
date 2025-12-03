import { Metadata } from "next"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Radio Activa - Panel de Administración",
  description: "Panel de administración de Radio Activa para gestionar noticias, usuarios y más.",
}

export default async function AdminPage() {

  redirect("/admin/profile/settings");
}
