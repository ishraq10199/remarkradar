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
  const auth = useAuth();
  const { data } = useSWR("/api/sites", fetcher);

  if (!auth.user) {
    return "Loading...";
  }
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
