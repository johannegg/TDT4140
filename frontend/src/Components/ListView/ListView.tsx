import React, { useEffect, useState } from "react";
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
}

const gameCardApiUrl = "http://localhost:8080/api/gamecard";

const ListView = ({ refreshKey }: ListViewProps) => {
  const [gameCards, setGameCards] = useState<GameCardType[]>([]);

  const fetchGameCards = () => {
    fetch(`${gameCardApiUrl}/get/all`, {
      method: "GET",
    })
      .then(response => response.json().then(data => {
        if (!response.ok) {
          throw new Error(data.message);
        }
        setGameCards(data);
      }))
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

  return (
    <div className="listView">
      {gameCards.map((game) => (
        <GameCard key={game.id} game={game}></GameCard>
      ))}
    </div>
  );
};

export default ListView;
