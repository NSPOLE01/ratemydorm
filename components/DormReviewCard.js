import {
  Box,
  Image,
  Badge,
  Text,
  HStack,
  VStack,
  Center,
  Flex,
} from "@chakra-ui/react";
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
  review,
}) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < rating ? "★" : "☆"}</span>);
    }
    return stars;
  };
  console.log("photo", photo);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      maxW="lg"
      display="flex"
      flexDirection="column"
    >
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Center pt={4} px={2}>
          <Image src={photo} alt={`${dormName} room`} boxSize="12em" />{" "}
        </Center>
      </Box>
      <Box flex="1" display="flex" flexDirection="column" justifyContent="end">
        <Flex direction="column" p={5}>
          <Badge borderRadius="full" px="2" colorScheme="teal" mt={4}>
            {dormName}
          </Badge>
          <HStack spacing={4} mt={2}>
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {roomNumber}
            </Box>
            <Badge borderRadius="full" px="2" colorScheme="gray">
              {roomType}
            </Badge>
          </HStack>

          <VStack align="start" mt={4} spacing={4}>
            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Room
              </Text>
              <Box display="flex" ml={2}>
                {renderStars(roomRating)}
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Amenities
              </Text>
              <Box display="flex" ml={2}>
                {renderStars(amenitiesRating)}
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Bathroom
              </Text>
              <Box display="flex" ml={2}>
                {renderStars(bathroomRating)}
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Building
              </Text>
              <Box display="flex" ml={2}>
                {renderStars(buildingRating)}
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Cleanliness
              </Text>
              <Box display="flex" ml={2}>
                {renderStars(cleanlinessRating)}
              </Box>
            </HStack>
            <Text as="span" fontSize="md" color="black">
              {review}
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default DormReviewCard;
