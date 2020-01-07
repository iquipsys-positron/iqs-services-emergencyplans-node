"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_data_node_1 = require("pip-services3-data-node");
const EmergencyPlansMemoryPersistence_1 = require("./EmergencyPlansMemoryPersistence");
class EmergencyPlansFilePersistence extends EmergencyPlansMemoryPersistence_1.EmergencyPlansMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.EmergencyPlansFilePersistence = EmergencyPlansFilePersistence;
//# sourceMappingURL=EmergencyPlansFilePersistence.js.map