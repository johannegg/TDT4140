import "./Notification.css";
import { Link } from "react-router-dom";

type NotificationDetailProps = {

  notification: {
    gameCardId: number;
    sender: string;
    receiver: string;
    comment?: string;
    gameCardTitle: string;
  };

};

export function NotificationDetail({
  notification
}: NotificationDetailProps) {

  const { gameCardId, comment, sender, gameCardTitle } = notification;

  return (
    <div className="notificationContainer">
      <div className="notificationUsername">
        {sender}
      </div>
      <div className="notificationComment">
        {comment}
      </div>
      <Link to={`/spill/${gameCardId}`} className="notificationLink">
        {gameCardTitle}
      </Link>
    </div>
  );
}
