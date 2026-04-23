import { Inter } from "next/font/google";

import "./globals.css";
import { NavBar } from "./components/navBar";
import Footer from "./components/footer";
import Wrapper from "./components/Wrapper";

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${InterFont.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-100">
        <div>
          <NavBar />
        </div>

        <Wrapper additionnalClassName="grow">
          <main>{children}</main>
        </Wrapper>

        {/* 
        <div className="w-10/12 max-w7xl mx-auto px-4">
        
        </div> */}

        <section>
          <Footer />
        </section>
      </body>
    </html>
  );
}
