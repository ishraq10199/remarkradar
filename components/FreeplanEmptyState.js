import React from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import DashboardShell from "@/components/DashboardShell";

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Box
      width="100%"
      backgroundColor="white"
      borderRadius={8}
      p={8}
      textAlign="center"
    >
      <Heading as="h2" size="md">
        View discussions on your site, instantly.
      </Heading>
      <Text>You&apos;re using the Basic tier. Upgrade to grow! 🌱</Text>
      <Button variant="solid" size="md">
        Upgrade to Starter
      </Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
