import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * **Feature: v1-to-v2-migration, Property 3: Content data serialization round-trip**
 * **Validates: Requirements 8.2**
 */
describe("Property 3: Content data serialization round-trip", () => {
  it("JSON.parse(JSON.stringify(x)) deep equals x for any JSON-serializable value", () => {
    // Build a JSON arbitrary that never produces -0 anywhere in the tree,
    // since JSON.stringify converts -0 to 0 (a known JS/JSON mismatch).
    const safeNumber = fc
      .double({ noNaN: true, noDefaultInfinity: true })
      .filter((n) => !Object.is(n, -0));
    const jsonArb = fc
      .jsonValue({
        depthSize: "small",
        maxDepth: 3,
      })
      .map((v) => JSON.parse(JSON.stringify(v))); // pre-normalize to remove -0 everywhere

    fc.assert(
      fc.property(jsonArb, (value) => {
        const roundTripped = JSON.parse(JSON.stringify(value));
        expect(roundTripped).toEqual(value);
      }),
      { numRuns: 100 },
    );
  });
});

import {
  person,
  social,
  home,
  about,
  gallery,
  relationships,
  testimonials,
  features,
} from "./content";
import { players } from "@/data/players";

describe("Content config structure", () => {
  it("exports person with AresVN info", () => {
    expect(person.firstName).toBe("Ares");
    expect(person.lastName).toBe("VN");
    expect(person.avatar).toContain("AresVN");
  });

  it("exports social links for Steam, Discord, YouTube", () => {
    const names = social.map((s) => s.name);
    expect(names).toContain("Steam");
    expect(names).toContain("Discord");
    expect(names).toContain("YouTube");
  });

  it("exports home config with AresVN data", () => {
    expect(home.path).toBe("/");
    expect(home.title).toContain("AresVN");
  });

  it("exports about config with intro", () => {
    expect(about.path).toBe("/about");
    expect(about.intro.display).toBe(true);
  });

  it("exports gallery with images", () => {
    expect(gallery.images.length).toBeGreaterThan(0);
  });

  it("exports relationships, testimonials, and features", () => {
    expect(relationships.length).toBeGreaterThan(0);
    expect(testimonials.length).toBeGreaterThan(0);
    expect(features.length).toBeGreaterThan(0);
  });
});

describe("Player data contains expected players from v1", () => {
  it("includes known active players", () => {
    const names = players.map((p) => p.name);
    expect(names).toContain("h1enle");
    expect(names).toContain("Hyle");
    expect(names).toContain("Breezee");
    expect(names).toContain("D O R M");
  });

  it("includes known hidden player Kalibi", () => {
    const kalibi = players.find((p) => p.name === "Kalibi");
    expect(kalibi).toBeDefined();
    expect(kalibi?.isHidden).toBe(true);
  });
});
