import ChangePasswordForm from "@/components/profile/ChangePasswordForm";


export default async function ChangePasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-[#17275b] my-5">Cambiar Password</h1>
      <p className="text-xl font-bold">Aquí puedes cambiar tu {''}
        <span className="text-[#248bcf]">password</span>
      </p>

      <div className='p-10 mt-10  shadow-lg border '>
        <ChangePasswordForm />
      </div>

    </>
  )
}
