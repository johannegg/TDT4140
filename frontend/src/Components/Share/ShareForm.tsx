import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./ShareForm.css";

const shareApiUrl = "http://localhost:8080/api/notification/send";

interface ShareProps {
  onClose: () => void;
  gameCardId: number;
}

interface ShareData {
  sender: string;
  receiver: string;
  gameCardId: number;
  comment?: string;
}

const ShareForm: React.FC<ShareProps> = ({ onClose, gameCardId }) => {
  const [shareData, setShareData] = useState<ShareData>({
    sender: "",
    receiver: "",
    gameCardId: gameCardId,
    comment: "",
  });

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShareData({
      ...shareData,
      comment: event.target.value,
    });
  };
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShareData({
      ...shareData,
      receiver: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      alert("Logg inn for å dele lek");
      return;
    }
    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.accessToken;
    if (!token) {
      alert("Logg inn for å dele lek");
      return;
    }
    const requestBodySubmit = JSON.stringify({
      ...shareData,
      sender: userInfo.username,
    });
    try {
      const response = await fetch(`${shareApiUrl}`, {
        method: "POST",
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
      alert("Du har delt spillet med!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error during sharing:", error);
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
          <h2>Del lek</h2>
          <div>Del lek med:</div>
          <input
            className="comment shareInput"
            value={shareData.receiver}
            onChange={handleUserChange}
            type="text"
            placeholder="Hvem ønsker du å dele leken med?"
          />
          <div>
            <div>Kommentar:</div>
            <textarea
              className="comment"
              rows={4}
              cols={50}
              value={shareData.comment}
              onChange={handleCommentChange}
              placeholder="Skriv en melding..."
            />
          </div>
          <button className="share">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ShareForm;
