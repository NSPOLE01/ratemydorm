import { Box, Image, Badge, Text, Flex } from "@chakra-ui/react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  db,
} from "@/firebaseConfig";
import { StarRating } from "./DormOverviewCard";
import { getRatingColorScheme } from "./DormReviewCard";

const YourReviewsCard = ({ starRating, photo, dormName, roomNumber }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="sm">
      <Image src={photo} alt={`${dormName} room`} />
      <Box p={5}>
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={getRatingColorScheme(starRating)}
            mr={2}
          >
            Overall {starRating}
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="purple">
            {dormName} {roomNumber}
          </Badge>
        </Flex>

        <StarRating rating={starRating} />
      </Box>
    </Box>
  );
};

export default YourReviewsCard;
