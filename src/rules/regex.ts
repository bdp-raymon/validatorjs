import { curry } from "ramda";
import { RuleResult } from "../main";

export type RegexConfig = {
  pattern: string | RegExp;
  message?: string;
};

const regexValidatorRaw = (
  config: RegexConfig | string | RegExp,
  input: string
) => {
  function isConfig(toBeDetermined: any): toBeDetermined is RegexConfig {
    if (
      typeof toBeDetermined === "object" &&
      !(toBeDetermined instanceof RegExp)
    ) {
      return true;
    }
    return false;
  }
  const regexPattern = isConfig(config) ? config.pattern : config;
  const message: string =
    isConfig(config) && config.message
      ? config.message
      : `Input format is wrong`;
  const validator = (value: string): RuleResult => ({
    result: RegExp(regexPattern).test(value),
    message,
  });
  return validator(input);
};

export const regexValidator = curry(regexValidatorRaw);
