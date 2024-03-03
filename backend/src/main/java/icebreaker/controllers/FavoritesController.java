package icebreaker.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import icebreaker.models.GameCard;
import icebreaker.models.User;
import icebreaker.payload.request.favorites.FavoritesRequest;
import icebreaker.payload.response.MessageResponse;
import icebreaker.payload.response.favorites.FavoriteResponse;
import icebreaker.payload.response.gamecard.GameCardResponse;
import icebreaker.repository.GameCardRepository;
import icebreaker.repository.UserRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    GameCardRepository gameCardRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/get/all/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getFavoritesByUsername(@PathVariable String username) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        List<GameCardResponse> response = new ArrayList<>(
                user.getFavorites().stream().map(gameCard -> new GameCardResponse(gameCard))
                        .toList());
        response.sort((a, b) -> {
            if (a.getAverageRating() == null && b.getAverageRating() == null) {
                return 0;
            } else if (a.getAverageRating() == null) {
                return 1;
            } else if (b.getAverageRating() == null) {
                return -1;
            } else {
                return Double.compare(b.getAverageRating(), a.getAverageRating());
            }
        });
        return ResponseEntity.ok(response);
    }

    @PostMapping("/toggle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> toggleFavorite(@Valid @RequestBody FavoritesRequest favoritesRequest) {

        long gameID = favoritesRequest.getGameCardId();

        User user = userRepository.findByUsername(favoritesRequest.getUsername()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(gameID).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med den ID-en"));
        }

        String message;

        if (user.getFavorites().contains(gameCard)) {
            user.removeGameCardFromFavorites(gameCard);
            message = "Bli-kjent lek fjernet fra favoritter!";
        } else {
            user.addGameCardToFavorites(gameCard);
            message = "Bli-kjent lek lagt til i favoritter!";
        }

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse(message));
    }

    @PostMapping("/check")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> checkFavorite(@Valid @RequestBody FavoritesRequest favoritesRequest) {

        long gameID = favoritesRequest.getGameCardId();

        User user = userRepository.findByUsername(favoritesRequest.getUsername()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(gameID).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med den ID-en"));
        }

        return ResponseEntity.ok(new FavoriteResponse(user.getFavorites().contains(gameCard)));
    }
}