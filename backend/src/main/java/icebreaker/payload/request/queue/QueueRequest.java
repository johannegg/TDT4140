package icebreaker.payload.request.queue;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class QueueRequest {

    @NotNull(message = "Bli-kjent lek ID kan ikke være null")
    @Min(value = 1, message = "Bli-kjent lek ID må være minst 1")
    private Long gameCardId;

    @NotBlank(message = "Brukernavn kan ikke være tomt")
	@Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
    private String username;

    public Long getGameCardId() {
        return gameCardId;
    }

    public void setGameCardId(Long gameCardId) {
        this.gameCardId = gameCardId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}