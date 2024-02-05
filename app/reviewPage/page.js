// app/reviewPage/page.js
"use client";
import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDormNameFromDormID } from "@/utils";

const ReviewPage = () => {
  const router = useRouter();
  const [dormName, setDormName] = useState("");
  const [dormId, setDormId] = useState("");
  const [user, setUser] = useState(null); // State to keep track of the user's auth status

  useEffect(() => {
    // Set up a listener for authentication state changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser is null if no user is logged in
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch the dormName from the URL parameters
    const dormId = new URLSearchParams(window.location.search).get("dormId");
    if (dormId) {
      setDormId(dormId);
      const dormName = getDormNameFromDormID(dormId);
      setDormName(dormName);
    }
  }, []);

  const handleWriteReview = () => {
    if (user) {
      // Check if a user is logged in
      router.push(`/writeReview?dormId=${dormId}`);
    } else {
      alert("You must be logged in to write a review.");
    }
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
