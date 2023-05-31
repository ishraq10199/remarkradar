import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";
import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getAllActiveFeedback, getAllSites } from "@/lib/db-admin";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useRef, useState } from "react";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllActiveFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    // ISR, every 1 second
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => {
    return {
      params: {
        siteId: site.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const EmbedFeedbackPage = ({ initialFeedback }) => {
  // initialFeedback.map((feedback) => {
  //   return <Feedback key={feedback.id} {...feedback} />;
  // });
  const auth = useAuth();
  const commentInputElement = useRef(null);
  const router = useRouter();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: commentInputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "active",
    };

    const { id } = createFeedback(newFeedback);

    setAllFeedback([{ id, ...newFeedback }, ...allFeedback]);

    commentInputElement.current.value = "";
  };

  return (
    <Box display="flex" flexDir="column" width="full">
      <Script src="/scripts/iframeResizer.contentWindow.min.js" />
      <FeedbackLink
        siteId={router.query.siteId}
        user={auth.user}
        hideLogin={false}
        onSubmit={onSubmit}
        commentInputElement={commentInputElement}
        isFallback={router.isFallback}
      />
      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </Box>
  );
};

export default EmbedFeedbackPage;
