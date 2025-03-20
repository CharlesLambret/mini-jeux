import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header/header";
import {Fascinate, Delius} from 'next/font/google';

const fascinate = Fascinate({
  subsets: ['latin'],
  weight: ['400'], // Ajoutez les poids nécessaires
  variable: '--font-fascinate',
});

const delius = Delius({
  subsets: ['latin'],
  weight: ['400'], // Ajoutez les poids nécessaires
  variable: '--font-delius',
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fascinate.variable} ${delius.variable} font-sans`}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
