package techradar_backend.techradar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TechradarApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechradarApplication.class, args);
	}

}
