import { localizedReviewData, CONNECTORS, RARE_PHONE_SNIPPETS, DHAL_PHONE_SNIPPETS } from '../data/reviews.js';

// Persistent memory to track generated review hashes and prevent repetitions
const SEEN_HASHES_KEY = 'savan_seen_reviews_v3';
const MAX_SEEN_HISTORY = 1500;

let memorySeenHashes = new Set();

try {
  const stored = localStorage.getItem(SEEN_HASHES_KEY);
  if (stored) {
    const arr = JSON.parse(stored);
    memorySeenHashes = new Set(arr);
  }
} catch (e) {
  // Fallback to in-memory set if localStorage is restricted
}

function saveHash(hash) {
  memorySeenHashes.add(hash);
  if (memorySeenHashes.size > MAX_SEEN_HISTORY) {
    const firstItem = memorySeenHashes.values().next().value;
    memorySeenHashes.delete(firstItem);
  }
  try {
    localStorage.setItem(SEEN_HASHES_KEY, JSON.stringify(Array.from(memorySeenHashes)));
  } catch (e) {}
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(36);
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomItem(arr) {
  if (!arr || arr.length === 0) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

const PROPER_NOUNS = [
  'Savan', 'Surat', 'Ahmedabad', 'Mumbai', 'Pune', 'Rajkot', 'Nana', 'Dhal',
  'Bhavnagar', 'Amreli', 'Mahuva', 'Savarkundla', 'Junagadh', 'Botad',
  'Gariyadhar', 'Una', 'Somnath', 'Morbi', 'Jamnagar', 'Palitana', 'Talaja',
  'Gondal', 'Jetpur', 'Kodinar', 'Porbandar', 'Dwarka', 'Diwali', 'Holi',
  'Saatam', 'WhatsApp', 'RedBus', 'Redbus', 'AC ', 'UPI', 'I ', 'CTM',
  'Geeta', 'Kamrej', 'Hirabaug', 'Borivali', 'Andheri', 'Wakad', 'Hinjewadi',
  'Greenland', 'Madhapar', 'Baroda', 'Kathiyawad', 'Saurashtra', 'Google'
];

function startsWithProperNoun(sentence) {
  return PROPER_NOUNS.some((p) => sentence.startsWith(p));
}

function ensureSentenceEnd(str) {
  const trimmed = (str || '').trim();
  if (!trimmed) return '';
  const last = trimmed[trimmed.length - 1];
  if (last === '.' || last === '!' || last === '?') return trimmed;
  return `${trimmed}.`;
}

function stripTrailingPeriod(str) {
  const trimmed = (str || '').trim();
  return trimmed.endsWith('.') ? trimmed.slice(0, -1) : trimmed;
}

function hasBrandOverlap(candidate, existingText) {
  if (!existingText) return false;
  const candLow = candidate.toLowerCase();
  const extLow = existingText.toLowerCase();

  if (extLow.includes('savan') && candLow.includes('savan')) return true;
  if (extLow.includes('nana varachha') && candLow.includes('nana varachha')) return true;
  if ((extLow.includes('5 star') || extLow.includes('5/5')) && (candLow.includes('5 star') || candLow.includes('5/5'))) return true;
  if (extLow.includes('dhal') && candLow.includes('dhal') && Math.random() < 0.7) return true;
  return false;
}

function isBranchCompatible(item, branchId, selectedOptions = []) {
  const low = item.toLowerCase();
  const isDhal = branchId === 'dhal';

  if (!isDhal) {
    // Main & Bapunagar branches shouldn't pull Nana Varachha Dhal or Saurashtra-counter phrases
    if (low.includes('dhal') || low.includes('nana varachha') || low.includes('saurashtra')) {
      return false;
    }
    return true;
  }

  // Dhal branch shouldn't pull Mumbai/Pune route openings or parcel openings unless selected
  if ((low.includes('mumbai') && !selectedOptions.includes('route_mumbai')) ||
      (low.includes('pune') && !selectedOptions.includes('route_pune'))) {
    return false;
  }
  if (low.includes('parcel') && !selectedOptions.includes('parcel')) {
    return false;
  }
  return true;
}

function pickSmart(arr, existingText, branchId = 'default', selectedOptions = []) {
  if (!arr || arr.length === 0) return '';
  const branchFiltered = arr.filter((item) => isBranchCompatible(item, branchId, selectedOptions));
  const pool = branchFiltered.length > 0 ? branchFiltered : arr;

  if (!existingText) return getRandomItem(pool);
  const filtered = pool.filter((item) => !hasBrandOverlap(item, existingText));
  return filtered.length > 0 ? getRandomItem(filtered) : getRandomItem(pool);
}

function joinPartsNaturally(parts, connectorsList, lang) {
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];

  const inlineWord = lang === 'gu' ? 'ane' : lang === 'hi' ? 'aur' : 'and';
  let result = parts[0];

  for (let i = 1; i < parts.length; i++) {
    const next = parts[i];
    if (!next) continue;

    // Occasionally join two short clauses inline like natural speech
    if (result.length < 75 && next.length < 75 && !result.endsWith('!') && Math.random() < 0.25) {
      const cleanPrev = stripTrailingPeriod(result);
      const nextBody = startsWithProperNoun(next)
        ? next
        : next.charAt(0).toLowerCase() + next.slice(1);
      const joiner = Math.random() < 0.55 ? ` ${inlineWord} ` : ', ';
      result = `${cleanPrev}${joiner}${nextBody}`;
      continue;
    }

    // Standard sentence boundary, rarely with a casual spoken connector
    const prevEnded = ensureSentenceEnd(result);
    if (Math.random() < 0.22 && connectorsList && connectorsList.length > 0) {
      const conn = getRandomItem(connectorsList);
      const nextBody = startsWithProperNoun(next)
        ? next
        : next.charAt(0).toLowerCase() + next.slice(1);
      result = `${prevEnded} ${conn} ${nextBody}`;
    } else {
      result = `${prevEnded} ${next}`;
    }
  }

  return result;
}

/**
 * Internal single generation pass producing varied, 2-3 line human-sounding Google reviews
 */
function generateSinglePass(selectedOptions = [], lang = 'en', branchId = 'default') {
  const data = localizedReviewData[lang] || localizedReviewData.en;
  const connectorsList = CONNECTORS[lang] || CONNECTORS.en;
  const isDhal = branchId === 'dhal';

  const generalPool = isDhal
    ? ['dhal_counter', 'dhal_rates', 'dhal_seats', 'dhal_family', 'dhal_saurashtra', 'dhal_urgent', 'timing']
    : ['staff', 'timing', 'sleeper', 'parcel', 'route_ahmedabad', 'route_rajkot'];

  let reviewText = '';

  if (!selectedOptions || selectedOptions.length === 0) {
    // NO CHIPS SELECTED: Always generate 2-3 natural sentences (~95-175 chars, 2-3 visual lines)
    const cats = shuffleArray(generalPool);
    const firstSent = pickSmart(data[cats[0]], '', branchId, selectedOptions);
    const secondSent = pickSmart(data[cats[1]], firstSent, branchId, selectedOptions);
    const roll = Math.random();

    if (roll < 0.42) {
      // Two distinct highlights joined naturally (+ short closing if still concise)
      const combined = joinPartsNaturally([firstSent, secondSent], connectorsList, lang);
      if (combined.length < 115) {
        const closing = pickSmart(data.closings, combined, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(combined)} ${closing}`;
      } else {
        reviewText = combined;
      }
    } else if (roll < 0.74) {
      // Natural opening + highlight (+ short closing if concise)
      const opening = pickSmart(data.openings, firstSent, branchId, selectedOptions);
      const base = joinPartsNaturally([opening, firstSent], connectorsList, lang);
      if (base.length < 120) {
        const closing = pickSmart(data.closings, base, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(base)} ${closing}`;
      } else {
        reviewText = joinPartsNaturally([opening, firstSent, secondSent], connectorsList, lang);
      }
    } else {
      // Quick remark + specific highlight + optional closing
      const quickPool = isDhal ? data.dhal_quick : data.quick;
      const quickItem = pickSmart(quickPool, '', branchId, selectedOptions);
      const detail = pickSmart(data[cats[0]], quickItem, branchId, selectedOptions);
      const combined = joinPartsNaturally([quickItem, detail], connectorsList, lang);
      if (combined.length < 115) {
        const closing = pickSmart(data.closings, combined, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(combined)} ${closing}`;
      } else {
        reviewText = combined;
      }
    }
  } else if (selectedOptions.length === 1) {
    // 1 CHIP SELECTED: Build 2-3 line review centered on the selected chip
    const mainSent = getRandomItem(data[selectedOptions[0]]) || '';
    const roll = Math.random();

    if (roll < 0.4) {
      const opening = pickSmart(data.openings, mainSent, branchId, selectedOptions);
      const base = `${ensureSentenceEnd(opening)} ${mainSent}`;
      if (base.length < 125) {
        const closing = pickSmart(data.closings, base, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(base)} ${closing}`;
      } else {
        reviewText = base;
      }
    } else if (roll < 0.75) {
      // Selected chip + complementary quick remark or general detail
      const extraPool = isDhal ? data.dhal_quick : data.quick;
      const extra = pickSmart(extraPool, mainSent, branchId, selectedOptions);
      const base = joinPartsNaturally([mainSent, extra], connectorsList, lang);
      if (base.length < 115) {
        const closing = pickSmart(data.closings, base, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(base)} ${closing}`;
      } else {
        reviewText = base;
      }
    } else {
      // Context opening + selected chip + closing
      const opening = pickSmart(data.openings, mainSent, branchId, selectedOptions);
      const closing = pickSmart(data.closings, `${opening} ${mainSent}`, branchId, selectedOptions);
      reviewText = `${ensureSentenceEnd(opening)} ${ensureSentenceEnd(mainSent)} ${closing}`;
    }
  } else {
    // 2+ CHIPS SELECTED: shuffle chips, join naturally, ensure at least 2-3 lines
    const shuffledCategories = shuffleArray(selectedOptions);
    const picked = [];
    for (const catId of shuffledCategories) {
      const sentences = data[catId];
      if (sentences && sentences.length > 0) {
        picked.push(pickSmart(sentences, picked.join(' '), branchId, selectedOptions));
      }
    }

    const body = joinPartsNaturally(picked, connectorsList, lang);
    const roll = Math.random();

    if (body.length >= 135) {
      reviewText = body;
    } else if (body.length < 95 || roll < 0.45) {
      if (roll < 0.5) {
        const opening = pickSmart(data.openings, body, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(opening)} ${body}`;
      } else {
        const closing = pickSmart(data.closings, body, branchId, selectedOptions);
        reviewText = `${ensureSentenceEnd(body)} ${closing}`;
      }
    } else {
      reviewText = body;
    }
  }

  // Very rare phone mention (~5% probability, only if it keeps total within ~175 chars)
  if (reviewText && reviewText.length < 140 && Math.random() < 0.05) {
    const phoneDict = isDhal ? DHAL_PHONE_SNIPPETS : RARE_PHONE_SNIPPETS;
    const phoneList = phoneDict[lang] || phoneDict.en;
    const rarePhone = getRandomItem(phoneList);
    if (rarePhone) {
      reviewText = `${ensureSentenceEnd(reviewText)} ${rarePhone}`;
    }
  }

  return reviewText.trim();
}

/**
 * Ultra-fast review generator with non-repetition guarantees & multi-language support
 */
export function generateReview(selectedOptions = [], lang = 'en', branchId = 'default') {
  let bestReview = '';
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    attempts++;
    const candidate = generateSinglePass(selectedOptions, lang, branchId);
    if (!candidate) continue;
    const hash = simpleHash(candidate);

    if (!memorySeenHashes.has(hash)) {
      saveHash(hash);
      return candidate;
    }
    bestReview = candidate;
  }

  return bestReview;
}

/**
 * Generate a batch of unique reviews (e.g. 4 options for carousel navigation)
 */
export function generateReviewBatch(selectedOptions = [], lang = 'en', count = 4, branchId = 'default') {
  const batch = [];
  const localSet = new Set();
  let attempts = 0;

  while (batch.length < count && attempts < count * 20) {
    attempts++;
    const candidate = generateReview(selectedOptions, lang, branchId);
    if (candidate && !localSet.has(candidate)) {
      localSet.add(candidate);
      batch.push(candidate);
    }
  }

  while (batch.length < count) {
    const fallback = generateSinglePass(selectedOptions, lang, branchId);
    if (fallback) batch.push(fallback);
  }

  return batch;
}
