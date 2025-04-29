package techradar_backend.techradar.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import techradar_backend.techradar.entity.Technology;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TechnologyRepository extends CrudRepository<Technology, Long> {

    List<Technology> findByRing(String tag);
    List<Technology> findByStatusNot(String status);
    @Query("SELECT t FROM Technology t WHERE " +
            "(:name IS NULL OR t.name = :name) AND " +
            "(:ring IS NULL OR t.ring = :ring) AND " +
            "(:category IS NULL OR t.category = :category) AND " +
            "(:section IS NULL OR t.section = :section) AND " +
            "(:status IS NULL OR t.status = :status)")
    List<Technology> findTechnologies(
            @Param("name") String name,
            @Param("ring") String ring,
            @Param("category") String category,
            @Param("section") String section,
            @Param("status") String status,
            Sort sort
    );
}