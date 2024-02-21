import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import "./Rating.css";

const ratingApiUrl = "http://localhost:8080/api/rating";

interface RatingProps {
  onClose: () => void;
  game: {
    id: string;
    title: string;
    categories: string[];
    description?: string;
    rules: string;
    rating?: number;
  };
}

interface RatingData {
  comment?: string;
  score: number;
  gameCardId: number;
}

const Rating: React.FC<RatingProps> = ({ onClose, game }) => {
  let gameId = +game.id;

  const [ratingData, setRatingData] = useState<RatingData>({
    comment: "",
    score: 0,
    gameCardId: gameId,
  });

  const handleRatingChange = (newRating: number) => {
    setRatingData({
      ...ratingData,
      score: newRating,
    });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRatingData({
      ...ratingData,
      comment: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      alert("Logg inn for å legge til rating");
      return;
    }
    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.accessToken;

    if (!token) {
      alert("Logg inn for å legge til rating");
      return;
    }

    const requestBodySubmit = JSON.stringify({
      ...ratingData,
      username: userInfo.username,
    });

    try {
      const response = await fetch(`${ratingApiUrl}/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: requestBodySubmit,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert("Du har gitt en rating!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error during rating:", error);
      alert(error);
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <div className="popup-content">
          <div className="close-button" onClick={onClose}>
            <FaTimes />
          </div>
          <h2>Gi rating</h2>
          <div>
            <div>Rating:</div>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  onClick={() => handleRatingChange(value)}
                  color={value <= ratingData.score ? "gold" : "gray"}
                  size={30}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
          <div>
            <div>Kommentar:</div>
            <textarea
              className="comment"
              rows={4}
              cols={50}
              value={ratingData.comment}
              onChange={handleCommentChange}
              placeholder="Hva synes du om leken?"
            />
          </div>

          <button className="submitRating">Send inn rating</button>
        </div>
      </form>
    </div>
  );
};

export default Rating;
