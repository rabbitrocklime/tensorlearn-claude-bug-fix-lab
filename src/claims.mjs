// Contract: docs/contract.md. Pure function; do not mutate claims.

// Returns the trimmed ID, or null when the value is not a nonempty string.
// No coercion: numbers, objects, null and booleans are malformed.
function normalizeId(value) {
  if (typeof value !== 'string') return null;
  const id = value.trim();
  return id === '' ? null : id;
}

export function getClaim(claims, viewerId, claimId) {
  if (!Array.isArray(claims)) return null;
  const target = normalizeId(claimId);
  const viewer = normalizeId(viewerId);
  if (target === null || viewer === null) return null;
  for (const claim of claims) {
    if (claim === null || typeof claim !== 'object') continue;
    const id = normalizeId(claim.id);
    const ownerId = normalizeId(claim.ownerId);
    if (id === null || ownerId === null) continue;
    // Exact match on both: an ownerId prefix ('user-42' vs 'user-4') is not ownership.
    if (id === target && ownerId === viewer) return claim;
  }
  return null;
}
