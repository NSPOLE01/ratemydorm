import React from "react";
import { Box, Badge, Text, Stack } from "@chakra-ui/react";

const YourCommentsCard = ({ commentText, timestamp, dormName, roomNumber }) => {
  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} maxW="sm">
      <Stack spacing={3}>
        <Text fontSize="sm" color="gray.600">
          {formatDate(timestamp)}
        </Text>
        <Text fontSize="md">{commentText}</Text>
        <Badge borderRadius="full" px={2} colorScheme="purple">
          {dormName} {roomNumber}
        </Badge>
      </Stack>
    </Box>
  );
};

export default YourCommentsCard;
