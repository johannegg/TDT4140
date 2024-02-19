package icebreaker.payload.request.rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RatingAddRequest {

    @NotNull(message = "Score kan ikke være null")
    @Min(value = 1, message = "Score må være minst 1")
    @Max(value = 5, message = "Score må være maks 5")
    private Integer score;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    @NotNull(message = "Bli-kjent lek ID kan ikke være null")
    @Min(value = 1, message = "Bli-kjent lek ID må være minst 1")
    private Long gameCardId;

    @NotBlank(message = "Brukernavn kan ikke være tomt")
	@Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
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