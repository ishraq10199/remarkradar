import Head from "next/head";
import { Inter } from "next/font/google";
import { Button, Code, Heading, Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import Logo from "@/styles/Logo";

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
      <Logo name="logo" boxSize={16} color="black" />
      <Heading>REMARK RADAR</Heading>
      {auth.user ? (
        <Button mt={4} onClick={(e) => auth.signout()}>
          Sign Out
        </Button>
      ) : (
        <Button mt={4} onClick={(e) => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
