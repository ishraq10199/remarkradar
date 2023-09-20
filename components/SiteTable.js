import {
  Box,
  Flex,
  Link,
  Skeleton,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Table, Tr, Th, Td } from "./Table";
import { parseISO, format } from "date-fns";
import {
  CopyIcon,
  ExternalLinkIcon,
  InfoIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import DeleteSiteButton from "./DeleteSiteButton";

const SiteTable = ({ sites }) => {
  let classNameForLineNums;
  const toast = useToast();
  const toggleURLOverflow = (e) => {
    if (!classNameForLineNums) classNameForLineNums = e.target.classList[1];
    e.target.classList.toggle(classNameForLineNums);
    e.target.classList.toggle("css-0");
  };

  const onCopyIconClick = (e) => {
    const embedLink = window.location.host + "/embed/" + e.target.id;
    navigator.clipboard.writeText(embedLink);
    toast({
      title: "Embed Link copied to clipboard!",
      description: "Use as an iframe source anywhere on your site",
      status: "info",
      colorScheme: "purple",
      duration: 2000,
      isClosable: false,
    });
  };

  return (
    <Flex>
      <Table display="block" overflowX={"auto"}>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback</Th>
            <Th>Date Added</Th>
            <Th>Embed</Th>
            <Th>Delete</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <Box as="tr" key={site.url}>
              <Td maxWidth="150px">
                {site.id ? (
                  <Link
                    color={"blackAlpha.900"}
                    fontWeight={"medium"}
                    as={NextLink}
                    href={`/site/${site.id}`}
                    passHref={true}
                  >
                    {site.name}
                    <ExternalLinkIcon fontSize={10} mx={2} mb={1} />
                  </Link>
                ) : (
                  <Skeleton height="10px" w={50 + "px"} my={4} />
                )}
              </Td>
              <Td maxWidth="200px">
                <Text noOfLines={1} onClick={toggleURLOverflow}>
                  {site.url}
                </Text>
              </Td>
              <Td minW="130px">
                {site.id ? (
                  <Link
                    color={"#9b00f9"}
                    fontWeight={"medium"}
                    as={NextLink}
                    href={`/feedback/${site.id}`}
                    passHref={true}
                  >
                    View all
                  </Link>
                ) : (
                  <Skeleton height="10px" w={50 + "px"} my={4} />
                )}
              </Td>
              <Td minW="150px">{format(parseISO(site.createdAt), "PPpp")}</Td>
              <Td textAlign={"center"}>
                <IconButton
                  aria-label="Copy embed link"
                  icon={<CopyIcon pointerEvents={"none"} />}
                  background={"transparent"}
                  pointerEvents={"all"}
                  onClick={onCopyIconClick}
                  id={site.id}
                />
              </Td>
              <Td textAlign={"center"}>
                <DeleteSiteButton siteId={site.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Flex>
  );
};

export default SiteTable;
