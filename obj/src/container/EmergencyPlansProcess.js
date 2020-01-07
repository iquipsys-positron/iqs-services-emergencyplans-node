"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const EmergencyPlansServiceFactory_1 = require("../build/EmergencyPlansServiceFactory");
class EmergencyPlansProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("plans", "EmergencyPlans microservice");
        this._factories.add(new EmergencyPlansServiceFactory_1.EmergencyPlansServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.EmergencyPlansProcess = EmergencyPlansProcess;
//# sourceMappingURL=EmergencyPlansProcess.js.map