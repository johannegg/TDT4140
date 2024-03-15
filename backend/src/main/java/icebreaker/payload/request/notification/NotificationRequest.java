package icebreaker.payload.request.notification;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class NotificationRequest {
    
    @NotBlank(message = "Brukernavn må ikke være tomt")
    @Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
    private String sender;

    @NotBlank(message = "Brukernavn må ikke være tomt")
    @Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
    private String receiver;

    @NotNull(message = "Bli-kjent lek ID kan ikke være null")
    @Min(value = 1, message = "Bli-kjent lek ID må være minst 1")
    private long gameCardId;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    public NotificationRequest() {
    }

    public NotificationRequest(String sender, String receiver, Long gameCardId, String comment) {
        this.sender = sender;
        this.receiver = receiver;
        this.gameCardId = gameCardId;
        this.comment = comment;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public long getGameCardId() {
        return gameCardId;
    }

    public void setGameCardId(long gameCardId) {
        this.gameCardId = gameCardId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
