var lastResignMechanism = createResignMechanismData();
function createResignMechanismData() {
    return {
        formId : "",
        resignButtonWidgetVar : "",
        closeButtonWidgetVar : "",
        isPopup : false
    };
}

function dispatchCustomEvent(eventName, element) {
    var event = new Event(eventName);
    if (!element)
        element = document;
    element.dispatchEvent(event);
}
