import { curry } from "ramda";
import { RuleResult } from "../main";

export type MinConfig = {
  minimum: number;
  message?: string;
};

const minValidatorRaw = (config: MinConfig | number, input: number) => {
  const min: number = typeof config === "object" ? config.minimum : config;
  const message: string =
    typeof config === "object" && config.message
      ? config.message
      : `The minimum input must be over ${min}`;
  const validator = (value: number): RuleResult => ({
    result: value > min,
    message,
  });
  return validator(input);
};

export const minValidator = curry(minValidatorRaw);
