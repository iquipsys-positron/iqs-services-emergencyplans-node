import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { EmergencyPlansServiceFactory } from '../build/EmergencyPlansServiceFactory';

export class EmergencyPlansProcess extends ProcessContainer {

    public constructor() {
        super("plans", "EmergencyPlans microservice");
        this._factories.add(new EmergencyPlansServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
