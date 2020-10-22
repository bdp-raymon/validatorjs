import { curry } from "ramda";
import { validatorBuilder } from "../core/builder";
import { BuilderConfig } from "../types/BuilderConfig";
import { RegexConfig } from "../types/RegexConfig";

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
  const builderConfig: BuilderConfig = {
    validator: (value: string) => RegExp(regexPattern).test(value),
    message,
  };
  return validatorBuilder(builderConfig, input);
};

export const regexValidator = curry(regexValidatorRaw);
