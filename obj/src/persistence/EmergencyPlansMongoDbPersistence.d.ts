import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { EmergencyPlanV1 } from '../data/version1/EmergencyPlanV1';
import { IEmergencyPlansPersistence } from './IEmergencyPlansPersistence';
export declare class EmergencyPlansMongoDbPersistence extends IdentifiableMongoDbPersistence<EmergencyPlanV1, string> implements IEmergencyPlansPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<EmergencyPlanV1>) => void): void;
}
