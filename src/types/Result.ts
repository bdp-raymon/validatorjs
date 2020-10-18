export type IResultValue = {
  validate: () => boolean;
  errors: string[];
};

export type IResult = Record<string, IResultValue>;
