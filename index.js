const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = require('./handlers').LaunchRequestHandler;
const SessionEndedRequestHandler = require('./handlers').SessionEndedRequestHandler;
const HelpIntentHandler = require('./handlers').HelpIntentHandler;
const CancelAndStopIntentHandler = require('./handlers').CancelAndStopIntentHandler;
const ErrorHandler = require('./handlers').ErrorHandler;
const PreventionIntentHandler = require('./handlers').PreventionIntentHandler;
const DailyReportIntentHandler = require('./handlers').DailyReportIntentHandler;
const QueryStateIntentHandler = require('./handlers').QueryStateIntentHandler;

let skill;

console.log("Start the skill");

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        HelpIntentHandler,
        LaunchRequestHandler,
        PreventionIntentHandler,
        DailyReportIntentHandler,
        QueryStateIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};