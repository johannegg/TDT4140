package icebreaker.payload.response.notification;

import icebreaker.models.Notification;

public class NotificationResponse {
    
    private String sender;
    private String receiver;
    private Long gameCardId;
    private String comment;

    public NotificationResponse() {
    }

    public NotificationResponse(Notification notification) {
        this.sender = notification.getSender().getUsername();
        this.receiver = notification.getReceiver().getUsername();
        this.gameCardId = notification.getGameCard().getId();
        this.comment = notification.getComment();
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Long getGameCardId() {
        return gameCardId;
    }

    public void setGameCardId(Long gameCardId) {
        this.gameCardId = gameCardId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
