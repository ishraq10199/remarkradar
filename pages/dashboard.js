import { Inter } from "next/font/google";
import { Button, Code, Heading, Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Dashboard() {
  const auth = useAuth();
  if (!auth.user) {
    return "Loading...";
  }
  return <EmptyState />;
}
