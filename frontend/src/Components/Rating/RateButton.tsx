import React, { useState } from 'react';
import Rating from './Rating';

interface RateButtonProps {
  game: {
    id: string;
    title: string;
    categories: string[];
    description?: string;
    rules: string;
    rating?: number;
  };
}

const TestRating: React.FC<RateButtonProps> = ({ game }: RateButtonProps) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    // Open the rating popup only if the user is logged in
    if (!localStorage.getItem('userInfo')) {
      alert('Du må være logget inn for å vurdere et spill');
      return;
    }
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        style={{
          padding: '8px 12px',
          fontSize: '18px',
          position: 'relative',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

        }}
      >
        Rate
        <span
          style={{
            marginLeft: '5px',
            fontSize: '24px',
            color: 'gold'
          }}
        >
          &#9733; {/* Stjerne */}
        </span>
      </button>
      {isPopupOpen && <Rating onClose={handleClosePopup} game={game} />}
    </div>
  );
};

export default TestRating;
