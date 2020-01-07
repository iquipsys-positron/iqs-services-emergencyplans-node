let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { EmergencyPlanV1 } from '../../src/data/version1/EmergencyPlanV1';
import { EmergencyActionV1 } from '../../src/data/version1/EmergencyActionV1';
import { EmergencyPlansMemoryPersistence } from '../../src/persistence/EmergencyPlansMemoryPersistence';
import { EmergencyPlansController } from '../../src/logic/EmergencyPlansController';
import { EmergencyPlansLambdaFunction } from '../../src/container/EmergencyPlansLambdaFunction';

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

suite('EmergencyPlansLambdaFunction', ()=> {
    let lambda: EmergencyPlansLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-emergencyplans:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-emergencyplans:controller:default:default:1.0'
        );

        lambda = new EmergencyPlansLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var plan1, plan2;

        async.series([
        // Create one plan
            (callback) => {
                lambda.act(
                    {
                        role: 'plans',
                        cmd: 'create_plan',
                        plan: PLAN1
                    },
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.org_id, PLAN1.org_id);
                        assert.equal(plan.name, PLAN1.name);

                        plan1 = plan;

                        callback();
                    }
                );
            },
        // Create another plan
            (callback) => {
                lambda.act(
                    {
                        role: 'plans',
                        cmd: 'create_plan',
                        plan: PLAN2
                    },
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.org_id, PLAN2.org_id);
                        assert.equal(plan.name, PLAN2.name);

                        plan2 = plan;

                        callback();
                    }
                );
            },
        // Get all plans
            (callback) => {
                lambda.act(
                    {
                        role: 'plans',
                        cmd: 'get_plans' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the plan
            (callback) => {
                plan1.name = 'Updated plan 1';

                lambda.act(
                    {
                        role: 'plans',
                        cmd: 'update_plan',
                        plan: plan1
                    },
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isObject(plan);
                        assert.equal(plan.name, 'Updated plan 1');
                        assert.equal(plan.id, PLAN1.id);

                        plan1 = plan;

                        callback();
                    }
                );
            },
        // Delete plan
            (callback) => {
                lambda.act(
                    {
                        role: 'plans',
                        cmd: 'delete_plan_by_id',
                        plan_id: plan1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete plan
            (callback) => {
                lambda.act(
                    {
                        role: 'plans',
                        cmd: 'get_plan_by_id',
                        plan_id: plan1.id
                    },
                    (err, plan) => {
                        assert.isNull(err);

                        assert.isNull(plan || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});