"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let geojson = require('geojson-utils');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const EmergencyPlansCommandSet_1 = require("./EmergencyPlansCommandSet");
class EmergencyPlansController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(EmergencyPlansController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EmergencyPlansCommandSet_1.EmergencyPlansCommandSet(this);
        return this._commandSet;
    }
    getPlans(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getPlanById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createPlan(correlationId, plan, callback) {
        this._persistence.create(correlationId, plan, callback);
    }
    updatePlan(correlationId, plan, callback) {
        this._persistence.update(correlationId, plan, callback);
    }
    deletePlanById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.EmergencyPlansController = EmergencyPlansController;
EmergencyPlansController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-emergencyplans:persistence:*:*:1.0');
//# sourceMappingURL=EmergencyPlansController.js.map