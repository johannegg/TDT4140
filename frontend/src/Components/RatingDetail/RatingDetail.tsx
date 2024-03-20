import RatingDeleteButton from "../DeleteButton/RatingDeleteButton";
import { useState } from "react";
import "./RatingDetail.css";
import { GiFlyingFlag } from "react-icons/gi";
import ReportForm from "../ReportForm/ReportForm";

type RatingDetailProps = {
  gameId: number;
  rating: {
    score: number;
    comment: string;
    username: string;
  };
  onUserPage?: boolean;
  gameCardId: number;
};

export function RatingDetail({
  gameId,
  rating,
  onUserPage,
  gameCardId,
}: RatingDetailProps) {
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
  const { score, comment, username } = rating;

  return (
    <div className="container">
      <div className="commentHeader">
        <p className="username">{username}</p>
        <p className="ratingScore">
          Rating:
          <span
            style={{
              marginLeft: "5px",
              fontSize: "20px",
              paddingTop: "10px",
              color: "gold",
            }}
          >
            &#9733; {/* Stjerne */}
          </span>{" "}
          {score}
        </p>
      </div>
      <div className="commentBottomRow">
        <p className="comment">{comment}</p>
        <div style={{display: "flex", gap: "10px"}}>
          {!onUserPage && (
            <GiFlyingFlag className="reportFlag" onClick={handleButtonClick} />
            )}
          <RatingDeleteButton gameId={gameId} ratingUsername={username} />
        </div>
        {isPopupOpen && (
          <ReportForm
            onClose={handleClosePopup}
            gameCardId={gameCardId}
            username={rating.username}
          />
        )}
      </div>
    </div>
  );
}
