import Link from 'next/link';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Acceso Denegado
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            No tienes los permisos necesarios para acceder a esta sección. 
            Esta área está reservada solo para administradores.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/admin" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Dashboard
          </Link>
          
          <div>
            <Link 
              href="/auth/login" 
              className="text-gray-600 hover:text-gray-800 underline"
            >
              Iniciar sesión con otra cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}