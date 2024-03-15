package icebreaker.models.composite;

import java.io.Serializable;
import java.util.Objects;

public class NotificationId implements Serializable {
    // Composite primary key for Notification
    private Long sender;
    private Long receiver;
    private Long gameCard;

    public NotificationId() {
    }

    public NotificationId(Long sender, Long receiver, Long gameCard) {
        this.sender = sender;
        this.receiver = receiver;
        this.gameCard = gameCard;
    }

    public Long getSender() {
        return sender;
    }

    public void setSender(Long sender) {
        this.sender = sender;
    }

    public Long getReceiver() {
        return receiver;
    }

    public void setReceiver(Long receiver) {
        this.receiver = receiver;
    }

    public Long getGameCard() {
        return gameCard;
    }

    public void setGameCard(Long gameCard) {
        this.gameCard = gameCard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        NotificationId that = (NotificationId) o;
        return Objects.equals(sender, that.sender) &&
                Objects.equals(receiver, that.receiver) &&
                Objects.equals(gameCard, that.gameCard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sender, receiver, gameCard);
    }
}
