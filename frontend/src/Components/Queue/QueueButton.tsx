import React, { useCallback, useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";
import { useLocation } from "react-router-dom";

const queueApiUrl = "http://localhost:8080/api/queue";

interface QueueButtonProps {
  gameId: number;
}

const QueueButton = ({ gameId }: QueueButtonProps) => {
  const [isInQueue, setIsInQueue] = useState<boolean>(false);
  const location = useLocation();

  const fetchQueueState = useCallback(() => {
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

    fetch(`${queueApiUrl}/check`, {
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
          setIsInQueue(data.isInQueue);
        })
      )
      .catch((error) => {
        console.error("Error fetching queued state:", error);
        alert(error);
      });
  }, [gameId]);

  useEffect(() => {
    fetchQueueState();
  }, [fetchQueueState]);

  const handleQueueToggle = async () => {
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      alert("Logg inn for å legge til i køen");
      return;
    }

    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.accessToken;

    if (!token) {
      alert("Logg inn for å legge til i køen");
      return;
    }

    const requestBodyToggle = JSON.stringify({
      gameCardId: gameId,
      username: userInfo.username,
    });

    const response = await fetch(`${queueApiUrl}/toggle`, {
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

    setIsInQueue(!isInQueue);

    if (location.pathname === "/profil") {
      window.location.reload();
    }
  };

  return (
    <div>
      {isInQueue ? <IoMdCheckmark
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleQueueToggle();
        }}
        color={"black"}
        size={30}
        style={{ cursor: "pointer" }}
      /> : <GrAdd
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleQueueToggle();
        }}
        color={"black"}
        size={30}
        style={{ cursor: "pointer" }}
      />}
    </div>
  );
};

export default QueueButton;
