import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";
import fest from "../../Media/Fest.png";
import barn from "../../Media/Barn.png";
import familie from "../../Media/Familie.png";
import innendørs from "../../Media/Innendørs.png";
import quiz from "../../Media/Quiz.png";
import utendørs from "../../Media/Utendørs.png";

type CategoryMappedImg = {
  [key: string]: string | undefined;
};

const mappedImg: CategoryMappedImg = {
  Barn: barn,
  Familie: familie,
  Fest: fest,
  Innendørs: innendørs,
  Quiz: quiz,
  Utendørs: utendørs,
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
    <Link to={`/spill/${game.id}`} style={{ textDecoration: "none" }}>
      <div className="gameCard">
        <img src={imageSrc} alt="img" className="imgCard" />
        <h2 className="title">{game.title}</h2>
        {/* <h3 className="rating">Rating: {game.rating}</h3> */}
        <div className="cardCategories">{categoriesString}</div>
        <div className="cardDescription">{game.description}</div>
      </div>
    </Link>
  );
}
