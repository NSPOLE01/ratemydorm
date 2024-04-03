import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app, db } from "@/firebaseConfig";
import {
  Box,
  Image,
  Badge,
  Grid,
  GridItem,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import YourReviewsCard from "./YourReviewsCard";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";

const Account = () => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    const fetchReviews = async (currentUser) => {
      if (currentUser) {
        const userID = currentUser.uid;
        const reviewsQuery = query(
          collectionGroup(db, "reviews"),
          where("userId", "==", userID)
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

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        fetchReviews(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);
  };


  return (
    <div>
      {user && (
        <Box maxW="container.xl" m="auto" p={5}>
          <Box textAlign="center" py={10}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.photoURL}
              alt="Profile image"
              mx="auto"
              referrerpolicy="no-referrer"
            />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              {user.displayName}
            </Heading>
            <Text fontWeight="bold" color="gray.500">
              {user.email}
            </Text>
          </Box>

          <Heading as="h3" size="lg" mb={4}>
            Your Reviews
          </Heading>

          <SimpleGrid columns={3} spacing={10}>
            {reviews.map((review) => {
              return (
                <YourReviewsCard
                  starRating={review.overallRating}
                  photo={review.photos[0]}
                  dormName={review.dormName}
                  roomNumber={review.roomNumber}
                  reviewID={review.id}
                  handleDeleteReview={handleDeleteReview}
                />
              );
            })}
          </SimpleGrid>
        </Box>
      )}
    </div>
  );
};

export default Account;
