"use client";
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Stack, Box, Button, FormControl, FormLabel, Flex, Heading, Input, Textarea, Text, Icon, Select, IconButton, Center } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons'; // For the back arrow icon


const StarRating = ({ rating, setRating }) => {
    return (
      <Box>
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            as={FaStar}
            cursor="pointer"
            color={index < rating ? "yellow.400" : "gray.300"}
            onClick={() => setRating(index + 1)}
            _hover={{ color: "yellow.600" }}
            margin="0.6rem"
            boxSize="2rem" // Adjust the size as needed
          />
        ))}
      </Box>
    );
  };

  
const WriteReview = () => {
  const dormName = new URLSearchParams(window.location.search).get('dormName');
  const [review, setReview] = useState('');
  const [roomRating, setRoomRating] = useState(0);
  const [buildingRating, setBuildingRating] = useState(0);
  const [bathroomRating, setBathroomRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [photos, setPhotos] = useState([]); // State to store uploaded photos

  const handlePhotoUpload = (e) => {
    const selectedPhotos = e.target.files;
    setPhotos([...photos, ...selectedPhotos]);
  };

  const handleBackClick = () => {
    const reviewPageUrl = `http://localhost:3000/reviewPage?dormName=${encodeURIComponent(dormName)}`;
    window.location.href = reviewPageUrl;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submission", {
      dormName,
      roomNumber,
      roomType,
      review,
      ratings: { roomRating, buildingRating, bathroomRating, cleanlinessRating, amenitiesRating },
      photos, // Include uploaded photos in the submission data
    });
    const reviewPageUrl = `http://localhost:3000/reviewPage?dormName=${encodeURIComponent(dormName)}`;
    window.location.href = reviewPageUrl;
  };

  return (
    <Box p={4} maxW="xl" mx="auto">
        <Flex
        flexDirection="column"
        align="center"
        justify="center"
        py={{ base: 5 }}
        px={{ base: 4 }}
        >

            <IconButton
                icon={<ChevronLeftIcon />}
                aria-label="Back to review page"
                variant="outline"
                position="absolute" // Optionally position it absolutely
                top={20} // Adjust these values based on your layout
                left={2}
                onClick={handleBackClick}
                />
            <Heading as="h1" size="xl" mb={6}>Write a Review</Heading>
            <Stack spacing={4} width="100%" maxW="300px" align="center">

                <form onSubmit={handleSubmit}>
                    
                    <Text fontSize="lg" mb={2} fontWeight={500}>Dorm: <strong>{dormName}</strong></Text>

                    <FormControl mb={4}>
                    <FormLabel htmlFor="room-number" fontSize="lg">Room Number:</FormLabel>
                    <Input
                        id="room-number"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="Enter Room Number"
                        width="300px"
                    />
                    </FormControl>

                    <FormControl mb={4}  isRequired>
                    <FormLabel htmlFor="room-type" fontSize="lg">Room Type:</FormLabel>
                    <Select
                        id="room-type"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                        width="300px"
                    >
                        <option value="" disabled>Select</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple</option>
                        <option value="suite">Suite</option>
                    </Select>
                    </FormControl>


                    {[
                    ['Room Rating', roomRating, setRoomRating],
                    ['Building Rating', buildingRating, setBuildingRating],
                    ['Bathroom Rating', bathroomRating, setBathroomRating],
                    ['Cleanliness Rating', cleanlinessRating, setCleanlinessRating],
                    ['Amenities Rating', amenitiesRating, setAmenitiesRating],
                    ].map(([label, value, setter], index) => (
                    <FormControl isRequired key={index} mb={4}>
                        <FormLabel fontSize="lg" >{label}</FormLabel>
                        <StarRating rating={value} setRating={setter} />
                    </FormControl>
                    ))}

                    <FormControl isRequired mb={4}>
                    <FormLabel htmlFor="review" fontSize="lg">Your Review</FormLabel>
                    <Textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience..."
                    />
                    </FormControl>

                    {/* File input for uploading photos */}
                    <FormControl mb={4}>
                    <FormLabel htmlFor="photos" fontSize="lg">Upload Photos:</FormLabel>
                    <Input
                        type="file"
                        id="photos"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                    </FormControl>

                    {photos.length > 0 && (
                    <FormControl mb={4}>
                        <FormLabel>Uploaded Photos:</FormLabel>
                        <ul>
                        {photos.map((photo, index) => (
                            <li key={index}>{photo.name}</li>
                        ))}
                        </ul>
                    </FormControl>
                    )}
                    <Center>
                        <Button color={"white"}
                        bg={"brand.200"}
                        href={"#"}
                        top={5}
                        _hover={{
                            bg: "brand.500",
                        }} type="submit">Submit Review</Button>
                    </Center>
                </form>
            </Stack>
        </Flex>
    </Box>
        
  );
};

export default WriteReview;
