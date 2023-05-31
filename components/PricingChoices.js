import {
  Flex,
  Image,
  Box,
  Heading,
  Button,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  createStarterPlanCheckoutSession,
  createPremiumPlanCheckoutSession,
} from "@/lib/db";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

const PricingChoices = ({ currentPlan }) => {
  const { user } = useAuth();
  const [isBigScreen] = useMediaQuery("(min-width: 768px)");
  const [isStarterCheckoutLoading, setStarterCheckoutLoading] = useState(false);
  const [isPremiumCheckoutLoading, setPremiumCheckoutLoading] = useState(false);

  // TODO [refactor]: change "currentPlan.includes" checks into something more readable, maybe a boolean
  return (
    currentPlan && (
      <Flex
        justifyContent={"center"}
        w="100%"
        flexDir={isBigScreen ? "row" : "column"}
      >
        <Box
          background={"white"}
          padding={8}
          borderRadius={"7px"}
          m={2}
          boxShadow={"-2px 2px 5px rgba(0, 0, 0, 0.1)"}
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Image
            height="200px"
            width="200px"
            m={0}
            alt="Free plan"
            src="/images/free_plan_image.png"
          />
          <Flex
            justifyContent={"space-between"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <Box>
              <Heading as="h3" size="md" textAlign="center">
                Free
              </Heading>
            </Box>
            <Text textAlign="center" width="200px">
              Add up to three sites. No payment, free forever.
            </Text>
            <Heading size="sm" as="h3" textAlign="center" p="20px">
              $ 0/month
            </Heading>
            <Button
              variant="solid"
              size="lg"
              width="100%"
              colorScheme="gray"
              disabled={true}
              pointerEvents={"none"}
            >
              {currentPlan.includes("free")
                ? "Current plan"
                : "Already upgraded"}
            </Button>
          </Flex>
        </Box>
        <Box
          background={"white"}
          padding={8}
          borderRadius={"7px"}
          m={2}
          boxShadow={"-2px 2px 5px rgba(0, 0, 0, 0.1)"}
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Image
            height="200px"
            width="200px"
            m={0}
            alt="Starter plan"
            src="/images/starter_plan_image.png"
          />
          <Flex
            justifyContent={"space-between"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <Box>
              <Heading as="h3" size="md" textAlign="center">
                Starter
              </Heading>
            </Box>
            <Text textAlign="center" width="200px">
              Add up to 20 sites, unlimited feedback.
            </Text>
            <Heading size="sm" as="h3" textAlign="center" p="20px">
              $ 5/month
            </Heading>
            <Button
              onClick={() => {
                setStarterCheckoutLoading(true);
                createStarterPlanCheckoutSession(user.uid);
              }}
              isLoading={isStarterCheckoutLoading}
              variant="solid"
              size="lg"
              //
              backgroundColor={
                ["starter", "premium"].includes(currentPlan)
                  ? "gray.100"
                  : "gray.900"
              }
              color={
                ["starter", "premium"].includes(currentPlan) ? "black" : "white"
              }
              fontWeight="medium"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
              //
              width="100%"
              disabled={["starter", "premium"].includes(currentPlan)}
              pointerEvents={
                ["starter", "premium"].includes(currentPlan) ? "none" : "all"
              }
            >
              {currentPlan.includes("starter")
                ? "Current plan"
                : currentPlan.includes("premium")
                ? "Already upgraded"
                : "Upgrade to this plan"}
            </Button>
          </Flex>
        </Box>
        <Box
          background={"white"}
          padding={8}
          borderRadius={"7px"}
          m={2}
          boxShadow={"-2px 2px 5px rgba(0, 0, 0, 0.1)"}
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Image
            height="200px"
            width="200px"
            m={0}
            alt="Premium plan"
            src="/images/premium_plan_image.png"
          />
          <Flex justifyContent={"space-between"} flexDir={"column"}>
            <Box>
              <Heading as="h3" size="md" textAlign="center">
                Premium
              </Heading>
            </Box>
            <Text textAlign="center" width="200px">
              Unlimited sites, unlimited feedback.
            </Text>
            <Heading
              size="sm"
              as="h3"
              textAlign="center"
              p="20px"
              alignItems={"center"}
            >
              $ 10/month
            </Heading>
            <Button
              onClick={() => {
                setPremiumCheckoutLoading(true);
                createPremiumPlanCheckoutSession(user.uid);
              }}
              isLoading={isPremiumCheckoutLoading}
              variant="solid"
              size="lg"
              // colorScheme={currentPlan.includes("premium") ? "gray" : "purple"}
              //
              backgroundColor={
                currentPlan.includes("premium") ? "gray.100" : "gray.900"
              }
              color={currentPlan.includes("premium") ? "black" : "white"}
              fontWeight="medium"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
              //
              width="100%"
              disabled={currentPlan.includes("premium")}
              pointerEvents={currentPlan.includes("premium") ? "none" : "all"}
            >
              {currentPlan.includes("premium")
                ? "Current plan"
                : "Upgrade to this plan"}
            </Button>
          </Flex>
        </Box>
      </Flex>
    )
  );
};

export default PricingChoices;
