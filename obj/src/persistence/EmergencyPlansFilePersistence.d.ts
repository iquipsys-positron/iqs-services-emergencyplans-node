import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { EmergencyPlansMemoryPersistence } from './EmergencyPlansMemoryPersistence';
import { EmergencyPlanV1 } from '../data/version1/EmergencyPlanV1';
export declare class EmergencyPlansFilePersistence extends EmergencyPlansMemoryPersistence {
    protected _persister: JsonFilePersister<EmergencyPlanV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
