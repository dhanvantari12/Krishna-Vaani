
"use strict";

// KRISHNA VAANI — WEBSITE FUNCTIONALITY

const STORAGE = {
  language: "kv_language",
  favorites: "kv_favorites",
  lastVerse: "kv_last_verse",
  queue: "kv_verse_queue"
};

const translations = {
  en: {
    tagline: "A Message from Krishna, for a Brighter You.",
    chapter: "Chapter",
    verse: "Verse",
    meaning: "Meaning",
    reflection: "Krishna's Wisdom for You Today",
    next: "Get Another Message ✨",
    copy: "Copy Message",
    share: "Share",
    save: "♡ Save",
    saved: "♥ Saved",
    favorites: "Favorites",
    favoritesHeading: "Saved Favorites",
    favoritesNote: "Favorites are stored only in this browser.",
    remove: "Remove",
    view: "View",
    empty: "You haven't saved any favorites yet.",
    copied: "Message copied!",
    linkCopied: "Link copied!",
    savedStatus: "Added to favorites!",
    removedStatus: "Removed from favorites.",
    loadError: "Unable to load messages. Please refresh.",
    noShare: "Sharing is unavailable. Please copy the link.",
    blessing: "May the wisdom of Lord Krishna bring peace, strength, and happiness into your life."
  },
  hi: {
    tagline: "श्रीकृष्ण का संदेश, आपके उज्ज्वल जीवन के लिए।",
    chapter: "अध्याय",
    verse: "श्लोक",
    meaning: "अर्थ",
    reflection: "आज आपके लिए श्रीकृष्ण की सीख",
    next: "एक और संदेश ✨",
    copy: "संदेश कॉपी करें",
    share: "साझा करें",
    save: "♡ सहेजें",
    saved: "♥ सहेजा गया",
    favorites: "पसंदीदा",
    favoritesHeading: "सहेजे गए श्लोक",
    favoritesNote: "पसंदीदा श्लोक केवल इस ब्राउज़र में सहेजे जाते हैं।",
    remove: "हटाएँ",
    view: "देखें",
    empty: "अभी कोई पसंदीदा श्लोक नहीं है।",
    copied: "संदेश कॉपी हो गया!",
    linkCopied: "लिंक कॉपी हो गया!",
    savedStatus: "पसंदीदा में जोड़ दिया गया!",
    removedStatus: "पसंदीदा से हटा दिया गया।",
    loadError: "संदेश लोड नहीं हो पाए। कृपया फिर प्रयास करें।",
    noShare: "साझा नहीं कर सकते। कृपया लिंक कॉपी करें।",
    blessing: "भगवान श्रीकृष्ण का ज्ञान आपके जीवन में शांति, शक्ति और आनंद लाए।"
  },
  mr: {
    tagline: "श्रीकृष्णाचा संदेश, तुमच्या उज्ज्वल आयुष्यासाठी.",
    chapter: "अध्याय",
    verse: "श्लोक",
    meaning: "अर्थ",
    reflection: "आज तुमच्यासाठी श्रीकृष्णाची शिकवण",
    next: "आणखी एक संदेश ✨",
    copy: "संदेश कॉपी करा",
    share: "शेअर करा",
    save: "♡ जतन करा",
    saved: "♥ जतन केले",
    favorites: "आवडते",
    favoritesHeading: "जतन केलेले श्लोक",
    favoritesNote: "आवडते श्लोक फक्त या ब्राउझरमध्ये जतन होतात.",
    remove: "काढा",
    view: "पाहा",
    empty: "अजून कोणतेही आवडते श्लोक नाहीत.",
    copied: "संदेश कॉपी झाला!",
    linkCopied: "लिंक कॉपी झाली!",
    savedStatus: "आवडत्या श्लोकांमध्ये जोडले!",
    removedStatus: "आवडत्या श्लोकांमधून काढले.",
    loadError: "संदेश लोड झाले नाहीत. पुन्हा प्रयत्न करा.",
    noShare: "शेअर करता येत नाही. लिंक कॉपी करा.",
    blessing: "भगवान श्रीकृष्णांचे ज्ञान तुमच्या जीवनात शांती, शक्ती आणि आनंद आणो."
  }
};

// Safely read and write browser storage.
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Website remains usable if storage is blocked.
  }
}

let messages = [];
let currentMessage = null;
let language = readStorage(STORAGE.language, "en");
let favorites = readStorage(STORAGE.favorites, []);

if (!translations[language]) language = "en";
if (!Array.isArray(favorites)) favorites = [];

const $ = id => document.getElementById(id);

function t(key) {
  return translations[language][key];
}

function showStatus(message) {
  $("status").textContent = message;
}

// Shuffle using Fisher-Yates.
function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// Select a new verse without repeating the last one.
function getNextMessage() {
  if (messages.length === 0) return null;

  const ids = messages.map(message => message.id);
  const lastId = readStorage(STORAGE.lastVerse, null);

  let queue = readStorage(STORAGE.queue, []);

  if (!Array.isArray(queue)) queue = [];

  queue = queue.filter(id => ids.includes(id));

  if (queue.length === 0) {
    queue = shuffle(ids);
  }

  if (queue.length > 1 && queue[0] === lastId) {
    const alternative = queue.findIndex(id => id !== lastId);

    if (alternative > 0) {
      [queue[0], queue[alternative]] =
        [queue[alternative], queue[0]];
    }
  }

  const selectedId = queue.shift();

  writeStorage(STORAGE.queue, queue);
  writeStorage(STORAGE.lastVerse, selectedId);

  return messages.find(message => message.id === selectedId);
}

