package icebreaker.payload.request.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LoginRequest {
	@NotBlank(message = "Username must not be null")
	@Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
	private String username;

	@NotBlank(message = "Password must not be null")
    @Size(min = 6, max = 40, message = "Password must be between 6 and 40 characters")
    @Pattern(regexp = "^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\\d).+$", message = "Password must contain at least one lowercase character, one uppercase character, and one digit")
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