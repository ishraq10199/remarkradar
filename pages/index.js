import Head from "next/head";
import { Inter } from "next/font/google";
import { Button, Code, Heading, Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";
import Script from "next/script";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import GoogleIcon from "@/components/GoogleIcon";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Remark Radar</title>
        <meta name="description" content="Comment, interact, engage!" />
      </Head>
      <Logo boxSize={20} color="black" />
      <Heading my={8} size="2xl">
        REMARK RADAR
      </Heading>
      {auth.user ? (
        <Button
          size="lg"
          fontWeight="medium"
          backgroundColor="gray.100"
          _hover={{ bg: "gray.25" }}
          _active={{
            bg: "gray.50",
            transform: "scale(0.95)",
          }}
          as={Link}
          href="/dashboard"
        >
          View Dashboard
        </Button>
      ) : (
        <>
          <Button
            leftIcon={<GithubIcon />}
            color="white"
            fontWeight="medium"
            backgroundColor="gray.900"
            _hover={{ bg: "gray.700" }}
            _active={{
              bg: "gray.800",
              transform: "scale(0.95)",
            }}
            mt={4}
            size="lg"
            onClick={(e) => auth.signinWithGithub()}
          >
            Sign In with Github
          </Button>
          <Button
            leftIcon={<GoogleIcon />}
            fontWeight="medium"
            backgroundColor="gray.100"
            _hover={{ bg: "gray.25" }}
            _active={{
              bg: "gray.50",
              transform: "scale(0.95)",
            }}
            mt={4}
            size="lg"
            onClick={(e) => auth.signinWithGoogle()}
          >
            Sign In with Google
          </Button>
        </>
      )}
      {/* <Script
        id="redirectScript"
        dangerouslySetInnerHTML={{
          __html: `
              if (document.cookie && document.cookie.includes('remarkradar-auth')) {
                window.location.href = "/dashboard"
              }
            `,
        }}
      ></Script> */}
    </Flex>
  );
}
