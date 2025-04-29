package techradar_backend.techradar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import techradar_backend.techradar.entity.Poll;
import techradar_backend.techradar.repository.PollRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepo;

    private final List<String> possibleAnswers = List.of("ADOPT", "TRIAL", "ASSESS", "HOLD", "BACKLOG", "ARCHIVED");

    public void savePoll(Poll poll) {
        poll.setUpdateTime(LocalDateTime.now());
        pollRepo.save(poll);
    }

    public Map<Long, Map<String, Integer>> getVoteCountsByTechId() {
        Long pollNumber = pollRepo.findTopByOrderByPollIdDesc().getPollId();
        List<Poll> pollResults = pollRepo.findAllByPollId(pollNumber);
        Map<Long, Map<String, Integer>> voteCountMap = new HashMap<>();

        for (Poll poll : pollResults) {
            Long techId = poll.getTechId();
            String answer = poll.getAnswer().trim().toUpperCase();

            voteCountMap.putIfAbsent(techId, new HashMap<>());
            Map<String, Integer> answerCountMap = voteCountMap.get(techId);

            possibleAnswers.forEach(answerOption -> answerCountMap.putIfAbsent(answerOption, 0));

            answerCountMap.put(answer, answerCountMap.getOrDefault(answer, 0) + 1);
        }

        return voteCountMap;
    }
}
