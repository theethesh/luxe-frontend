import { AppProvider } from "./contaxt/authcontaxt";
import Header from '../compenent/Header';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LUXE Collection',
  description: 'Premium luxury shopping experience',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header />
          <main className="min-h-screen bg-[#0B0B12]">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}