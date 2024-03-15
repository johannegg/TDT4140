package icebreaker.models.composite;

import java.io.Serializable;
import java.util.Objects;

public class RatingId implements Serializable {
    // Composite primary key for Rating
    private Long user;
    private Long gameCard;

    public RatingId() {
    }

    public RatingId(Long user, Long gameCard) {
        this.user = user;
        this.gameCard = gameCard;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getGameCard() {
        return gameCard;
    }

    public void setGameCard(Long gameCard) {
        this.gameCard = gameCard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatingId that = (RatingId) o;
        return Objects.equals(user, that.user) &&
               Objects.equals(gameCard, that.gameCard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, gameCard);
    }
}