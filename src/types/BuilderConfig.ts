export type BuilderConfig = {
  validator: (value: any) => boolean;
  message?: string;
};

export type BuilderResult = {
  message: string;
  result: boolean;
};
