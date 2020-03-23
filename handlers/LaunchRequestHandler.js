const ReportGenerator = require('../report').ReportGenerator;

class LaunchRequestHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }
    static handle(handlerInput) {
        return ReportGenerator.generateDailyReport().then((report)=> {
            return handlerInput.responseBuilder
            .speak(report)
            .withSimpleCard("Today's COVID19 update", report)
            .getResponse();
        }).catch((err)=> {
            return handlerInput.responseBuilder
            .speak(err)
            .withSimpleCard('Error', err)
            .getResponse();
        });
    }
}

module.exports = LaunchRequestHandler;