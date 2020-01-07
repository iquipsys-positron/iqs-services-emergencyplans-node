let EmergencyPlansLambdaFunction = require('../obj/src/container/EmergencyPlansLambdaFunction').EmergencyPlansLambdaFunction;

module.exports = new EmergencyPlansLambdaFunction().getHandler();