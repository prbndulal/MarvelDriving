import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Using Plus Jakarta Sans for everything
import "./globals.css";
import { clsx } from "clsx";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DriveRight - Master the Road with Confidence",
  description: "Professional driving lessons with certified instructors. Book your first lesson today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          plusJakarta.className,
          "antialiased font-sans flex flex-col min-h-screen"
        )}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
