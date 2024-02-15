package icebreaker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import icebreaker.models.GameCard;

@Repository
public interface GameCardRepository extends JpaRepository<GameCard, Long> {
    // Custom query methods
    GameCard findByTitle(String title);

    boolean existsByTitle(String title);
}
