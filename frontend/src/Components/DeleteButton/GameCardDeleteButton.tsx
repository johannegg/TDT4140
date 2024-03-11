import { useCallback, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface GameCardDeleteButtonProps {
    gameId: number;
}

const GameCardDeleteButton = ({
    gameId,
}: GameCardDeleteButtonProps) => {

    const apiUrl = "http://localhost:8080/api/gamecard/delete/id/" + gameId;
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

    const deleteGameCard = useCallback(() => {
        if (!window.confirm("Er du sikker på at du vil slette leken?")) {
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
                    alert("Lek slettet!");
                    window.location.reload();
                })
            )
            .catch((error) => {
                console.error("Error deleting game card:", error);
                alert(error);
            });
    }, []);

    return (
        isModerator ? (
            <FaTrashCan
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    deleteGameCard();
                }}
                color={"red"}
                size={30}
                style={{ cursor: "pointer" }}
            />
        ) : null
    );
};

export default GameCardDeleteButton;