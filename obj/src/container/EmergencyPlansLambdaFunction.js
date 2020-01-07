"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const EmergencyPlansServiceFactory_1 = require("../build/EmergencyPlansServiceFactory");
class EmergencyPlansLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("plans", "EmergencyPlans function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-emergencyplans', 'controller', 'default', '*', '*'));
        this._factories.add(new EmergencyPlansServiceFactory_1.EmergencyPlansServiceFactory());
    }
}
exports.EmergencyPlansLambdaFunction = EmergencyPlansLambdaFunction;
exports.handler = new EmergencyPlansLambdaFunction().getHandler();
//# sourceMappingURL=EmergencyPlansLambdaFunction.js.map