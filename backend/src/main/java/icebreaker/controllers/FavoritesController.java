package icebreaker.controllers;

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
    public ResponseEntity<?> getFavoritesByUsername(@PathVariable String username) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        List<GameCardResponse> response = user.getFavorites().stream().map(gameCard -> new GameCardResponse(gameCard))
                .toList();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addToFavorites(@Valid @RequestBody FavoritesRequest favoritesRequest) {

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

        if (user.getFavorites().contains(gameCard)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Bli-kjent lek er allerede lagt til i favoritter"));
        }

        user.addGameCardToFavorites(gameCard);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Bli-kjent lek lagt til i favoritter!"));
    }

    @PostMapping("/remove")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeFromFavorites(@Valid @RequestBody FavoritesRequest favoritesRequest) {

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

        if (!user.getFavorites().contains(gameCard)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke denne bli-kjent leken i brukerens favoritter"));
        }

        user.removeGameCardFromFavorites(gameCard);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Bli-kjent lek fjernet fra favoritter!"));
    }
}
