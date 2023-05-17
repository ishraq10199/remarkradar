import customTheme from "@/styles/theme";
import { AuthProvider } from "@/lib/auth";
import { ChakraProvider, CSSReset, ThemeProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <GlobalStyle>
        <AuthProvider>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </AuthProvider>
      </GlobalStyle>
    </ChakraProvider>
  );
}
