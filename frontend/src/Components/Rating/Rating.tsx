import React, { useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import "./Rating.css";

interface RatingProps {
  onClose: () => void
}

const Rating: React.FC<RatingProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
 


  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if(rating > 0){
      onClose();
    } else {
      alert('Du må velge rating før du sender inn.');
    }
  }

  return (
    <div className="popup">
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
                color={value <= rating ? 'gold' : 'gray'}
                size={30}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div>
          <div>Kommentar:</div>
          <textarea className='comment'
            rows={4}
            cols={50}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Hva synes du om leken?"
          />
        </div>
    
        <button className='submitRating' onClick={handleSubmit}>Send inn rating</button>
      </div>
    </div>
  );
};

export default Rating;
