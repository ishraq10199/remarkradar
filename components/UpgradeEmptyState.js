import { useState } from "react";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import { createStarterPlanCheckoutSession } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const UpgradeEmptyState = () => {
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const { user } = useAuth();
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius={8}
      p={16}
      justify="center"
      direction="column"
      align="center"
    >
      <Heading textAlign={"center"} as="h2" size="lg" mb={4}>
        Get feedback on your site using
        <Text as={"span"} color="#9b00f9">
          {" "}
          Remark Radar
        </Text>
        &apos;s starter plan.
      </Heading>
      <Text mb={4}>Start today for $5, grow with us later 🌱</Text>
      <Button
        onClick={() => {
          setCheckoutLoading(true);
          createStarterPlanCheckoutSession(user.uid);
        }}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        isLoading={isCheckoutLoading}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Upgrade to Starter
      </Button>
    </Flex>
  );
};

export default UpgradeEmptyState;
