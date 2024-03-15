package icebreaker.models.composite;

import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentReportId that = (CommentReportId) o;
        return Objects.equals(user, that.user) &&
               Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, rating);
    }
}