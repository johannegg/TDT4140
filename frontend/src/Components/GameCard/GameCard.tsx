import React from "react";
import "./GameCard.css";
import fest from "../../Media/Fest.png";

type CategoryMappedImg = {
  [key: string]: string | undefined;
};

const mappedImg: CategoryMappedImg = {
  Fest: fest,
  //TODO: Add more categories and images
};

type GameCardProps = {
  game: {
    id: string;
    title: string;
    categories: string[];
    description: string;
    rating?: number;
  };
};
export function GameCard({ game }: GameCardProps) {
  const categoriesString = game.categories.join(", ");
  const firstCategory = game.categories[0];
  const imageSrc = mappedImg[firstCategory];
  return (
    <div className="gameCard">
      <img src={imageSrc} alt="img" className="img" />
      <h1 className="title">{game.title}</h1>
      <h3 className="rating">Rating: {game.rating}</h3>
      <p className="category">Kategorier: {categoriesString}</p>
      <div className="description">{game.description}</div>
    </div>
  );
}
