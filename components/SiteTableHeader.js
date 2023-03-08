import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
} from "@chakra-ui/react";
import AddSiteModal from "@/components/AddSiteModal";

const SiteTableHeader = ({ isPaidAccount }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>

        {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </>
  );
};

export default SiteTableHeader;
