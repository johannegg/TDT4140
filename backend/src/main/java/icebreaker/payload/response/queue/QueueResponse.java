package icebreaker.payload.response.queue;

public class QueueResponse {

    private boolean isInQueue;

    public QueueResponse(boolean isInQueue) {
        this.isInQueue = isInQueue;
    }

    public boolean getIsInQueue() {
        return isInQueue;
    }

    public void setIsInQueue(boolean isInQueue) {
        this.isInQueue = isInQueue;
    }
}