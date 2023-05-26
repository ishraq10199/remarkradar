import {
  Link,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import GithubIcon from "./GithubIcon";
import GoogleIcon from "./GoogleIcon";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

export default function FeedbackLink({
  siteId,
  user,
  onSubmit,
  hideLogin,
  isFallback,
  commentInputElement,
}) {
  const auth = useAuth();
  const router = useRouter();
  return user ? (
    <Box as="form" onSubmit={onSubmit}>
      <FormControl my={8}>
        <FormLabel htmlFor="comment">Comment</FormLabel>

        <Input
          ref={commentInputElement}
          id="comment"
          placeholder="Leave a comment"
          background={"gray.100"}
          color={"black"}
        />

        <Box display="flex" justifyContent={"space-between"}>
          <Button
            mt={4}
            type="submit"
            fontWeight="medium"
            isDisabled={isFallback}
          >
            Add Comment
          </Button>
          <Box>
            <Link fontSize="xs" color="blackAlpha.500" href="/">
              Powered by Remark Radar
            </Link>
          </Box>
        </Box>
      </FormControl>
    </Box>
  ) : (
    <Box>
      <Heading size={"md"} color={"blackAlpha.800"} textAlign={"center"} py="2">
        Want to leave a comment? Sign in! 😶
      </Heading>

      {!hideLogin && (
        <Box display={"flex"} justifyContent={"center"}>
          <Stack my={4}>
            <Button
              leftIcon={<GithubIcon />}
              color="white"
              fontWeight="medium"
              backgroundColor="gray.900"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
              width={"200px"}
              size="md"
              onClick={(e) => auth.signinWithGithub(router.asPath)}
            >
              Sign In with Github
            </Button>
            <Button
              leftIcon={<GoogleIcon />}
              fontWeight="medium"
              color="gray.900"
              backgroundColor="blackAlpha.100"
              _hover={{ bg: "gray.50" }}
              _active={{
                bg: "gray.75",
                transform: "scale(0.95)",
              }}
              size="md"
              width={"200px"}
              onClick={(e) => auth.signinWithGoogle(router.asPath)}
            >
              Sign In with Google
            </Button>
          </Stack>
        </Box>
      )}

      <Divider orientation="horizontal" />
    </Box>
  );
}
