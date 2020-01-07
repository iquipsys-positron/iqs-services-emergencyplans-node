let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EmergencyPlanV1 } from '../../../src/data/version1/EmergencyPlanV1';
import { EmergencyActionV1 } from '../../../src/data/version1/EmergencyActionV1';
import { EmergencyPlansMemoryPersistence } from '../../../src/persistence/EmergencyPlansMemoryPersistence';
import { EmergencyPlansController } from '../../../src/logic/EmergencyPlansController';
import { EmergencyPlansHttpServiceV1 } from '../../../src/services/version1/EmergencyPlansHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('EmergencyPlansHttpServiceV1', ()=> {    
    let service: EmergencyPlansHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new EmergencyPlansMemoryPersistence();
        let controller = new EmergencyPlansController();

        service = new EmergencyPlansHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-emergencyplans', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-emergencyplans', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-emergencyplans', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let plan1, plan2;

        async.series([
        // Create one plan
            (callback) => {
                rest.post('/v1/plans/create_plan',
                    {
                        plan: PLAN1
                    },
                    (err, req, res, plan) => {
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
                rest.post('/v1/plans/create_plan', 
                    {
                        plan: PLAN2
                    },
                    (err, req, res, plan) => {
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
                rest.post('/v1/plans/get_plans',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/plans/update_plan',
                    { 
                        plan: plan1
                    },
                    (err, req, res, plan) => {
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
                rest.post('/v1/plans/delete_plan_by_id',
                    {
                        plan_id: plan1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete plan
            (callback) => {
                rest.post('/v1/plans/get_plan_by_id',
                    {
                        plan_id: plan1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});