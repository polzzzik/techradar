package techradar_backend.techradar.repository;

import techradar_backend.techradar.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    Status findByStatusName(String statusName);
}
