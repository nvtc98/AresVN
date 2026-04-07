import fc from "fast-check";
import { getField, getSocialLinks, partitionPlayers } from "../dataAccessors";

/**
 * **Feature: source-code-refactor, Property 5: Data accessor correctness**
 * **Validates: Requirements 8.2, 8.3**
 *
 * For any data object and any key, getField(data, key, fallback) SHALL return
 * data[key] when data is a non-null object containing that key, and SHALL
 * return fallback when data is null, undefined, or does not contain the key.
 */
describe("Property 5: Data accessor correctness", () => {
  // Arbitrary for JSON-serializable values (used as field values and fallbacks)
  const jsonValue = fc.jsonValue();

  test("returns data[key] when data is a non-null object containing the key", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        jsonValue,
        jsonValue,
        (key, value, fallback) => {
          const data = { [key]: value };
          const result = getField(data, key, fallback);
          expect(result).toEqual(value);
        },
      ),
      { numRuns: 100 },
    );
  });

  test("returns fallback when data is null or undefined", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(null, undefined),
        fc.string(),
        jsonValue,
        (data, key, fallback) => {
          const result = getField(data, key, fallback);
          expect(result).toEqual(fallback);
        },
      ),
      { numRuns: 100 },
    );
  });

  test("returns fallback when data does not contain the key", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), jsonValue, (key, fallback) => {
        // Build an object that definitely does NOT contain `key`
        const data = { ["__other_" + key + "__"]: "irrelevant" };
        // Only test when the constructed key differs from the target key
        fc.pre(!(key in data));
        const result = getField(data, key, fallback);
        expect(result).toEqual(fallback);
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * **Feature: source-code-refactor, Property 6: Data accessor output round-trip serialization**
 * **Validates: Requirements 8.4**
 *
 * For any valid Data_Layer input, serializing the output of a data accessor
 * function to JSON and parsing back SHALL produce a value equal to the
 * original output.
 */
describe("Property 6: Data accessor output round-trip serialization", () => {
  // Generator for JSON-serializable primitive values (strings, numbers, booleans, null)
  const jsonPrimitive = fc.oneof(
    fc.string(),
    fc.integer(),
    fc.double({ noNaN: true, noDefaultInfinity: true }),
    fc.boolean(),
    fc.constant(null),
  );

  test("getField output round-trips through JSON", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        jsonPrimitive,
        jsonPrimitive,
        (key, value, fallback) => {
          const data = { [key]: value };
          const result = getField(data, key, fallback);
          expect(JSON.parse(JSON.stringify(result))).toEqual(result);
        },
      ),
      { numRuns: 100 },
    );
  });

  test("getSocialLinks output round-trips through JSON", () => {
    fc.assert(
      fc.property(
        fc.record({
          steam: fc.string(),
          discord: fc.string(),
          youtube: fc.string(),
        }),
        (contactData) => {
          const result = getSocialLinks(contactData);
          expect(JSON.parse(JSON.stringify(result))).toEqual(result);
        },
      ),
      { numRuns: 100 },
    );
  });

  test("partitionPlayers output round-trips through JSON", () => {
    const playerArb = fc.record({
      img: fc.string(),
      name: fc.string(),
      isHidden: fc.boolean(),
    });

    fc.assert(
      fc.property(fc.array(playerArb), (players) => {
        const result = partitionPlayers(players);
        expect(JSON.parse(JSON.stringify(result))).toEqual(result);
      }),
      { numRuns: 100 },
    );
  });
});
