package techradar_backend.techradar.repository;

import org.springframework.data.repository.CrudRepository;
import techradar_backend.techradar.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

}
