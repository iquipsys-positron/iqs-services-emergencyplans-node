import { IStringIdentifiable } from 'pip-services3-commons-node';

import { EmergencyStepV1 } from './EmergencyStepV1';

export class EmergencyPlanV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public name: string;
    public steps?: EmergencyStepV1[];
}