import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar"; 

export const metadata: Metadata = {
  title: "Can I Wear Shorts",
  description: "See if you can wear shorts where you are!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden" >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
