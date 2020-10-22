import { IRule } from "./types/Rule";
import { IValue } from "./types/Value";
import ramda from "ramda";
import { IResult } from "./types/Result";
import { BuilderResult } from "./types/BuilderConfig";
import { minValidator } from "./rules/min";
import { regexValidator } from "./rules/regex";

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
  rules: ((value: any) => BuilderResult) | ((value: any) => BuilderResult)[],
  value: any
) => {
  const errors: string[] = [];
  const rulesArray = typeof rules === "function" ? [rules] : rules;
  for (const rule of rulesArray) {
    const response = rule(value);
    !response.result && errors.push(response.message);
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
