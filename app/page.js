import LandingPage from "@/components/LandingPage";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./layout"; // Make sure this import path is correct

export default function HomePage() {
  return (
    <ChakraProvider theme={theme}>
      <main>
        <LandingPage />
      </main>
    </ChakraProvider>
  );
}
