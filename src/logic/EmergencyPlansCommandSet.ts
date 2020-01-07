import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { EmergencyPlanV1 } from '../data/version1/EmergencyPlanV1';
import { EmergencyPlanV1Schema } from '../data/version1/EmergencyPlanV1Schema';
import { IEmergencyPlansController } from './IEmergencyPlansController';

export class EmergencyPlansCommandSet extends CommandSet {
    private _logic: IEmergencyPlansController;

    constructor(logic: IEmergencyPlansController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetEmergencyPlansCommand());
		this.addCommand(this.makeGetEmergencyPlanByIdCommand());
		this.addCommand(this.makeCreateEmergencyPlanCommand());
		this.addCommand(this.makeUpdateEmergencyPlanCommand());
		this.addCommand(this.makeDeleteEmergencyPlanByIdCommand());
    }

	private makeGetEmergencyPlansCommand(): ICommand {
		return new Command(
			"get_plans",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getPlans(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetEmergencyPlanByIdCommand(): ICommand {
		return new Command(
			"get_plan_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('plan_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let plan_id = args.getAsString("plan_id");
                this._logic.getPlanById(correlationId, plan_id, callback);
            }
		);
	}

	private makeCreateEmergencyPlanCommand(): ICommand {
		return new Command(
			"create_plan",
			new ObjectSchema(true)
				.withRequiredProperty('plan', new EmergencyPlanV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let plan = args.get("plan");
                this._logic.createPlan(correlationId, plan, callback);
            }
		);
	}

	private makeUpdateEmergencyPlanCommand(): ICommand {
		return new Command(
			"update_plan",
			new ObjectSchema(true)
				.withRequiredProperty('plan', new EmergencyPlanV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let plan = args.get("plan");
                this._logic.updatePlan(correlationId, plan, callback);
            }
		);
	}
	
	private makeDeleteEmergencyPlanByIdCommand(): ICommand {
		return new Command(
			"delete_plan_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('plan_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let planId = args.getAsNullableString("plan_id");
                this._logic.deletePlanById(correlationId, planId, callback);
			}
		);
	}

}