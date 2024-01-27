"use client";

import { Box, Image, Text, HStack, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const DormCard = ({ dorm }) => {
  // Assuming 'dorm' is an object with { name, imageUrl, rating, reviewCount }
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        src={dorm.imageUrl}
        alt={`Image of ${dorm.name}`}
        width="100%"
        height="260px"
        objectFit="cover"
      />

      <VStack p="6" align="start">
        <Text fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {dorm.name}
        </Text>

        <HStack>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <Box
                as={FaStar}
                key={i}
                color={i < dorm.rating ? "yellow.400" : "gray.300"}
              />
            ))}
          <Text as="span" fontSize="sm" color="gray.600">
            {dorm.reviewCount} reviews
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default DormCard;
