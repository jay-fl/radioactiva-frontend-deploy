import EditNewsForm from "@/components/news/EditNewsForm";
import { NewsSchema, programsResponseSchema } from "@/src/schemas";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

const getNews = async (id: string) => {
  const token = (await cookies()).get("RADIOACTIVA_TOKEN")?.value;
  const url = `${process.env.API_URL}/news/${id}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {
    notFound()
  }

  const news = NewsSchema.parse(json);
  return news;
}

async function getPrograms(){
    const url = `${process.env.API_URL}/programs/public`
    const req = await fetch(url)
    const json = await req.json()
    const programas = programsResponseSchema.parse(json)
    return programas
}

export async function generateMetadata({ params } : { params: { id: string } }) : Promise<Metadata>{
  const { id } = await params;
  const news = await getNews(id)
  return {
    title: `Radio Activa - ${news.headline}`,
    description: `Radio Activa - ${news.headline}`
  }
}
 

export default async function EditNewsPage({ params } : { params: { id: string } }) {
  const { id } = await params
  
  const news = await getNews(id)
  const programas = await getPrograms()

  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-[#17275b] my-5'>
            Editar Noticia: {news.headline}
          </h1>
          <p className="text-xl font-bold">Llena el formulario y crea una nueva {''}
            <span className="text-[#248bcf]">noticia</span>
          </p>
        </div>
        <Link
          href={'/admin/news'}
          className='bg-[#248bcf] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>
      <div className='p-10 mt-10  shadow-lg border '>
        <EditNewsForm 
          news={news}
          programas={programas}
        />
      </div>
    </>
  )
}
