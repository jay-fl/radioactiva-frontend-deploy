import EditUserAdminForm from "@/components/users/EditUserAdminForm";
import { userSchema } from "@/src/schemas";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

const getUsers = async (id: string) => {
  const token = (await cookies()).get("RADIOACTIVA_TOKEN")?.value;
  const url = `${process.env.API_URL}/users/${id}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {
    notFound()
  }

  const user = userSchema.parse(json);
  return user;
}

export async function generateMetadata({ params } : { params: { id: string } }) : Promise<Metadata>{
  const { id } = await params;
  const user = await getUsers(id)
  return {
    title: `Radio Activa - ${user.name}`,
    description: `Radio Activa - ${user.name}`
  }
}

export default async function EditUsersPage({ params } : { params: { id: string } }) {

    const { id } = await params
    const user = await getUsers(id)

  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-[#17275b] my-5'>
            Editar Usuario: {user.name}
          </h1>
          <p className="text-xl font-bold">Llena el formulario y actualiza el  {''}
            <span className="text-[#248bcf]">usuario</span>
          </p>
        </div>
        <Link
          href={'/admin/users'}
          className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>
      <div className='p-10 mt-10  shadow-lg border '>
        <EditUserAdminForm 
          user={user}
        />
      </div>
    </>
  )
}
