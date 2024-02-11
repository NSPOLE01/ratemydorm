import { db } from "@/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export async function addReviewAndUpdateStats(dormId, newRating) {
  const dormRef = doc(db, "dorms", dormId);
  const dormDoc = await getDoc(dormRef);

  if (dormDoc.exists()) {
    const data = dormDoc.data();
    const currentAverage = data.averageRating || 0;
    const currentCount = data.reviewCount || 0;

    // Calculate new average rating
    const newAverage =
      (currentAverage * currentCount + newRating) / (currentCount + 1);

    // Update dorm document with new average and incremented review count
    await updateDoc(dormRef, {
      averageRating: newAverage,
      reviewCount: currentCount + 1,
    });
  }
}
