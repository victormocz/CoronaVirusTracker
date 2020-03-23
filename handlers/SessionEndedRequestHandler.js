class SessionEndedRequestHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    }
    
    static handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
}

module.exports = SessionEndedRequestHandler;