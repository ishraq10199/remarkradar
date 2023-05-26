import React from "react";
import { Box, Heading, Text, Divider, Icon } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import GithubIcon from "./GithubIcon";
import GoogleIcon from "./GoogleIcon";

const Feedback = ({ author, text, createdAt, provider }) => (
  <Box borderRadius={4} maxWidth="700px" w="full" mt={4}>
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {author}
      {provider.includes("github") ? (
        <GithubIcon ml={"6px"} size="13px" />
      ) : provider.includes("google") ? (
        <GoogleIcon ml={"6px"} size="13px" />
      ) : (
        ""
      )}
    </Heading>

    <Text color="gray.500" mb={4} fontSize="xs">
      {format(parseISO(createdAt), "PPpp")}
    </Text>
    <Text color="gray.800">{text}</Text>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={4} />
  </Box>
);

export default Feedback;
