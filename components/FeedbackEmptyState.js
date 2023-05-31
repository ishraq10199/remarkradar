import React from "react";
import { Heading, Flex, Text, Link, Button } from "@chakra-ui/react";

const FeedbackEmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius="8px"
    p={8}
    justify="center"
    align="center"
    direction="column"
  >
    <Heading size="lg" mb={8}>
      No feedback yet...😢
    </Heading>
    <Text fontStyle={"italic"} textAlign={"center"}>
      Copy an embed link from the{" "}
      <Link href="/sites" color={"blue"} fontWeight={700}>
        sites page
      </Link>{" "}
      and use it anywhere on your site to get started.
    </Text>
  </Flex>
);

export default FeedbackEmptyState;
