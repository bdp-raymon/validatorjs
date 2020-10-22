import { BuilderResult } from "./BuilderConfig";

export type IRule = Record<
  string,
  ((value: any) => BuilderResult) | ((value: any) => BuilderResult)[]
>;
