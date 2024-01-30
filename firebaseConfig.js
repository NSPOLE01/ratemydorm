import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7-BZhZORrSXzArzZCN7rSiGBZwTrkyWo",
  authDomain: "ratemydorm-4c226.firebaseapp.com",
  projectId: "ratemydorm-4c226",
  storageBucket: "ratemydorm-4c226.appspot.com",
  messagingSenderId: "336716013862",
  appId: "1:336716013862:web:5bfb0e94611e4aa78e21e7",
  measurementId: "G-58PGYJL4XD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
