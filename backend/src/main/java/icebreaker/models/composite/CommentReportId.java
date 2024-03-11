package icebreaker.models.composite;

import java.io.Serializable;

public class CommentReportId implements Serializable {
    // Composite primary key for CommentReport
    private Long user;
    private RatingId rating;

    public CommentReportId() {
    }

    public CommentReportId(Long user, RatingId rating) {
        this.user = user;
        this.rating = rating;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public RatingId getRating() {
        return rating;
    }

    public void setRating(RatingId rating) {
        this.rating = rating;
    }
}