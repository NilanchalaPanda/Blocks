import { Outfit } from "next/font/google";
import Head from "next/head";

import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "BLOCKS",
  description: "BLOCKS",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <Head>
        <link
          rel="icon"
          href="/logo.svg"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
