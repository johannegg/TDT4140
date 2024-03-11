package icebreaker.payload.response.report;

import icebreaker.models.CommentReport;
import icebreaker.models.types.EReason;

public class CommentReportResponse {
    
    private long reportingUserId;
    private long gameCardId;
    private long ratingUserId;

    private String reportingUsername;
    private String ratingUsername;

    private EReason reason;
    private String comment;
    
    public CommentReportResponse(CommentReport commentReport) {        
        this.reportingUserId = commentReport.getUser().getId();
        this.gameCardId = commentReport.getRating().getGameCard().getId();
        this.ratingUserId = commentReport.getRating().getUser().getId();

        this.reportingUsername = commentReport.getUser().getUsername();
        this.ratingUsername = commentReport.getRating().getUser().getUsername();

        this.reason = commentReport.getReason();
        this.comment = commentReport.getComment();
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

    public long getRatingUserId() {
        return ratingUserId;
    }

    public void setRatingUserId(long ratingUserId) {
        this.ratingUserId = ratingUserId;
    }

    public String getReportingUsername() {
        return reportingUsername;
    }

    public void setReportingUsername(String reportingUsername) {
        this.reportingUsername = reportingUsername;
    }

    public String getRatingUsername() {
        return ratingUsername;
    }

    public void setRatingUsername(String ratingUsername) {
        this.ratingUsername = ratingUsername;
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
