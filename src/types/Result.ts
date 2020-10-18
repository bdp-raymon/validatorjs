export type IResult = {
  validate: () => boolean;
  errors: Record<string, string[]>;
};
