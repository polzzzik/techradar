package techradar_backend.techradar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import techradar_backend.techradar.entity.Poll;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PollRepository extends JpaRepository<Poll, Long> {
    Poll findTopByOrderByPollIdDesc();
    List<Poll> findAllByPollId(Long pollId);
}