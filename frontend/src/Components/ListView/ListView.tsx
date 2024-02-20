import { useEffect, useState } from "react";
import "./ListView.css";
import { GameCard } from "../GameCard/GameCard";

type GameCardType = {
  id: string;
  title: string;
  categories: string[];
  description: string;
  rating?: number;
};

interface ListViewProps {
  refreshKey: number;
  // categoriesToFilter: Array<boolean>;
  updateKey: number;
  searchInput: string;
}

const gameCardApiUrl = "http://localhost:8080/api/gamecard";

const ListView = ({ refreshKey, updateKey, searchInput/* , categoriesToFilter  */}: ListViewProps) => {
  const [gameCards, setGameCards] = useState<GameCardType[]>([]);

  const fetchGameCards = () => {
    fetch(`${gameCardApiUrl}/get/all`, {
      method: "GET",
    })
      .then((response) =>
        response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.message);
          }
          setGameCards(data);
        })
      )
      .catch((error) => {
        console.error("Error fetching game cards:", error);
        alert(error);
      });
  };

  useEffect(() => {
    fetchGameCards();
  }, []);

  useEffect(() => {
    fetchGameCards();
  }, [refreshKey]);

  const filteredGames = gameCards.filter((game) =>
    game.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // useEffect(() => {
  //   console.log("test");
  // }, [categoriesToFilter]);

  return (
    <div className="listView">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game}></GameCard>
      ))}
    </div>
  );
};

export default ListView;
