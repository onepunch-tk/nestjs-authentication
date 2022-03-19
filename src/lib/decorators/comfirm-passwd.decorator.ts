import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ComfirmPassword(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: ComfirmPasswordConstraint
    });
  };
}

@ValidatorConstraint({ name: 'comfirm-password' })
export class ComfirmPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean | Promise<boolean> {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage?(args?: ValidationArguments): string {
    const { constraints, property } = args;
    return `${property} and ${constraints[0]} must be same.`
  }
}
