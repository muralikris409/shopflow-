
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
import { Provider } from 'react-redux';
import VerticalNavBar from "./_components/VerticalNavBar";
import { makeStore } from "./_lib/store";
import StoreProvider from "./_lib/StoreProvider";
import SessionWrapper from "./_provider/SessionProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopFlow",
  description: "The ecommerce application",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        
      >
                <StoreProvider>

        <SessionWrapper>
        <Header/>
        {/* <VerticalNavBar/> */}
        {children}
        <Footer/>
        </SessionWrapper>
        </StoreProvider>

      </body>
    </html>
  );
}
