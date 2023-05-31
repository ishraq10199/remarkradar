import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import { Box, Divider, Heading } from "@chakra-ui/react";
import IframeResizer from "iframe-resizer-react";
import { useRouter } from "next/router";
import useSWR from "swr";

const FeedbackPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data } = useSWR(
    user ? [`/api/site/${router.query.siteId}`, user.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  return (
    <DashboardShell>
      {/* 
      TODO: 
        1. Statistics about the site
        2. Show recent feedback
        3. Show option to delete
        4. Delete confirmation modal
      */}
      <Box
        bg="white"
        p={4}
        borderRadius={8}
        boxShadow={"-2px 2px 10px rgba(0, 0, 0, 0.1)"}
      >
        <Box
          display="flex"
          width="100%"
          margin="2rem auto"
          p={2}
          pb={0}
          flexDir={"column"}
        >
          <Heading size={"lg"}>
            {`Comments from "${data?.site.name || "..."}"`}

            <Divider my={4} />
          </Heading>
          <IframeResizer
            src="/embed/m7leeul0Ei70rkYS1VMV?hideInput=true"
            style={{ minWidth: "100%" }}
            heightCalculationMethod="grow"
          />
        </Box>
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
