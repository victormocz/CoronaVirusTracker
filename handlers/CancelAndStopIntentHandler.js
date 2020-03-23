class CancelAndStopIntentHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    }
    static handle(handlerInput) {
        const speechText = 'Have a good one, stay safe!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Goodbye!', "Have a good day, stay safe!")
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = CancelAndStopIntentHandler;