import { CommandSet } from 'pip-services3-commons-node';
import { IEmergencyPlansController } from './IEmergencyPlansController';
export declare class EmergencyPlansCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEmergencyPlansController);
    private makeGetEmergencyPlansCommand;
    private makeGetEmergencyPlanByIdCommand;
    private makeCreateEmergencyPlanCommand;
    private makeUpdateEmergencyPlanCommand;
    private makeDeleteEmergencyPlanByIdCommand;
}
