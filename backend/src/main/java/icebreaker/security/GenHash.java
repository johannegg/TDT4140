package icebreaker.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenHash {

    public static void main(String[] args) {
        String password = "password";

        // Create BCryptPasswordEncoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Encode the password
        String encodedPassword = encoder.encode(password);

        // Print out the encoded password
        System.out.println("Encoded Password: " + encodedPassword);
    }
}