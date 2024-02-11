import {
  Box,
  Heading,
  Container,
  Text,
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Flex minHeight="95vh" width="100%" align="center" justify="center">
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 30 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "5xl", md: "8xl" }}
            lineHeight={"110%"}
            color={"brand.100"}
          >
            Rate My <br />
            <Text as={"span"} color={"brand.200"}>
              Dorm
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Find and upload photos and reviews for dorms with other Vanderbilt
            students. Post your pictures, upload reviews, and find your new
            living space!
          </Text>
          <Stack direction={"row"} spacing={6} justify={"center"}>
            <Button
              as={"a"}
              variant={"outline"}
              color={"brand.200"}
              borderColor={"brand.200"}
              borderWidth={"3px"}
              borderRadius={"full"}
              href={"signin"}
            >
              SIGN IN
            </Button>
            <Button bg={"brand.200"} color="white" borderRadius="full">
              SIGN UP
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default LandingPage;
