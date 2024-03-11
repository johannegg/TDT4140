package icebreaker.models.composite;

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
}
