package icebreaker.payload.response.report;

import icebreaker.models.GameCardReport;
import icebreaker.models.types.EReason;

public class GameCardReportResponse {
    
    long reportingUserId;
    long gameCardId;

    String reportingUsername;
    
    EReason reason;
    String comment;

    public GameCardReportResponse(GameCardReport gameCardReport) {
        this.reportingUserId = gameCardReport.getUser().getId();
        this.gameCardId = gameCardReport.getGameCard().getId();
        
        this.reportingUsername = gameCardReport.getUser().getUsername();
        
        this.reason = gameCardReport.getReason();
        this.comment = gameCardReport.getComment();
    }

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

    public String getReportingUsername() {
        return reportingUsername;
    }

    public void setReportingUsername(String reportingUsername) {
        this.reportingUsername = reportingUsername;
    }

    public EReason getReason() {
        return reason;
    }

    public void setReason(EReason reason) {
        this.reason = reason;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
