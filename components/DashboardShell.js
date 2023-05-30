import React from "react";
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/lib/auth";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const path = router.pathname;
  const name = (path.charAt(1).toUpperCase() + path.slice(2)).split("/")[0];
  const title = `Remark Radar - ${name}`;
  const [isBigScreen] = useMediaQuery("(min-width: 768px)");
  const url = `https://remarkradar.com${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title: `Remark Radar - ${title}`,
        }}
      />

      <Flex flexDirection="column">
        <Flex
          justifyContent="space-between"
          backgroundColor="white"
          alignItems="center"
          p={4}
          borderTop="5px solid #9b00f9"
        >
          <Stack spacing={4} flexDirection="row" alignItems="center" isInline>
            <Link as={NextLink} href={"/"} passHref={true}>
              <Logo boxSize={10} color="black" />
            </Link>
            <Link as={NextLink} href={"/sites"} passHref={true}>
              Sites
            </Link>
            <Link as={NextLink} href={"/feedback"} passHref={true}>
              Feedback
            </Link>
            <Link as={NextLink} href={"/pricing"} passHref={true}>
              Pricing
            </Link>
          </Stack>
          <Flex alignItems="center">
            {/* <Link mr={4}>Account</Link> */}
            {user && (
              <Button
                variant="ghost"
                mr={2}
                onClick={() => {
                  signout();
                }}
              >
                Log Out
              </Button>
            )}
            <Avatar
              size="sm"
              src={user?.photoURL}
              as={NextLink}
              href={"/account"}
            />
          </Flex>
        </Flex>
        <Flex
          backgroundColor="gray.100"
          justifyContent="flex-start"
          alignItems="stretch"
          maxWidth="100%"
          p={8}
          height={isBigScreen ? "100vh" : "100%"}
        >
          <Flex maxWidth="800px" w="100%" ml="auto" mr="auto">
            <Flex flexDirection="column" maxWidth="800px" w="100%">
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardShell;
