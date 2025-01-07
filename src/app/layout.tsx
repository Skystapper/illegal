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
      <body className="min-h-screen">
        <AuthProvider>
          <Navbar />
          
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'E-Legal India',
  description: 'Legal Services Platform in India',
}
