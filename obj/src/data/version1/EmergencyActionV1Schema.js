"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class EmergencyActionV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('type', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('params', null); //TypeCode.Object);
    }
}
exports.EmergencyActionV1Schema = EmergencyActionV1Schema;
//# sourceMappingURL=EmergencyActionV1Schema.js.map