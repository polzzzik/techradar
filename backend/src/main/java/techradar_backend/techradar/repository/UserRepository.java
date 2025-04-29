package techradar_backend.techradar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techradar_backend.techradar.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}

