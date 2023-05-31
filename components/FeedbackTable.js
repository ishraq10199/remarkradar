import { Table, Tr, Th } from "./Table";
import FeedbackRow from "./FeedbackRow";

const FeedbackTable = ({ feedbackList }) => {
  return (
    <Table display="block" overflowX={"auto"}>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>Delete</Th>
        </Tr>
      </thead>
      <tbody>
        {feedbackList.map((feedback) => {
          return <FeedbackRow {...feedback} key={feedback.id} />;
        })}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
