package icebreaker.payload.response.rating;

import icebreaker.models.Rating;

public class RatingResponse {
    private int score;
    private String comment;
    private long gameCardId;
    private String username;

    public RatingResponse(Rating rating) {
        this.score = rating.getScore();
        this.comment = rating.getComment();
        this.gameCardId = rating.getGameCard().getId();
        this.username = rating.getUser().getUsername();
    }

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

    public long getGameCardId() {
        return gameCardId;
    }

    public void setGameCardId(long gameCardId) {
        this.gameCardId = gameCardId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}