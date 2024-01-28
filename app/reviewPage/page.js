// app/reviewPage/page.js
"use client";
import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const ReviewPage = () => {
  const dormName = new URLSearchParams(window.location.search).get('dormName');

  return (
    <Box>
      <Flex
        flexDirection="column"
        align="center"
        justify="center"
        py={{ base: 5 }}
        px={{ base: 4 }}
      >
        <Heading
          fontWeight={500}
          fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}          
          lineHeight={"110%"}
        >
          <Text as="span" color="brand.200">
            {dormName}
          </Text>
          <Text as="span" color="black">
            {' '}Reviews
          </Text>
        </Heading>
        <NextLink href={`/writeReview?dormName=${encodeURIComponent(dormName || '')}`} passHref>
          <Button
            mt={10}
            as="a"
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"brand.200"}
            _hover={{
              bg: "brand.500",
            }}
          >
            Write Review
          </Button>
        </NextLink>
      </Flex>
      {/* ... rest of your page content ... */}
    </Box>
  );
};

export default ReviewPage;
