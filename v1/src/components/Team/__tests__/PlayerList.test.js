import React from "react";
import { render } from "@testing-library/react";
import fc from "fast-check";
import { PlayerList } from "../PlayerList";

/**
 * **Feature: source-code-refactor, Property 1: Sub-component renders correct player information**
 * **Validates: Requirements 3.2**
 *
 * For any Player_Data object containing name and img fields, when passed
 * to the PlayerList sub-component, the rendered output SHALL contain
 * the player's name from the input data.
 */

// Generator for a single player object with a non-empty name and img
const playerArb = fc.record({
  name: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
  img: fc.constant("img/team/placeholder.png"),
});

// Generator for a non-empty array of players
const playersArb = fc.array(playerArb, { minLength: 1, maxLength: 10 });

describe("Property 1: Sub-component renders correct player information", () => {
  test("PlayerList renders every player name from input data", () => {
    fc.assert(
      fc.property(playersArb, (players) => {
        const { container } = render(
          <PlayerList
            players={players}
            selectedIndex={0}
            onSelect={() => {}}
            showExtra={false}
            onExpand={() => {}}
            hiddenPlayers={[]}
          />,
        );

        players.forEach((player) => {
          const found = container.textContent.includes(player.name);
          expect(found).toBe(true);
        });
      }),
      { numRuns: 100 },
    );
  });
});
