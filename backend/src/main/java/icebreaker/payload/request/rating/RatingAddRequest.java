package icebreaker.payload.request.rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RatingAddRequest {

    @NotNull(message = "Score must not be null")
    @Min(value = 1, message = "Score must be at least 1")
    @Max(value = 5, message = "Score must be at most 5")
    private Integer score;

    @Size(max = 300, message = "Comment must be at most 300 characters")
    private String comment;

    @NotNull(message = "Game card ID must not be null")
    @Min(value = 1, message = "Game card ID must be at least 1")
    private Long gameCardId;

    @NotBlank(message = "Username must not be blank")
    @Size(max = 30, message = "Username must be at most 30 characters")
    private String username;

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