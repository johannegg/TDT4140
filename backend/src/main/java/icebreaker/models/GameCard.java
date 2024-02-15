package icebreaker.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "gamecards", uniqueConstraints = {
        @UniqueConstraint(columnNames = "title")
})
public class GameCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    @DecimalMin(value = "1", message = "Average rating must be at least 1")
    @DecimalMax(value = "5", message = "Average rating must be at most 5")
    @Null
    private Double averageRating;

    // Define Many-to-Many relationship with Category
    @ManyToMany
    @JoinTable(
        name = "gamecard_category",
        joinColumns = @JoinColumn(name = "gamecard_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    // Constructors
    public GameCard() {
    }

    public GameCard(String title, String rules, String description, String username, Set<Category> categories) {
        this.title = title;
        this.rules = rules;
        this.description = description;
        this.username = username;
        this.categories = categories;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}