export default function LoadingNewsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#248bcf] border-opacity-50" />
      <p className="mt-4 text-[#248bcf] font-semibold text-lg">Cargando...</p>
    </div>
  )
}
