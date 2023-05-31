import { Inter } from "next/font/google";
import DashboardShell from "@/components/DashboardShell";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import { goToBillingPortal } from "@/lib/stripe";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const FeedbackUsage = ({ stripeRole, feedbackCount }) => (
  <StatGroup>
    <Stat>
      <StatLabel color="gray.700">Feedback</StatLabel>
      <StatNumber fontWeight="medium">{feedbackCount}</StatNumber>
      <StatHelpText>No limits</StatHelpText>
    </Stat>

    <Stat>
      <StatLabel color="gray.700">Sites</StatLabel>
      <StatNumber fontWeight="medium">
        1/
        {stripeRole?.includes("free")
          ? 3
          : stripeRole?.includes("starter")
          ? 20
          : "∞"}
      </StatNumber>
      <StatHelpText>
        {stripeRole?.includes("free")
          ? "Max limit of three sites"
          : stripeRole?.includes("starter")
          ? "Max limit of twenty sites"
          : "Unlimited sites"}
      </StatHelpText>
    </Stat>
  </StatGroup>
);

const SettingsTable = ({ stripeRole, children }) => (
  <Box
    backgroundColor="white"
    mt={8}
    borderRadius={[0, 8, 8]}
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
  >
    <Flex
      backgroundColor="gray.50"
      borderTopLeftRadius={[0, 8, 8]}
      borderTopRightRadius={[0, 8, 8]}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center" w="full">
        <Text
          textTransform="uppercase"
          fontSize="xs"
          color="gray.500"
          fontWeight="medium"
          mt={1}
        >
          Settings
        </Text>
        <Badge colorScheme={"blue"}>{stripeRole}</Badge>
      </Flex>
    </Flex>
    <Flex direction="column" p={6}>
      {children}
    </Flex>
  </Box>
);
const Account = () => {
  const { user } = useAuth();
  const [isBillingLoading, setBillingLoading] = useState(false);
  const { data } = useSWR(
    user ? ["/api/feedbackCount", user.token] : null,
    ([url, token]) => fetcher(url, token)
  );
  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={["left", "center"]}
        margin="0 auto"
      >
        <Flex direction="column" align={["left", "center"]} ml={4}>
          <Avatar
            w={["3rem", "6rem"]}
            h={["3rem", "6rem"]}
            mb={4}
            src={user?.photoURL}
          />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <SettingsTable stripeRole={user?.stripeRole}>
          <FeedbackUsage
            stripeRole={user?.stripeRole}
            feedbackCount={data ? data.count : "-"}
          />
          <Text my={4}>
            Fast Feedback uses Stripe to update, change, or cancel your
            subscription. You can also update card information and billing
            addresses through the secure portal.
          </Text>
          <Flex justify="flex-end">
            <Button variant={"ghost"} ml={4} onClick={() => signout()}>
              Log Out
            </Button>
            <Button
              onClick={() => {
                setBillingLoading(true);
                goToBillingPortal();
              }}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              ml={4}
              isLoading={isBillingLoading}
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              Manage Billing
            </Button>
          </Flex>
        </SettingsTable>
      </Flex>
    </DashboardShell>
  );
};

const AccountPage = () => <Account />;

export default AccountPage;
