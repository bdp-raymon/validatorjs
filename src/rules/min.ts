import { curry } from "ramda";
import { validatorBuilder } from "../core/builder";
import { BuilderConfig } from "../types/BuilderConfig";
import { MinConfig } from "../types/MinConfig";

const minValidatorRaw = (config: MinConfig | number, input: number) => {
  const min: number = typeof config === "object" ? config.minimum : config;
  const message: string =
    typeof config === "object" && config.message
      ? config.message
      : `The minimum input must be over ${min}`;
  const builderConfig: BuilderConfig = {
    validator: (value: number) => min < value,
    message,
  };
  return validatorBuilder(builderConfig, input);
};

export const minValidator = curry(minValidatorRaw);
