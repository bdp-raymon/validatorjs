import ramda from "ramda";
import { minValidator } from "./rules/min";
import { regexValidator } from "./rules/regex";

//Types

export type RuleResult = {
  result: boolean;
  message?: string;
};

export type IRule = Record<
  string,
  ((value: any) => RuleResult) | ((value: any) => RuleResult)[]
>;

export type IValue = Record<string, any>;

export type IResult = {
  validate: () => boolean;
  errors: Record<string, string[]>;
};

//User Code

const minAge = minValidator(18);
const isName = regexValidator({
  pattern: /^[a-z]+/,
  message: "Name should not contain numbers",
});

const authRules: IRule = {
  age: minAge,
  name: isName,
};

const authValues: IValue = {
  age: 14,
  name: "15hossein",
};

const getErrors = (
  rules: ((value: any) => RuleResult) | ((value: any) => RuleResult)[],
  value: any
) => {
  const errors: string[] = [];
  const rulesArray = typeof rules === "function" ? [rules] : rules;
  for (const rule of rulesArray) {
    const response = rule(value);
    const message = response.message || "Validation failed";
    !response.result && errors.push(message);
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
