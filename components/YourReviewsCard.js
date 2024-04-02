import { Box, Image, Badge, Text } from "@chakra-ui/react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  db,
} from "@/firebaseConfig";
import { StarRating } from "./DormOverviewCard";

const YourReviewsCard = ({ starRating, photo, dormName, roomNumber }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="sm">
      <Image src={photo} alt={`${dormName} room`} />
      <Box p={5}>
        <Badge borderRadius="full" px="2" colorScheme="teal">
          {dormName}
        </Badge>

        <Box
          mt="2"
          mb="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {roomNumber}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <StarRating rating={starRating} />
        </Box>
      </Box>
    </Box>
  );
};

export default YourReviewsCard;
