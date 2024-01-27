"use client";

import Navbar from "@/components/Navbar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    100: "#000000", // main black
    200: "#A8996E", // main gold
    300: "#595959", // hover black
    400: "#FFFFFF", // main white
    500: "#D1C49D", // hover gold
  },
};

const theme = extendTheme({
  colors,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <Navbar />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
