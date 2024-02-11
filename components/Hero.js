import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import DormList from "@/components/DormList";
import SearchBar from "@/components/Searchbar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../app/layout";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Hero = () => {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        // Query the 'dorms' collection
        const querySnapshot = await getDocs(collection(db, "dorms"));
        const dormsData = querySnapshot.docs.map((doc) => {
          // Assuming each dorm document has 'averageRating' and 'reviewCount' fields
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name, // Or however you're storing the dorm name
            imageUrl: data.imageUrl, // Make sure you have an imageUrl field in your documents
            averageRating: data.averageRating, // The field for the average rating
            reviewCount: data.reviewCount, // The field for the review count
            location: data.location,
          };
        });
        console.log("Dorms fetched:", dormsData); // Log fetched dorms data
        setDorms(dormsData);
      } catch (error) {
        console.error("Error fetching dorms data:", error);
      }
    };

    fetchDorms();
  }, []);

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

export default Hero;
