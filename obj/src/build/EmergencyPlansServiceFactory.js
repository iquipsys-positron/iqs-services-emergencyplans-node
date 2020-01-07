"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const EmergencyPlansMongoDbPersistence_1 = require("../persistence/EmergencyPlansMongoDbPersistence");
const EmergencyPlansFilePersistence_1 = require("../persistence/EmergencyPlansFilePersistence");
const EmergencyPlansMemoryPersistence_1 = require("../persistence/EmergencyPlansMemoryPersistence");
const EmergencyPlansController_1 = require("../logic/EmergencyPlansController");
const EmergencyPlansHttpServiceV1_1 = require("../services/version1/EmergencyPlansHttpServiceV1");
class EmergencyPlansServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmergencyPlansServiceFactory.MemoryPersistenceDescriptor, EmergencyPlansMemoryPersistence_1.EmergencyPlansMemoryPersistence);
        this.registerAsType(EmergencyPlansServiceFactory.FilePersistenceDescriptor, EmergencyPlansFilePersistence_1.EmergencyPlansFilePersistence);
        this.registerAsType(EmergencyPlansServiceFactory.MongoDbPersistenceDescriptor, EmergencyPlansMongoDbPersistence_1.EmergencyPlansMongoDbPersistence);
        this.registerAsType(EmergencyPlansServiceFactory.ControllerDescriptor, EmergencyPlansController_1.EmergencyPlansController);
        this.registerAsType(EmergencyPlansServiceFactory.HttpServiceDescriptor, EmergencyPlansHttpServiceV1_1.EmergencyPlansHttpServiceV1);
    }
}
exports.EmergencyPlansServiceFactory = EmergencyPlansServiceFactory;
EmergencyPlansServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-emergencyplans", "factory", "default", "default", "1.0");
EmergencyPlansServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-emergencyplans", "persistence", "memory", "*", "1.0");
EmergencyPlansServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-emergencyplans", "persistence", "file", "*", "1.0");
EmergencyPlansServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-emergencyplans", "persistence", "mongodb", "*", "1.0");
EmergencyPlansServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-emergencyplans", "controller", "default", "*", "1.0");
EmergencyPlansServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-emergencyplans", "service", "http", "*", "1.0");
//# sourceMappingURL=EmergencyPlansServiceFactory.js.map