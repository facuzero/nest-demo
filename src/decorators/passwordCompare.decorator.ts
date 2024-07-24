import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordCompare', async: false })
export class passwordCompare implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }
  defaultMessage(args?: ValidationArguments): string {
    return 'El password y la confirmacion no coinciden';
  }
}
