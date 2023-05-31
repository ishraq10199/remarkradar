import { Inter } from "next/font/google";
import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import SiteTable from "@/components/SiteTable";
import SiteTableHeader from "@/components/SiteTableHeader";
import UpgradeEmptyState from "@/components/UpgradeEmptyState";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/sites", user.token] : null,
    ([url, token]) => fetcher(url, token)
  );
  const userAccountPlan = user ? user.stripeRole : "free";

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader accountPlan={userAccountPlan} siteCount={0} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader
          accountPlan={userAccountPlan}
          siteCount={data.sites.length}
        />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader accountPlan={userAccountPlan} siteCount={0} />
      <EmptyState />
    </DashboardShell>
  );
}
