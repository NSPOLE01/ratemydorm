// app/reviewPage/page.js
"use client";
import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const [dormName, setDormName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch the dormName from the URL parameters
    const dormNameFromQuery = new URLSearchParams(window.location.search).get('dormName');
    if (dormNameFromQuery) setDormName(dormNameFromQuery);
  }, []);

  const handleWriteReview = () => {
    router.push(`/writeReview?dormName=${encodeURIComponent(dormName)}`);
  };

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
        <Button
          onClick={handleWriteReview}
          mt={10}
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
      </Flex>
    </Box>
  );
};

export default ReviewPage;
