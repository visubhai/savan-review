export const BRANCHES = {
  default: {
    id: 'default',
    name: 'Savan Travels',
    branchLabel: 'Main Office',
    badge: '⭐ 5-Star Review',
    city: 'Surat',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk'
  },
  bapunagar: {
    id: 'bapunagar',
    name: 'Savan Travels - Bapunagar',
    branchLabel: 'Bapunagar Branch',
    badge: '📍 Bapunagar • ⭐ 5★',
    city: 'Ahmedabad',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJVWFaAACHXjkRalu2mOmvNbk'
  }
};

/**
 * Detect active branch from URL pathname, query param (?branch=bapunagar), or hash (#bapunagar)
 */
export function getActiveBranch() {
  if (typeof window === 'undefined') {
    return BRANCHES.default;
  }

  const path = (window.location.pathname || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  const hash = (window.location.hash || '').toLowerCase();

  // If path contains 'bapunagar', or query ?branch=bapunagar / ?bapunagar, or hash #bapunagar
  if (
    path.includes('bapunagar') ||
    search.includes('bapunagar') ||
    hash.includes('bapunagar')
  ) {
    return BRANCHES.bapunagar;
  }

  return BRANCHES.default;
}
