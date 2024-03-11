import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";
import familie from "../../Media/Familie.png";
import fest from "../../Media/Fest.png";
import barn from "../../Media/Barn.png";
import innendørs from "../../Media/Innendørs.png";
import utendørs from "../../Media/Utendørs.png";
import musikkquiz from "../../Media/Musikkquiz.png";
import FavoriteButton from "../Favorite/FavoriteButton";
import quiz from "../../Media/Quiz.png";
import student from "../../Media/Student.png";
import individuell from "../../Media/Individuell.png";
import teambuilding from "../../Media/Teambuilding.png";
import GameCardDeleteButton from "../DeleteButton/GameCardDeleteButton";

type CategoryMappedImg = {
  [key: string]: string | undefined;
};

const mappedImg: CategoryMappedImg = {
  Familie: familie,
  Fest: fest,
  Barn: barn,
  Innendørs: innendørs,
  Utendørs: utendørs,
  Musikkquiz: musikkquiz,
  Quiz: quiz,
  Student: student,
  Individuell: individuell,
  Teambuilding: teambuilding,
};

type GameCardProps = {
  game: {
    id: string;
    title: string;
    categories: string[];
    description: string;
    averageRating?: number;
  };
};

export function GameCard({ game }: GameCardProps) {
  const categoriesString = game.categories.join(", ");
  const firstCategory = game.categories[0];
  const imageSrc = mappedImg[firstCategory];
  const userInfoString = localStorage.getItem("userInfo");
  return (
    <Link to={`/spill/${game.id}`} style={{ textDecoration: "none" }}>
      <div className="gameCard">
        <div className="gameCardButtonPanel">
          <GameCardDeleteButton gameId={+game.id} />
          {userInfoString && <FavoriteButton gameId={+game.id}/>}
        </div>
        <img src={imageSrc} alt="img" className="imgCard" />
        <h2 className="title">{game.title}</h2>
        <h3 className="rating">
          Rating:
          {game.averageRating !== null ? (
            <>
              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '20px',
                  paddingTop: '10px',
                  color: 'gold'
                }}
              >
                &#9733; {/* Stjerne */}
              </span>
              {game.averageRating}
            </>
          ) : (
            <span style={{ marginLeft: '5px', color: 'gray' }}>Ingen</span>
          )}
        </h3>
        <div className="cardCategories">{categoriesString}</div>
        <div className="cardDescription">{game.description}</div>
      </div>
    </Link>
  );
}
