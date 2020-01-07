import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { EmergencyActionV1Schema } from './EmergencyActionV1Schema';

export class EmergencyStepV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('index', TypeCode.Integer);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('actions', new ArraySchema(new EmergencyActionV1Schema()));
    }
}
