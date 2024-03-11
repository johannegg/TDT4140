package icebreaker.payload.request.report;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class GameCardReportDeleteRequest {
    
    @NotNull(message = "Bruker ID kan ikke være null")
    @Min(value = 1, message = "Bruker ID må være minst 1")
    private Long reportingUserId;

    @NotNull(message = "Bli-kjent lek ID kan ikke være null")
    @Min(value = 1, message = "Bli-kjent lek ID må være minst 1")
    private Long gameCardId;

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
}
