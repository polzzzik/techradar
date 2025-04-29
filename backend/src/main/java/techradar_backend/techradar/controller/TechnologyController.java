package techradar_backend.techradar.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import techradar_backend.techradar.repository.TechnologyRepository;
import techradar_backend.techradar.entity.Technology;
import org.springframework.beans.factory.annotation.Autowired;
import techradar_backend.techradar.service.TechnologyService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;


@RestController
public class TechnologyController {

    @Autowired
    private TechnologyRepository technologyRepo;

    @Autowired
    private TechnologyService technologyService;

    private final List<String> possibleAnswers = List.of("ADOPT", "TRIAL", "ASSESS", "HOLD", "BACKLOG");

    @GetMapping("/technology")
    public Iterable<Technology> getAllTechnologies() {
        return technologyRepo.findByStatusNot("ARCHIVED");
    }

    @PostMapping("/technology")
    public ResponseEntity<Technology> addTechnology(@Valid @RequestBody Technology technology) {
        if (technology.getName() != null && !technology.getName().isEmpty()) {
            technology.setUpdateTime(LocalDateTime.now());
            technology.setStatus("NEW");
            Technology savedTechnology = technologyRepo.save(technology);
            return ResponseEntity.ok(savedTechnology);
        } else {
            return ResponseEntity.badRequest().body(technology);
        }
    }

    @PatchMapping("/technology/{id}")
    public Technology updateTechnology(@RequestBody Technology technology, @PathVariable Long id) {
        Technology oldTech = technologyRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (technology.getName() != null && !technology.getName().isEmpty()) {
            oldTech.setName(technology.getName());
        }
        if (technology.getDescription() != null && !technology.getDescription().isEmpty()) {
            oldTech.setDescription(technology.getDescription());
        }
        if (technology.getCategory() != null && !technology.getCategory().isEmpty()) {
            oldTech.setCategory(technology.getCategory());
        }
        if (technology.getRing() != null && !technology.getRing().isEmpty()) {
            oldTech.setRing(technology.getRing());
            technology.setUpdateTime(LocalDateTime.now());
        }
        if (technology.getStatus() != null && !technology.getStatus().isEmpty()) {
            oldTech.setStatus(technology.getStatus());
        }
        if (technology.getSection() != null && !technology.getSection().isEmpty()) {
            oldTech.setSection(technology.getSection());
        }
        if (technology.getCategory() != null && !technology.getCategory().isEmpty()) {
            oldTech.setCategory(technology.getCategory());
        }
        return technologyRepo.save(oldTech);
    }

    @PatchMapping("/technology/change-status/{id}")
    public Technology updateStatus(@RequestBody Technology technology, @PathVariable Long id) {
        Technology oldTech = technologyRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (Objects.equals(technology.getRing(), "ARCHIVED")) {
            technology.setStatus("ARCHIVED");
        } else {
            String oldStatus = oldTech.getRing();
            int oldNum = possibleAnswers.indexOf(oldStatus);
            String newStatus = technology.getRing();
            int newNum = possibleAnswers.indexOf(newStatus);

            if (oldNum == newNum) {
                technology.setStatus("NO CHANGE");
            } else if (oldNum < newNum) {
                technology.setStatus("MOVED UP");
            } else {
                technology.setStatus("MOVED DOWN");
            }
        }
        return technologyRepo.save(oldTech);
    }


    @DeleteMapping("/technology/{id}")
    public ResponseEntity<Void> deleteTechnology(@PathVariable Long id) {
        try {
            technologyRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Technology>> getTechnologies(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "ring", required = false) String ring,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "section", required = false) String section,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "sortParam", required = false, defaultValue = "techId") String sortParam,
            @RequestParam(value = "sortOrder", required = false, defaultValue = "asc") String sortOrder
    ) {
        List<Technology> technologies = technologyService.getTechnologies(name, ring, category, section, status, sortParam, sortOrder);
        return new ResponseEntity<>(technologies, HttpStatus.OK);
    }
}