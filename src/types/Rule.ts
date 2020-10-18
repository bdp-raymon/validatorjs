export type IRule = Record<string, RegExp | ((value: any) => boolean)>;
