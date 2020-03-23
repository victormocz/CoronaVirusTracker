class PreventionIntentHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PreventionIntent';
    }

    static handle(handlerInput) {
        const speechText = 'You can protect yourself and help prevent spreading the virus to others if you'
            + " Wash your hands regularly for 20 seconds, with soap and water or alcohol-based hand rub. "
            + " Cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze. "
            + "Avoid close contact (1 meter or 3 feet) with people who are unwell. "
            + "Stay home and self-isolate from others in the household if you feel unwell. "
            + "Don't Touch your eyes, nose, or mouth if your hands are not clean.";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Prevent coronavirus disease', speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = PreventionIntentHandler;