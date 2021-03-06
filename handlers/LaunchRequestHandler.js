const ReportGenerator = require('../report').ReportGenerator;
const messages = require('../messages');

class LaunchRequestHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }

    static handle(handlerInput) {
        return ReportGenerator.generateDailyReport().then((report) => {
            return handlerInput.responseBuilder
                .speak(report + " " + messages.helpMessage)
                .withSimpleCard("Today's COVID19 update", report)
                .reprompt(messages.helpMessage)
                .getResponse();
        }).catch((err) => {
            return handlerInput.responseBuilder
                .speak(err)
                .withSimpleCard('Error', err)
                .getResponse();
        });
    }
}

module.exports = LaunchRequestHandler;