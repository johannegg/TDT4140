import React, { useState } from 'react';
import Rating from './Rating';


interface RateButtonProps {}

const TestRating: React.FC<RateButtonProps> = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
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
      {isPopupOpen && <Rating onClose={handleClosePopup} />}
    </div>
  );
};

export default TestRating;
