package icebreaker.models;

import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import icebreaker.models.composite.RatingId;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ratings")
@IdClass(RatingId.class)
public class Rating {
    
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

    @Min(value = 1, message = "Score må være minst 1")
    @Max(value = 5, message = "Score må være maks 5")
    private int score;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    @NotNull(message = "Tidspunkt kan ikke være tomt")
    private LocalDateTime timestamp;

    // One-to-Many relationship with CommentReport
    @OneToMany(mappedBy = "rating", cascade = { CascadeType.ALL }, orphanRemoval = true)
    @JsonManagedReference
    private Set<CommentReport> commentReports;

    // Constructors
    public Rating() {
    }

    public Rating(int score, String comment, User user, GameCard gameCard, LocalDateTime timestamp) {
        this.score = score;
        this.comment = comment;
        this.user = user;
        this.gameCard = gameCard;
        this.timestamp = timestamp;
    }

    // Getters and setters
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

    public Set<CommentReport> getCommentReports() {
        return commentReports;
    }

    public void setCommentReports(Set<CommentReport> commentReports) {
        this.commentReports = commentReports;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}