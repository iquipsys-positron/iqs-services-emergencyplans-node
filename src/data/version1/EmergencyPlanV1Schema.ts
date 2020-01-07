import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { EmergencyStepV1Schema } from './EmergencyStepV1Schema';

export class EmergencyPlanV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('steps', new ArraySchema(new EmergencyStepV1Schema()));
    }
}
