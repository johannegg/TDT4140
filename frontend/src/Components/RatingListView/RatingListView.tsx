import { useCallback, useEffect, useState } from "react";
import { RatingDetail } from "../RatingDetail/RatingDetail";
import "../RatingListView/RatingListView.css";

type RatingDetailType = {
    gameCardId: number;
    score: number;
    comment: string;
    username: string;
    title?: string;
};

interface RatingListViewProps {
    ratingApiUrl: string;
    onUserPage?: boolean;
}

const RatingListView = ({
    ratingApiUrl,
    onUserPage
}: RatingListViewProps) => {
    const [ratings, setRatings] = useState<RatingDetailType[]>([]);
    const ratingListViewClassName = onUserPage ? "ratingViewUserPage" : "ratingListView";
    const fetchRatings = useCallback(async () =>{
        fetch(`${ratingApiUrl}`, {
            method: "GET",
        })
            .then((response) =>
                response.json().then((data) => {
                    if (!response.ok) {
                        throw new Error(data.message);
                    }
                    if (onUserPage) {
                        // Fetch the game titles when on the user page
                        Promise.all(data.map((rating: RatingDetailType) =>
                            fetch(`http://localhost:8080/api/gamecard/get/id/${rating.gameCardId}`)
                                .then(response => response.json())
                                .then(game => ({ ...rating, title: game.title }))
                        ))
                            .then(ratingsWithTitles => setRatings(ratingsWithTitles))
                            .catch(error => console.error("Error fetching game titles:", error));
                    } else {
                        setRatings(data);
                    }
                })
            )
            .catch((error) => {
                console.error("Error fetching ratings:", error);
                alert(error);
            });
    }, [ratingApiUrl, onUserPage]);

    useEffect(() => {
        fetchRatings();
    }, [fetchRatings]);

    return (
        <div className={ratingListViewClassName}>
            {ratings.map((rating) => (
                <div className="profilePageDiv" key={rating.gameCardId}>
                    <h2>{rating.title}</h2>
                    <RatingDetail rating={rating}></RatingDetail>
                </div>
            ))}
            {ratings.length === 0 && (
                <p>
                    {onUserPage
                        ? 'Ingen rating er lagt inn for dette spillet av brukeren.'
                        : 'Ingen rating er lagt inn for dette spillet.'}
                </p>
            )}
        </div>
    );
};
export default RatingListView;
