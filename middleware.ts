import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Rutas que requieren autenticación de admin específicamente
const adminOnlyRoutes = ['/admin/programs', '/admin/songs', '/admin/users'];

// Rutas que requieren cualquier autenticación
const protectedRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar si la ruta necesita protección
  const isAdminOnlyRoute = adminOnlyRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (!isProtectedRoute && !isAdminOnlyRoute) {
    return NextResponse.next();
  }

  // Obtener el token de las cookies
  const token = request.cookies.get('RADIOACTIVA_TOKEN')?.value;
  
  if (!token) {
    // Si no hay token, redirigir al login
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  try {
    // Verificar y decodificar el JWT usando tu JWT_SECRET
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Extraer el rol del payload
    const userRole = payload.role as string;
    
    // Si es una ruta que requiere admin específicamente
    if (isAdminOnlyRoute && userRole !== 'admin') {
      // Redirigir a página de acceso denegado
      const accessDeniedUrl = new URL('/admin/access-denied', request.url);
      return NextResponse.redirect(accessDeniedUrl);
    }
    
    // Agregar información del usuario al header para uso posterior
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', userRole);
    requestHeaders.set('x-user-email', payload.email as string);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
  } catch (error) {
    console.error('Error verificando token:', error);
    // Token inválido, redirigir al login
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/admin/:path*', // Todas las rutas que empiecen con /admin
  ]
};