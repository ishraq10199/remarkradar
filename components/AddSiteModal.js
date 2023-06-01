import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";

import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";

const AddSiteModal = ({ accountPlan, siteCount, children }) => {
  const auth = useAuth();
  const { data } = useSWR(
    auth.user ? ["/api/sites", auth.user.token] : null,
    ([url, token]) => fetcher(url, token)
  );
  const toast = useToast();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateSite = async ({ name, url }) => {
    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };
    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();

    let _id;
    await mutate(
      ["/api/sites", user.token],
      async (data) => ({ sites: [{ _id, ...newSite }, ...data.sites] }),
      // If revalidate is true (default behavior), the site will try to revalidate
      // We don't need that, since browser needs to load from cache for now
      // revalidation can happen later
      { revalidate: false }
    );

    const { id } = await createSite(newSite);

    // Revalidate id when db is done
    // even if failure on db addition,
    // revalidate fetches accurate site list

    await mutate(
      ["/api/sites", user.token],
      async (data) => ({ sites: data.sites }),

      { revalidate: true }
    );
  };

  const siteLimitReached = accountPlan?.includes("free")
    ? +siteCount >= 3
    : accountPlan?.includes("starter")
    ? +siteCount >= 20
    : false;

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        {siteLimitReached ? (
          <ModalContent
            as="form"
            method="GET"
            action="/pricing/"
            m={8}
            my={"auto"}
          >
            <ModalHeader fontWeight="bold">Account limit reached</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={2}>
              You have reached the site amount for your{" "}
              <Text fontWeight={700} as="span">
                {("" + accountPlan)[0].toUpperCase() + accountPlan.substring(1)}
              </Text>{" "}
              account. Delete any site you&apos;ve added, or consider upgrading.
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3} fontWeight="medium">
                Cancel
              </Button>
              <Button
                backgroundColor="#9b00f9"
                color="white"
                fontWeight="medium"
                type="submit"
                _hover={{ bg: "#b236ff" }}
                _active={{
                  bg: "#9b00f9",
                  transform: "scale(0.95)",
                }}
              >
                Upgrade
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent
            as="form"
            onSubmit={handleSubmit(onCreateSite)}
            m={8}
            my={"auto"}
          >
            <ModalHeader fontWeight="bold">Add Site</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="My site"
                  {...register("name", {
                    required: "Required",
                  })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder="https://website.com"
                  {...register("url", {
                    required: "Required",
                  })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3} fontWeight="medium">
                Cancel
              </Button>
              <Button
                backgroundColor="#99FFFE"
                color="#194D4C"
                fontWeight="medium"
                type="submit"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default AddSiteModal;
