package icebreaker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    /**
     * Checks if the server is running.
     * 
     * @return A ResponseEntity indicating success or failure.
     */
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @GetMapping(path = "/login")
    public ResponseEntity<String> checkServer() {
        return ResponseEntity.ok("Login attempted!");
    }
}
