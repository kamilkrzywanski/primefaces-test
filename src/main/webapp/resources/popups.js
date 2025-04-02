function close(popupIndex) {
    var popupElement = $("#popup-" + popupIndex);
    var popupOverlayElement = $("#popup-" + popupIndex + "-overlay");
    if (popupElement !== null) {
        popupElement.css("display", "none");
        popupOverlayElement.css("display", "none");
    }
    restoreResignMechanism();
    unbindFocusEvent();
}


function display(popupIndex, width, height) { //NOSONAR
    display(popupIndex, width, height, true);
}

function display(popupIndex, width, height, isResizeable) {
    var popupElement = $("#popup-" + popupIndex);
    var popupHeaderElement = $("#popup-" + popupIndex + " .ui-popup-titlebar");
    var popupContentElement = $("#popup-" + popupIndex + " .ui-popup-content");
    var popupButtonsElement = $("#popup-" + popupIndex + " .ui-popup-buttonpane");
    var popupOverlayElement = $("#popup-" + popupIndex + "-overlay");
    if (popupElement !== null) {
        popupOverlayElement.css("display", "block");
        popupOverlayElement.css("height", "100%");
        popupElement.css("visibility", "visible");

        //popupElement.css("width", width + "px"); //- fixed initial width for all popups. Changed by two methods below on 2018-04-16 for the benefit of customizing initial width per popup. If test proove the change to be broken, uncomment this line and delete two indicated lines below.

        //Added on 2018-04-16 - customizable initial popup width. Needs thorough testing. If broken, delete code below and uncomment "fixed initial width for all popups" above
        var popupMinWidth = valueOrZero(popupElement.outerWidth());
        if (popupMinWidth > valueOrZero(width)) {
            popupElement.css("width", valueOrZero(popupContentElement.outerWidth()) + 22 + "px");
            popupElement.css("min-width", valueOrZero(width) + "px");
        }else {
            popupElement.css("width", valueOrZero(width) + "px");
        }
        //Added on 2018-04-16 - customizable initial popup width. Needs thorough testing. If broken, delete code above and uncomment "fixed initial width for all popups" above

        popupElement.css("min-height", "125px");
        popupElement.css("height", valueOrZero(popupHeaderElement.outerHeight()) + valueOrZero(popupContentElement.outerHeight()) + valueOrZero(popupButtonsElement.outerHeight()) + 2 + "px");
        popupElement.css("max-height", ($(window).height() - 40) + "px");
        popupElement.css("max-width", ($(window).width() - 40) + "px");
        popupElement.css("outline", "none");

        var zIndex = (popupIndex + 1) * 100;
        popupOverlayElement.css("z-index", zIndex);
        popupElement.css("z-index", zIndex + 1);

        popupElement.draggable({handle: "div.ui-popup-titlebar", containment: "document", scroll: false});

        if (isResizeable) {
            popupElement.resizable({
                minWidth: width
                // minHeight: height
            });
        }

        var titlebar = popupElement.find("div.ui-popup-titlebar");
        titlebar.css("min-height", "30px");
        popupElement.center();
        popupElement.attr("tabindex", popupIndex + 1);
        setTimeout("firstFocus(" + popupIndex + ")", 5);

        deactivateResignMechanism();
        //just for confirm popups
        bindFocusEvent();
    }
}

function firstFocus(popupIndex) {
    $(document).ready(function() {
        var el = $("#popup-" + popupIndex + " .ui-popup-content:first *:input[type!=hidden]:first");
        if (el !== undefined && (el.attr("focus_on_open_dialog") === undefined || el.attr("focus_on_open_dialog") == 'true'))
            setTimeout('$("#popup-' + popupIndex + ' .ui-popup-content" + ":first *:input[type!=hidden]:first").focus()', 5);
    });
}

function resizePopup(popupIndex, width, height) {
    var popupElement = $("#popup-" + popupIndex);
    var popupContentElement = $("#popup-" + popupIndex + " .ui-popup-content");
    popupContentElement.css("max-width", valueOrZero(width) + "px");
    popupElement.css("width", valueOrZero(widt) + "px");
    popupElement.css("height", valueOrZero(height) + "px");
    popupElement.center();
}

