/**
 * Safely access a field from a data object with a fallback value.
 * @param {Object|null|undefined} data - Raw data object
 * @param {string} key - Property key to access
 * @param {*} [fallback=''] - Fallback value if data is null/undefined or key missing
 * @returns {*} The value or fallback
 */
export function getField(data, key, fallback = "") {
  if (data == null || typeof data !== "object") {
    return fallback;
  }
  return key in data ? data[key] : fallback;
}

/**
 * Extract social links from contact data with safe fallbacks.
 * @param {Object|null|undefined} contactData - Contact data from JSON
 * @returns {{ steam: string, discord: string, youtube: string }}
 */
export function getSocialLinks(contactData) {
  return {
    steam: getField(contactData, "steam", "/"),
    discord: getField(contactData, "discord", "/"),
    youtube: getField(contactData, "youtube", "/"),
  };
}

/**
 * Partition player data array into active and hidden players.
 * @param {Array|null|undefined} playerDataArray - Player data array
 * @returns {{ active: Array, hidden: Array }}
 */
export function partitionPlayers(playerDataArray) {
  if (!Array.isArray(playerDataArray)) {
    return { active: [], hidden: [] };
  }
  const active = [];
  const hidden = [];
  for (const player of playerDataArray) {
    if (player.isHidden) {
      hidden.push(player);
    } else {
      active.push(player);
    }
  }
  return { active, hidden };
}
