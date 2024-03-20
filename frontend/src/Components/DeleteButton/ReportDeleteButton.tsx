import { useCallback, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface ReportDeleteButtonProps {
    gameId: number;
    reportingUserId: number;
    ratingUserId?: number;
}

const ReportDeleteButton = ({
    gameId,reportingUserId,ratingUserId
}: ReportDeleteButtonProps) => {
    
    const apiUrl = "http://localhost:8080/api/report/delete";
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
    
    const deleteReport = useCallback(() => {
        const reportData = {reportingUserId: reportingUserId, gameCardId: gameId, ratingUserId: ratingUserId}
        if (!window.confirm("Er du sikker på at du vil slette rapporteringen?")) {
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
        
        const requestBodySubmit = JSON.stringify(reportData);
        
        if (ratingUserId === undefined){
            fetch(`${apiUrl}/gamecard`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                body: requestBodySubmit,
            })
                .then((response) =>
                    response.json().then((data) => {
                        if (!response.ok) {
                            throw new Error(data.message);
                        }
                        alert("Rapportering slettet!");
                        window.location.reload();
                    })
                )
                .catch((error) => {
                    console.error("Error deleting report:", error);
                    alert(error);
                });
        } else {
            fetch((`${apiUrl}/comment`), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                body: requestBodySubmit,
            })
                .then((response) =>
                    response.json().then((data) => {
                        if (!response.ok) {
                            throw new Error(data.message);
                        }
                        alert("Rapportering slettet!");
                        window.location.reload();
                    })
                )
                .catch((error) => {
                    console.error("Error deleting report:", error);
                    alert(error);
                });
        }
    }, [gameId, reportingUserId, ratingUserId]);


    return (
        isModerator ? (
            <FaTrashCan
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    deleteReport();
                }}
                color={"red"}
                size={30}
                style={{ cursor: "pointer" }}
            />
        ) : null
    );
};

export default ReportDeleteButton;