import { Inter } from "next/font/google";
import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import SiteTable from "@/components/SiteTable";

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

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
