package icebreaker.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brukernavn må ikke være tomt")
    @Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
    private String username;

    @NotBlank(message = "Email kan ikke være tom")
    @Size(max = 50, message = "Email kan ha maks 50 tegn")
    @Email(message = "Email må ha gyldig format")
    private String email;

    @NotBlank(message = "Passord hash kan ikke være tom")
    @Size(max = 120, message = "Passord hash kan ha maks 120 tegn")
    private String password;

    // Define One-to-Many relationship with Rating
    @OneToMany(mappedBy = "user", cascade = { CascadeType.ALL }, orphanRemoval = true)
    @JsonManagedReference
    private Set<Rating> ratings;

    // Define Many-to-Many relationship with Role
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // Define Many-to-Many relationship with GameCard (queue)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "queue", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "gamecard_id"))
    @OrderColumn(name = "order_index")
    private List<GameCard> queue = new ArrayList<>();

    // Constructors
    public User() {
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Add game card to queue
    public void addGameCardToQueue(GameCard gameCard) {
        this.queue.add(gameCard);
    }

    // Remove game card from queue
    public void removeGameCardFromQueue(GameCard gameCard) {
        this.queue.remove(gameCard);
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public List<GameCard> getQueue() {
        return queue;
    }

    public void setQueue(List<GameCard> queue) {
        this.queue = queue;
    }
}