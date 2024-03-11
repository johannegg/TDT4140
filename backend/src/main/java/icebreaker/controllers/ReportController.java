package icebreaker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import icebreaker.models.CommentReport;
import icebreaker.models.GameCard;
import icebreaker.models.GameCardReport;
import icebreaker.models.Rating;
import icebreaker.models.User;
import icebreaker.payload.request.report.CommentReportDeleteRequest;
import icebreaker.payload.request.report.CommentReportRequest;
import icebreaker.payload.request.report.GameCardReportDeleteRequest;
import icebreaker.payload.request.report.GameCardReportRequest;
import icebreaker.payload.response.MessageResponse;
import icebreaker.payload.response.report.CommentReportResponse;
import icebreaker.payload.response.report.GameCardReportResponse;
import icebreaker.repository.CommentReportRepository;
import icebreaker.repository.GameCardReportRepository;
import icebreaker.repository.GameCardRepository;
import icebreaker.repository.UserRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    GameCardRepository gameCardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentReportRepository commentReportRepository;

    @Autowired
    GameCardReportRepository gameCardReportRepository;

    @GetMapping("/get/comment")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> getCommentReports() {
        List<CommentReportResponse> commentReports = commentReportRepository.findAll().stream()
                .map(CommentReportResponse::new).toList();
        return ResponseEntity.ok(commentReports);
    }

    @GetMapping("/get/gamecard")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> getGameCardReports() {
        List<GameCardReportResponse> gameCardReports = gameCardReportRepository.findAll().stream()
                .map(GameCardReportResponse::new).toList();
        return ResponseEntity.ok(gameCardReports);
    }

    @PutMapping("/send/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendCommentReport(@Valid @RequestBody CommentReportRequest commentReportRequest) {

        User reportingUser = userRepository.findById(commentReportRequest.getReportingUserId()).orElse(null);
        User ratingUser = userRepository.findById(commentReportRequest.getRatingUserId()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(commentReportRequest.getGameCardId()).orElse(null);

        if (reportingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med det ID"));
        }

        if (ratingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        Rating rating = gameCard.getRatings().stream()
                .filter(r -> r.getUser().getId().equals(ratingUser.getId()))
                .findFirst().orElse(null);

        if (rating == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke ratingen"));
        }

        if (commentReportRepository.existsByUserAndRating(reportingUser, rating)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Du har allerede rapportert denne kommentaren"));
        }

        CommentReport commentReport = new CommentReport(reportingUser, rating, commentReportRequest.getReason(),
                commentReportRequest.getComment());
        commentReportRepository.save(commentReport);

        return ResponseEntity.ok(new MessageResponse("Rapport sendt!"));
    }

    @PutMapping("/send/gamecard")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendGameCardReport(@Valid @RequestBody GameCardReportRequest gameCardReportRequest) {

        User reportingUser = userRepository.findById(gameCardReportRequest.getReportingUserId()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(gameCardReportRequest.getGameCardId()).orElse(null);

        if (reportingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med det ID"));
        }

        if (gameCardReportRepository.existsByUserAndGameCard(reportingUser, gameCard)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Du har allerede rapportert denne bli-kjent leken"));
        }

        icebreaker.models.GameCardReport gameCardReport = new icebreaker.models.GameCardReport(reportingUser,
                gameCard,
                gameCardReportRequest.getReason(), gameCardReportRequest.getComment());
        gameCardReportRepository.save(gameCardReport);

        return ResponseEntity.ok(new MessageResponse("Rapport sendt!"));
    }

    @DeleteMapping("/delete/comment")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> deleteCommentReport(
            @Valid @RequestBody CommentReportDeleteRequest commentReportDeleteRequest) {

        User reportingUser = userRepository.findById(commentReportDeleteRequest.getReportingUserId())
                .orElse(null);
        User ratingUser = userRepository.findById(commentReportDeleteRequest.getRatingUserId()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(commentReportDeleteRequest.getGameCardId())
                .orElse(null);

        if (reportingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med det ID"));
        }

        if (ratingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        Rating rating = gameCard.getRatings().stream()
                .filter(r -> r.getUser().getId().equals(ratingUser.getId()))
                .findFirst().orElse(null);

        if (rating == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke ratingen"));
        }

        CommentReport commentReport = commentReportRepository.findByUserAndRating(reportingUser, rating);

        if (commentReport == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke rapporten"));
        }

        commentReportRepository.delete(commentReport);

        return ResponseEntity.ok(new MessageResponse("Rapport slettet!"));
    }

    @DeleteMapping("/delete/gamecard")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> deleteGameCardReport(
            @Valid @RequestBody GameCardReportDeleteRequest gameCardReportDeleteRequest) {

        User reportingUser = userRepository.findById(gameCardReportDeleteRequest.getReportingUserId())
                .orElse(null);
        GameCard gameCard = gameCardRepository.findById(gameCardReportDeleteRequest.getGameCardId())
                .orElse(null);

        if (reportingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med det ID"));
        }

        GameCardReport gameCardReport = gameCardReportRepository.findByUserAndGameCard(reportingUser,
                gameCard);

        if (gameCardReport == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke rapporten"));
        }

        gameCardReportRepository.delete(gameCardReport);

        return ResponseEntity.ok(new MessageResponse("Rapport slettet!"));
    }
}
