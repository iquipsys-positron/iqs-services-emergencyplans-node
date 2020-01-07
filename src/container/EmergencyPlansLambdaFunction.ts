import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { EmergencyPlansServiceFactory } from '../build/EmergencyPlansServiceFactory';

export class EmergencyPlansLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("plans", "EmergencyPlans function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-emergencyplans', 'controller', 'default', '*', '*'));
        this._factories.add(new EmergencyPlansServiceFactory());
    }
}

export const handler = new EmergencyPlansLambdaFunction().getHandler();