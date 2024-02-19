import React from "react";
import "./GameDetails.css";
import fest from "../../Media/Fest.png";
import barn from "../../Media/Barn.png";
import familie from "../../Media/Familie.png";
import innendørs from "../../Media/Innendørs.png";
import quiz from "../../Media/Quiz.png";
import utendørs from "../../Media/Utendørs.png";
import RateButton from "../Rating/RateButton";

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

type GameDetailsProps = {
  game: {
    id: string;
    title: string;
    categories: string[];
    description?: string;
    rules: string;
    rating?: number;
  };
};

export function GameDetails({ game }: GameDetailsProps) {
  const firstCategory = game.categories[0];
  const imageSrc = mappedImg[firstCategory];
  return (
    <div className="gameContainer">
      <div className="topSection">
        <div className="text">
          <div className="detailsHeader">
            <h1 className="titleDetail">{game.title}</h1>
            <div className="descriptionDetail">{game.description}</div>
          </div>
          <div className="rules">{game.rules}</div>
        </div>
        <div className="imgContainer">
          <img src={imageSrc} alt="img" className="imgDetails" />
        </div>
      </div>
      {game.rating && <p className="rating">Rating: {game.rating}</p>}
      <RateButton></RateButton>
      <div className="commentsContainer">
        <h2>Kommentarer</h2>
        <div>Test kommentar</div>
      </div>
    </div>
  );
}
