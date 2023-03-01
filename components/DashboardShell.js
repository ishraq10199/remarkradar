import React from "react";
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";

import Logo from "./Logo";
import { useAuth } from "@/lib/auth";

const DashboardShell = ({ children }) => {
  const { user } = useAuth();
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
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={user.photoURL} />
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
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading mb={4}>Sites</Heading>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
