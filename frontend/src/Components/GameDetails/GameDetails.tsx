import React from "react";
import "./GameDetails.css";
import familie from "../../Media/Familie.png";
import fest from "../../Media/Fest.png";
import barn from "../../Media/Barn.png";
import innendørs from "../../Media/Innendørs.png";
import utendørs from "../../Media/Utendørs.png";
import musikkquiz from "../../Media/Musikkquiz.png";
// import quiz from "../../Media/Quiz.png"; // need image
// import student from "../../Media/Student.png"; // need image
// import individuell from "../../Media/Individuell.png"; // need image
// import teambuilding from "../../Media/Teambuilding.png"; // need image
import RateButton from "../Rating/RateButton";
import RatingListView from "../RatingListView/RatingListView";
import { categories } from "../CategoryBox/utils/categories";
import FavoriteButton from "../Favorite/FavoriteButton";

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
  // Quiz: quiz, // need image
  // Student: student, // need image
  // Individuell: individuell, // need image
  // Teambuilding: teambuilding, // need image
};

type GameDetailsProps = {
  game: {
    id: string;
    title: string;
    categories: string[];
    description?: string;
    rules: string;
    averageRating?: number;
  };
};

export function GameDetails({ game }: GameDetailsProps, ) {
  const firstCategory = game.categories[0];
  const imageSrc = mappedImg[firstCategory];
  const ratingEndpoint: string = "http://localhost:8080/api/rating/get/gamecard/" + game.id;
  return (
    <div className="gameContainer">
      <div className="topSection">
        <div className="text">
          <div className="detailsHeader">
            <div className="topRow">
              <h1 className="titleDetail">{game.title}</h1>
              <FavoriteButton gameId={+game.id}></FavoriteButton>
            </div>
            <h3 className="avgrating">
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
            <div className="categories">{game.categories.map((cat) => <p className="category">{cat}</p>)}</div>
            <div className="descriptionDetail">{game.description}</div>
          </div>
          <div className="rules">{game.rules}</div>
        </div>
        <div className="imgContainer">
          <img src={imageSrc} alt="img" className="imgDetails" />
        </div>
      </div>
      <div className="commentsContainer">
        <RateButton game={game}></RateButton>
      <RatingListView
        ratingApiUrl={ratingEndpoint}  
      ></RatingListView>
      </div>
    </div>
  );
}
