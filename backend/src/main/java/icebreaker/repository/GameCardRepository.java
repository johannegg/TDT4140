package icebreaker.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import icebreaker.models.ECategory;
import icebreaker.models.GameCard;

@Repository
public interface GameCardRepository extends JpaRepository<GameCard, Long> {
    // Custom query methods
    GameCard findByTitle(String title);

    boolean existsByTitle(String title);

    @Query("SELECT gc FROM GameCard gc JOIN gc.categories c WHERE c.name IN :categories")
    List<GameCard> findAllByCategoriesIn(@Param("categories") Set<ECategory> categories);
}
