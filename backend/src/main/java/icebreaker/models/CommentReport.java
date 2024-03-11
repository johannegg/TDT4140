package icebreaker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import icebreaker.models.composite.CommentReportId;
import icebreaker.models.types.EReason;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "comment_reports")
@IdClass(CommentReportId.class)
public class CommentReport {
    
    // One-to-Many relationship with User
    @Id
    @ManyToOne
    @JoinColumn(name = "reporting_user_id")
    @JsonBackReference
    private User user;

    // One-to-Many relationship with Rating
    @Id
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name="rating_user_id", referencedColumnName="user_id"),
        @JoinColumn(name="gamecard_id", referencedColumnName="gamecard_id")
    })
    @JsonBackReference
    private Rating rating;

    @NotNull(message = "Årsak kan ikke være null")
    @Enumerated(EnumType.STRING)
    private EReason reason;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    // Constructors
    public CommentReport() {
    }

    public CommentReport(User user, Rating rating, EReason reason, String comment) {
        this.user = user;
        this.rating = rating;
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

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
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
