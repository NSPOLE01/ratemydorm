"use client"
import { Box, Image, Text, HStack, VStack, Link } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import NextLink from "next/link";

const DormCard = ({ dorm }) => {
  return (
    <NextLink href={`/reviewPage?dormName=${encodeURIComponent(dorm.name)}`} passHref>
      <Link>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          cursor="pointer"
        >
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
      </Link>
    </NextLink>
  );
};

export default DormCard;
