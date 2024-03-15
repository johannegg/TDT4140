package icebreaker.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
import icebreaker.models.Notification;
import icebreaker.models.User;
import icebreaker.payload.request.notification.NotificationRequest;
import icebreaker.payload.response.MessageResponse;
import icebreaker.payload.response.notification.NotificationResponse;
import icebreaker.repository.GameCardRepository;
import icebreaker.repository.NotificationRepository;
import icebreaker.repository.UserRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    GameCardRepository gameCardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @GetMapping("/get/user/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getNotificationsByUsername(@PathVariable String username) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        List<Notification> notifications = notificationRepository.findByReceiverUsername(username,
                Sort.by(Sort.Direction.DESC, "timestamp"));

        List<NotificationResponse> response = new ArrayList<>();

        for (Notification notification : notifications) {
            response.add(new NotificationResponse(notification));
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/send")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendNotification(@Valid @RequestBody NotificationRequest notificationRequest) {

        User sender = userRepository.findByUsername(notificationRequest.getSender()).orElse(null);
        User receiver = userRepository.findByUsername(notificationRequest.getReceiver()).orElse(null);
        GameCard gameCard = gameCardRepository.findById(notificationRequest.getGameCardId()).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bruker med det brukernavnet"));
        }

        if (gameCard == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Finner ikke bli-kjent lek med det ID-et"));
        }

        if (sender.getUsername().equals(receiver.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Du kan ikke dele lek med deg selv"));
        }

        if (notificationRepository.existsBySenderAndReceiverAndGameCard(sender, receiver, gameCard)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Lek er allerede delt med " + receiver.getUsername()));
        }

        LocalDateTime timestamp = LocalDateTime.now();
        Notification notification = new Notification(sender, receiver, gameCard, notificationRequest.getComment(),
                timestamp);
        
        notificationRepository.save(notification);

        return ResponseEntity.ok(new MessageResponse("Lek ble delt med " + receiver.getUsername()));
    }
}
