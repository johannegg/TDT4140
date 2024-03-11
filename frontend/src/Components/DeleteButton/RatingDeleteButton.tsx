import { useCallback, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

interface RatingDeleteButtonProps {
    gameId: number;
    ratingUsername: string;
}

const RatingDeleteButton = ({
    gameId,
    ratingUsername,
}: RatingDeleteButtonProps) => {

    const apiUrl = "http://localhost:8080/api/rating/delete/" + gameId + "/" + ratingUsername;
    const [isModerator, setIsModerator] = useState(false);

    useEffect(() => {
        const userInfoString = localStorage.getItem("userInfo");
        if (!userInfoString) {
            return;
        }

        const userInfo = JSON.parse(userInfoString);
        const roles = userInfo.roles;

        if (roles.includes("ROLE_MODERATOR")) {
            setIsModerator(true);
        }
    }, []);

    const deleteRating = useCallback(() => {
        if (!window.confirm("Er du sikker på at du vil slette vurderingen?")) {
            return;
        }
        
        const userInfoString = localStorage.getItem("userInfo");
        if (!userInfoString) {
            return;
        }

        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.accessToken;
        const roles = userInfo.roles;

        if (!token || !roles.includes("ROLE_MODERATOR")) {
            return;
        }

        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) =>
                response.json().then((data) => {
                    if (!response.ok) {
                        throw new Error(data.message);
                    }
                    alert("Vurdering slettet!");
                    window.location.reload();
                })
            )
            .catch((error) => {
                console.error("Error deleting rating:", error);
                alert(error);
            });
    }, []);

    return (
        isModerator ? (
            <FaTrashCan
                onClick={() => {
                    deleteRating();
                }}
                color={"red"}
                size={30}
                style={{ cursor: "pointer" }}
            />
        ) : null
    );
};

export default RatingDeleteButton;