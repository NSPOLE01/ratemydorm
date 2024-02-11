import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import SearchBar from "@/components/Searchbar";
import DormList from "@/components/DormList";

const homePage = () => {
  const dorms = [
    {
      id: 1,
      name: "Zeppos",
      imageUrl: "https://via.placeholder.com/150",
      rating: 5,
      reviewCount: 20,
    },
    {
      id: 2,
      name: "Roth",
      imageUrl: "https://via.placeholder.com/150",
      rating: 5,
      reviewCount: 15,
    },
    {
      id: 3,
      name: "Kissam",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 4,
      name: "Hank Ingram House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 5,
      name: "Stambaugh House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 6,
      name: "Sutherland House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 7,
      name: "Gilette House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
  ];
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 4, md: 10 }}
          py={{ base: 10, md: 30 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={"brand.100"}
          >
            Rate My <br />
            <Text as={"span"} color={"brand.200"}>
              Vandy
            </Text>
            Dorm
          </Heading>
          <Text color={"gray.500"}>
            Find and upload photos and reviews for dorms with other Vanderbilt
            students. Post your pictures, upload reviews, and find your new
            living space!
          </Text>
        </Stack>
      </Container>
      <SearchBar />
      <DormList dorms={dorms} />
    </>
  );
};

export default homePage;
