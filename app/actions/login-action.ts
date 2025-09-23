// app/actions/auth.ts
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//import { jwtDecode } from "jwt-decode";
import { ErrorResponseSchema, LoginSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
}


export async function login(prevState: ActionStateType, formData: FormData) {
  
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password")
  }
  
  const login = LoginSchema.safeParse(loginCredentials);

  if(!login.success){
    return {
      errors : login.error.errors.map(error => error.message)
    }
  }

  const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: login.data.email,
      password: login.data.password,
    }),
  });

  const json = await req.json();
  
  if(!req.ok) {
    const { message } = ErrorResponseSchema.parse(json);
    return {
      errors: [message]
    }
  }
  

  // const { role } = jwtDecode<{ role: string }>(json.token);
  
  //Setear Cookies
  (await cookies()).set({
    name: "RADIOACTIVA_TOKEN",
    value: json.token,
    httpOnly: true,
    path: '/admin'
  });
  //  (await cookies()).set("user_role", role, { sameSite: "lax" });
  //const success = SuccessSchema.safeParse(json);

  redirect("/admin");
  
}

export async function logoutAction() {
  (await cookies()).delete("RADIOACTIVA_TOKEN");
  // (await cookies()).delete("user_role");
  redirect("/auth/login");
}