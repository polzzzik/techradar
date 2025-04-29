package techradar_backend.techradar.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import techradar_backend.techradar.entity.Technology;
import techradar_backend.techradar.repository.TechnologyRepository;

import java.util.List;

@Service
public class TechnologyService {

    @Autowired
    private TechnologyRepository technologyRepository;

    public List<Technology> getTechnologies(String name, String ring, String category, String section, String status, String sortParam, String sortOrder) {
        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortParam);
        return technologyRepository.findTechnologies(name, ring, category, section, status, sort);
    }
}
