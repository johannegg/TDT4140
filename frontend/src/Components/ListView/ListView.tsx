import React from "react";
import "./ListView.css";
import { GameCard } from "../GameCard/GameCard";

const ListView = () => {
  return (
    <div className="listView">
      <div className="addGame"> + Add Game</div>

      <GameCard game={{
        id: "1",
        title: "Beer pong",
        categories: ["Fest", "18+"],
        description: "Dette er et spill",
        rating: 4.5,
      }}></GameCard>

      <GameCard game={{
        id: "2",
        title: "Cider pong",
        categories: ["Fest", "18+"],
        description: "Dette er også et spill",
        rating: 4.5,
      }}></GameCard>

      <GameCard game={{
        id: "3",
        title: "Brus pong",
        categories: ["Fest", "Barnebursdag"],
        description: "Dette er i hvert fall et spill",
        rating: 5,
      }}></GameCard>
    </div>
  );
};

export default ListView;
