import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from "@/components/providers/SessionProvider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
       <body className="min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#2D2D3D]">
        <div className="w-full max-w-[100vw] overflow-x-hidden pt-20"> {/* Added pt-20 for navbar height */}
            
        <AuthProvider>
          <Navbar />
          
          {children}
          <Footer />
        </AuthProvider>
        </div>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'E-Legal India',
  description: 'Legal Services Platform in India',
}
