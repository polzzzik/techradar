package techradar_backend.techradar.entity;

import jakarta.persistence.*;

@Entity
public class Ring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ring_id")
    private Long ringId;

    @Column(name = "ring_name", unique = true)
    private String ringName;

    public Ring() {
    }


    public Ring(long ringId, String ringName) {
        this.ringId = ringId;
        this.ringName = ringName;
    }

    public long getRingId() {
        return ringId;
    }

    public void setRingId(long ringId) {
        this.ringId = ringId;
    }

    public String getRingName() {
        return ringName;
    }

    public void setRingName(String ringName) {
        this.ringName = ringName;
    }
}
