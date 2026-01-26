
// from these code logut is not working
// import { createServerClient } from "@supabase/ssr"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => req.cookies.getAll(),
//         setAll: (cookies) => {
//           cookies.forEach(({ name, value, options }) =>
//             res.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const { data: { session } } = await supabase.auth.getSession()

//   const pathname = req.nextUrl.pathname

//   const publicPaths = [
//     "/login",
//     "/signup",
//     "/forgot-password",
//     "/reset-password",
   
    
//   ]

//   // protect dashboard
//   if (!session && pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/dashboard", req.url))
//   }

//   // logged in user on login page
//   if (session && pathname === "/login") {
//     return NextResponse.redirect(new URL("/dashboard", req.url))
//   }

//   return res
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|api).*)"],
// }










//from these code google singup or sign in is redirecting to login page only

// import { createServerClient } from "@supabase/ssr"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => req.cookies.getAll(),
//         setAll: (cookies) => {
//           cookies.forEach(({ name, value, options }) =>
//             res.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const { data: { session } } = await supabase.auth.getSession()
//   const pathname = req.nextUrl.pathname

//   const publicPaths = [
//     "/login",
//     "/signup",
//     "/forgot-password",
//     "/reset-password",
//   ]

//   const isPublic = publicPaths.some(path => pathname.startsWith(path))
//   const isDashboard = pathname.startsWith("/dashboard")

//   // 1️⃣ Not logged in → block dashboard
//   if (!session && isDashboard) {
//     return NextResponse.redirect(new URL("/login", req.url))
//   }

//   // 2️⃣ Logged in → block login/signup
//   if (session && isPublic) {
//     return NextResponse.redirect(new URL("/dashboard", req.url))
//   }

//   return res
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|api).*)"],
// }







import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const pathname = req.nextUrl.pathname

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
}
