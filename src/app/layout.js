import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
import StoreProvider from "./_lib/StoreProvider";
import SessionWrapper from "./_provider/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose the required font weights
});

export const metadata = {
  title: "ShopFlow",
  description: "The ecommerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased bg-gray-50`}>
        <StoreProvider>
          <SessionWrapper>
            <Header />
            {children}
            <Toaster/>
          </SessionWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
