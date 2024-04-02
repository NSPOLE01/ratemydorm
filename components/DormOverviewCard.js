import { React, useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { onSnapshot, doc, average } from "firebase/firestore";
import {
  Input,
  InputGroup,
  Flex,
  Text,
  Box,
  Center,
  Select,
  Button,
  extendTheme,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export const StarRating = ({ rating }) => {
  // Total number of stars
  const totalStars = 5;

  // Calculate the full, half and empty stars
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "auto" }}>
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar
            key={`full-${index}`}
            color="#A8996E"
            style={{ marginRight: "6px" }}
          />
        ))}
      {halfStars > 0 && (
        <FaStar key="half" color="#A8996E" style={{ marginRight: "6px" }} />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaStar
            key={`empty-${index}`}
            color="#e4e5e9"
            style={{ marginRight: "6px" }}
          />
        ))}
    </div>
  );
};

function DormOverviewCard({ dormId }) {
  const [averages, setAverages] = useState({
    overallAverageRating: null,
    averageAmenitiesRating: null,
    averageBathroomRating: null,
    averageBuildingRating: null,
    averageCleanlinessRating: null,
    averageRoomRating: null,
  });

  useEffect(() => {
    if (dormId) {
      const dormRef = doc(db, "dorms", dormId);
      const unsubscribe = onSnapshot(
        dormRef,
        (doc) => {
          if (doc.exists()) {
            setAverages({
              overallAverageRating: doc.data().averageRating,
              averageAmenitiesRating: doc.data().averageAmenities,
              averageBathroomRating: doc.data().averageBathroom,
              averageBuildingRating: doc.data().averageBuilding,
              averageCleanlinessRating: doc.data().averageCleanliness,
              averageRoomRating: doc.data().averageRoom,
            });
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error getting document:", error);
        }
      );

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [dormId]);
  const isDataLoaded = averages.overallAverageRating !== null;

  return (
    <>
      {isDataLoaded && averages.overallAverageRating > 0 && (
        <Center>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            maxW="lg"
            w="300px"
            m={7}
            p={5}
          >
            <Text
              as="div"
              fontWeight={700}
              fontSize="1.5rem"
              textAlign="center"
            >
              {" "}
              {/* Center align text */}
              Overall Rating
              <br />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "2.5rem",
                  justifyContent: "center",
                }}
              >
                {" "}
                {/* Center align flex content */}
                {averages.overallAverageRating}
                <FaStar
                  key="half"
                  color="#A8996E"
                  style={{ marginLeft: "20px", width: "40px", height: "40px" }}
                />
              </span>
            </Text>
            <Text
              as="div"
              fontWeight={700}
              fontSize="1.3rem"
              mt={3}
              textAlign="center"
            >
              {" "}
              {/* Center align text */}
              Breakdown
            </Text>
            <Box as="div" textAlign="center">
              {" "}
              {/* Center align text */}
              <Text mb={2} mt={2}>
                Room
              </Text>
              <Center>
                {" "}
                {/* Center align StarRating */}
                <StarRating rating={averages.averageRoomRating ?? 0} />
              </Center>
              <Text mb={2} mt={2}>
                Amenities
                <br />
              </Text>
              <Center>
                {" "}
                {/* Center align StarRating */}
                <StarRating rating={averages.averageAmenitiesRating ?? 0} />
              </Center>
              <Text mb={2} mt={2}>
                Bathroom
                <br />
              </Text>
              <Center>
                {" "}
                {/* Center align StarRating */}
                <StarRating rating={averages.averageBathroomRating ?? 0} />
              </Center>
              <Text mb={2} mt={2}>
                Building
                <br />
              </Text>
              <Center>
                {" "}
                {/* Center align StarRating */}
                <StarRating rating={averages.averageBuildingRating ?? 0} />
              </Center>
              <Text mb={2} mt={2}>
                Cleanliness
                <br />
              </Text>
              <Center>
                {" "}
                {/* Center align StarRating */}
                <StarRating rating={averages.averageCleanlinessRating ?? 0} />
              </Center>
            </Box>
          </Box>
        </Center>
      )}
    </>
  );
}

export default DormOverviewCard;
