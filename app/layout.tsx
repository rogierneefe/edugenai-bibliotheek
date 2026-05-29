import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduGenAI Bibliotheek — AI-toepassingen in het onderwijs',
  description:
    '110+ AI use cases van onderwijsprofessionals, gemapped op HORA/MORA en vertaald naar 10 herbruikbare blueprints. Door Npuls.',
  openGraph: {
    title: 'EduGenAI Bibliotheek — AI-toepassingen in het onderwijs',
    description:
      '110+ AI use cases van onderwijsprofessionals, gemapped op HORA/MORA en vertaald naar 10 herbruikbare blueprints. Door Npuls.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} bg-stone-50 text-gray-900 antialiased`}>
        <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
              EduGenAI V2
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/kaart" className="text-sm text-gray-600 hover:text-gray-900">
                Hotspot-kaart
              </Link>
              <Link href="/personas" className="text-sm text-gray-600 hover:text-gray-900">
                Persona Lens
              </Link>
              <Link href="/matrix" className="text-sm text-gray-600 hover:text-gray-900">
                Opportunity Matrix
              </Link>
              <Link href="/bibliotheek" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Recepten
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
