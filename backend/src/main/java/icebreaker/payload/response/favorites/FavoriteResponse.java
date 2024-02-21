package icebreaker.payload.response.favorites;

public class FavoriteResponse {

    private boolean isFavorite;

    public FavoriteResponse(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

    public boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }
}