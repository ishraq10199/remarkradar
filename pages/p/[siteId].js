import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
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
    fallback: false,
  };
}

const FeedbackPage = ({ initialFeedback }) => {
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
      status: "pending",
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input
              ref={commentInputElement}
              id="comment"
              placeholder="Leave a comment"
            />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}

      {allFeedback.map((feedback) => {
        return <Feedback key={feedback.id} {...feedback} />;
      })}
    </Box>
  );
};

export default FeedbackPage;
