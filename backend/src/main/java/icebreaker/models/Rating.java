package icebreaker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ratings")
public class Rating {
    @Min(value = 1, message = "Score må være minst 1")
    @Max(value = 5, message = "Score må være maks 5")
    private int score;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "gamecard_id")
    @JsonBackReference
    private GameCard gameCard;

    // Constructors
    public Rating() {
    }

    public Rating(int score, String comment, User user, GameCard gameCard) {
        this.score = score;
        this.comment = comment;
        this.user = user;
        this.gameCard = gameCard;
    }

    // Getters and Setters
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

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
}