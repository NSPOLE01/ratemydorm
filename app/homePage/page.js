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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        // Query the 'dorms' collection
        const querySnapshot = await getDocs(collection(db, "dorms"));
        let dormsData = querySnapshot.docs.map((doc) => {
          // Assuming each dorm document has 'averageRating' and 'reviewCount' fields
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            imageUrl: data.imageUrl, // Make sure you have an imageUrl field in your documents
            averageRating: data.averageRating, // The field for the average rating
            reviewCount: data.reviewCount, // The field for the review count
            location: data.location,
          };
        });

        if (searchQuery) {
          dormsData = dormsData.filter(dorm => 
            dorm.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        }
        console.log(selectedLocation);
        if (selectedLocation) {
          dormsData = dormsData.filter(dorm => 
            dorm.location === selectedLocation
          );
        }
  
        console.log("Dorms fetched:", dormsData); // Log fetched dorms data
        setDorms(dormsData);
      } catch (error) {
        console.error("Error fetching dorms data:", error);
      }
    };

    fetchDorms();
  }, [searchQuery, selectedLocation]);

  return (
    <main>
      <Hero />
      <SearchBar 
      onTagChange={(location) => setSelectedLocation(location)}
      onSearch={(query) => setSearchQuery(query)} 
      selectedTag={selectedLocation}
      />
      <DormList dorms={dorms} />
    </main>
  );
}
