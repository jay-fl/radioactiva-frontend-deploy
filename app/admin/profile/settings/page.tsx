import ProfileForm from '@/components/profile/ProfileForm'
import { userSchema } from '@/src/schemas';
import { Metadata } from 'next';
import { cookies } from 'next/headers'

const getProfile = async () => {
  const token = (await cookies()).get('RADIOACTIVA_TOKEN')?.value
  const url = `${process.env.API_URL}/auth/profile`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json()

  const user = userSchema.parse(json);
    return user;
}

export async function generateMetadata() : Promise<Metadata>{
  const user = await getProfile()
  return {
    title: `Radio Activa - ${user.name}`,
    description: `Radio Activa - ${user.name}`
  }
}

export default async function EditProfilePage() {

  const user = await getProfile();

	return (
		<>
			<h1 className='font-black text-4xl text-[#17275b] my-5'>
				Actualizar Perfil
			</h1>
			<p className='text-xl font-bold'>
				Aquí puedes cambiar los datos de tu {''}
				<span className='text-[#248bcf]'>perfil</span>
			</p>

			<div className='p-10 mt-10  shadow-lg border '>
				<ProfileForm 
          user={user}
        />
			</div>
		</>
	)
}
