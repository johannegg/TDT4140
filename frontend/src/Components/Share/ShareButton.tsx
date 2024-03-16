import { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import ShareForm from "./ShareForm";

interface ShareButtonProps {
  gameId: number;
}

const ShareButton = ({ gameId }: ShareButtonProps) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    // Open the rating popup only if the user is logged in
    if (!localStorage.getItem("userInfo")) {
      alert("Du må være logget inn for å dele et spill");
      return;
    }
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <IoIosShareAlt
        onClick={handleButtonClick}
        size={30}
        style={{ cursor: "pointer" }}
      />
      {isPopupOpen && (
        <ShareForm onClose={handleClosePopup} gameCardId={gameId}></ShareForm>
      )}
    </>
  );
};

export default ShareButton;
