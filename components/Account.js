import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app, db } from "@/firebaseConfig";
import { Box, Image, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import YourReviewsCard from "./YourReviewsCard";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import YourCommentsCard from "./YourCommentsCard";

const Account = () => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    const fetchReviews = async (currentUser) => {
      if (currentUser) {
        const userID = currentUser.uid;
        const reviewsQuery = query(
          collectionGroup(db, "reviews"),
          where("userId", "==", userID)
        );
        const commentsQuery = query(
          collectionGroup(db, "comments"),
          where("userId", "==", userID)
        );
        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsArray = [];
        querySnapshot.forEach((doc) => {
          reviewsArray.push({ id: doc.id, ...doc.data() });
        });
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentsArray = [];
        commentsSnapshot.forEach((doc) => {
          commentsArray.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsArray);
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

          {reviews.length > 0 ? (
            <SimpleGrid columns={3} spacing={10}>
              {reviews.map((review) => (
                <YourReviewsCard
                  key={review.id}
                  starRating={review.overallRating}
                  photo={review.photos[0]}
                  dormName={review.dormName}
                  roomNumber={review.roomNumber}
                  reviewID={review.id}
                  handleDeleteReview={handleDeleteReview}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box width="full" p={5} textAlign="center">
              <Text fontSize="xl" color="gray.600">
                You have no reviews
              </Text>
            </Box>
          )}

          <Heading as="h3" size="lg" mb={4}>
            Your Comments
          </Heading>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <YourCommentsCard
                key={comment.id}
                commentText={comment.text}
                timestamp={comment.createdAt}
                dormName={comment.dormName}
                roomNumber={comment.roomNumber}
              />
            ))
          ) : (
            <Text fontSize="xl" color="gray.600" textAlign="center">
              You have no comments.
            </Text>
          )}
        </Box>
      )}
    </div>
  );
};

export default Account;
