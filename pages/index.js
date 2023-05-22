import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Button,
  Code,
  Heading,
  Box,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";
import Script from "next/script";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import GoogleIcon from "@/components/GoogleIcon";
import FeedbackLink from "@/components/FeedbackLink";
import { getAllFeedback } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const SITE_ID = "m7leeul0Ei70rkYS1VMV";

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  return {
    props: {
      allFeedback: feedback || [],
    },
    revalidate: 1,
  };
}

export default function Home({ allFeedback }) {
  const auth = useAuth();
  return (
    <Box>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" align="center" justify="center">
          <Logo boxSize={16} color="black" />
          <Heading my={4} size="lg">
            REMARK RADAR
          </Heading>
          {auth.user ? (
            <Button
              size="md"
              fontWeight="medium"
              color="gray.900"
              backgroundColor="white"
              _hover={{ bg: "gray.50" }}
              _active={{
                bg: "gray.75",
                transform: "scale(0.95)",
              }}
              as={Link}
              href="/sites"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Stack>
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
                size="md"
                onClick={(e) => auth.signinWithGithub()}
              >
                Sign In with Github
              </Button>
              <Button
                leftIcon={<GoogleIcon />}
                fontWeight="medium"
                color="gray.900"
                backgroundColor="white"
                _hover={{ bg: "gray.50" }}
                _active={{
                  bg: "gray.75",
                  transform: "scale(0.95)",
                }}
                size="md"
                onClick={(e) => auth.signinWithGoogle()}
              >
                Sign In with Google
              </Button>
            </Stack>
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
      </Box>
      <Box
        display="flex"
        flexDir="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Box>
    </Box>
  );
}
