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

const DormReviewCard = ({
  reviewId,
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

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < rating ? "★" : "☆"}</span>);
    }
    return stars;
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
        onClick={onOpen}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        maxW="lg"
        display="flex"
        flexDirection="column"
        cursor="pointer"
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
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="end"
        >
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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{dormName} Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={photo} alt={`${dormName} room`} boxSize="full" />
            <Badge borderRadius="full" px="2" colorScheme="teal" mt={4}>
              {dormName}
            </Badge>
            <Text mt={2}>{`Room Number: ${roomNumber}`}</Text>
            <Text>{`Room Type: ${roomType}`}</Text>
            <Text mt={4}>Ratings:</Text>
            <Box mt={2}>Room: {renderStars(roomRating)}</Box>
            <Box>Amenities: {renderStars(amenitiesRating)}</Box>
            <Box>Bathroom: {renderStars(bathroomRating)}</Box>
            <Box>Building: {renderStars(buildingRating)}</Box>
            <Box>Cleanliness: {renderStars(cleanlinessRating)}</Box>
            <Text mt={4}>Review:</Text>
            <Text>{review}</Text>
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
