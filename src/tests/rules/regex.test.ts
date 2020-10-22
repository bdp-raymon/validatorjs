import { regexValidator } from "../../rules/regex";
import { RegexConfig } from "../../types/RegexConfig";

describe("regex validator", () => {
  const regexPattern = /^[a-z]+/;
  const stringRegexPattern = "^[a-z]+";
  const regexConfig: RegexConfig = {
    pattern: regexPattern,
    message: "Name only contains small letters",
  };
  const stringRegexConfig: RegexConfig = {
    pattern: stringRegexPattern,
  };

  test("test with regex input", () => {
    expect(regexValidator(regexPattern, "hossein").result).toBe(true);
    expect(regexValidator(regexPattern, "Hossein").result).toBe(false);
    expect(regexValidator(regexPattern, "h").result).toBe(true);
    expect(regexValidator(regexPattern, "H").result).toBe(false);
    expect(regexValidator(regexPattern, "12").result).toBe(false);
    expect(regexValidator(regexPattern, "").result).toBe(false);
  });

  test("test with string input", () => {
    expect(regexValidator(stringRegexPattern, "hossein").result).toBe(true);
    expect(regexValidator(stringRegexPattern, "Hossein").result).toBe(false);
    expect(regexValidator(stringRegexPattern, "h").result).toBe(true);
    expect(regexValidator(stringRegexPattern, "H").result).toBe(false);
    expect(regexValidator(stringRegexPattern, "12").result).toBe(false);
    expect(regexValidator(stringRegexPattern, "").result).toBe(false);
  });

  test("test with regex config object", () => {
    expect(regexValidator(regexConfig, "hossein").result).toBe(true);
    expect(regexValidator(regexConfig, "Hossein").result).toBe(false);
    expect(regexValidator(regexConfig, "h").result).toBe(true);
    expect(regexValidator(regexConfig, "H").result).toBe(false);
    expect(regexValidator(regexConfig, "12").result).toBe(false);
    expect(regexValidator(regexConfig, "").result).toBe(false);
  });

  test("test with string regex config object", () => {
    expect(regexValidator(stringRegexConfig, "hossein").result).toBe(true);
    expect(regexValidator(stringRegexConfig, "Hossein").result).toBe(false);
    expect(regexValidator(stringRegexConfig, "h").result).toBe(true);
    expect(regexValidator(stringRegexConfig, "H").result).toBe(false);
    expect(regexValidator(stringRegexConfig, "12").result).toBe(false);
    expect(regexValidator(stringRegexConfig, "").result).toBe(false);
  });

  test("test error message without providing config", () => {
    expect(regexValidator(regexPattern, "Hossein").message).toBe(
      "Input format is wrong"
    );
  });
  test("test error message with providing config", () => {
    expect(regexValidator(regexConfig, "Hossein").message).toBe(
      "Name only contains small letters"
    );
  });
});
