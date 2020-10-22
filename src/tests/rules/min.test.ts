import { MinConfig } from "../../types/MinConfig";
import { minValidator } from "../../rules/min";

describe("min validator", () => {
  const minConfigWithoutMessage: MinConfig = {
    minimum: 20,
  };

  const minConfig: MinConfig = {
    minimum: 16,
    message: "You must be over 16",
  };

  test("test with minimum input", () => {
    expect(minValidator(18, 22).result).toBe(true);
    expect(minValidator(18, 17).result).toBe(false);
    expect(minValidator(18, 18).result).toBe(false);
  });

  test("test with config object without message", () => {
    expect(minValidator(minConfigWithoutMessage, 35).result).toBe(true);
    expect(minValidator(minConfigWithoutMessage, 20).result).toBe(false);
    expect(minValidator(minConfigWithoutMessage, 12).result).toBe(false);
  });

  test("test without providing message", () => {
    expect(minValidator(18, 12).message).toBe(
      "The minimum input must be over 18"
    );
    expect(minValidator(minConfigWithoutMessage, 12).message).toBe(
      "The minimum input must be over 20"
    );
  });

  test("test with providing message", () => {
    expect(minValidator(minConfig, 12).message).toBe("You must be over 16");
  });
});

describe("curried min validator", () => {
  const minConfig: MinConfig = {
    minimum: 20,
    message: "You must be over 20",
  };

  const curriedMinValidatorWithoutConfig = minValidator(18);
  const curriedMinValidatorWithConfig = minValidator(minConfig);

  test("test with minimum input", () => {
    expect(curriedMinValidatorWithoutConfig(22).result).toBe(true);
    expect(curriedMinValidatorWithoutConfig(17).result).toBe(false);
    expect(curriedMinValidatorWithoutConfig(18).result).toBe(false);
  });

  test("test with config object", () => {
    expect(curriedMinValidatorWithConfig(35).result).toBe(true);
    expect(curriedMinValidatorWithConfig(20).result).toBe(false);
    expect(curriedMinValidatorWithConfig(12).result).toBe(false);
  });
});
