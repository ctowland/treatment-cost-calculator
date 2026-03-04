import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treatment Cost Calculator - Salon Profit Optimizer",
  description: "Calculate true costs and profitability of your salon treatments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
