import { Inter } from "next/font/google";
import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";
import { useRouter } from "next/router";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function SiteFeedbackPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${router.query.siteId}`, user.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <FeedbackTableHeader siteName={data.site.name} />
      {data.feedback.length ? (
        <FeedbackTable feedbackList={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
}
