import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/useFirebaseAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oct4crypt - Securing the Digital World',
  description: 'Cybersecurity tools, projects, and insights by Kamal and team Oct4crypt. Professional SOC analysis, threat detection, and defensive security solutions.',
  keywords: ['cybersecurity', 'SOC', 'SIEM', 'threat detection', 'ethical hacking', 'blue team', 'security analysis'],
  authors: [{ name: 'Kamal' }],
  openGraph: {
    title: 'Oct4crypt - Securing the Digital World',
    description: 'Cybersecurity tools, projects, and insights by Kamal and team Oct4crypt',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oct4crypt - Securing the Digital World',
    description: 'Cybersecurity tools, projects, and insights by Kamal and team Oct4crypt',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <AuthProvider>
          <div className="relative min-h-screen">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#00ff9c_1px,transparent_1px),linear-gradient(to_bottom,#00ff9c_1px,transparent_1px)] bg-[size:50px_50px] opacity-5 z-0"></div>
            
            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-10">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative z-20">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a2e',
                color: '#ffffff',
                border: '1px solid rgba(0, 255, 156, 0.2)',
                backdropFilter: 'blur(12px)',
              },
              success: {
                iconTheme: {
                  primary: '#00ff9c',
                  secondary: '#1a1a2e',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#1a1a2e',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
