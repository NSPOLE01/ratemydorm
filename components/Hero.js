import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

const Hero = () => {
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
    </>
  );
};

export default Hero;
