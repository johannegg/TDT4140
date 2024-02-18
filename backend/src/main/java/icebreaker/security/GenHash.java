package icebreaker.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenHash {

    public static void main(String[] args) {
        String password = "password";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(password);
        System.out.println("Encoded Password: " + encodedPassword);
    }
}