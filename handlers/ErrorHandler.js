class ErrorHandler {
    static canHandle() {
        return true;
    }
    static handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak("Sorry, I don't know how to help you with that.")
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = ErrorHandler;