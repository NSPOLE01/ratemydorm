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
  return (
    <main>
      <Hero />
    </main>
  );
}
