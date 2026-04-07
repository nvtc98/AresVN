import fc from "fast-check";
import * as constants from "../index";

/**
 * **Feature: source-code-refactor, Property 4: Constants round-trip serialization**
 * **Validates: Requirements 7.3**
 *
 * For any numeric constant defined in the constants module, converting the
 * constant to a string representation via JSON.stringify and parsing back
 * via JSON.parse SHALL yield a value equal to the original constant.
 */

// Collect all exported values that are numeric or string primitives,
// plus the GAME_TYPES object which is a plain object of strings.
const allExports = Object.entries(constants);

const primitiveConstants = allExports.filter(
  ([, value]) => typeof value === "number" || typeof value === "string",
);

const objectConstants = allExports.filter(
  ([, value]) => typeof value === "object" && value !== null,
);

describe("Property 4: Constants round-trip serialization", () => {
  test("all primitive constants survive JSON round-trip", () => {
    fc.assert(
      fc.property(fc.constantFrom(...primitiveConstants), ([name, value]) => {
        const roundTripped = JSON.parse(JSON.stringify(value));
        expect(roundTripped).toEqual(value);
      }),
      { numRuns: 100 },
    );
  });

  test("all object constants survive JSON round-trip", () => {
    fc.assert(
      fc.property(fc.constantFrom(...objectConstants), ([name, value]) => {
        const roundTripped = JSON.parse(JSON.stringify(value));
        expect(roundTripped).toEqual(value);
      }),
      { numRuns: 100 },
    );
  });
});
