package techradar_backend.techradar.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "poll")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pollId;

    @Column(name = "tech_id")
    private Long techId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "answer")
    private String answer;

    private LocalDateTime updateTime;

    public Poll() {
    }


    public Poll(LocalDateTime updateTime, String answer, Long userId, Long techId, Long pollId) {
        this.updateTime = updateTime;
        this.answer = answer;
        this.userId = userId;
        this.techId = techId;
        this.pollId = pollId;
    }


    public Long getPollId() {
        return pollId;
    }

    public Long getTechId() {
        return techId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }

    public void setTechId(Long techId) {
        this.techId = techId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }
}