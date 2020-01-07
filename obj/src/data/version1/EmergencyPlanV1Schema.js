"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const EmergencyStepV1Schema_1 = require("./EmergencyStepV1Schema");
class EmergencyPlanV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('steps', new pip_services3_commons_node_2.ArraySchema(new EmergencyStepV1Schema_1.EmergencyStepV1Schema()));
    }
}
exports.EmergencyPlanV1Schema = EmergencyPlanV1Schema;
//# sourceMappingURL=EmergencyPlanV1Schema.js.map