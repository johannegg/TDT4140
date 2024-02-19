package icebreaker.payload.request.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.types.ECategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class GameCardUpdateRequest {

    @NotNull(message = "Bli-kjent lek ID kan ikke være null")
    @Min(value = 1, message = "Bli-kjent lek ID må være minst 1")
    private Long id;

    @NotBlank(message = "Tittel kan ikke være tom")
    @Size(max = 30, message = "Tittel kan ha maks 30 tegn")
    private String title;

    @NotBlank(message = "Regel-feltet kan ikke være tomt")
    @Size(max = 500, message = "Regel-feltet kan ha maks 500 tegn")
    private String rules;

    @NotBlank(message = "Beskrivelse kan ikke være tom")
    @Size(max = 100)
    private String description;

    private Set<ECategory> categories = new HashSet<>();

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