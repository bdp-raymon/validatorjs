export interface IRule {
  [key: string]: RegExp | (() => void);
}
