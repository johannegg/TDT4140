package icebreaker.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "gamecards", uniqueConstraints = {
        @UniqueConstraint(columnNames = "title")
})
public class GameCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Title must not be null")
    @Size(max = 30, message = "Title must be at most 30 characters")
    private String title;

    @NotBlank(message = "Rules must not be null")
    @Size(max = 500, message = "Rules must be at most 500 characters")
    private String rules;

    @NotBlank(message = "Description must not be null")
    @Size(max = 100, message = "Description must be at most 100 characters")
    private String description;

    @NotBlank(message = "Username must not be null")
    @Size(max = 20, message = "Username must be at most 20 characters")
    private String username;

    @DecimalMin(value = "1", message = "Average rating must be at least 1")
    @DecimalMax(value = "5", message = "Average rating must be at most 5")
    private Double averageRating;

    // Define One-to-Many relationship with Rating
    @OneToMany(mappedBy = "gameCard", cascade = { CascadeType.ALL }, orphanRemoval = true)
    @JsonManagedReference
    private Set<Rating> ratings;

    // Define Many-to-Many relationship with Category
    @ManyToMany
    @JoinTable(name = "gamecard_category", joinColumns = @JoinColumn(name = "gamecard_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
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

    // Calculate average rating
    public void calculateAverageRating() {
        if (ratings.isEmpty()) {
            averageRating = null;
            return;
        }
        double sum = 0;
        for (Rating rating : ratings) {
            sum += rating.getScore();
        }
        averageRating = sum / ratings.size();
    }

    // Add and remove ratings
    public void addRating(Rating rating) {

        if (ratings == null) {
            ratings = new HashSet<>();
        }

        ratings.add(rating);
        calculateAverageRating();
    }
    
    public void removeRating(Rating rating) {
        ratings.remove(rating);
        calculateAverageRating();
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

    public Set<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}