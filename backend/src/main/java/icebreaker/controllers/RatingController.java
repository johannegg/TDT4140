package icebreaker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import icebreaker.models.GameCard;
import icebreaker.models.Rating;
import icebreaker.models.User;
import icebreaker.payload.request.rating.RatingAddRequest;
import icebreaker.payload.response.MessageResponse;
import icebreaker.payload.response.rating.RatingResponse;
import icebreaker.repository.GameCardRepository;
import icebreaker.repository.UserRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    GameCardRepository gameCardRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/get/user/{username}")
    public ResponseEntity<?> getRatingsByUsername(@PathVariable String username) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        List<RatingResponse> response = user.getRatings().stream().map(RatingResponse::new).toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get/gamecard/{gamecardID}")
    public ResponseEntity<?> getRatingsByGameCard(@PathVariable long gamecardID) {

        GameCard gameCard = gameCardRepository.findById(gamecardID).orElse(null);

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med den ID-en"));
        }

        List<RatingResponse> response = gameCard.getRatings().stream().map(RatingResponse::new).toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addRating(@Valid @RequestBody RatingAddRequest ratingAddRequest) {

        User user = userRepository.findByUsername(ratingAddRequest.getUsername()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(ratingAddRequest.getGameCardId()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med den ID-en"));
        }

        if (gameCard.getRatings().stream().anyMatch(r -> r.getUser().equals(user))) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Brukeren har allerede gitt en vurdering på denne bli-kjent leken"));
        }

        Rating rating = new Rating(ratingAddRequest.getScore(), ratingAddRequest.getComment(), user, gameCard);
        gameCard.addRating(rating);
        gameCardRepository.save(gameCard);

        return ResponseEntity.ok(new MessageResponse("Vurdering lagt til!"));
    }

    @DeleteMapping("/delete/{gamecardID}/{username}")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> deleteRating(@PathVariable long gamecardID, @PathVariable String username) {

        User user = userRepository.findByUsername(username).orElse(null);
        GameCard gameCard = gameCardRepository.findById(gamecardID).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med den ID-en"));
        }

        Rating rating = gameCard.getRatings().stream().filter(r -> r.getUser().equals(user)).findFirst().orElse(null);

        if (rating == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke vurdering for denne brukeren på denne bli-kjent leken"));
        }

        gameCard.removeRating(rating);
        gameCardRepository.save(gameCard);

        return ResponseEntity.ok(new MessageResponse("Vurdering slettet!"));
    }
}
