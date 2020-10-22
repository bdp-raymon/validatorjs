import { curry } from "ramda";
import { BuilderConfig, BuilderResult } from "../types/BuilderConfig";

const validatorBuilder = (config: BuilderConfig, input: any) => {
  const validatorFunction = (
    message: string,
    validator: (value: any) => boolean
  ) => {
    const result: BuilderResult = {
      result: validator(input),
      message: message || "Validation Failed",
    };
    return result;
  };
  const response = validatorFunction(config.message || "", config.validator);
  return response;
};

export const curriedValdiatorBuilder = curry(validatorBuilder);
