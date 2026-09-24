import { localizedReviewData, CONNECTORS, RARE_PHONE_SNIPPETS } from '../data/reviews.js';

// Persistent memory to track generated review hashes and prevent repetitions
const SEEN_HASHES_KEY = 'savan_seen_reviews_v2';
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

/**
 * Internal single generation pass for a specific language
 */
function generateSinglePass(selectedOptions = [], lang = 'en') {
  const data = localizedReviewData[lang] || localizedReviewData.en;
  const connectorsList = CONNECTORS[lang] || CONNECTORS.en;

  // 1. Pick Opening
  const opening = getRandomItem(data.openings);

  // 2. Active options: if no pre-selection, pick 1 pleasant general topic
  let activeOptions = [];
  if (selectedOptions && selectedOptions.length > 0) {
    activeOptions = selectedOptions;
  } else {
    // No pre-selection: pick 1 general highlight so review is clean & natural
    const generalPool = ['staff', 'timing', 'sleeper'];
    activeOptions = [getRandomItem(generalPool)];
  }

  // Shuffle active category order for high variation
  const shuffledCategories = shuffleArray(activeOptions);

  // 3. Middle Sentences
  const middleSentences = [];
  shuffledCategories.forEach((catId, index) => {
    const sentences = data[catId];
    if (sentences && sentences.length > 0) {
      let sentence = getRandomItem(sentences);
      
      // Inject connector for variety
      if (index > 0 && Math.random() > 0.65) {
        const connector = getRandomItem(connectorsList);
        const properNouns = ['Savan', 'Surat', 'Ahmedabad', 'Mumbai', 'Pune', 'Rajkot', 'I '];
        const startsWithProper = properNouns.some(p => sentence.startsWith(p));
        if (connector.endsWith(',') && !startsWithProper) {
          const lowerFirst = sentence.charAt(0).toLowerCase() + sentence.slice(1);
          sentence = `${connector} ${lowerFirst}`;
        } else {
          sentence = `${connector} ${sentence}`;
        }
      }
      middleSentences.push(sentence);
    }
  });

  // 4. Very rare phone mention (~8% probability: approx 1 in 12 to 14 reviews)
  let rarePhone = null;
  if (Math.random() < 0.08) {
    const phoneList = RARE_PHONE_SNIPPETS[lang] || RARE_PHONE_SNIPPETS.en;
    rarePhone = getRandomItem(phoneList);
  }

  // 5. Closing
  const closing = getRandomItem(data.closings);

  // Combine into one clean review string
  const reviewParts = [opening, ...middleSentences];
  if (rarePhone) {
    reviewParts.push(rarePhone);
  }
  reviewParts.push(closing);

  return reviewParts.filter(Boolean).join(" ");
}

/**
 * Ultra-fast review generator with non-repetition guarantees & multi-language support
 */
export function generateReview(selectedOptions = [], lang = 'en') {
  let bestReview = '';
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    attempts++;
    const candidate = generateSinglePass(selectedOptions, lang);
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
export function generateReviewBatch(selectedOptions = [], lang = 'en', count = 4) {
  const batch = [];
  const localSet = new Set();
  let attempts = 0;

  while (batch.length < count && attempts < count * 20) {
    attempts++;
    const candidate = generateReview(selectedOptions, lang);
    if (!localSet.has(candidate)) {
      localSet.add(candidate);
      batch.push(candidate);
    }
  }

  while (batch.length < count) {
    batch.push(generateSinglePass(selectedOptions, lang));
  }

  return batch;
}
