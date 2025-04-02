package org.primefaces.test;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

import lombok.Data;
import org.primefaces.context.RequestContext;
//import org.primefaces.context.RequestContext;

@Data
@Named
@ViewScoped
public class TestView implements Serializable {
    private String[] popupContent = new String[10];
    private int[] popupsIterator = new int[10];
    private String popupName = "popup.xhtml";

    private String string;
    private Integer integer;
    private BigDecimal decimal;
    private LocalDateTime localDateTime;
    private List<TestObject> list;

    @PostConstruct
    public void init() {
        string = "Welcome to PrimeFaces!!!";
        list = new ArrayList<>(Arrays.asList(
                new TestObject("Thriller", "Michael Jackson", 1982),
                new TestObject("Back in Black", "AC/DC", 1980),
                new TestObject("The Bodyguard", "Whitney Houston", 1992),
                new TestObject("The Dark Side of the Moon", "Pink Floyd", 1973)
        ));
    }

    public void onClickButton(){
        setContentOnFreePopup("popup.xhtml");
    }
    public void setContentOnFreePopup(String content) {
        int freeIndex = getFreePopupIndex();
        setPopup(freeIndex, content);

        update(POPUP_PREFIX + freeIndex);
        onAfterInitPopup();
    }


    private int getFreePopupIndex() {
        for (int i = 0; i < popupContent.length; i++) {
            if (popupContent[i] == null) {
                return i;
            }
        }
        return popupContent.length - 1;
    }

    private void setPopup(int index, String content) {
        popupContent[index] = content;
    }

    public static final String POPUP_PREFIX = "popup-";


    public void onAfterInitPopup() {
        displayLastPopup(0, 300, 300 , true);
    }

    public void displayLastPopup(int popupIndex, int width, int height, boolean arePopupsResizeable) {
        update(POPUP_PREFIX + popupIndex);
        executeScript("display(" + popupIndex + "," + width + ", " + height+ "," + arePopupsResizeable + ") ");
    }

    public void onClose() {
        closeLastPopup();
    }

    public void closeLastPopup() {
        int freeIndex = getFreePopupIndex();
        if (freeIndex > 0) {
            int lastPopupIndex = freeIndex - 1;
            closePopupByIndex(lastPopupIndex);
        }
    }

    private void closePopupByIndex(int index) {
        popupContent[index] = null;
        update(POPUP_PREFIX + index);
        executeScript("close(" + index + ") ");
    }

    /**
     * Notifies that content has been initialized
     */
    public void contentHasBeenInitialized() {
        setInitialized(true);
    }
    private boolean isInitialized = false;




    private void update(String s){

        //For old versions
//
        RequestContext requestContext = RequestContext.getCurrentInstance();
        requestContext.update(s);
    }

    private void executeScript(String s){



        RequestContext requestContext = RequestContext.getCurrentInstance();
        requestContext.execute(s);
    }
}