function resizePopupInPercent(popupIndex, width, height) {
    var popupElement = $("#popup-" + popupIndex);
    popupElement.css("width", valueOrZero(width) + "%");
    popupElement.css("height", valueOrZero(height) + "%");
    popupElement.center();
}

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - valueOrZero($(this).outerHeight())) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - valueOrZero($(this).outerWidth())) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
};
function refreshDisplay() { //NOSONAR
    var popupElement = $(".ui-popup");
    var popupHeaderElement = $(".ui-popup" + " .ui-popup-titlebar");
    var popupContentElement = $(".ui-popup" + " .ui-popup-content");
    var popupButtonsElement = $(".ui-popup" + " .ui-popup-buttonpane");
    if (popupElement !== null) {

        popupElement.css("height", valueOrZero(popupHeaderElement.outerHeight()) + valueOrZero(popupContentElement.outerHeight()) + valueOrZero(popupButtonsElement.outerHeight()) + "px");
        $(".ui-popup" + " .ui-scrollpanel").scrollTop(1);
        if ($(".ui-popup" + " .ui-scrollpanel").scrollTop() != 0){
            popupElement.css("width", valueOrZero(popupContentElement.outerWidth()) + 17 + "px");
        } else {
            popupElement.css("width", valueOrZero(popupContentElement.outerWidth()) + "px");
        }
        $(".ui-popup" + " .ui-scrollpanel").scrollTop(0);
        popupElement.css("position", "absolute");
        popupElement.css("top", ((($(window).height() - valueOrZero(popupElement.outerHeight())) / 2) +
            $(window).scrollTop()) + "px");
        popupElement.css("left", ((($(window).width() - valueOrZero(popupElement.outerWidth())) / 2) +
            $(window).scrollLeft()) + "px");
    }
}

//for now used in confirm popup only
//if bind event exists (by calling second confirm popup) do nothing
function bindFocusEvent() {
    if (document.getElementById('confirmPopupForm:hidden')) {
        var eventExists = false;
        var keyUpEvents = jQuery._data(document, "events").keyup;
        if (keyUpEvents !== undefined) {
            keyUpEvents.forEach(function(event, index) {
                if (event.handler !== undefined && event.handler.name === 'defaultActionFromRC') {
                    eventExists = true;
                }
            });
        }
        if (!eventExists) {
            $(document).on('keyup', defaultActionFromRC);
        }
    }
}

//for now used in confirm popup only
//if other confirm popup exists do nothing
//otherwise remove all defaultActionFromRC events (should be one bo for sure)
function unbindFocusEvent() {
    if (document.getElementById('confirmPopupForm:hidden')) {
        return;
    }
    var eventsToUnbind = [];
    var keyUpEvents = jQuery._data(document, "events").keyup;
    if (keyUpEvents !== undefined) {
        keyUpEvents.forEach(function(event, index) {
            if (event.handler !== undefined && event.handler.name === 'defaultActionFromRC') {
                eventsToUnbind.push(event);
            }
        });
    }
    eventsToUnbind.forEach(function(event, index) {
        keyUpEvents.pop(event);
    });
}

//for now used in confirm popup only
function defaultActionFromRC() {
    if (document.getElementById('confirmPopupForm:hidden')) {
        if(document.getElementById('confirmPopupForm:hidden') !== document.activeElement) {
            var keyCode = event.keyCode ? event.keyCode : event.charCode;
            if (keyCode === 13) {  // ENTER
                defaultActionButtonRC();
                event.preventDefault();
            }
        }
    }
}

var lastResignMechanismPopupMem = {};
function deactivateResignMechanism() {
    if (lastResignMechanism.isPopup)
        return;
    lastResignMechanismPopupMem = lastResignMechanism;
    lastResignMechanism = createResignMechanismData()
}

function restoreResignMechanism() {
    if (lastResignMechanism.isPopup)
        return;
    lastResignMechanism = lastResignMechanismPopupMem;
}

function valueOrZero(value) {
    return value ? value : 0;
}