import { Box, Code, Switch } from "@chakra-ui/react";
import { Td } from "./Table";
import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";
import { useEffect, useState } from "react";
import { updateFeedback } from "@/lib/db";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === "active");
  const toggleFeedback = async (e) => {
    setChecked(!checked);
  };

  useEffect(() => {
    async function checkedChanged() {
      await updateFeedback(id, { status: checked ? "active" : "pending" });
      mutate(["/api/feedback", auth.user.token]);
    }
    checkedChanged();
  }, [id, checked]);

  return (
    <Box as="tr">
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td>
        <Switch
          colorScheme="green"
          onChange={toggleFeedback}
          defaultChecked={checked}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
