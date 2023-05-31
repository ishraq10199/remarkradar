import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
} from "@chakra-ui/react";

const FeedbackTableHeader = ({ siteName }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/feedback" color="gray.700">
            Feedback
          </BreadcrumbLink>
        </BreadcrumbItem>
        siteName?
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700">{siteName}</BreadcrumbLink>
        </BreadcrumbItem>
        : {""}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName ? `${siteName}` : "All Feedback"}</Heading>
      </Flex>
    </>
  );
};

export default FeedbackTableHeader;
