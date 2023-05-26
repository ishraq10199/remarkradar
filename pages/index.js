import { Inter } from "next/font/google";
import { Button, Heading, Box, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import IframeResizer from "iframe-resizer-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname + ":" + window.location.port
      : "";

  return (
    <Box>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" align="center" justify="center">
          <Logo boxSize={16} mt={4} color="black" />
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
            ""
          )}
        </Flex>
      </Box>

      <Box display="flex" width="full" maxWidth="700px" margin="2rem auto">
        <IframeResizer
          src="/embed/m7leeul0Ei70rkYS1VMV"
          style={{ width: "1px", minWidth: "100%" }}
          heightCalculationMethod="grow"
        />
      </Box>
    </Box>
  );
}
