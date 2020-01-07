import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class EmergencyActionV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('type', TypeCode.String);
        this.withOptionalProperty('params', null); //TypeCode.Object);
    }
}
