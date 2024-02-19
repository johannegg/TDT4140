package icebreaker.payload.request.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.types.ECategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class GameCardAddRequest {
    
    @NotBlank(message = "Tittel kan ikke være tom")
    @Size(max = 30, message = "Tittel kan ha maks 30 tegn")
    private String title;

    @NotBlank(message = "Regel-feltet kan ikke være tomt")
    @Size(max = 500, message = "Regel-feltet kan ha maks 500 tegn")
    private String rules;

    @NotBlank(message = "Beskrivelse kan ikke være tom")
    @Size(max = 100, message = "Beskrivelse kan ha maks 100 tegn")
    private String description;

    @NotBlank(message = "Brukernavn kan ikke være tomt")
	@Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
    private String username;
    
    private Set<ECategory> categories = new HashSet<>();

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