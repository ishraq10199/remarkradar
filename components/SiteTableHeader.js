import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
} from "@chakra-ui/react";
import AddSiteModal from "@/components/AddSiteModal";

const SiteTableHeader = ({ accountPlan, siteCount }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
        <AddSiteModal accountPlan={accountPlan} siteCount={siteCount}>
          + Add Site
        </AddSiteModal>
      </Flex>
    </>
  );
};

export default SiteTableHeader;
