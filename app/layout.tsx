import type { Metadata } from "next";
import { Inter, Jura } from "next/font/google"; // Import both fonts
import "./app.css";

const inter = Inter({ subsets: ["latin"] });
const jura = Jura({ subsets: ["latin"], weight: "400" }); // Jura font from figma prototype, weight affects boldness 

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jura.className}`}>{children}</body>
    </html>
  );
}
