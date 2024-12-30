export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'E-Legal India',
  description: 'Legal Services Platform in India',
}
