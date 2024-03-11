package icebreaker.models.composite;

import java.io.Serializable;

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
}