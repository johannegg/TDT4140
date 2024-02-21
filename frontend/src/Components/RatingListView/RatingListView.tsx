import { useCallback, useEffect, useState } from "react";
import { RatingDetail } from "../RatingDetail/RatingDetail";
import "../ListView/ListView.css";

type RatingDetailType = {
    gameCardId: number; 
    score: number;
    comment: string;
    username: string;
};

interface RatingListViewProps {
    ratingApiUrl: string;
}

const RatingListView = ({
    ratingApiUrl
}: RatingListViewProps) => {
    const [ratings, setRatings] = useState<RatingDetailType[]>([]);
    
    const fetchRatings = useCallback(() => {
        fetch(`${ratingApiUrl}`,{
            method: "GET",
        })
            .then((response) =>
                response.json().then((data) => {
                    if (!response.ok) {
                        throw new Error(data.message);
                    }
                    setRatings(data);
                })
            )
            .catch((error) => {
                console.error("Error fetching ratings:", error);
                alert(error);
            });
    }, [ratingApiUrl]);

    useEffect(() => {
        fetchRatings();
    }, [fetchRatings]);

    return (
        <div className="ratingListView">
            {ratings.map((rating) => (
                <RatingDetail rating={rating}></RatingDetail>
            ))}
            {ratings.length === 0 && (
                <p>Ingen rating er lagt inn for dette spillet.</p>
            )}
        </div>
    );
};
export default RatingListView;
