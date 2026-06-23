import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "./providers";
import "../styles.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    template: "%s | Proactive",
    default: "Proactive | Streamline Your Operations",
  },
  description: "Proactive is the ultimate platform to manage, streamline, and scale your firm's operations. Get started today.",
  authors: [{ name: "Proactive Team" }],
  openGraph: {
    title: "Proactive",
    description: "Manage, streamline, and scale your firm's operations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ProactiveApp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
