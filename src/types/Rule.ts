export type IRule = Record<
  string,
  ((value: any) => boolean) | ((value: any) => boolean)[]
>;
