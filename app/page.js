import DormList from "@/components/DormList";
import Hero from "@/components/Hero";
import SearchBar from "@/components/Searchbar";

export default function HomePage() {
  const dorms = [
    {
      id: 1,
      name: "Zeppos",
      imageUrl: "https://via.placeholder.com/150",
      rating: 5,
      reviewCount: 20,
    },
    {
      id: 2,
      name: "Roth",
      imageUrl: "https://via.placeholder.com/150",
      rating: 5,
      reviewCount: 15,
    },
    {
      id: 3,
      name: "Kissam",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 4,
      name: "Hank Ingram House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 5,
      name: "Stambaugh House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 6,
      name: "Sutherland House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
    {
      id: 7,
      name: "Gilette House",
      imageUrl: "https://via.placeholder.com/150",
      rating: 4,
      reviewCount: 50,
    },
  ];
  return (
    <main>
      <Hero />
      <SearchBar />
      <DormList dorms={dorms} />
    </main>
  );
}
