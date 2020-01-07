import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { EmergencyPlanV1 } from '../data/version1/EmergencyPlanV1';
export interface IEmergencyPlansController {
    getPlans(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<EmergencyPlanV1>) => void): void;
    getPlanById(correlationId: string, plan_id: string, callback: (err: any, plan: EmergencyPlanV1) => void): void;
    createPlan(correlationId: string, plan: EmergencyPlanV1, callback: (err: any, plan: EmergencyPlanV1) => void): void;
    updatePlan(correlationId: string, plan: EmergencyPlanV1, callback: (err: any, plan: EmergencyPlanV1) => void): void;
    deletePlanById(correlationId: string, plan_id: string, callback: (err: any, plan: EmergencyPlanV1) => void): void;
}
