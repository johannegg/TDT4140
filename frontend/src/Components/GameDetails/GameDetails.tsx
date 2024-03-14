import { useState } from "react";
import "./GameDetails.css";
import familie from "../../Media/Familie.png";
import fest from "../../Media/Fest.png";
import barn from "../../Media/Barn.png";
import innendørs from "../../Media/Innendørs.png";
import utendørs from "../../Media/Utendørs.png";
import musikkquiz from "../../Media/Musikkquiz.png";
import quiz from "../../Media/Quiz.png";
import student from "../../Media/Student.png";
import individuell from "../../Media/Individuell.png";
import teambuilding from "../../Media/Teambuilding.png";
import RateButton from "../Rating/RateButton";
import RatingListView from "../RatingListView/RatingListView";
import FavoriteButton from "../Favorite/FavoriteButton";
import { GiFlyingFlag } from "react-icons/gi";
import Timer from "./Timer";
import GameCardDeleteButton from "../DeleteButton/GameCardDeleteButton";
import QueueButton from "../Queue/QueueButton";
import ReportForm from "../ReportForm/ReportForm";

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

export function GameDetails({ game }: GameDetailsProps) {
  const firstCategory = game.categories[0];
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    // Open the popup only if the user is logged in
    if (!localStorage.getItem("userInfo")) {
      alert("Du må være logget inn for å rapportere et spill");
      return;
    }
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const imageSrc = mappedImg[firstCategory];
  const ratingEndpoint: string =
    "http://localhost:8080/api/rating/get/gamecard/" + game.id;
  return (
    <div className="gameContainer">
      <div className="topSection">
        <div className="text">
          <div className="detailsHeader">
            <div className="topRow">
              <h1 className="titleDetail">{game.title}</h1>
              <div className="gameDetailsButtons">
                <GameCardDeleteButton gameId={+game.id}></GameCardDeleteButton>
                <QueueButton gameId={+game.id}/>
                <FavoriteButton gameId={+game.id}></FavoriteButton>
              </div>
            </div>
            <h3 className="avgrating">
              Rating:
              {game.averageRating !== null ? (
                <>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "20px",
                      paddingTop: "10px",
                      color: "gold",
                    }}
                  >
                    &#9733; {/* Stjerne */}
                  </span>
                  {game.averageRating}
                </>
              ) : (
                <span style={{ marginLeft: "5px", color: "gray" }}>Ingen</span>
              )}
            </h3>
            <div className="categories">
              {game.categories.map((cat) => (
                <p className="category">{cat}</p>
              ))}
            </div>
            <div className="descriptionDetail">{game.description}</div>
            <GiFlyingFlag className="reportFlag" onClick={handleButtonClick} />
          </div>
          <div className="rules">{game.rules}</div>
        </div>
        <div className="imgContainer">
          <img src={imageSrc} alt="img" className="imgDetails" />
        </div>
        {isPopupOpen && (
          <ReportForm onClose={handleClosePopup} gameCardId={+game.id} />
        )}
      </div>
      <div className="commentsTimerContainer">
        <div className="commentsContainer">
          <RateButton game={game}></RateButton>
          <RatingListView ratingApiUrl={ratingEndpoint}></RatingListView>
        </div>
        <div>
          <Timer></Timer>
        </div>
      </div>
    </div>
  );
}
