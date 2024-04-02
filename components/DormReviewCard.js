import {
  Box,
  Image,
  Badge,
  Text,
  HStack,
  VStack,
  Center,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { StarRating } from "./DormOverviewCard";

export const getRatingColorScheme = (rating) => {
  if (rating >= 4) {
    return "green";
  } else if (rating >= 3) {
    return "yellow";
  } else {
    return "red";
  }
};

const DormReviewCard = ({
  reviewId,
  roomRating,
  amenitiesRating,
  bathroomRating,
  buildingRating,
  cleanlinessRating,
  overallRating,
  photo,
  dormName,
  roomNumber,
  roomType,
  review,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dormNameMap = {
    "Chaffin Place": "chaffin-place",
    "Cole Hall": "cole-hall",
    Crawford: "crawford",
    "E. Bronson Ingram": "e.-bronson-ingram",
    East: "east",
    Gillette: "gillette",
    "Hank Ingram": "hank-ingram",
    "Lewis House": "lewis-house",
    "Lupton House": "lupton-house",
    "McTyeire Hall": "mctyeire-hall",
    Memorial: "memorial",
    Moore: "moore",
    "Morgan House": "morgan-house",
    Murray: "murray",
    "Nicholas S. Zeppos": "nicholas-s.-zeppos",
    North: "north",
    Rothschild: "rothschild",
    "Scales House": "scales-house",
    Stambaugh: "stambaugh",
    "Stapelton House": "stapelton-house",
    Sutherland: "sutherland",
    "Tolman Hall": "tolman-hall",
    "Vaughn House": "vaughn-house",
    Warren: "warren",
    West: "west",
  };

  const [comment, setComment] = useState("");

  const addCommentToFirestore = async () => {
    if (comment.trim() === "") return;
    console.log(reviewId);

    try {
      const commentsRef = collection(
        db,
        "dorms",
        dormNameMap[dormName],
        "reviews",
        reviewId,
        "comments"
      );

      await addDoc(commentsRef, {
        text: comment,
        createdAt: new Date(),
      });

      setComment("");
      onClose();
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        maxW="lg"
        borderColor="gray.200"
        onClick={onOpen}
        cursor="pointer"
      >
        {/* ... existing image code remains unchanged */}
        <Box p={5}>
          <Flex alignItems="center" justifyContent="space-between" mb={2}>
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={getRatingColorScheme(overallRating)}
              mr={2}
            >
              Overall {overallRating}
            </Badge>
            <Badge borderRadius="full" px="2" colorScheme="purple">
              {roomNumber} {roomType}
            </Badge>
          </Flex>
          <Text color="gray.600" fontSize="md" noOfLines={[1, 2, 3]}>
            {review}
          </Text>
          {/* Ratings */}
          <VStack align="start" mt={4} spacing={4}>
            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Room
              </Text>
              <Box display="flex" ml={2}>
                <StarRating rating={roomRating} />
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Amenities
              </Text>
              <Box display="flex" ml={2}>
                <StarRating rating={amenitiesRating} />
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Bathroom
              </Text>
              <Box display="flex" ml={2}>
                <StarRating rating={bathroomRating} />
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Building
              </Text>
              <Box display="flex" ml={2}>
                <StarRating rating={buildingRating} />
              </Box>
            </HStack>

            <HStack>
              <Text as="span" fontSize="sm" color="gray.600">
                Cleanliness
              </Text>
              <Box display="flex" ml={2}>
                <StarRating rating={cleanlinessRating} />
              </Box>
            </HStack>
          </VStack>
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
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{dormName} Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={photo} alt={`${dormName} room`} boxSize="full" mb={2} />
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={getRatingColorScheme(overallRating)}
                mr={2}
              >
                Overall {overallRating}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="purple">
                {roomNumber} {roomType}
              </Badge>
            </Flex>
            <Text color="gray.600" fontSize="md" noOfLines={[1, 2, 3]}>
              {review}
            </Text>
            {/* Ratings */}
            <VStack align="start" mt={4} spacing={4}>
              <HStack>
                <Text as="span" fontSize="sm" color="gray.600">
                  Room
                </Text>
                <Box display="flex" ml={2}>
                  <StarRating rating={roomRating} />
                </Box>
              </HStack>

              <HStack>
                <Text as="span" fontSize="sm" color="gray.600">
                  Amenities
                </Text>
                <Box display="flex" ml={2}>
                  <StarRating rating={amenitiesRating} />
                </Box>
              </HStack>

              <HStack>
                <Text as="span" fontSize="sm" color="gray.600">
                  Bathroom
                </Text>
                <Box display="flex" ml={2}>
                  <StarRating rating={bathroomRating} />
                </Box>
              </HStack>

              <HStack>
                <Text as="span" fontSize="sm" color="gray.600">
                  Building
                </Text>
                <Box display="flex" ml={2}>
                  <StarRating rating={buildingRating} />
                </Box>
              </HStack>

              <HStack>
                <Text as="span" fontSize="sm" color="gray.600">
                  Cleanliness
                </Text>
                <Box display="flex" ml={2}>
                  <StarRating rating={cleanlinessRating} />
                </Box>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Textarea
              placeholder="Add a comment..."
              mr={3}
              resize="vertical"
              minH="unset"
              w="100%"
              maxW="sm"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button colorScheme="blue" onClick={addCommentToFirestore}>
              Add Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DormReviewCard;
