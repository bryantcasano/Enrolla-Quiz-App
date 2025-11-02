import './globals.css'

export const metadata = {
  title: 'Quiz App',
  description: 'Simple Quiz using Hono + Next.js + TailwindCSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
