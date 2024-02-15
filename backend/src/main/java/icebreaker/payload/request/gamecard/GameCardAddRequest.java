package icebreaker.payload.request.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.ECategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class GameCardAddRequest {
    
    @NotBlank
    @Size(max = 30)
    private String title;

    @NotBlank
    @Size(max = 500)
    private String rules;

    @NotBlank
    @Size(max = 100)
    private String description;

    @NotBlank
    @Size(max = 20)
    private String username;
    
    private Set<ECategory> categories = new HashSet<>();

    // Getters and Setters
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

    public Set<ECategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<ECategory> categories) {
        this.categories = categories;
    }
}