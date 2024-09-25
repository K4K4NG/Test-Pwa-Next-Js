import './globals.css'; // Ganti dengan path CSS global Anda jika ada

export const metadata = {
  title: 'CRUD PWA',
  description: 'Contoh aplikasi CRUD PWA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        {/* Anda bisa menambahkan favicon atau meta lainnya di sini */}
      </head>
      <body>{children}</body>
    </html>
  );
}
