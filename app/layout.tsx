import type { Metadata } from "next";
import { Inter, Jura } from "next/font/google"; // Import both fonts
import "./app.css";

const inter = Inter({ subsets: ["latin"] });
const jura = Jura({ subsets: ["latin"], weight: "400" }); // Jura font from figma prototype, weight affects boldness 

export const metadata: Metadata = {
  title: "SLT Firefighter Foundation",
  description: "South Lake Tahoe",
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
