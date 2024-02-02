import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  useEffect(() => {
    const fetchUserPhoto = async (email) => {
      console.log("test");
      if (email) {
        const userRef = doc(db, "users", email);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserPhoto(docSnap.data().photo);
        } else {
          console.log("No photo");
        }
      }
    };

    if (localStorage.getItem("userEmail")) {
      setUserEmail(localStorage.getItem("userEmail"));
      fetchUserPhoto(localStorage.getItem("userEmail"));
    }
  }, [userEmail]);

  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userEmail");
        setUserEmail(null);
        setUserPhoto("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NextLink href="/" passHref>
            <Text
              as="a" // Make the Text component behave like an anchor tag
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              cursor="pointer" // To show the link pointer cursor on hover
            >
              Rate My VandyDorm
            </Text>
          </NextLink>
        </Flex>

        <div>
          {userEmail ? (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <img
                src={userPhoto}
                alt="User"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <button onClick={signOutUser}>Sign Out</button>
            </Stack>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"signin"}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"brand.200"}
                href={"#"}
                _hover={{
                  bg: "brand.500",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </div>
      </Flex>
    </Box>
  );
}
