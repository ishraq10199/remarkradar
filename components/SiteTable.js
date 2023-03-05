import React from "react";
import { Box, Flex, Link, Skeleton, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Table, Tr, Th, Td } from "./Table";
import { parseISO, format } from "date-fns";

const SiteTable = ({ sites }) => {
  let classNameForLineNums;
  const toggleURLOverflow = (e) => {
    if (!classNameForLineNums) classNameForLineNums = e.target.classList[1];
    e.target.classList.toggle(classNameForLineNums);
    e.target.classList.toggle("css-0");
  };
  return (
    <Table overflowX="auto" display="block">
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.url}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td maxWidth="250px">
              <Text noOfLines={1} onClick={toggleURLOverflow}>
                {site.url}
              </Text>
            </Td>
            <Td minW="130px">
              {site.id ? (
                <Link
                  color={"blue.500"}
                  fontWeight={"medium"}
                  as={NextLink}
                  href={`/p/${site.id}`}
                  passHref={true}
                >
                  View Feedback
                </Link>
              ) : (
                <Skeleton height="10px" w={50 + "px"} my={4} />
              )}
            </Td>
            <Td minW="150px">{format(parseISO(site.createdAt), "PPpp")}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
