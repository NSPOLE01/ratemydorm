// app/reviewPage/page.js
"use client";
import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ReviewPage = () => {
  const router = useRouter();
  const [dormName, setDormName] = useState("");
  const [dormId, setDormId] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const retrieveOriginalDormName = (dormId) => {
    return dormId
      .split("-")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  };

  useEffect(() => {
    // Fetch the dormName from the URL parameters
    const dormId = new URLSearchParams(window.location.search).get("dormName");
    if (dormId) {
      setDormId(dormId);
      const dormName = retrieveOriginalDormName(dormId);
      setDormName(dormName);
    }
  }, []);

  const handleWriteReview = () => {
    router.push(`/writeReview?dormName=${dormId}`);
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
            {" "}
            Reviews
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
