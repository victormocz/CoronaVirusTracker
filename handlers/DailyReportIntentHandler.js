const ReportGenerator = require('../report').ReportGenerator;
const messages = require('../messages');

class DailyReportIntentHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DailyReportIntent';
    }

    static handle(handlerInput) {
        return ReportGenerator.generateDailyReport().then((report) => {
            return handlerInput.responseBuilder
                .speak(report + " " + messages.helpMessage)
                .reprompt(messages.helpMessage)
                .withSimpleCard("Today's COVID19 update", report)
                .getResponse();
        }).catch((err) => {
            return handlerInput.responseBuilder
                .speak(err)
                .withSimpleCard('Error', err)
                .getResponse();
        });
    }
}

module.exports = DailyReportIntentHandler;