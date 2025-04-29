package techradar_backend.techradar.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
public class Technology {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long techId;

    @NotNull(message = "Technology name cannot be null")
    private String category;

    @NotNull(message = "Technology name cannot be null")
    private String section;

    @NotNull(message = "Technology name cannot be null")
    private String ring;

    @NotNull(message = "Technology name cannot be null")
    private String name;

    @NotNull(message = "Technology name cannot be null")
    private String description;

    @NotNull(message = "Technology name cannot be null")
    private String status;

    private LocalDateTime updateTime;

    public Technology() {
    }

    public Technology(String category, String section, String ring, String name, String description, String status, LocalDateTime updateTime) {
        this.category = category;
        this.section = section;
        this.ring = ring;
        this.name = name;
        this.description = description;
        this.status = status;
        this.updateTime = updateTime;
    }

    public Long getTechId() {
        return techId;
    }

    public void setTechId(Long techId) {
        this.techId = techId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String technology) {
        this.section = technology;
    }

    public String getRing() {
        return ring;
    }

    public void setRing(String ring) {
        this.ring = ring;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }
}