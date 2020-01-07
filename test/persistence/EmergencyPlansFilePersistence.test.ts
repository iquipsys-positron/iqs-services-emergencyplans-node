import { ConfigParams } from 'pip-services3-commons-node';

import { EmergencyPlansFilePersistence } from '../../src/persistence/EmergencyPlansFilePersistence';
import { EmergencyPlansPersistenceFixture } from './EmergencyPlansPersistenceFixture';

suite('EmergencyPlansFilePersistence', ()=> {
    let persistence: EmergencyPlansFilePersistence;
    let fixture: EmergencyPlansPersistenceFixture;
    
    setup((done) => {
        persistence = new EmergencyPlansFilePersistence('./data/plans.test.json');

        fixture = new EmergencyPlansPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});