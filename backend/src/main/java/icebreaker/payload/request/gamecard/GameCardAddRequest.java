package icebreaker.payload.request.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.types.ECategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class GameCardAddRequest {
    
    @NotBlank(message = "Title must not be blank")
    @Size(max = 30, message = "Title must be at most 30 characters")
    private String title;

    @NotBlank(message = "Rules must not be blank")
    @Size(max = 500, message = "Rules must be at most 500 characters")
    private String rules;

    @NotBlank(message = "Description must not be blank")
    @Size(max = 100, message = "Description must be at most 100 characters")
    private String description;

    @NotBlank(message = "Username must not be blank")
    @Size(max = 20, message = "Username must be at most 20 characters")
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