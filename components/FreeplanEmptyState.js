import React from "react";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import DashboardShell from "@/components/DashboardShell";

const FreePlanEmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius={8}
    p={16}
    justify="center"
    direction="column"
    align="center"
  >
    <Heading as="h2" size="md">
      View discussions on your site, instantly.
    </Heading>
    <Text>You&apos;re using the Basic tier. Upgrade to grow! 🌱</Text>
    <Button variant="solid" size="md">
      Upgrade to Starter
    </Button>
  </Flex>
);

export default FreePlanEmptyState;
