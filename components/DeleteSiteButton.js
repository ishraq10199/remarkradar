import React, { useState, useRef } from "react";
import { mutate } from "swr";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from "@chakra-ui/react";

import { deleteSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);
  const onDelete = async () => {
    await deleteSite(siteId);
    mutate(
      ["/api/sites", auth.user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId),
        };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete Site"
        icon={<DeleteIcon />}
        variant={"ghost"}
        colorScheme={"red"}
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Site
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? All site and feedback data will be removed. You
            can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme={"red"} onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
