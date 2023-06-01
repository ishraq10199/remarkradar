import React from "react";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import AddSiteModal from "@/components/AddSiteModal";

const EmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius={8}
    p={16}
    justify="center"
    direction="column"
    align="center"
  >
    <Heading as="h2" size="lg" mb={2}>
      You haven&apos;t added any sites
    </Heading>
    <Text mb={4}>Welcome 👋 Let&apos;s get started...</Text>
  </Flex>
);

export default EmptyState;
