import { Inter } from "next/font/google";
import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function MyFeedback() {
  const { user } = useAuth();

  const { data } = useSWR(
    user ? ["/api/feedback", user.token] : null,
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
      <FeedbackTableHeader />
      {data.feedback.length ? (
        <FeedbackTable feedbackList={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
