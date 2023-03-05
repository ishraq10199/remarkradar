import React from "react";
import { Box, Code, Switch, IconButton } from "@chakra-ui/react";

import { Table, Tr, Th, Td } from "./Table";
import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";

const FeedbackTable = ({ feedbackList }) => {
  console.log(feedbackList);
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px">{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedbackList.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{feedback.route || "/"}</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="green"
                defaultChecked={feedback.status === "active"}
              />
            </Td>
            <Td>
              <DeleteFeedbackButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;