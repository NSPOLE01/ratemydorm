"use client";

import DormList from "@/components/DormList";
import Hero from "@/components/Hero";
import SearchBar from "@/components/Searchbar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../layout";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function HomePage() {
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
    <main>
      <Hero />
      <SearchBar />
      <DormList dorms={dorms} />
    </main>
  );
}
