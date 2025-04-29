package techradar_backend.techradar.entity;

import jakarta.persistence.*;

@Entity
public class Section {

    @Id
    private long sectionId;

    private String sectionName;

    public Section() {
    }

    public Section(String sectionName, long sectionId) {
        this.sectionName = sectionName;
        this.sectionId = sectionId;
    }

    public long getSectionId() {
        return sectionId;
    }

    public void setSectionId(long sectionId) {
        this.sectionId = sectionId;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }
}
