import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
