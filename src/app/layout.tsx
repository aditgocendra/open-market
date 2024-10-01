import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Market",
  description: "This is open market app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='w-full h-screen'>{children}</div>
      </body>
    </html>
  );
}
