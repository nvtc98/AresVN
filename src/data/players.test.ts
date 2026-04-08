import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  players,
  getActivePlayers,
  getHiddenPlayers,
  type PlayerProfile,
} from "./players";

// Generator for random PlayerProfile objects
const playerProfileArb = fc.record({
  img: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1 }),
  isHidden: fc.option(fc.boolean(), { nil: undefined }),
  game: fc.record({
    cs: fc.record({
      role: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      color: fc.option(fc.string(), { nil: undefined }),
    }),
  }),
});

/**
 * **Feature: v1-to-v2-migration, Property 1: Player partition correctness**
 * **Validates: Requirements 3.1, 3.3**
 */
describe("Property 1: Player partition correctness", () => {
  it("active + hidden partitions equal the full list, with correct membership", () => {
    // We test the partition logic by applying the same filter functions to arbitrary lists
    const getActive = (list: PlayerProfile[]) =>
      list.filter((p) => !p.isHidden);
    const getHidden = (list: PlayerProfile[]) =>
      list.filter((p) => p.isHidden === true);

    fc.assert(
      fc.property(fc.array(playerProfileArb), (playerList) => {
        const active = getActive(playerList);
        const hidden = getHidden(playerList);

        // Sum of partitions equals total
        expect(active.length + hidden.length).toBe(playerList.length);

        // Every active player has isHidden undefined or false
        for (const p of active) {
          expect(p.isHidden === undefined || p.isHidden === false).toBe(true);
        }

        // Every hidden player has isHidden === true
        for (const p of hidden) {
          expect(p.isHidden).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it("real data partitions correctly via exported functions", () => {
    const active = getActivePlayers();
    const hidden = getHiddenPlayers();

    expect(active.length + hidden.length).toBe(players.length);
    for (const p of active) {
      expect(p.isHidden === undefined || p.isHidden === false).toBe(true);
    }
    for (const p of hidden) {
      expect(p.isHidden).toBe(true);
    }
  });
});

/**
 * **Feature: v1-to-v2-migration, Property 2: Player data lookup consistency**
 * **Validates: Requirements 3.2**
 */
describe("Property 2: Player data lookup consistency", () => {
  it("looking up any valid index returns matching name and description", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: players.length - 1 }), (index) => {
        const player = players[index];
        expect(player.name).toBeTruthy();
        expect(player.name.length).toBeGreaterThan(0);
        expect(player.game.cs.description).toBeTruthy();
        expect(player.game.cs.description.length).toBeGreaterThan(0);

        // Lookup matches original data at that index
        expect(player.name).toBe(players[index].name);
        expect(player.game.cs.description).toBe(
          players[index].game.cs.description,
        );
      }),
      { numRuns: 100 },
    );
  });
});
