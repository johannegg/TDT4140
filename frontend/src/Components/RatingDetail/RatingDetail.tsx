import RatingDeleteButton from "../DeleteButton/RatingDeleteButton";
import "./RatingDetail.css";

type RatingDetailProps = {
  gameId: number;
  rating: {
    score: number;
    comment: string;
    username: string;
  };
};

export function RatingDetail({ gameId, rating }: RatingDetailProps) {
  const { score, comment, username } = rating;

  return (
    <div className="container">
      <div className="commentHeader">
        <p className="username">{username}</p>
        <p className="ratingScore">Rating:
          <span
            style={{
              marginLeft: '5px',
              fontSize: '20px',
              paddingTop: '10px',
              color: 'gold'
            }}
          >
            &#9733; {/* Stjerne */}
          </span> {score}</p>
      </div>
      <div className="commentBottomRow">
        <p className="comment">{comment}</p>
        <RatingDeleteButton gameId={gameId} ratingUsername={username} />
      </div>
    </div>
  );
}