function updateSaveButton() {
  if (!currentMessage) return;

  const isSaved = favorites.includes(currentMessage.id);

  $("save").textContent = isSaved ? t("saved") : t("save");
  $("save").setAttribute("aria-pressed", String(isSaved));
}

function renderMessage() {
  if (!currentMessage) return;

  $("reference").textContent =
    `${t("chapter")} ${currentMessage.chapter}, ${t("verse")} ${currentMessage.verse}`;

  $("sanskrit").textContent = currentMessage.sanskrit;

  $("meaning").textContent = currentMessage.meaning[language];
  $("reflection").textContent = currentMessage.reflection[language];

  $("meaning").lang = language;
  $("reflection").lang = language;

  updateSaveButton();
}

function renderInterface() {
  document.documentElement.lang = language;

  $("tagline").textContent = t("tagline");
  $("meaning-label").textContent = t("meaning");
  $("reflection-label").textContent = t("reflection");

  $("next").textContent = t("next");
  $("copy").textContent = t("copy");
  $("share").textContent = t("share");
  $("toggle-favorites").textContent = t("favorites");

  $("favorites-heading").textContent = t("favoritesHeading");
  $("favorites-note").textContent = t("favoritesNote");
  $("blessing").textContent = t("blessing");

  document.querySelectorAll("[data-lang]").forEach(button => {
    const active = button.dataset.lang === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderMessage();
  renderFavorites();
}

function changeLanguage(newLanguage) {
  if (!translations[newLanguage]) return;

  language = newLanguage;
  writeStorage(STORAGE.language, language);

  // Changing language does NOT change the verse.
  renderInterface();
  showStatus("");
}

function showAnotherMessage() {
  currentMessage = getNextMessage();

  // Remove old verse parameter when requesting new wisdom.
  const url = new URL(window.location.href);
  url.searchParams.delete("verse");
  history.replaceState(null, "", url);

  renderMessage();
  showStatus("");
}

function messageText() {
  if (!currentMessage) return "";

  return [
    "🪷 Krishna Vaani",
    `${t("chapter")} ${currentMessage.chapter}, ${t("verse")} ${currentMessage.verse}`,
    "",
    currentMessage.sanskrit,
    "",
    `${t("meaning")}:`,
    currentMessage.meaning[language],
    "",
    `${t("reflection")}:`,
    currentMessage.reflection[language],
    "",
    "Krishna Vaani — Bhagavad Gita-inspired wisdom"
  ].join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  // Fallback for browsers with restricted clipboard access.
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  let success = false;

  try {
    success = document.execCommand("copy");
  } finally {
    textarea.remove();
  }

  return success;
}

async function copyMessage() {
  try {
    const success = await copyText(messageText());
    showStatus(success ? t("copied") : t("noShare"));
  } catch {
    showStatus(t("noShare"));
  }
}

function getShareUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("verse", currentMessage.id);
  return url.toString();
}

async function shareMessage() {
  if (!currentMessage) return;

  const shareData = {
    title: "Krishna Vaani",
    text: messageText(),
    url: getShareUrl()
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    const success = await copyText(getShareUrl());
    showStatus(success ? t("linkCopied") : t("noShare"));
  } catch {
    showStatus(t("noShare"));
  }
}

function toggleFavorite() {
  if (!currentMessage) return;

  const id = currentMessage.id;
  const alreadySaved = favorites.includes(id);

  if (alreadySaved) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  writeStorage(STORAGE.favorites, favorites);

  updateSaveButton();
  renderFavorites();

  showStatus(alreadySaved ? t("removedStatus") : t("savedStatus"));
}

function renderFavorites() {
  const container = $("favorites-list");
  container.replaceChildren();

  const savedMessages = messages.filter(message =>
    favorites.includes(message.id)
  );

  if (savedMessages.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = t("empty");
    container.appendChild(empty);
    return;
  }

  savedMessages.forEach(message => {
    const item = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent =
      `${t("chapter")} ${message.chapter}, ${t("verse")} ${message.verse}`;

    const preview = document.createElement("p");
    preview.textContent = message.reflection[language];

    const viewButton = document.createElement("button");
    viewButton.textContent = t("view");

    viewButton.addEventListener("click", () => {
      currentMessage = message;

      const url = new URL(window.location.href);
      url.searchParams.set("verse", message.id);
      history.replaceState(null, "", url);

      renderMessage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = t("remove");

    removeButton.addEventListener("click", () => {
      favorites = favorites.filter(id => id !== message.id);
      writeStorage(STORAGE.favorites, favorites);

      renderFavorites();
      updateSaveButton();
      showStatus(t("removedStatus"));
    });

    item.append(title, preview, viewButton, removeButton);
    container.appendChild(item);
  });
}

// Load messages and initialize the application.
async function initializeWebsite() {
  try {
    const response = await fetch("./messages.json");

    if (!response.ok) {
      throw new Error("Failed to load messages.json");
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No messages found");
    }

    messages = data;

    // Shared links must display the requested verse.
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("verse");

    currentMessage = requestedId
      ? messages.find(message => message.id === requestedId)
      : null;

    if (!currentMessage) {
      currentMessage = getNextMessage();
    }

    renderInterface();

  } catch (error) {
    console.error("Krishna Vaani error:", error);
    showStatus(t("loadError"));
  }
}

// BUTTON EVENTS

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => {
    changeLanguage(button.dataset.lang);
  });
});

$("next").addEventListener("click", showAnotherMessage);
$("copy").addEventListener("click", copyMessage);
$("share").addEventListener("click", shareMessage);
$("save").addEventListener("click", toggleFavorite);

$("toggle-favorites").addEventListener("click", () => {
  const panel = $("favorites-panel");
  panel.hidden = !panel.hidden;
});

initializeWebsite();
