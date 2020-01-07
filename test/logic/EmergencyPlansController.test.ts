let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EmergencyPlanV1 } from '../../src/data/version1/EmergencyPlanV1';
import { EmergencyActionV1 } from '../../src/data/version1/EmergencyActionV1';
import { EmergencyPlansMemoryPersistence } from '../../src/persistence/EmergencyPlansMemoryPersistence';
import { EmergencyPlansController } from '../../src/logic/EmergencyPlansController';

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

suite('EmergencyPlansController', ()=> {    
    let persistence: EmergencyPlansMemoryPersistence;
    let controller: EmergencyPlansController;

    suiteSetup(() => {
        persistence = new EmergencyPlansMemoryPersistence();
        controller = new EmergencyPlansController();

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-emergencyplans', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-emergencyplans', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    
    test('CRUD Operations', (done) => {
        let plan1, plan2;

        async.series([
        // Create one plan
            (callback) => {
                controller.createPlan(
                    null, PLAN1,
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
                controller.createPlan(
                    null, PLAN2,
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
                controller.getPlans(
                    null, null, null,
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

                controller.updatePlan(
                    null, plan1,
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
                controller.deletePlanById(
                    null, plan1.id,
                    (err, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete plan
            (callback) => {
                controller.getPlanById(
                    null, plan1.id,
                    (err, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});