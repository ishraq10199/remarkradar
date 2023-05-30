import {
  Flex,
  Image,
  Box,
  Heading,
  Button,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

const PricingChoices = ({ currentPlan }) => {
  const [isBigScreen] = useMediaQuery("(min-width: 418px)");

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
              bgColor={currentPlan.includes("free") ? "gray.200" : "#9b00f9"}
              textColor={currentPlan.includes("free") ? "black" : "white"}
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
                Free
              </Heading>
            </Box>
            <Text textAlign="center" width="200px">
              Add up to 20 sites, unlimited feedback.
            </Text>
            <Heading size="sm" as="h3" textAlign="center" p="20px">
              $ 5/month
            </Heading>
            <Button
              variant="solid"
              size="lg"
              width="100%"
              bgColor={currentPlan.includes("starter") ? "gray.200" : "#9b00f9"}
              textColor={currentPlan.includes("starter") ? "black" : "white"}
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
              variant="solid"
              bgColor={currentPlan.includes("premium") ? "gray.200" : "#9b00f9"}
              textColor={currentPlan.includes("premium") ? "black" : "white"}
              size="lg"
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
