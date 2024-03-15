package icebreaker.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import icebreaker.models.GameCard;
import icebreaker.models.Notification;
import icebreaker.models.User;
import icebreaker.models.composite.NotificationId;

public interface NotificationRepository extends JpaRepository<Notification, NotificationId> {
    List<Notification> findByReceiverUsername(String username, Sort sort);
    boolean existsBySenderAndReceiverAndGameCard(User sender, User receiver, GameCard gameCard);
}
