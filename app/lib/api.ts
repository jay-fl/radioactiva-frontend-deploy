// app/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL; // http://localhost:3000

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");
  return await res.json(); // { token, email }
}

export async function getUserProfile(token: string) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json(); // { email, role }
}