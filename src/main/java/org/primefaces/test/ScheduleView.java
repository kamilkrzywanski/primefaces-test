package org.primefaces.test;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import org.primefaces.event.SelectEvent;
import org.primefaces.model.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Named
@ViewScoped
public class ScheduleView implements Serializable {

    private ScheduleModel eventModel;

    private String viewName = "timeGridDay";

    @PostConstruct
    public void init() {
        eventModel = new LazyScheduleModel() {
            @Override
            public void loadEvents(LocalDateTime localDateTime, LocalDateTime localDateTime1) {
                System.out.println("I want here to see correct viewName: " + viewName);
                // Do nothing
            }
        };
        eventModel.addEvent(DefaultScheduleEvent.builder()
                .title("Meeting")
                .startDate(LocalDateTime.now().plusDays(1))
                .endDate(LocalDateTime.now().plusDays(1).plusHours(1))
                .description("Team meeting")
                .id(UUID.randomUUID().toString())
                .build());
        eventModel.addEvent(DefaultScheduleEvent.builder()
                .title("Conference")
                .startDate(LocalDateTime.now().plusDays(2))
                .endDate(LocalDateTime.now().plusDays(2).plusHours(2))
                .description("Annual conference")
                .id(UUID.randomUUID().toString())
                .build());
    }

    public ScheduleModel getEventModel() {
        return eventModel;
    }

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }


    public void onViewChange(SelectEvent<String> selectEvent) {
        viewName = selectEvent.getObject();
        FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "View Changed", "View:" + viewName);
        addMessage(message);
    }


    private void addMessage(FacesMessage message) {
        FacesContext.getCurrentInstance().addMessage(null, message);
    }
}
