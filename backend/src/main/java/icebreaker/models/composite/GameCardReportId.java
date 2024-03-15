package icebreaker.models.composite;

import java.util.Objects;

public class GameCardReportId {
    // Composite primary key for GameCardReport
    private Long user;
    private Long gameCard;

    public GameCardReportId() {
    }

    public GameCardReportId(Long user, Long gameCard) {
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
        GameCardReportId that = (GameCardReportId) o;
        return Objects.equals(user, that.user) &&
               Objects.equals(gameCard, that.gameCard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, gameCard);
    }
}
