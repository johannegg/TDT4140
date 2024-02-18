package icebreaker.payload.request.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.types.ECategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class GameCardUpdateRequest {

    @NotNull(message = "Game card ID must not be null")
    @Min(value = 1, message = "Game card ID must be at least 1")
    private Long id;

    @NotBlank(message = "Title must not be blank")
    @Size(max = 30, message = "Title must be at most 30 characters")
    private String title;

    @NotBlank(message = "Rules must not be blank")
    @Size(max = 500, message = "Rules must be at most 500 characters")
    private String rules;

    @NotBlank(message = "Description must not be blank")
    @Size(max = 100)
    private String description;

    private Set<ECategory> categories = new HashSet<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Set<ECategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<ECategory> categories) {
        this.categories = categories;
    }
}