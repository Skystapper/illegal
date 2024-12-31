import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className="min-h-screen">
        <Navbar />
        
        {children}
        <Footer />
      </body>
    </html>
  )
}

export const metadata = {
  title: 'E-Legal India',
  description: 'Legal Services Platform in India',
}
