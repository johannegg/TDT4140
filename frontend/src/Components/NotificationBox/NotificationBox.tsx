import { useCallback, useEffect, useState } from "react";
import { NotificationDetail } from "./NotificationDetail";
import "./Notification.css";

type NotificationDetailType = {

    gameCardId: number;
    sender: string;
    receiver: string;
    comment?: string;
    gameCardTitle: string;
};

const NotificationBox: React.FC = () => {
    const notificationApiUrl = "http://localhost:8080/api/notification/get/user/";
    const [notifications, setNotifications] = useState<NotificationDetailType[]>([]);
    const fetchNotifications = useCallback(async () => {
        let headers = undefined;
        const userInfoString = localStorage.getItem("userInfo");
        if (!userInfoString) {
            return;
        }
        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.accessToken;
        const username = userInfo.username;
        headers = { Authorization: `Bearer ${token}` };

        fetch(notificationApiUrl + username, {
            method: "GET",
            headers: headers,
        })
            .then((response) =>
                response.json().then((data) => {
                    if (!response.ok) {
                        throw new Error(data.message);
                    }
                    setNotifications(data);
                })
            )
            .catch((error) => {
                console.error("Error fetching notifications:", error);
                alert(error);
            });
    }, [notificationApiUrl]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    return (
        <div className="notificationBoxDiv">
            {notifications.map((notif) => (
                <NotificationDetail notification={notif}></NotificationDetail>
            ))}
            {notifications.length === 0 && (
                <p className="notificationUsername">
                    Ingen notifikasjoner å vise
                </p>
            )}
        </div>
    );
};
export default NotificationBox;
