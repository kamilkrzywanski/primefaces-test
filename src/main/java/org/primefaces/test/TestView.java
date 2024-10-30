package org.primefaces.test;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import org.primefaces.model.DefaultScheduleEvent;
import org.primefaces.model.DefaultScheduleModel;
import org.primefaces.model.ScheduleEvent;
import org.primefaces.model.ScheduleModel;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import lombok.Data;

@Data
@Named
@ViewScoped
public class TestView implements Serializable {

    private String testString;

    private DefaultScheduleModel eventModel;

    private String string;
    private Integer integer;
    private BigDecimal decimal;
    private LocalDateTime localDateTime;
    private List<TestObject> list;

    @PostConstruct
    public void init() {

        eventModel = new DefaultScheduleModel(List.of(DefaultScheduleEvent.builder()
                .title("Meeting")
                .startDate(getRandomDateTime())
                .endDate(getRandomDateTime())
                .build(),
                DefaultScheduleEvent.builder()
                .title("Conference")
                .startDate(getRandomDateTime())
                .endDate(getRandomDateTime())
                .build()
                , DefaultScheduleEvent.builder()
                .title("Project Deadline")
                .startDate(getRandomDateTime())
                .endDate(getRandomDateTime())
                .build()));

        string = "Welcome to PrimeFaces!!!";
        list = new ArrayList<>(Arrays.asList(
                new TestObject("Thriller", "Michael Jackson", 1982),
                new TestObject("Back in Black", "AC/DC", 1980),
                new TestObject("The Bodyguard", "Whitney Houston", 1992),
                new TestObject("The Dark Side of the Moon", "Pink Floyd", 1973)
        ));
    }

    // Helper method to get a random LocalDateTime for events
    private LocalDateTime getRandomDateTime() {
        LocalDateTime now = LocalDateTime.now();
        // Random day within +/- 15 days
        return now.plusDays((int) (Math.random() * 30) - 15).plusHours((int) (Math.random() * 12));      // Random hour
    }

}
