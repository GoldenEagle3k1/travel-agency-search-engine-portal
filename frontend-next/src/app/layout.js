import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AgentProvider } from '@/context/AgentContext';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const inter  = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: 'SkyWays — Real Flights, Smart Bookings',
  description: 'Book flights worldwide with SkyWays. Compare live rates, choose seats, top up wallets, and travel with ease. Instant boarding passes.',
  openGraph: {
    title: 'SkyWays — Live Flight Booking Platform',
    description: 'Compare cheapest flights, manage agent wallets, check-in, and download boarding passes instantly.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <AgentProvider>
            <Navbar />
            {children}
            <Toast />
          </AgentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
