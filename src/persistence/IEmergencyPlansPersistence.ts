import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { EmergencyPlanV1 } from '../data/version1/EmergencyPlanV1';

export interface IEmergencyPlansPersistence extends IGetter<EmergencyPlanV1, string>, IWriter<EmergencyPlanV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<EmergencyPlanV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: EmergencyPlanV1) => void): void;

    create(correlationId: string, item: EmergencyPlanV1, 
        callback: (err: any, item: EmergencyPlanV1) => void): void;

    update(correlationId: string, item: EmergencyPlanV1, 
        callback: (err: any, item: EmergencyPlanV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: EmergencyPlanV1) => void): void;
}
