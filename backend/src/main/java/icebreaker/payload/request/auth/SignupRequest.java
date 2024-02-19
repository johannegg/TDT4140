package icebreaker.payload.request.auth;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank(message = "Brukernavn kan ikke være tomt")
    @Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
    private String username;

    @NotBlank(message = "Email kan ikke være tom")
    @Size(max = 50, message = "Email kan ha maks 50 tegn")
    @Email(message = "Email må ha gyldig format")
    private String email;

    @NotBlank(message = "Passord kan ikke være tomt")
    @Size(min = 6, max = 40, message = "Passord må være mellom 6 og 40 tegn")
    @Pattern(regexp = "^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\\d).+$", message = "Passord må inneholde minst en stor bokstav, en liten bokstav og et tall")
    private String password;

    private Set<String> role;

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

    public Set<String> getRole() {
        return this.role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}
