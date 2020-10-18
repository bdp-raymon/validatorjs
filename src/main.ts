import { IRule } from "./types/Rule";
import { IValue } from "./types/Value";
import ramda, { max } from "ramda";
import { IResult } from "./types/Result";

const maxAge = (age: number) => age < 50;
const minAge = (age: number) => age > 18;

const authRules: IRule = {
  age: minAge,
};

const authValues: IValue = {
  age: 12,
};

const getErrors = (
  rules: ((value: any) => boolean) | ((value: any) => boolean)[],
  value: any
) => {
  const errors: string[] = [];
  const rulesArray = typeof rules === "function" ? [rules] : rules;
  for (const rule of rulesArray) {
    !rule(value) && errors.push("Error");
  }
  return errors;
};

export const validator = (rules: IRule, values: IValue) => {
  const resultErrors: Record<string, string[]> = {};
  let validateResult: boolean = true;
  Object.keys(values).map((key) => {
    const errors = getErrors(rules[key], values[key]);
    errors.length > 0 && (resultErrors[key] = errors);
    errors.length > 0 && (validateResult = false);
  });
  const result: IResult = {
    validate: () => validateResult,
    errors: resultErrors,
  };
  return result;
};

export const curriedValidator = ramda.curry(validator);

const authValidator = curriedValidator(authRules);

console.log(authValidator(authValues).validate());
console.log(authValidator(authValues).errors);
