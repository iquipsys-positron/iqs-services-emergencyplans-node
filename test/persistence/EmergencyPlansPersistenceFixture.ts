let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { EmergencyPlanV1 } from '../../src/data/version1/EmergencyPlanV1';
import { EmergencyActionV1 } from '../../src/data/version1/EmergencyActionV1';

import { IEmergencyPlansPersistence } from '../../src/persistence/IEmergencyPlansPersistence';

let PLAN1: EmergencyPlanV1 = {
    id: '1',
    org_id: '1',
    name: 'Test plan 1',
    steps: []
};
let PLAN2: EmergencyPlanV1 = {
    id: '2',
    org_id: '1',
    name: 'Test plan 2',
    steps: []
};
let PLAN3: EmergencyPlanV1 = {
    id: '3',
    org_id: '2',
    name: 'Test plan 3',
    steps: []
};

export class EmergencyPlansPersistenceFixture {
    private _persistence: IEmergencyPlansPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateEmergencyPlans(done) {
        async.series([
        // Create one plan
            (callback) => {
                this._persistence.create(
                    null,
                    PLAN1,
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.org_id, PLAN1.org_id);
                        assert.equal(plan.name, PLAN1.name);

                        callback();
                    }
                );
            },
        // Create another plan
            (callback) => {
                this._persistence.create(
                    null,
                    PLAN2,
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.org_id, PLAN2.org_id);
                        assert.equal(plan.name, PLAN2.name);

                        callback();
                    }
                );
            },
        // Create yet another plan
            (callback) => {
                this._persistence.create(
                    null,
                    PLAN3,
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.org_id, PLAN3.org_id);
                        assert.equal(plan.name, PLAN3.name);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let plan1: EmergencyPlanV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateEmergencyPlans(callback);
            },
        // Get all plans
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        plan1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the plan
            (callback) => {
                plan1.name = 'Updated plan 1';

                this._persistence.update(
                    null,
                    plan1,
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.name, 'Updated plan 1');
                        assert.equal(plan.id, plan1.id);

                        callback();
                    }
                );
            },
        // Delete plan
            (callback) => {
                this._persistence.deleteById(
                    null,
                    plan1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete plan
            (callback) => {
                this._persistence.getOneById(
                    null,
                    plan1.id,
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isNull(plan || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create plans
            (callback) => {
                this.testCreateEmergencyPlans(callback);
            },
        // Get plans filtered by org_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, plans) => {
                        assert.isNull(err);

                        assert.isObject(plans);
                        assert.lengthOf(plans.data, 2);

                        callback();
                    }
                );
            },
        // Get plans filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                         search: 'test'
                    }),
                    new PagingParams(),
                    (err, plans) => {
                        assert.isNull(err);

                        assert.isObject(plans);
                        assert.lengthOf(plans.data, 3);

                        callback();
                    }
                );
            },
        ], done);
    }

}
