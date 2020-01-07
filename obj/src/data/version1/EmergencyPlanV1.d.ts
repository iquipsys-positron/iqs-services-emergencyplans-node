import { IStringIdentifiable } from 'pip-services3-commons-node';
import { EmergencyStepV1 } from './EmergencyStepV1';
export declare class EmergencyPlanV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    name: string;
    steps?: EmergencyStepV1[];
}
