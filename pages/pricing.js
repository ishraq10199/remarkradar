import DashboardShell from "@/components/DashboardShell";
import PricingChoices from "@/components/PricingChoices";
import { useAuth } from "@/lib/auth";
import { Flex } from "@chakra-ui/react";

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <DashboardShell>
      <Flex>
        <PricingChoices currentPlan={user?.stripeRole} />
      </Flex>
    </DashboardShell>
  );
}
