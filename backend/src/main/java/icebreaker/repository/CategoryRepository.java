package icebreaker.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import icebreaker.models.Category;
import icebreaker.models.ECategory;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Custom query methods
    Set<Category> findAllByNameIn(Set<ECategory> names);
}
