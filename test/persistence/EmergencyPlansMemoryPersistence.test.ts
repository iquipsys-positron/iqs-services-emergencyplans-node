import { ConfigParams } from 'pip-services3-commons-node';

import { EmergencyPlansMemoryPersistence } from '../../src/persistence/EmergencyPlansMemoryPersistence';
import { EmergencyPlansPersistenceFixture } from './EmergencyPlansPersistenceFixture';

suite('EmergencyPlansMemoryPersistence', ()=> {
    let persistence: EmergencyPlansMemoryPersistence;
    let fixture: EmergencyPlansPersistenceFixture;
    
    setup((done) => {
        persistence = new EmergencyPlansMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new EmergencyPlansPersistenceFixture(persistence);
        
        persistence.open(null, done);
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