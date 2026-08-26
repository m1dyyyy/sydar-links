export const metadata = {
  title: 'SYDAR Links',
  description: 'Быстрый сокращатель ссылок с поддержкой поддоменов',
}

export default function RootLayout({
  children,
}, {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  )
}
