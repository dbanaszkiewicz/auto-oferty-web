import {ValidationError} from 'class-validator';

export function serialize(errors: Array<ValidationError>): Object {
    const arrayOfErrors: Object = {};
    for (const item of errors) {
        const itemErrors = [];
            for (const error of Object.values(item.constraints)) {
                itemErrors.push(error);
            }
            arrayOfErrors[item.property] = itemErrors;
    }

    return arrayOfErrors;
}