import { Inter } from "next/font/google";
import useSWR from "swr";
import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function MyFeedback() {
  const { user } = useAuth();
  const toast = useToast();
  const [infoToastShown, setInfoTextShown] = useState(false);

  const { data } = useSWR(
    user ? ["/api/feedback", user.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  useEffect(() => {
    if (!infoToastShown && data?.feedback?.length) {
      setInfoTextShown(true);
      toast({
        title: "Hint",
        description:
          "If you can't read some of the comments, try clicking on the comment text to expand. Click again to truncate!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [infoToastShown, toast, data]);

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
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
}
