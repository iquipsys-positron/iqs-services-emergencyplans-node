"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const EmergencyPlanV1Schema_1 = require("../data/version1/EmergencyPlanV1Schema");
class EmergencyPlansCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetEmergencyPlansCommand());
        this.addCommand(this.makeGetEmergencyPlanByIdCommand());
        this.addCommand(this.makeCreateEmergencyPlanCommand());
        this.addCommand(this.makeUpdateEmergencyPlanCommand());
        this.addCommand(this.makeDeleteEmergencyPlanByIdCommand());
    }
    makeGetEmergencyPlansCommand() {
        return new pip_services3_commons_node_2.Command("get_plans", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getPlans(correlationId, filter, paging, callback);
        });
    }
    makeGetEmergencyPlanByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_plan_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('plan_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let plan_id = args.getAsString("plan_id");
            this._logic.getPlanById(correlationId, plan_id, callback);
        });
    }
    makeCreateEmergencyPlanCommand() {
        return new pip_services3_commons_node_2.Command("create_plan", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('plan', new EmergencyPlanV1Schema_1.EmergencyPlanV1Schema()), (correlationId, args, callback) => {
            let plan = args.get("plan");
            this._logic.createPlan(correlationId, plan, callback);
        });
    }
    makeUpdateEmergencyPlanCommand() {
        return new pip_services3_commons_node_2.Command("update_plan", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('plan', new EmergencyPlanV1Schema_1.EmergencyPlanV1Schema()), (correlationId, args, callback) => {
            let plan = args.get("plan");
            this._logic.updatePlan(correlationId, plan, callback);
        });
    }
    makeDeleteEmergencyPlanByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_plan_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('plan_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let planId = args.getAsNullableString("plan_id");
            this._logic.deletePlanById(correlationId, planId, callback);
        });
    }
}
exports.EmergencyPlansCommandSet = EmergencyPlansCommandSet;
//# sourceMappingURL=EmergencyPlansCommandSet.js.map