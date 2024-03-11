package icebreaker.payload.request.report;

import icebreaker.models.types.EReason;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CommentReportRequest {

    @NotNull(message = "Bruker ID kan ikke være null")
    @Min(value = 1, message = "Bruker ID må være minst 1")
    private Long reportingUserId;

    @NotNull(message = "Bli-kjent lek ID kan ikke være null")
    @Min(value = 1, message = "Bli-kjent lek ID må være minst 1")
    private Long gameCardId;

    @NotNull(message = "Bruker ID kan ikke være null")
    @Min(value = 1, message = "Bruker ID må være minst 1")
    private Long ratingUserId;

    @Size(max = 300, message = "Kommentaren kan ha maks 300 tegn")
    private String comment;

    @NotNull(message = "Årsak kan ikke være null")
    @Enumerated(EnumType.STRING)
    private EReason reason;

    public long getReportingUserId() {
        return reportingUserId;
    }

    public void setReportingUserId(long reportingUserId) {
        this.reportingUserId = reportingUserId;
    }

    public long getGameCardId() {
        return gameCardId;
    }

    public void setGameCardId(long gameCardId) {
        this.gameCardId = gameCardId;
    }

    public long getRatingUserId() {
        return ratingUserId;
    }

    public void setRatingUserId(long ratingUserId) {
        this.ratingUserId = ratingUserId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public EReason getReason() {
        return reason;
    }

    public void setReason(EReason reason) {
        this.reason = reason;
    }
}
