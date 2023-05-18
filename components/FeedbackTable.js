import { Table, Tr, Th } from "./Table";
import FeedbackRow from "./FeedbackRow";

const FeedbackTable = ({ feedbackList }) => {
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
        {feedbackList.map((feedback) => {
          console.log(feedback.id);
          return <FeedbackRow {...feedback} key={feedback.id} />;
        })}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
