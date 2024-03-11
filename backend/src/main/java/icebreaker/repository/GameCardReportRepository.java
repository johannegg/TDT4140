package icebreaker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import icebreaker.models.GameCard;
import icebreaker.models.GameCardReport;
import icebreaker.models.User;
import icebreaker.models.composite.GameCardReportId;

@Repository
public interface GameCardReportRepository extends JpaRepository<GameCardReport, GameCardReportId> {
    @NonNull
    List<GameCardReport> findAll();
    boolean existsByUserAndGameCard(User user, GameCard gameCard);
    GameCardReport findByUserAndGameCard(User user, GameCard gameCard);
}
