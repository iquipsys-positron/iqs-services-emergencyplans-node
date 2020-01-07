let _ = require('lodash');
let async = require('async');
let geojson = require('geojson-utils');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { EmergencyPlanV1 } from '../data/version1/EmergencyPlanV1';
import { EmergencyActionV1 } from '../data/version1/EmergencyActionV1';
import { IEmergencyPlansPersistence } from '../persistence/IEmergencyPlansPersistence';
import { IEmergencyPlansController } from './IEmergencyPlansController';
import { EmergencyPlansCommandSet } from './EmergencyPlansCommandSet';

export class EmergencyPlansController implements  IConfigurable, IReferenceable, ICommandable, IEmergencyPlansController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-emergencyplans:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EmergencyPlansController._defaultConfig);
    private _persistence: IEmergencyPlansPersistence;
    private _commandSet: EmergencyPlansCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IEmergencyPlansPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EmergencyPlansCommandSet(this);
        return this._commandSet;
    }
    
    public getPlans(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<EmergencyPlanV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getPlanById(correlationId: string, id: string, 
        callback: (err: any, plan: EmergencyPlanV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    public createPlan(correlationId: string, plan: EmergencyPlanV1, 
        callback: (err: any, plan: EmergencyPlanV1) => void): void {
        this._persistence.create(correlationId, plan, callback);
    }

    public updatePlan(correlationId: string, plan: EmergencyPlanV1, 
        callback: (err: any, plan: EmergencyPlanV1) => void): void {
        this._persistence.update(correlationId, plan, callback);
    }

    public deletePlanById(correlationId: string, id: string,
        callback: (err: any, plan: EmergencyPlanV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
