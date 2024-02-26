import { db } from "@/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export async function addReviewAndUpdateStats(dormId, newRating, roomRating, buildingRating, bathroomRating, cleanlinessRating, amenitiesRating) {
  console.log(newRating);
  const dormRef = doc(db, "dorms", dormId);
  const dormDoc = await getDoc(dormRef);

  if (dormDoc.exists()) {
    const data = dormDoc.data();
    const currentCount = data.reviewCount || 0;
    
    // Initialize current averages
    const currentAverageRating = data.averageRating || 0;
    const currentAverageAmenities = data.averageAmenities || 0;
    const currentAverageBathroom = data.averageBathroom || 0;
    const currentAverageBuilding = data.averageBuilding || 0;
    const currentAverageCleanliness = data.averageCleanliness || 0;
    const currentAverageRoom = data.averageRoom || 0;


    // Calculate new averages for each category
    const newAverageRating = Number(
      ((currentAverageRating * currentCount + newRating) / (currentCount + 1)).toFixed(1)
    );
    const newAverageAmenities = Number(
      ((currentAverageAmenities * currentCount + amenitiesRating) / (currentCount + 1)).toFixed(1)
    );
    const newAverageBathroom = Number(
      ((currentAverageBathroom * currentCount + bathroomRating) / (currentCount + 1)).toFixed(1)
    );
    const newAverageBuilding = Number(
      ((currentAverageBuilding * currentCount + buildingRating) / (currentCount + 1)).toFixed(1)
    );
    const newAverageCleanliness = Number(
      ((currentAverageCleanliness * currentCount + cleanlinessRating) / (currentCount + 1)).toFixed(1)
    );
    const newAverageRoom = Number(
      ((currentAverageRoom * currentCount + roomRating) / (currentCount + 1)).toFixed(1)
    );
    

    // Update dorm document with new averages and incremented review count
    await updateDoc(dormRef, {
      averageRating: newAverageRating,
      averageAmenities: newAverageAmenities,
      averageBathroom: newAverageBathroom,
      averageBuilding: newAverageBuilding,
      averageCleanliness: newAverageCleanliness,
      averageRoom: newAverageRoom,
      reviewCount: currentCount + 1,
    });
  }
}

