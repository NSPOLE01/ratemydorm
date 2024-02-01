// import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import React from "react";

// export default function SignInPage() {
// const navigate = useNavigate();

// const logOut = () => {
//   signOut(auth)
//     .then(() => {
//       console.log("Successfully logged out.");
//     })
//     .catch((error) => {
//       console.error(error.code);
//     });
// };

// const handleLogIn = async () => {
//   const provider = new GoogleAuthProvider();

//   await signInWithPopup(auth, provider)
//     .then((result) => {
//       // The signed-in user info.
//       const user = result.user;
//       if (!user.email.endsWith("@vanderbilt.edu")) {
//         logOut();
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   onAuthStateChanged(auth, async (user) => {
//     //make sure user is a Vanderbilt user
//     if (user && user.email.endsWith("@vanderbilt.edu")) {
//       console.log("auth changed");
//       const userEmail = user.email;
//       const userIdRef = doc(db, "userIDMap", userEmail);
//       let docSnap = await getDoc(userIdRef);

//       if (!docSnap.exists()) {
//         let newId = user.email.substring(0, user.email.indexOf("@"));
//         newId = newId.replace(/[^a-zA-Z ]/g, "");
//         await setDoc(doc(db, "userIDMap", user.email), {
//           userId: newId,
//         });

//         docSnap = await getDoc(userIdRef);
//       }
//       let id = docSnap.data().userId;
//       const userDataRef = doc(db, "users", id);
//       const userDataSnap = await getDoc(userDataRef);

//       if (!userDataSnap.exists()) {
//         await setDoc(doc(db, "users", id), {
//           likedItems: [],
//         });
//       }
//     }
//     navigate("/");
//   });
// };

// return <>Hi</>;

"use client";
import React from "react";
import { Button, Center, Image, VStack, Text } from "@chakra-ui/react";
import { Google } from "react-bootstrap-icons";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  db,
} from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const SignInPage = () => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      await setDoc(doc(db, "users", `${user.email}`), {
        name: user.displayName,
        photo: user.photoURL,
        email: user.email,
      });
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center h="80vh">
      <VStack spacing={4} p={8} bg="white" boxShadow="md" borderRadius="lg">
        <Google />
        <Text fontSize="xl" fontWeight="bold">
          Sign in with Google
        </Text>
        <Button onClick={handleSignIn} bg={"brand.200"} leftIcon={<Google />}>
          Sign In
        </Button>
      </VStack>
    </Center>
  );
};

export default SignInPage;
