import { Box, Code, Switch, useToast } from "@chakra-ui/react";
import { Td } from "./Table";
import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";
import { useEffect, useState } from "react";
import { updateFeedback } from "@/lib/db";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";

const FeedbackRow = ({ id, author, text, route, status }) => {
  let classNameForLineNums;
  const auth = useAuth();
  const [checked, setChecked] = useState(status === "active");
  const toggleFeedback = async (e) => {
    setChecked(!checked);
  };

  const toggleTextOverflow = (e) => {
    if (!classNameForLineNums) classNameForLineNums = e.target.classList[0];
    e.target.classList.toggle(classNameForLineNums);
    e.target.classList.toggle("css-1kwnuqq");
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
      <Td noOfLines={3} onClick={toggleTextOverflow}>
        {text}
      </Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td textAlign={"center"}>
        <Switch
          colorScheme="green"
          onChange={toggleFeedback}
          defaultChecked={checked}
        />
      </Td>
      <Td textAlign={"center"}>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
