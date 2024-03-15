package icebreaker.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import icebreaker.models.composite.NotificationId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "notifications")
@IdClass(NotificationId.class)
public class Notification {
    @Id
    @ManyToOne
    @JoinColumn(name = "sender_id")
    @JsonBackReference
    private User sender;

    @Id
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @JsonBackReference
    private User receiver;

    @Id
    @ManyToOne
    @JoinColumn(name = "gamecard_id")
    @JsonBackReference
    private GameCard gameCard;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    @NotNull(message = "Tidspunkt kan ikke være tomt")
    private LocalDateTime timestamp;

    // Constructors
    public Notification() {
    }

    public Notification(User sender, User receiver, GameCard gameCard, String comment, LocalDateTime timestamp) {
        this.sender = sender;
        this.receiver = receiver;
        this.gameCard = gameCard;
        this.comment = comment;
        this.timestamp = timestamp;
    }

    // Getters and setters
    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public GameCard getGameCard() {
        return gameCard;
    }

    public void setGameCard(GameCard gameCard) {
        this.gameCard = gameCard;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
