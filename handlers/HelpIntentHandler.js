const messages = require('../messages');

class HelpIntentHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    }

    static handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(messages.helpMessage)
            .reprompt(messages.helpMessage)
            .withSimpleCard('Skill usage', messages.helpMessage)
            .getResponse();
    }
}

module.exports = HelpIntentHandler;