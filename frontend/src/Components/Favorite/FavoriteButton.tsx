import React, { useState, useEffect, useCallback } from "react";
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const favoriteApiUrl = "http://localhost:8080/api/favorites";

interface FavoriteButtonProps {
    gameId: number;
}

const FavoriteButton = ({
    gameId,
}: FavoriteButtonProps) => {

    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const location = useLocation();

    const fetchFavoriteState = useCallback(() => {

        const userInfoString = localStorage.getItem("userInfo");
        if (!userInfoString) {
            return;
        }

        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.accessToken;

        if (!token) {
            return;
        }

        const checkRequestBody = JSON.stringify({
            gameCardId: gameId,
            username: userInfo.username,
        });

        fetch(`${favoriteApiUrl}/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: checkRequestBody,
        })
            .then((response) =>
                response.json().then((data) => {
                    if (!response.ok) {
                        throw new Error(data.message);
                    }
                    setIsFavorited(data.isFavorite);
                })
            )
            .catch((error) => {
                console.error("Error fetching favorited state:", error);
                alert(error);
            });
    }, [gameId]);

    useEffect(() => {
        fetchFavoriteState();
    }, [fetchFavoriteState]);

    const handleFavoriteToggle = async () => {

        const userInfoString = localStorage.getItem("userInfo");
        if (!userInfoString) {
            alert("Logg inn for å legge til i favoritter");
            return;
        }

        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.accessToken;

        if (!token) {
            alert("Logg inn for å legge til i favoritter");
            return;
        }

        const requestBodyToggle = JSON.stringify({
            gameCardId: gameId,
            username: userInfo.username,
        });

        const response = await fetch(`${favoriteApiUrl}/toggle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: requestBodyToggle,
        });

        const data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }

        setIsFavorited(!isFavorited);

        if (location.pathname === '/profil') {
            window.location.reload();
        }
    };

    return (
        <FaHeart
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleFavoriteToggle();
            }}
            color={isFavorited ? "red" : "gray"}
            size={30}
            style={{ cursor: "pointer" }}
        />
    );
};

export default FavoriteButton;