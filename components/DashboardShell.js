import React from "react";
import { Flex, Stack, Link, Avatar, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/lib/auth";

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="center"
        p={4}
      >
        <Stack spacing={4} flexDirection="row" alignItems="center" isInline>
          <Logo boxSize={10} color="black" />
          <Link as={NextLink} href={"/dashboard"} passHref={true}>
            Sites
          </Link>
          <Link as={NextLink} href={"/feedback"} passHref={true}>
            Feedback
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
          <Avatar size="sm" src={user?.photoURL} />
        </Flex>
      </Flex>
      <Flex
        backgroundColor="gray.100"
        justifyContent="flex-start"
        alignItems="stretch"
        maxWidth="100%"
        p={8}
        height="100vh"
      >
        <Flex maxWidth="800px" w="100%" ml="auto" mr="auto">
          <Flex flexDirection="column" maxWidth="800px" w="100%">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
