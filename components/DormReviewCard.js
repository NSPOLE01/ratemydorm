import { Box, Image, Badge, Text, HStack, VStack } from "@chakra-ui/react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  db,
} from "@/firebaseConfig";

const DormReviewCard = ({ 
                          roomRating, 
                          amenitiesRating, 
                          bathroomRating, 
                          buildingRating, 
                          cleanlinessRating, 
                          photo, 
                          dormName, 
                          roomNumber,
                          roomType,
                          review
                        }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < rating ? "★" : "☆"}</span>);
    }
    return stars;
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="lg">
      <Image src={photo} alt={`${dormName} room`} />
      <Box p={5}>
        <Badge borderRadius="full" px="2" colorScheme="teal">
          {dormName}
        </Badge>
        <HStack>
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
          <Badge borderRadius="full" px="2" colorScheme="gray">
            {roomType}
          </Badge>
        </HStack>

        <VStack align="start">
          <HStack>
            <Text as="span" fontSize="sm" color="gray.600">
                Room
            </Text>
            <Box display="flex">
              {renderStars(roomRating)}
            </Box>
          </HStack>

          <HStack>
            <Text as="span" fontSize="sm" color="gray.600">
                Amenities
            </Text>
            <Box display="flex">
              {renderStars(amenitiesRating)}
            </Box>
          </HStack>

          <HStack>
            <Text as="span" fontSize="sm" color="gray.600">
                Bathroom
            </Text>
            <Box display="flex">
              {renderStars(bathroomRating)}
            </Box>
          </HStack>

          <HStack>
            <Text as="span" fontSize="sm" color="gray.600">
                Building
            </Text>
            <Box display="flex">
              {renderStars(buildingRating)}
            </Box>
          </HStack>

          <HStack>
            <Text as="span" fontSize="sm" color="gray.600">
                Cleanliness
            </Text>
            <Box display="flex">
              {renderStars(cleanlinessRating)}
            </Box>
          </HStack>
          <Text as="span" fontSize="md" color="black">
                {review}
          </Text>
        </VStack>
      
      </Box>
    </Box>
  );
};

export default DormReviewCard;
