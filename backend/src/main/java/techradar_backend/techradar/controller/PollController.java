package techradar_backend.techradar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import techradar_backend.techradar.entity.Poll;
import techradar_backend.techradar.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import techradar_backend.techradar.service.PollService;


@RestController
public class PollController {

    @Autowired
    private PollService pollService;

    @Autowired
    private UserService userService;

    @PostMapping("/poll")
    public ResponseEntity<?> createPoll(@RequestBody Poll poll, HttpServletRequest request) {
        try {
            boolean isAuthenticated = userService.isUserAuthenticated(request);
            if (isAuthenticated) {
                pollService.savePoll(poll);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(403).body(0);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/poll/count")
    public ResponseEntity<?> getPollCount(HttpServletRequest request) {
        try {
            boolean isAdmin = userService.checkAdminAccess(request);
            if (isAdmin) {
                Map<Long, Map<String, Integer>> voteCounts = pollService.getVoteCountsByTechId();
                return ResponseEntity.ok(voteCounts);
            } else {
                return ResponseEntity.status(403).body(0);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
