package icebreaker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import icebreaker.models.composite.GameCardReportId;
import icebreaker.models.types.EReason;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "gamecard_reports")
@IdClass(GameCardReportId.class)
public class GameCardReport {

    // Many-to-One relationship with User
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference  
    private User user;

    // Many-to-One relationship with GameCard
    @Id
    @ManyToOne
    @JoinColumn(name = "gamecard_id")
    @JsonBackReference 
    private GameCard gameCard;

    @NotNull(message = "Årsak kan ikke være null")
    @Enumerated(EnumType.STRING)
    private EReason reason;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    // Constructors
    public GameCardReport() {
    }

    public GameCardReport(User user, GameCard gameCard, EReason reason, String comment) {
        this.user = user;
        this.gameCard = gameCard;
        this.reason = reason;
        this.comment = comment;
    }

    // Getters and setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public GameCard getGameCard() {
        return gameCard;
    }

    public void setGameCard(GameCard gameCard) {
        this.gameCard = gameCard;
    }

    public EReason getReason() {
        return reason;
    }

    public void setReason(EReason reason) {
        this.reason = reason;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
