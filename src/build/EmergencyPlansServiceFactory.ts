import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EmergencyPlansMongoDbPersistence } from '../persistence/EmergencyPlansMongoDbPersistence';
import { EmergencyPlansFilePersistence } from '../persistence/EmergencyPlansFilePersistence';
import { EmergencyPlansMemoryPersistence } from '../persistence/EmergencyPlansMemoryPersistence';
import { EmergencyPlansController } from '../logic/EmergencyPlansController';
import { EmergencyPlansHttpServiceV1 } from '../services/version1/EmergencyPlansHttpServiceV1';

export class EmergencyPlansServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-emergencyplans", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-emergencyplans", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-emergencyplans", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-emergencyplans", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-emergencyplans", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-emergencyplans", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmergencyPlansServiceFactory.MemoryPersistenceDescriptor, EmergencyPlansMemoryPersistence);
		this.registerAsType(EmergencyPlansServiceFactory.FilePersistenceDescriptor, EmergencyPlansFilePersistence);
		this.registerAsType(EmergencyPlansServiceFactory.MongoDbPersistenceDescriptor, EmergencyPlansMongoDbPersistence);
		this.registerAsType(EmergencyPlansServiceFactory.ControllerDescriptor, EmergencyPlansController);
		this.registerAsType(EmergencyPlansServiceFactory.HttpServiceDescriptor, EmergencyPlansHttpServiceV1);
	}
	
}
