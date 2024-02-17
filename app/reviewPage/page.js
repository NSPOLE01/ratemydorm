// app/reviewPage/page.js
"use client";
import { Box, Flex, Heading, Button, Text, SimpleGrid} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getDormNameFromDormID } from "@/utils";
import DormReviewCard from "@/components/DormReviewCard";

const ReviewPage = () => {
  const router = useRouter();
  const [dormName, setDormName] = useState("");
  const [dormId, setDormId] = useState("");
  const [user, setUser] = useState(null); // State to keep track of the user's auth status
  const [reviews, setReviews] = useState([]);

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

    // Fetch reviews from DormName collection 
    const fetchReviews = async (dormName) => {
      if (dormName) {
        const reviewsQuery = query(
          collectionGroup(db, "reviews"),
          where("dormName", "==", dormName)
        );
        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsArray = [];
        querySnapshot.forEach((doc) => {
          reviewsArray.push({ id: doc.id, ...doc.data() });
        });
        console.log(reviewsArray);
        setReviews(reviewsArray);
      }
    };
    if (dormId) {
      setDormId(dormId);
      const dormName = getDormNameFromDormID(dormId);
      setDormName(dormName);
      fetchReviews(dormName);
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

      <Flex
        flex="1"
        flex-direction="column"

        alignItems="center"
        gap="4"
        py={{ base: 5 }}
        px={{ base: 4 }}
      >
              {reviews.map((review) => {
                return(
                  <DormReviewCard
                    roomRating={review.ratings.roomRating}
                    amenitiesRating={review.ratings.amenitiesRating}
                    bathroomRating={review.ratings.bathroomRating}
                    buildingRating={review.ratings.buildingRating}
                    cleanlinessRating={review.ratings.cleanlinessRating}
                    photo={review.photos[0]}
                    dormName={review.dormName}
                    roomNumber={review.roomNumber}
                    roomType={review.roomType}
                    review={review.review}
                  />
              )
              })}
      </Flex>
    </Box>
  );
};

export default ReviewPage;
