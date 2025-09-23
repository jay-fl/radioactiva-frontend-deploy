import "server-only";
import { verifySession } from "./dal";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const { user } = await verifySession();
  
  if (user.role !== 'admin') {
    redirect('/admin/access-denied');
  }
  
  return user;
}

export async function requireAuth() {
  const { user } = await verifySession();
  return user;
}

export async function checkAdminAccess(): Promise<boolean> {
  try {
    const { user } = await verifySession();
    return user.role === 'admin';
  } catch {
    return false;
  }
}