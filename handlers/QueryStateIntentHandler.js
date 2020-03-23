const ReportGenerator = require('../report').ReportGenerator;

class QueryStateIntentHandler {
    static canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'QueryStateIntent';
    }

    static handle(handlerInput) {
        const stateName = handlerInput.requestEnvelope.request.intent.slots.state.value;
        console.log(stateName);
        return ReportGenerator.generateStateReport(stateName).then((report) => {
            return handlerInput.responseBuilder
                .speak(report)
                .withSimpleCard("Today's COVID19 in " + stateName, report)
                .getResponse();
        }).catch((err) => {
            return handlerInput.responseBuilder
                .speak(err)
                .withSimpleCard('Error', err)
                .getResponse();
        });
    }
}

module.exports = QueryStateIntentHandler;