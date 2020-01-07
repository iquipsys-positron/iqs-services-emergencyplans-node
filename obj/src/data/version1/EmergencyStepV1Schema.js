"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const EmergencyActionV1Schema_1 = require("./EmergencyActionV1Schema");
class EmergencyStepV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('index', pip_services3_commons_node_3.TypeCode.Integer);
        this.withRequiredProperty('name', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('actions', new pip_services3_commons_node_2.ArraySchema(new EmergencyActionV1Schema_1.EmergencyActionV1Schema()));
    }
}
exports.EmergencyStepV1Schema = EmergencyStepV1Schema;
//# sourceMappingURL=EmergencyStepV1Schema.js.map