package icebreaker.payload.response.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.ECategory;
import icebreaker.models.GameCard;

public class GameCardResponse {
    private int id;
    private String title;
    private String rules;
    private String description;
    private String username;
    private Double averageRating;
    private Set<ECategory> categories = new HashSet<>();

    public GameCardResponse(GameCard gameCard) {
        this.id = gameCard.getId();
        this.title = gameCard.getTitle();
        this.rules = gameCard.getRules();
        this.description = gameCard.getDescription();
        this.username = gameCard.getUsername();
        this.averageRating = gameCard.getAverageRating();
        this.categories = Set.copyOf(gameCard.getCategories().stream().map(category -> category.getName()).toList());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Set<ECategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<ECategory> categories) {
        this.categories = categories;
    }
}