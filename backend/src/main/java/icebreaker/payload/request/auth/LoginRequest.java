package icebreaker.payload.request.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LoginRequest {
	@NotBlank(message = "Brukernavn kan ikke være tomt")
	@Size(min = 3, max = 20, message = "Brukernavn må være mellom 3 og 20 tegn")
	private String username;

	@NotBlank(message = "Passord kan ikke være tomt")
    @Size(min = 6, max = 40, message = "Passord må være mellom 6 og 40 tegn")
    @Pattern(regexp = "^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\\d).+$", message = "Passord må inneholde minst en stor bokstav, en liten bokstav og et tall")
    private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}