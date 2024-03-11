package icebreaker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import icebreaker.models.CommentReport;
import icebreaker.models.Rating;
import icebreaker.models.User;
import icebreaker.models.composite.CommentReportId;

@Repository
public interface CommentReportRepository extends JpaRepository<CommentReport, CommentReportId> {
    @NonNull
    List<CommentReport> findAll();
    boolean existsByUserAndRating(User user, Rating rating);
    CommentReport findByUserAndRating(User user, Rating rating);
}
