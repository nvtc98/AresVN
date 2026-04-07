import React, { useState, useEffect } from "react";
import { render, act } from "@testing-library/react";
import fc from "fast-check";
import { useTeam } from "../useTeam";

/**
 * **Feature: source-code-refactor, Property 2: Custom hook interface contract**
 * **Validates: Requirements 4.2**
 *
 * For any valid playerData input, the useTeam hook SHALL return an object
 * containing all expected keys: selectedIndex (number), isAnimating (boolean),
 * showExtraPlayers (boolean), game (string), activePlayers (array),
 * onChangePlayer (function), onExpand (function), onChangeGame (function).
 */

// Mock ApexCharts to avoid DOM chart rendering in tests
jest.mock("apexcharts", () => {
  return jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    updateSeries: jest.fn(),
    destroy: jest.fn(),
  }));
});

// Helper component that captures hook return value
function HookCapture({ onCapture, actionSequence }) {
  const hookResult = useTeam();
  const [actionIndex, setActionIndex] = useState(0);

  // Capture initial render
  useEffect(() => {
    onCapture(hookResult);
  });

  // Execute action sequence
  useEffect(() => {
    if (actionSequence && actionIndex < actionSequence.length) {
      const action = actionSequence[actionIndex];
      if (action.type === "changePlayer") {
        hookResult.onChangePlayer(action.index);
      } else if (action.type === "expand") {
        hookResult.onExpand();
      } else if (action.type === "changeGame") {
        hookResult.onChangeGame();
      }
      setActionIndex((prev) => prev + 1);
    }
  }, [actionIndex]);

  return null;
}

// Generator for action sequences that exercise the hook
const actionArb = fc.oneof(
  fc.record({
    type: fc.constant("changePlayer"),
    index: fc.integer({ min: 0, max: 7 }),
  }),
  fc.record({ type: fc.constant("expand") }),
  fc.record({ type: fc.constant("changeGame") }),
);

const actionSequenceArb = fc.array(actionArb, { minLength: 0, maxLength: 5 });

function validateHookInterface(result) {
  // Check all expected keys exist
  expect(result).toHaveProperty("selectedIndex");
  expect(result).toHaveProperty("isAnimating");
  expect(result).toHaveProperty("showExtraPlayers");
  expect(result).toHaveProperty("game");
  expect(result).toHaveProperty("activePlayers");
  expect(result).toHaveProperty("onChangePlayer");
  expect(result).toHaveProperty("onExpand");
  expect(result).toHaveProperty("onChangeGame");

  // Check types
  expect(typeof result.selectedIndex).toBe("number");
  expect(typeof result.isAnimating).toBe("boolean");
  expect(typeof result.showExtraPlayers).toBe("boolean");
  expect(typeof result.game).toBe("string");
  expect(Array.isArray(result.activePlayers)).toBe(true);
  expect(typeof result.onChangePlayer).toBe("function");
  expect(typeof result.onExpand).toBe("function");
  expect(typeof result.onChangeGame).toBe("function");
}

/**
 * **Feature: source-code-refactor, Property 3: Custom hook return value round-trip serialization**
 * **Validates: Requirements 4.3**
 *
 * For any valid input to useTeam, serializing the serializable fields of the
 * hook's return value (selectedIndex, isAnimating, showExtraPlayers, game,
 * activePlayers) to JSON and parsing back SHALL produce values equivalent
 * to the originals.
 */
describe("Property 3: Custom hook return value round-trip serialization", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("serializable hook fields survive JSON round-trip after any action sequence", () => {
    fc.assert(
      fc.property(actionSequenceArb, (actions) => {
        let lastCapture = null;

        act(() => {
          render(
            <HookCapture
              onCapture={(result) => {
                lastCapture = result;
              }}
              actionSequence={actions}
            />,
          );
        });

        act(() => {
          jest.runAllTimers();
        });

        expect(lastCapture).not.toBeNull();

        // Extract only the serializable fields
        const serializable = {
          selectedIndex: lastCapture.selectedIndex,
          isAnimating: lastCapture.isAnimating,
          showExtraPlayers: lastCapture.showExtraPlayers,
          game: lastCapture.game,
          activePlayers: lastCapture.activePlayers,
        };

        // Round-trip through JSON
        const roundTripped = JSON.parse(JSON.stringify(serializable));

        expect(roundTripped.selectedIndex).toBe(serializable.selectedIndex);
        expect(roundTripped.isAnimating).toBe(serializable.isAnimating);
        expect(roundTripped.showExtraPlayers).toBe(
          serializable.showExtraPlayers,
        );
        expect(roundTripped.game).toBe(serializable.game);
        expect(roundTripped.activePlayers).toEqual(serializable.activePlayers);
      }),
      { numRuns: 100 },
    );
  });
});

describe("Property 2: Custom hook interface contract", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("useTeam returns correct interface shape after any sequence of actions", () => {
    fc.assert(
      fc.property(actionSequenceArb, (actions) => {
        let lastCapture = null;

        act(() => {
          render(
            <HookCapture
              onCapture={(result) => {
                lastCapture = result;
              }}
              actionSequence={actions}
            />,
          );
        });

        // Run through any pending timers from animations
        act(() => {
          jest.runAllTimers();
        });

        // Validate the interface contract holds
        expect(lastCapture).not.toBeNull();
        validateHookInterface(lastCapture);
      }),
      { numRuns: 100 },
    );
  });
});
