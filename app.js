const STORAGE_KEY = "my-library-books-v1";
const LOG_STORAGE_KEY = "my-library-reading-log-v1";
const PASSAGE_STORAGE_KEY = "my-library-passages-v1";
const WISHLIST_STORAGE_KEY = "my-library-wishlist-v1";
const ACCOUNTS_STORAGE_KEY = "my-library-accounts-v1";
const CURRENT_ACCOUNT_KEY = "my-library-current-account-v1";
const FOLLOWS_STORAGE_KEY = "my-library-follows-v1";
const SHARES_STORAGE_KEY = "my-library-shares-v1";
const API_TOKEN_KEY = "my-library-api-token-v1";

const elements = {
  bookGrid: document.querySelector("#book-grid"),
  emptyState: document.querySelector("#empty-state"),
  emptyTitle: document.querySelector("#empty-title"),
  emptyMessage: document.querySelector("#empty-message"),
  totalCount: document.querySelector("#total-count"),
  readCount: document.querySelector("#read-count"),
  unreadCount: document.querySelector("#unread-count"),
  searchInput: document.querySelector("#search-input"),
  genreFilter: document.querySelector("#genre-filter"),
  statusFilter: document.querySelector("#status-filter"),
  dialog: document.querySelector("#book-dialog"),
  form: document.querySelector("#book-form"),
  titleInput: document.querySelector("#title-input"),
  toast: document.querySelector("#toast"),
  logDialog: document.querySelector("#log-dialog"),
  logForm: document.querySelector("#log-form"),
  logTitleInput: document.querySelector("#log-title-input"),
  logAuthorInput: document.querySelector("#log-author-input"),
  pagesReadInput: document.querySelector("#pages-read-input"),
  startPageInput: document.querySelector("#start-page-input"),
  endPageInput: document.querySelector("#end-page-input"),
  sessionDateInput: document.querySelector("#session-date-input"),
  startTimeInput: document.querySelector("#start-time-input"),
  endTimeInput: document.querySelector("#end-time-input"),
  durationPreview: document.querySelector("#duration-preview"),
  bookTitleSuggestions: document.querySelector("#book-title-suggestions"),
  logList: document.querySelector("#log-list"),
  logEmptyState: document.querySelector("#log-empty-state"),
  logBookFilter: document.querySelector("#log-book-filter"),
  totalTimeInsight: document.querySelector("#total-time-insight"),
  sessionCountInsight: document.querySelector("#session-count-insight"),
  pagesInsight: document.querySelector("#pages-insight"),
  pagesWeekInsight: document.querySelector("#pages-week-insight"),
  paceInsight: document.querySelector("#pace-insight"),
  averageInsight: document.querySelector("#average-insight"),
  streakInsight: document.querySelector("#streak-insight"),
  weeklyChart: document.querySelector("#weekly-chart"),
  weeklyTotal: document.querySelector("#weekly-total"),
  habitTitle: document.querySelector("#habit-title"),
  habitMessage: document.querySelector("#habit-message"),
  coverInput: document.querySelector("#cover-input"),
  coverDialog: document.querySelector("#cover-dialog"),
  coverForm: document.querySelector("#cover-form"),
  coverBookName: document.querySelector("#cover-book-name"),
  replaceCoverInput: document.querySelector("#replace-cover-input"),
  coverPreviewFrame: document.querySelector("#cover-preview-frame"),
  coverPreview: document.querySelector("#cover-preview"),
  passageDialog: document.querySelector("#passage-dialog"),
  passageForm: document.querySelector("#passage-form"),
  passagePhotoInput: document.querySelector("#passage-photo-input"),
  passageTextInput: document.querySelector("#passage-text-input"),
  passageTitleInput: document.querySelector("#passage-title-input"),
  passageAuthorInput: document.querySelector("#passage-author-input"),
  passagePageInput: document.querySelector("#passage-page-input"),
  passageReflectionInput: document.querySelector("#passage-reflection-input"),
  photoPassageFields: document.querySelector("#photo-passage-fields"),
  textPassageFields: document.querySelector("#text-passage-fields"),
  highlightWorkspace: document.querySelector("#highlight-workspace"),
  highlightCanvas: document.querySelector("#highlight-canvas"),
  passageGrid: document.querySelector("#passage-grid"),
  passageEmptyState: document.querySelector("#passage-empty-state"),
  passageSearchInput: document.querySelector("#passage-search-input"),
  passageBookFilter: document.querySelector("#passage-book-filter"),
  wishlistDialog: document.querySelector("#wishlist-dialog"),
  wishlistForm: document.querySelector("#wishlist-form"),
  wishlistTitleInput: document.querySelector("#wishlist-title-input"),
  wishlistGrid: document.querySelector("#wishlist-grid"),
  wishlistEmptyState: document.querySelector("#wishlist-empty-state"),
  wishlistCount: document.querySelector("#wishlist-count"),
  wishlistCountLabel: document.querySelector("#wishlist-count-label"),
  authScreen: document.querySelector("#auth-screen"),
  appShell: document.querySelector("#app-shell"),
  loginForm: document.querySelector("#login-form"),
  signupForm: document.querySelector("#signup-form"),
  loginError: document.querySelector("#login-error"),
  signupError: document.querySelector("#signup-error"),
  loginUsername: document.querySelector("#login-username"),
  signupUsername: document.querySelector("#signup-username"),
  profileGreeting: document.querySelector("#profile-greeting"),
  profilePhoto: document.querySelector("#profile-photo"),
  profilePlaceholder: document.querySelector("#profile-placeholder"),
  profileDialog: document.querySelector("#profile-dialog"),
  profileForm: document.querySelector("#profile-form"),
  profileUsernameInput: document.querySelector("#profile-username-input"),
  profilePhotoInput: document.querySelector("#profile-photo-input"),
  profilePreview: document.querySelector("#profile-preview"),
  profilePreviewImage: document.querySelector("#profile-preview-image"),
  profileError: document.querySelector("#profile-error"),
  readerGrid: document.querySelector("#reader-grid"),
  readerEmptyState: document.querySelector("#reader-empty-state"),
  shareFeed: document.querySelector("#share-feed"),
  shareEmptyState: document.querySelector("#share-empty-state"),
  recommendationUnreadCount: document.querySelector("#recommendation-unread-count"),
  adminAccountList: document.querySelector("#admin-account-list"),
  readerProfileDialog: document.querySelector("#reader-profile-dialog"),
  readerProfileName: document.querySelector("#reader-profile-name"),
  readerProfileAvatar: document.querySelector("#reader-profile-avatar"),
  readerProfileStats: document.querySelector("#reader-profile-stats"),
  readerCatalogueCount: document.querySelector("#reader-catalogue-count"),
  readerCatalogueSearch: document.querySelector("#reader-catalogue-search"),
  readerCatalogueStatus: document.querySelector("#reader-catalogue-status"),
  readerProfileBookList: document.querySelector("#reader-profile-book-list"),
  shareDialog: document.querySelector("#share-dialog"),
  shareForm: document.querySelector("#share-form"),
  shareKindInput: document.querySelector("#share-kind-input"),
  shareItemIdInput: document.querySelector("#share-item-id-input"),
  shareItemSummary: document.querySelector("#share-item-summary"),
  shareRecipientInput: document.querySelector("#share-recipient-input"),
  shareError: document.querySelector("#share-error"),
  communityReadersView: document.querySelector("#community-readers-view"),
  communityFeedView: document.querySelector("#community-feed-view"),
  communityAdminView: document.querySelector("#community-admin-view"),
};

let books = loadArray(STORAGE_KEY);
let readingLog = loadArray(LOG_STORAGE_KEY);
let passages = loadArray(PASSAGE_STORAGE_KEY);
let wishlist = loadArray(WISHLIST_STORAGE_KEY);
const legacyAccountsSnapshot = loadArray(ACCOUNTS_STORAGE_KEY);
let accounts = [...legacyAccountsSnapshot];
let follows = loadArray(FOLLOWS_STORAGE_KEY);
let shares = loadArray(SHARES_STORAGE_KEY);
let openMenuId = null;
let activeCoverBookId = null;
let pendingCoverImage = "";
let passageMode = "photo";
let pageImage = null;
let highlightRect = null;
let highlightStart = null;
let isHighlighting = false;
let currentAccount = null;
let pendingProfileImage = "";
let toastTimer;
let statsSyncTimer;
let dataSyncTimer;
let isApplyingCloudData = false;
let apiToken = localStorage.getItem(API_TOKEN_KEY) || "";
let activeReaderCatalogue = [];

async function apiRequest(action, options = {}) {
  const response = await fetch(
    `/api/index?action=${encodeURIComponent(action)}`,
    {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "The online service is unavailable.");
  }
  return data;
}

function storeApiSession(token) {
  apiToken = token || "";
  if (apiToken) localStorage.setItem(API_TOKEN_KEY, apiToken);
  else localStorage.removeItem(API_TOKEN_KEY);
}

function adoptLocalAccount(localAccount, onlineAccount) {
  if (!localAccount || localAccount.id === onlineAccount.id) return;
  [books, readingLog, passages, wishlist].forEach((items) => {
    items.forEach((item) => {
      if (item.ownerId === localAccount.id) item.ownerId = onlineAccount.id;
    });
  });
  saveBooks();
  saveReadingLog();
  savePassages();
  saveWishlist();
}

function loadArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveCollection(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Storage is full. Try a smaller image or remove an older photo.");
    return false;
  }
}

function saveBooks() {
  const saved = saveCollection(STORAGE_KEY, books);
  if (saved) scheduleDataSync();
  return saved;
}

function saveReadingLog() {
  const saved = saveCollection(LOG_STORAGE_KEY, readingLog);
  if (saved) scheduleDataSync();
  return saved;
}

function savePassages() {
  const saved = saveCollection(PASSAGE_STORAGE_KEY, passages);
  if (saved) scheduleDataSync();
  return saved;
}

function saveWishlist() {
  const saved = saveCollection(WISHLIST_STORAGE_KEY, wishlist);
  if (saved) scheduleDataSync();
  return saved;
}

function saveAccounts() {
  return saveCollection(ACCOUNTS_STORAGE_KEY, accounts);
}

function saveFollows() {
  return saveCollection(FOLLOWS_STORAGE_KEY, follows);
}

function saveShares() {
  return saveCollection(SHARES_STORAGE_KEY, shares);
}

function ownedByCurrent(items) {
  if (!currentAccount) return [];
  return items.filter((item) => item.ownerId === currentAccount.id);
}

function booksFor(accountId) {
  return books.filter((book) => book.ownerId === accountId);
}

function statsFor(accountId) {
  const account = accounts.find((item) => item.id === accountId);
  if (account?.stats && accountId !== currentAccount?.id) return account.stats;
  const accountBooks = booksFor(accountId);
  const read = accountBooks.filter((book) => book.status === "read").length;
  return {
    total: accountBooks.length,
    read,
    unread: accountBooks.length - read,
  };
}

function migrateAccountData() {
  if (!accounts.length) return;
  const testUsernames = new Set(["testreader", "pageturner"]);
  const testAccounts = accounts.filter((account) =>
    testUsernames.has(normalize(account.username)),
  );
  const realAccount = accounts.find(
    (account) => !testUsernames.has(normalize(account.username)),
  );
  if (realAccount && testAccounts.length) {
    const testIds = new Set(testAccounts.map((account) => account.id));
    [books, readingLog, passages, wishlist].forEach((items) => {
      items.forEach((item) => {
        if (testIds.has(item.ownerId)) item.ownerId = realAccount.id;
      });
    });
    accounts = accounts.filter((account) => !testIds.has(account.id));
    follows = follows.filter(
      (follow) =>
        !testIds.has(follow.followerId) && !testIds.has(follow.followingId),
    );
    shares = shares.filter(
      (share) =>
        !testIds.has(share.senderId) && !testIds.has(share.recipientId),
    );
    saveAccounts();
    saveBooks();
    saveReadingLog();
    savePassages();
    saveWishlist();
    saveFollows();
    saveShares();
  }
  let changedAccounts = false;
  accounts.forEach((account) => {
    const shouldBeAdmin = account.id === (realAccount || accounts[0]).id;
    const nextRole = shouldBeAdmin ? "admin" : "user";
    if (account.role !== nextRole) {
      account.role = nextRole;
      changedAccounts = true;
    }
  });
  const admin = accounts.find((account) => account.role === "admin");
  let booksChanged = false;
  let logsChanged = false;
  let passagesChanged = false;
  let wishlistChanged = false;
  books.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      booksChanged = true;
    }
  });
  readingLog.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      logsChanged = true;
    }
  });
  passages.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      passagesChanged = true;
    }
  });
  wishlist.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      wishlistChanged = true;
    }
  });
  if (changedAccounts) saveAccounts();
  if (booksChanged) saveBooks();
  if (logsChanged) saveReadingLog();
  if (passagesChanged) savePassages();
  if (wishlistChanged) saveWishlist();
}

function normalize(value) {
  return value.trim().toLocaleLowerCase();
}

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = value;
  return node.innerHTML;
}

function compressImage(file, maxDimension = 1100, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The image could not be opened."));
      image.onload = () => {
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height),
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas
          .getContext("2d")
          .drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(new Uint8Array(digest));
}

function createSalt() {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return bytesToHex(salt);
}

function findAccountByUsername(username) {
  const normalizedUsername = normalize(username);
  return accounts.find(
    (account) => normalize(account.username) === normalizedUsername,
  );
}

function setAuthView(view) {
  const isLogin = view === "login";
  elements.loginForm.hidden = !isLogin;
  elements.signupForm.hidden = isLogin;
  elements.loginError.textContent = "";
  elements.signupError.textContent = "";
  document.querySelectorAll("[data-auth-view]").forEach((button) => {
    const isActive = button.dataset.authView === view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  window.setTimeout(() => {
    (isLogin ? elements.loginUsername : elements.signupUsername).focus();
  }, 0);
}

function updateProfileDisplay() {
  if (!currentAccount) return;
  elements.profileGreeting.textContent = currentAccount.username;
  elements.profilePlaceholder.textContent =
    currentAccount.username.charAt(0).toUpperCase() || "R";
  if (currentAccount.profileImage) {
    elements.profilePhoto.src = currentAccount.profileImage;
    elements.profilePhoto.hidden = false;
    elements.profilePlaceholder.hidden = true;
  } else {
    elements.profilePhoto.hidden = true;
    elements.profilePhoto.removeAttribute("src");
    elements.profilePlaceholder.hidden = false;
  }
}

async function syncCommunityStats() {
  if (!currentAccount || !apiToken) return;
  const stats = statsFor(currentAccount.id);
  const recentBooks = booksFor(currentAccount.id)
    .slice(0, 5)
    .map(({ title, author, status }) => ({ title, author, status }));
  try {
    await apiRequest("stats", {
      method: "POST",
      body: { owned: stats.total, read: stats.read, unread: stats.unread, recentBooks },
    });
  } catch {
    // Catalogue use remains available if the community service is briefly offline.
  }
}

function cloudSafeItem(item) {
  const copy = { ...item };
  if ("coverImage" in copy) copy.coverImage = "";
  if ("image" in copy) copy.image = "";
  return copy;
}

function cloudDataFor(accountId) {
  return {
    books: booksFor(accountId).map(cloudSafeItem),
    readingLog: readingLog
      .filter((item) => item.ownerId === accountId)
      .map(cloudSafeItem),
    passages: passages
      .filter((item) => item.ownerId === accountId)
      .map(cloudSafeItem),
    wishlist: wishlist
      .filter((item) => item.ownerId === accountId)
      .map(cloudSafeItem),
  };
}

function hasCloudData(data) {
  return ["books", "readingLog", "passages", "wishlist"].some(
    (key) => Array.isArray(data[key]) && data[key].length > 0,
  );
}

async function syncAccountData() {
  if (!currentAccount || !apiToken || isApplyingCloudData) return;
  await apiRequest("data", {
    method: "POST",
    body: cloudDataFor(currentAccount.id),
  });
}

function scheduleDataSync() {
  if (!currentAccount || !apiToken || isApplyingCloudData) return;
  window.clearTimeout(dataSyncTimer);
  dataSyncTimer = window.setTimeout(() => {
    syncAccountData().catch(() => {
      showToast("Your changes are saved here and will sync when online.");
    });
  }, 700);
}

function replaceAccountItems(items, accountId, incoming) {
  return [
    ...items.filter((item) => item.ownerId !== accountId),
    ...incoming.map((item) => ({ ...item, ownerId: accountId })),
  ];
}

async function loadAccountData() {
  if (!currentAccount || !apiToken) return;
  const cloud = await apiRequest("data");
  const local = cloudDataFor(currentAccount.id);
  if (!hasCloudData(cloud) && hasCloudData(local)) {
    await syncAccountData();
    return;
  }
  if (!hasCloudData(cloud)) return;
  isApplyingCloudData = true;
  books = replaceAccountItems(books, currentAccount.id, cloud.books || []);
  readingLog = replaceAccountItems(
    readingLog,
    currentAccount.id,
    cloud.readingLog || [],
  );
  passages = replaceAccountItems(
    passages,
    currentAccount.id,
    cloud.passages || [],
  );
  wishlist = replaceAccountItems(
    wishlist,
    currentAccount.id,
    cloud.wishlist || [],
  );
  saveCollection(STORAGE_KEY, books);
  saveCollection(LOG_STORAGE_KEY, readingLog);
  saveCollection(PASSAGE_STORAGE_KEY, passages);
  saveCollection(WISHLIST_STORAGE_KEY, wishlist);
  isApplyingCloudData = false;
}

async function importLegacyUsers() {
  if (
    currentAccount?.role !== "admin" ||
    legacyAccountsSnapshot.length < 2
  ) {
    return;
  }
  const data = {};
  legacyAccountsSnapshot.forEach((account) => {
    data[account.id] = cloudDataFor(account.id);
  });
  await apiRequest("import-users", {
    method: "POST",
    body: {
      accounts: legacyAccountsSnapshot.filter(
        (account) => normalize(account.username) !== normalize(currentAccount.username),
      ),
      data,
    },
  });
}

function scheduleStatsSync() {
  if (!currentAccount || !apiToken) return;
  window.clearTimeout(statsSyncTimer);
  statsSyncTimer = window.setTimeout(syncCommunityStats, 500);
}

async function loadCommunity() {
  if (!apiToken) return;
  const data = await apiRequest("community");
  accounts = data.accounts;
  follows = data.follows;
  shares = data.shares;
}

async function refreshCommunity() {
  try {
    await syncCommunityStats();
    await loadCommunity();
    renderCommunity();
  } catch (error) {
    showToast(error.message);
  }
}

async function showAuthenticatedApp(account) {
  currentAccount = account;
  localStorage.setItem(CURRENT_ACCOUNT_KEY, account.id);
  try {
    await importLegacyUsers();
    await loadAccountData();
  } catch (error) {
    showToast(error.message);
  }
  elements.authScreen.hidden = true;
  elements.appShell.hidden = false;
  updateProfileDisplay();
  renderBooks();
  renderWishlist();
  renderReadingLog();
  renderPassages();
  renderCommunity();
  await refreshCommunity();
}

function showLoginScreen() {
  currentAccount = null;
  storeApiSession("");
  localStorage.removeItem(CURRENT_ACCOUNT_KEY);
  elements.appShell.hidden = true;
  elements.authScreen.hidden = false;
  elements.loginForm.reset();
  elements.signupForm.reset();
  setAuthView(accounts.length ? "login" : "signup");
}

async function initializeAuthentication() {
  if (!apiToken) {
    showLoginScreen();
    return;
  }
  try {
    const data = await apiRequest("session");
    await showAuthenticatedApp(data.user);
  } catch {
    showLoginScreen();
  }
}

async function createAccount(formData) {
  const username = formData.get("username").trim();
  const password = formData.get("password");
  const confirmation = formData.get("confirmPassword");
  elements.signupError.textContent = "";

  if (password !== confirmation) {
    elements.signupError.textContent = "The passwords do not match.";
    return;
  }

  try {
    const data = await apiRequest("signup", {
      method: "POST",
      body: { username, password },
    });
    storeApiSession(data.token);
    accounts = [data.user];
    await showAuthenticatedApp(data.user);
    showToast(`Welcome to your library, ${data.user.username}.`);
  } catch (error) {
    elements.signupError.textContent = error.message;
  }
}

async function login(formData) {
  const username = formData.get("username").trim();
  const password = formData.get("password");
  elements.loginError.textContent = "";
  const localAccount = findAccountByUsername(username);
  try {
    let data;
    try {
      data = await apiRequest("login", {
        method: "POST",
        body: { username, password },
      });
    } catch (error) {
      if (!localAccount) throw error;
      const passwordHash = await hashPassword(password, localAccount.salt);
      if (passwordHash !== localAccount.passwordHash) throw error;
      data = await apiRequest("migrate", {
        method: "POST",
        body: {
          username: localAccount.username,
          salt: localAccount.salt,
          passwordHash: localAccount.passwordHash,
          profileImage: localAccount.profileImage || "",
        },
      });
    }
    storeApiSession(data.token);
    adoptLocalAccount(localAccount, data.user);
    elements.loginForm.reset();
    await showAuthenticatedApp(data.user);
    showToast(`Welcome back, ${data.user.username}.`);
  } catch (error) {
    elements.loginError.textContent = error.message;
  }
}

function openProfileForm() {
  if (!currentAccount) return;
  elements.profileForm.reset();
  elements.profileError.textContent = "";
  elements.profileUsernameInput.value = currentAccount.username;
  pendingProfileImage = currentAccount.profileImage || "";
  if (pendingProfileImage) {
    elements.profilePreviewImage.src = pendingProfileImage;
    elements.profilePreview.hidden = false;
  } else {
    elements.profilePreview.hidden = true;
    elements.profilePreviewImage.removeAttribute("src");
  }
  elements.profileDialog.showModal();
}

async function previewProfilePhoto() {
  const file = elements.profilePhotoInput.files[0];
  if (!file) return;
  try {
    pendingProfileImage = await compressImage(file, 600, 0.76);
    elements.profilePreviewImage.src = pendingProfileImage;
    elements.profilePreview.hidden = false;
  } catch (error) {
    elements.profileError.textContent = error.message;
  }
}

async function saveProfile(formData) {
  if (!currentAccount) return;
  const username = formData.get("username").trim();
  try {
    const data = await apiRequest("profile", {
      method: "POST",
      body: { username, profileImage: pendingProfileImage },
    });
    currentAccount = data.user;
    updateProfileDisplay();
    await refreshCommunity();
    elements.profileDialog.close();
    showToast("Your profile has been updated.");
  } catch (error) {
    elements.profileError.textContent = error.message;
  }
}

function colorForGenre(genre) {
  const colors = ["#c98945", "#ad5f45", "#67816c", "#7f6b96", "#3e6e78"];
  const score = [...genre].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return colors[score % colors.length];
}

function filteredBooks() {
  const query = normalize(elements.searchInput.value);
  const genre = elements.genreFilter.value;
  const status = elements.statusFilter.value;

  return ownedByCurrent(books).filter((book) => {
    const matchesQuery =
      !query ||
      normalize(book.title).includes(query) ||
      normalize(book.author).includes(query);
    const matchesGenre = genre === "all" || book.genre === genre;
    const matchesStatus = status === "all" || book.status === status;
    return matchesQuery && matchesGenre && matchesStatus;
  });
}

function updateGenreOptions() {
  const currentValue = elements.genreFilter.value;
  const genres = [
    ...new Set(ownedByCurrent(books).map((book) => book.genre)),
  ].sort((a, b) => a.localeCompare(b));
  elements.genreFilter.innerHTML = [
    '<option value="all">All genres</option>',
    ...genres.map(
      (genre) =>
        `<option value="${escapeHtml(genre)}">${escapeHtml(genre)}</option>`,
    ),
  ].join("");
  elements.genreFilter.value = genres.includes(currentValue)
    ? currentValue
    : "all";
}

function updateStats() {
  const accountBooks = ownedByCurrent(books);
  const readBooks = accountBooks.filter((book) => book.status === "read").length;
  elements.totalCount.textContent = accountBooks.length;
  elements.readCount.textContent = readBooks;
  elements.unreadCount.textContent = accountBooks.length - readBooks;
}

function renderBook(book) {
  const isRead = book.status === "read";
  const menuIsOpen = openMenuId === book.id;
  const rating = Number(book.rating) || 0;
  const cover = book.coverImage
    ? `<img src="${book.coverImage}" alt="The user's copy of ${escapeHtml(book.title)}" />`
    : `<div class="book-cover-placeholder" aria-hidden="true">${escapeHtml(book.title.charAt(0).toUpperCase())}</div>`;
  return `
    <article class="book-card" style="--card-accent: ${colorForGenre(book.genre)}">
      <div class="book-cover">${cover}</div>
      <div class="book-card-top">
        <p class="genre-label">${escapeHtml(book.genre)}</p>
        <button
          class="menu-button"
          type="button"
          data-action="menu"
          data-id="${book.id}"
          aria-label="Book options for ${escapeHtml(book.title)}"
          aria-expanded="${menuIsOpen}"
        >...</button>
      </div>
      ${
        menuIsOpen
          ? `<div class="book-actions-menu">
              <button type="button" data-action="cover" data-id="${book.id}">
                ${book.coverImage ? "Change photo" : "Add photo"}
              </button>
              <button class="remove-action" type="button" data-action="delete" data-id="${book.id}">
                Remove book
              </button>
            </div>`
          : ""
      }
      <h3 class="book-title">${escapeHtml(book.title)}</h3>
      <p class="book-author">by ${escapeHtml(book.author)}</p>
      <div class="rating-control" role="group" aria-label="Rate ${escapeHtml(book.title)}">
        <span>Rating</span>
        ${[1, 2, 3, 4, 5]
          .map(
            (star) => `
              <button
                class="star-button ${star <= rating ? "filled" : ""}"
                type="button"
                data-action="rate"
                data-id="${book.id}"
                data-rating="${star}"
                aria-label="${star} ${star === 1 ? "star" : "stars"} for ${escapeHtml(book.title)}"
                aria-pressed="${star === rating}"
              >&#9733;</button>
            `,
          )
          .join("")}
      </div>
      <button
        class="share-book-button"
        type="button"
        data-action="share"
        data-id="${book.id}"
      >Recommend</button>
      <button
        class="status-button ${isRead ? "read" : ""}"
        type="button"
        data-action="toggle"
        data-id="${book.id}"
        aria-label="Mark ${escapeHtml(book.title)} as ${isRead ? "unread" : "read"}"
      >
        ${isRead ? "Read" : "To be read"}
      </button>
    </article>
  `;
}

function renderBooks() {
  updateGenreOptions();
  updateStats();
  updateBookSuggestions();

  const visibleBooks = filteredBooks();
  elements.bookGrid.innerHTML = visibleBooks.map(renderBook).join("");
  const hasBooks = ownedByCurrent(books).length > 0;
  const hasResults = visibleBooks.length > 0;
  elements.bookGrid.hidden = !hasResults;
  elements.emptyState.hidden = hasResults;

  if (!hasResults) {
    elements.emptyTitle.textContent = hasBooks
      ? "No books found"
      : "Your shelves are waiting";
    elements.emptyMessage.textContent = hasBooks
      ? "Try a different search or adjust your filters."
      : "Add your first book and begin building your personal catalogue.";
    document.querySelector("#empty-add-button").hidden = hasBooks;
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2200);
}

function openBookForm() {
  elements.form.reset();
  elements.dialog.showModal();
  window.setTimeout(() => elements.titleInput.focus(), 0);
}

async function addBook(formData) {
  let coverImage = "";
  const coverFile = elements.coverInput.files[0];
  if (coverFile) {
    try {
      coverImage = await compressImage(coverFile, 900, 0.72);
    } catch (error) {
      showToast(error.message);
      return;
    }
  }
  const book = {
    id: crypto.randomUUID(),
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    genre: formData.get("genre").trim(),
    status: formData.get("status"),
    coverImage,
    rating: 0,
    ownerId: currentAccount.id,
  };
  books.unshift(book);
  if (!saveBooks()) {
    books.shift();
    return;
  }
  renderBooks();
  scheduleStatsSync();
  elements.dialog.close();
  showToast(`"${book.title}" added to your library.`);
}

function toggleStatus(id) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book) return;
  book.status = book.status === "read" ? "unread" : "read";
  saveBooks();
  renderBooks();
  scheduleStatsSync();
  showToast(
    book.status === "read"
      ? `Marked "${book.title}" as read.`
      : `Moved "${book.title}" back to your reading list.`,
  );
}

function rateBook(id, rating) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book) return;
  book.rating = Number(rating);
  if (!saveBooks()) return;
  renderBooks();
  showToast(`Rated "${book.title}" ${rating} ${rating === "1" ? "star" : "stars"}.`);
}

function removeBook(id) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book) return;
  books = books.filter((item) => item.id !== id);
  openMenuId = null;
  saveBooks();
  renderBooks();
  scheduleStatsSync();
  showToast(`"${book.title}" removed.`);
}

function openCoverForm(id) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book) return;
  activeCoverBookId = id;
  pendingCoverImage = "";
  elements.coverForm.reset();
  elements.coverBookName.textContent = `${book.title} by ${book.author}`;
  elements.coverPreviewFrame.hidden = true;
  elements.coverPreview.removeAttribute("src");
  elements.coverDialog.showModal();
}

async function previewReplacementCover() {
  const file = elements.replaceCoverInput.files[0];
  if (!file) return;
  try {
    pendingCoverImage = await compressImage(file, 900, 0.72);
    elements.coverPreview.src = pendingCoverImage;
    elements.coverPreviewFrame.hidden = false;
  } catch (error) {
    pendingCoverImage = "";
    showToast(error.message);
  }
}

function saveReplacementCover() {
  const book = books.find(
    (item) =>
      item.id === activeCoverBookId && item.ownerId === currentAccount?.id,
  );
  if (!book || !pendingCoverImage) return;
  const previousImage = book.coverImage || "";
  book.coverImage = pendingCoverImage;
  if (!saveBooks()) {
    book.coverImage = previousImage;
    return;
  }
  renderBooks();
  elements.coverDialog.close();
  showToast(`Display photo saved for "${book.title}".`);
}

function openWishlistForm() {
  elements.wishlistForm.reset();
  elements.wishlistDialog.showModal();
  window.setTimeout(() => elements.wishlistTitleInput.focus(), 0);
}

function renderWishlistItem(item) {
  return `
    <article class="wishlist-card">
      <p class="wishlist-genre">${escapeHtml(item.genre || "Genre not set")}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="wishlist-author">by ${escapeHtml(item.author)}</p>
      <div class="wishlist-actions">
        <button
          class="wishlist-owned-button"
          type="button"
          data-wishlist-action="acquired"
          data-id="${item.id}"
        >I bought this</button>
        <button
          class="wishlist-remove-button"
          type="button"
          data-wishlist-action="delete"
          data-id="${item.id}"
          aria-label="Remove ${escapeHtml(item.title)} from wishlist"
        >Remove</button>
      </div>
    </article>
  `;
}

function renderWishlist() {
  const accountWishlist = ownedByCurrent(wishlist);
  elements.wishlistCount.textContent = accountWishlist.length;
  elements.wishlistCountLabel.textContent =
    accountWishlist.length === 1 ? "book waiting" : "books waiting";
  elements.wishlistGrid.innerHTML = accountWishlist
    .map(renderWishlistItem)
    .join("");
  elements.wishlistGrid.hidden = accountWishlist.length === 0;
  elements.wishlistEmptyState.hidden = accountWishlist.length > 0;
}

function addWishlistItem(formData) {
  const item = {
    id: crypto.randomUUID(),
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    genre: formData.get("genre").trim(),
    createdAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  };
  wishlist.unshift(item);
  if (!saveWishlist()) {
    wishlist.shift();
    return;
  }
  renderWishlist();
  elements.wishlistDialog.close();
  showToast(`"${item.title}" added to your wishlist.`);
}

function removeWishlistItem(id) {
  const item = wishlist.find(
    (entry) => entry.id === id && entry.ownerId === currentAccount?.id,
  );
  if (!item) return;
  wishlist = wishlist.filter((entry) => entry.id !== id);
  saveWishlist();
  renderWishlist();
  showToast(`"${item.title}" removed from your wishlist.`);
}

function moveWishlistItemToCollection(id) {
  const item = wishlist.find(
    (entry) => entry.id === id && entry.ownerId === currentAccount?.id,
  );
  if (!item) return;
  const book = {
    id: crypto.randomUUID(),
    title: item.title,
    author: item.author,
    genre: item.genre || "Uncategorized",
    status: "unread",
    coverImage: "",
    rating: 0,
    ownerId: currentAccount.id,
  };
  books.unshift(book);
  wishlist = wishlist.filter((entry) => entry.id !== id);
  if (!saveBooks() || !saveWishlist()) return;
  renderBooks();
  renderWishlist();
  showToast(`"${item.title}" moved to your collection.`);
}

function minutesBetween(startTime, endTime) {
  if (!startTime || !endTime) return 0;
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const start = startHours * 60 + startMinutes;
  let end = endHours * 60 + endMinutes;
  if (end < start) end += 24 * 60;
  return end - start;
}

function formatDuration(minutes) {
  if (!minutes) return "0m";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (!hours) return `${remainingMinutes}m`;
  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLastSevenDays() {
  const days = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    days.push({
      date: localDateString(date),
      label: new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(
        date,
      ),
    });
  }
  return days;
}

function calculateStreak() {
  const sessionDates = new Set(
    ownedByCurrent(readingLog).map((entry) => entry.date),
  );
  if (!sessionDates.size) return 0;
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  if (!sessionDates.has(localDateString(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (sessionDates.has(localDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getTimePeriod(time) {
  const hour = Number(time.split(":")[0]);
  if (hour < 6) return "late at night";
  if (hour < 12) return "in the morning";
  if (hour < 17) return "in the afternoon";
  if (hour < 21) return "in the evening";
  return "late at night";
}

function renderReadingInsights() {
  const accountLog = ownedByCurrent(readingLog);
  const sessionCount = accountLog.length;
  const totalMinutes = accountLog.reduce(
    (total, entry) => total + entry.durationMinutes,
    0,
  );
  const totalPages = accountLog.reduce(
    (total, entry) => total + entry.pagesRead,
    0,
  );
  const weeklyDays = getLastSevenDays();
  const weeklyDates = new Set(weeklyDays.map((day) => day.date));
  const weeklyEntries = accountLog.filter((entry) =>
    weeklyDates.has(entry.date),
  );
  const weeklyPages = weeklyEntries.reduce(
    (total, entry) => total + entry.pagesRead,
    0,
  );
  const weeklyMinutes = weeklyEntries.reduce(
    (total, entry) => total + entry.durationMinutes,
    0,
  );
  const pace = totalMinutes ? Math.round((totalPages / totalMinutes) * 60) : 0;
  const averageMinutes = sessionCount
    ? Math.round(totalMinutes / sessionCount)
    : 0;
  const streak = calculateStreak();

  elements.totalTimeInsight.textContent = formatDuration(totalMinutes);
  elements.sessionCountInsight.textContent = sessionCount
    ? `${sessionCount} ${sessionCount === 1 ? "session" : "sessions"} logged`
    : "No sessions yet";
  elements.pagesInsight.textContent = totalPages.toLocaleString();
  elements.pagesWeekInsight.textContent =
    `${weeklyPages.toLocaleString()} in the last 7 days`;
  elements.paceInsight.textContent = pace ? `${pace} p/h` : "--";
  elements.averageInsight.textContent = averageMinutes
    ? formatDuration(averageMinutes)
    : "--";
  elements.streakInsight.textContent = streak
    ? `${streak}-day current streak`
    : "Start your first streak";
  elements.weeklyTotal.textContent =
    `${weeklyMinutes} ${weeklyMinutes === 1 ? "minute" : "minutes"}`;

  const minutesByDay = weeklyDays.map((day) =>
    weeklyEntries
      .filter((entry) => entry.date === day.date)
      .reduce((total, entry) => total + entry.durationMinutes, 0),
  );
  const maximumMinutes = Math.max(...minutesByDay, 1);
  elements.weeklyChart.innerHTML = weeklyDays
    .map((day, index) => {
      const minutes = minutesByDay[index];
      const height = minutes ? Math.max((minutes / maximumMinutes) * 100, 6) : 2;
      return `
        <div class="chart-day" title="${minutes} minutes">
          <div class="bar-track">
            <div class="bar" style="height: ${height}%"></div>
          </div>
          <span>${escapeHtml(day.label)}</span>
        </div>
      `;
    })
    .join("");

  if (!sessionCount) {
    elements.habitTitle.textContent = "Your insights will appear here.";
    elements.habitMessage.textContent =
      "Log a few reading sessions to learn when you read most and how your pace changes over time.";
    return;
  }

  const periodMinutes = accountLog.reduce((counts, entry) => {
    const period = getTimePeriod(entry.startTime);
    counts[period] = (counts[period] || 0) + entry.durationMinutes;
    return counts;
  }, {});
  const favoritePeriod = Object.entries(periodMinutes).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
  const longestSession = Math.max(
    ...accountLog.map((entry) => entry.durationMinutes),
  );
  elements.habitTitle.textContent = `You read most ${favoritePeriod}.`;
  elements.habitMessage.textContent =
    `Your average session is ${formatDuration(averageMinutes)}, and your longest is ${formatDuration(longestSession)}. ` +
    (streak > 1
      ? `You are on a ${streak}-day streak; protecting that time can help the habit stick.`
      : "A regular reading window can help turn individual sessions into a lasting habit.");
}

function updateBookSuggestions() {
  elements.bookTitleSuggestions.innerHTML = ownedByCurrent(books)
    .map(
      (book) =>
        `<option value="${escapeHtml(book.title)}">${escapeHtml(book.author)}</option>`,
    )
    .join("");
}

function updateLogBookOptions() {
  const currentFilter = elements.logBookFilter.value;
  const loggedBooks = [
    ...new Set(ownedByCurrent(readingLog).map((entry) => entry.title)),
  ].sort((a, b) => a.localeCompare(b));
  elements.logBookFilter.innerHTML = [
    '<option value="all">All books</option>',
    ...loggedBooks.map(
      (title) =>
        `<option value="${escapeHtml(title)}">${escapeHtml(title)}</option>`,
    ),
  ].join("");
  elements.logBookFilter.value = loggedBooks.includes(currentFilter)
    ? currentFilter
    : "all";
}

function renderLogEntry(entry) {
  const pace = Math.round((entry.pagesRead / entry.durationMinutes) * 60);
  return `
    <article class="log-entry">
      <div class="log-book">
        <h4>${escapeHtml(entry.title)}</h4>
        <p>${escapeHtml(entry.author)} / ${formatDate(entry.date)}</p>
      </div>
      <div class="log-metric">
        <strong>${entry.pagesRead} pages</strong>
        <small>Pages ${entry.startPage}-${entry.endPage}</small>
      </div>
      <div class="log-metric">
        <strong>${formatDuration(entry.durationMinutes)}</strong>
        <small>${entry.startTime}-${entry.endTime}</small>
      </div>
      <div class="log-metric">
        <strong>${pace} p/h</strong>
        <small>Reading pace</small>
      </div>
      <button
        class="log-delete-button"
        type="button"
        data-log-action="delete"
        data-id="${entry.id}"
        aria-label="Delete reading session for ${escapeHtml(entry.title)}"
      >X</button>
    </article>
  `;
}

function renderReadingLog() {
  updateLogBookOptions();
  renderReadingInsights();
  const selectedBook = elements.logBookFilter.value;
  const accountLog = ownedByCurrent(readingLog);
  const visibleEntries = accountLog
    .filter((entry) => selectedBook === "all" || entry.title === selectedBook)
    .sort((a, b) =>
      `${b.date}T${b.startTime}`.localeCompare(`${a.date}T${a.startTime}`),
    );
  elements.logList.innerHTML = visibleEntries.map(renderLogEntry).join("");
  elements.logList.hidden = visibleEntries.length === 0;
  elements.logEmptyState.hidden = visibleEntries.length > 0;
  elements.logEmptyState.querySelector("p").textContent =
    accountLog.length && !visibleEntries.length
      ? "No sessions match this book."
      : "No reading sessions logged yet.";
  document.querySelector("#empty-log-button").hidden = accountLog.length > 0;
}

function setDefaultLogValues() {
  const now = new Date();
  elements.sessionDateInput.value = localDateString(now);
  elements.startTimeInput.value =
    `${String(now.getHours()).padStart(2, "0")}:` +
    String(now.getMinutes()).padStart(2, "0");
  const later = new Date(now.getTime() + 30 * 60 * 1000);
  elements.endTimeInput.value =
    `${String(later.getHours()).padStart(2, "0")}:` +
    String(later.getMinutes()).padStart(2, "0");
}

function openLogForm() {
  elements.logForm.reset();
  setDefaultLogValues();
  updateDurationPreview();
  elements.logDialog.showModal();
  window.setTimeout(() => elements.logTitleInput.focus(), 0);
}

function updateDurationPreview() {
  const duration = minutesBetween(
    elements.startTimeInput.value,
    elements.endTimeInput.value,
  );
  const isValid = duration > 0 && duration <= 12 * 60;
  elements.durationPreview.classList.toggle("invalid", !isValid);
  elements.durationPreview.textContent = isValid
    ? `Calculated session duration: ${formatDuration(duration)}.`
    : "The session duration must be between 1 minute and 12 hours.";
  return isValid ? duration : 0;
}

function fillAuthorFromCollection() {
  const matchingBook = ownedByCurrent(books).find(
    (book) => normalize(book.title) === normalize(elements.logTitleInput.value),
  );
  if (matchingBook) elements.logAuthorInput.value = matchingBook.author;
}

function suggestPagesRead() {
  const startPage = Number(elements.startPageInput.value);
  const endPage = Number(elements.endPageInput.value);
  if (
    elements.startPageInput.value &&
    elements.endPageInput.value &&
    endPage >= startPage
  ) {
    elements.pagesReadInput.value = endPage - startPage;
  }
}

function addReadingSession(formData) {
  const durationMinutes = updateDurationPreview();
  const startPage = Number(formData.get("startPage"));
  const endPage = Number(formData.get("endPage"));
  if (!durationMinutes) return;
  if (endPage < startPage) {
    elements.endPageInput.setCustomValidity(
      "The finishing page cannot be before the starting page.",
    );
    elements.endPageInput.reportValidity();
    return;
  }
  elements.endPageInput.setCustomValidity("");

  const entry = {
    id: crypto.randomUUID(),
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    pagesRead: Number(formData.get("pagesRead")),
    startPage,
    endPage,
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    durationMinutes,
    ownerId: currentAccount.id,
  };
  readingLog.unshift(entry);
  saveReadingLog();
  renderReadingLog();
  elements.logDialog.close();
  showToast(`Reading session for "${entry.title}" saved.`);
}

function removeReadingSession(id) {
  const entry = readingLog.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!entry) return;
  readingLog = readingLog.filter((item) => item.id !== id);
  saveReadingLog();
  renderReadingLog();
  showToast(`Reading session for "${entry.title}" removed.`);
}

function setPassageMode(mode) {
  passageMode = mode;
  const isPhoto = mode === "photo";
  elements.photoPassageFields.hidden = !isPhoto;
  elements.textPassageFields.hidden = isPhoto;
  elements.passageTextInput.required = !isPhoto;
  elements.passagePhotoInput.required = isPhoto && !pageImage;
  document.querySelectorAll("[data-passage-mode]").forEach((button) => {
    const isActive = button.dataset.passageMode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function resetHighlightCanvas() {
  pageImage = null;
  highlightRect = null;
  highlightStart = null;
  isHighlighting = false;
  elements.highlightWorkspace.hidden = true;
  const context = elements.highlightCanvas.getContext("2d");
  context.clearRect(
    0,
    0,
    elements.highlightCanvas.width,
    elements.highlightCanvas.height,
  );
}

function drawHighlightCanvas() {
  if (!pageImage) return;
  const canvas = elements.highlightCanvas;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(pageImage, 0, 0, canvas.width, canvas.height);
  if (highlightRect) {
    context.fillStyle = "rgba(246, 210, 75, 0.34)";
    context.strokeStyle = "rgba(189, 132, 28, 0.9)";
    context.lineWidth = Math.max(2, canvas.width / 400);
    context.fillRect(
      highlightRect.x,
      highlightRect.y,
      highlightRect.width,
      highlightRect.height,
    );
    context.strokeRect(
      highlightRect.x,
      highlightRect.y,
      highlightRect.width,
      highlightRect.height,
    );
  }
}

function loadPageImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onerror = () => reject(new Error("The page photo could not be opened."));
    image.onload = () => {
      pageImage = image;
      highlightRect = null;
      elements.highlightCanvas.width = image.width;
      elements.highlightCanvas.height = image.height;
      elements.highlightWorkspace.hidden = false;
      drawHighlightCanvas();
      resolve();
    };
    image.src = dataUrl;
  });
}

async function handlePagePhoto() {
  const file = elements.passagePhotoInput.files[0];
  if (!file) {
    resetHighlightCanvas();
    return;
  }
  try {
    const dataUrl = await compressImage(file, 1400, 0.76);
    await loadPageImage(dataUrl);
    elements.passagePhotoInput.required = false;
  } catch (error) {
    resetHighlightCanvas();
    showToast(error.message);
  }
}

function canvasPoint(event) {
  const rect = elements.highlightCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * elements.highlightCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * elements.highlightCanvas.height,
  };
}

function startHighlight(event) {
  if (!pageImage) return;
  isHighlighting = true;
  highlightStart = canvasPoint(event);
  highlightRect = {
    x: highlightStart.x,
    y: highlightStart.y,
    width: 0,
    height: 0,
  };
  elements.highlightCanvas.setPointerCapture(event.pointerId);
}

function moveHighlight(event) {
  if (!isHighlighting || !highlightStart) return;
  const point = canvasPoint(event);
  highlightRect = {
    x: Math.min(highlightStart.x, point.x),
    y: Math.min(highlightStart.y, point.y),
    width: Math.abs(point.x - highlightStart.x),
    height: Math.abs(point.y - highlightStart.y),
  };
  drawHighlightCanvas();
}

function endHighlight(event) {
  if (!isHighlighting) return;
  isHighlighting = false;
  if (highlightRect && (highlightRect.width < 8 || highlightRect.height < 8)) {
    highlightRect = null;
    drawHighlightCanvas();
  }
  if (elements.highlightCanvas.hasPointerCapture(event.pointerId)) {
    elements.highlightCanvas.releasePointerCapture(event.pointerId);
  }
}

function fillPassageAuthor() {
  const matchingBook = ownedByCurrent(books).find(
    (book) =>
      normalize(book.title) === normalize(elements.passageTitleInput.value),
  );
  if (matchingBook) elements.passageAuthorInput.value = matchingBook.author;
}

function openPassageForm() {
  elements.passageForm.reset();
  resetHighlightCanvas();
  setPassageMode("photo");
  elements.passageDialog.showModal();
  window.setTimeout(() => elements.passagePhotoInput.focus(), 0);
}

function updatePassageBookOptions() {
  const current = elements.passageBookFilter.value;
  const titles = [
    ...new Set(ownedByCurrent(passages).map((passage) => passage.title)),
  ].sort((a, b) => a.localeCompare(b));
  elements.passageBookFilter.innerHTML = [
    '<option value="all">All books</option>',
    ...titles.map(
      (title) =>
        `<option value="${escapeHtml(title)}">${escapeHtml(title)}</option>`,
    ),
  ].join("");
  elements.passageBookFilter.value = titles.includes(current) ? current : "all";
}

function renderPassage(passage) {
  const content =
    passage.mode === "photo"
      ? `<img class="passage-image" src="${passage.image}" alt="Highlighted page ${escapeHtml(passage.page)} from ${escapeHtml(passage.title)}" />`
      : "";
  const typedText =
    passage.mode === "text"
      ? `<blockquote class="typed-passage">${escapeHtml(passage.text)}</blockquote>`
      : "";
  const reflection = passage.reflection
    ? `<p class="reflection"><strong>Reflection</strong>${escapeHtml(passage.reflection)}</p>`
    : "";
  return `
    <article class="passage-card">
      ${content}
      <div class="passage-card-body">
        <div class="passage-citation">
          <div>
            <h3>${escapeHtml(passage.title)}</h3>
            <p>by ${escapeHtml(passage.author)}</p>
          </div>
          <span class="page-badge">Page ${escapeHtml(passage.page)}</span>
        </div>
        ${typedText}
        ${reflection}
        <button
          class="share-passage-button"
          type="button"
          data-passage-action="share"
          data-id="${passage.id}"
        >Share passage</button>
        <div class="passage-card-footer">
          <button
            class="passage-delete-button"
            type="button"
            data-passage-action="delete"
            data-id="${passage.id}"
            aria-label="Delete saved passage from ${escapeHtml(passage.title)}"
          >Remove</button>
        </div>
      </div>
    </article>
  `;
}

function renderPassages() {
  updatePassageBookOptions();
  const query = normalize(elements.passageSearchInput.value);
  const book = elements.passageBookFilter.value;
  const accountPassages = ownedByCurrent(passages);
  const visiblePassages = accountPassages.filter((passage) => {
    const searchable = [
      passage.title,
      passage.author,
      passage.text || "",
      passage.reflection || "",
      passage.page,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      (book === "all" || passage.title === book) &&
      (!query || searchable.includes(query))
    );
  });
  elements.passageGrid.innerHTML = visiblePassages.map(renderPassage).join("");
  elements.passageGrid.hidden = visiblePassages.length === 0;
  elements.passageEmptyState.hidden = visiblePassages.length > 0;
  const emptyHeading = elements.passageEmptyState.querySelector("h3");
  const emptyCopy = elements.passageEmptyState.querySelector("p");
  const emptyButton = document.querySelector("#empty-passage-button");
  if (accountPassages.length && !visiblePassages.length) {
    emptyHeading.textContent = "No passages found.";
    emptyCopy.textContent = "Try a different search or book filter.";
    emptyButton.hidden = true;
  } else {
    emptyHeading.textContent = "Keep a line worth returning to.";
    emptyCopy.textContent =
      "Photograph and highlight a page, or type a passage manually.";
    emptyButton.hidden = accountPassages.length > 0;
  }
}

function addPassage(formData) {
  if (passageMode === "photo" && !pageImage) {
    elements.passagePhotoInput.setCustomValidity("Please add a page photo.");
    elements.passagePhotoInput.reportValidity();
    return;
  }
  elements.passagePhotoInput.setCustomValidity("");
  const passage = {
    id: crypto.randomUUID(),
    mode: passageMode,
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    page: formData.get("page").trim(),
    text: passageMode === "text" ? formData.get("passageText").trim() : "",
    image:
      passageMode === "photo"
        ? elements.highlightCanvas.toDataURL("image/jpeg", 0.78)
        : "",
    reflection: formData.get("reflection").trim(),
    createdAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  };
  passages.unshift(passage);
  if (!savePassages()) {
    passages.shift();
    return;
  }
  renderPassages();
  elements.passageDialog.close();
  showToast(`Passage from "${passage.title}" saved.`);
}

function removePassage(id) {
  const passage = passages.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!passage) return;
  passages = passages.filter((item) => item.id !== id);
  savePassages();
  renderPassages();
  showToast(`Saved passage from "${passage.title}" removed.`);
}

function avatarMarkup(account) {
  return account.profileImage
    ? `<img src="${account.profileImage}" alt="" />`
    : escapeHtml(account.username.charAt(0).toUpperCase());
}

function isFollowing(accountId) {
  return follows.some(
    (follow) =>
      follow.followerId === currentAccount?.id &&
      follow.followingId === accountId,
  );
}

function followingCount(accountId) {
  return follows.filter((follow) => follow.followerId === accountId).length;
}

function followerCount(accountId) {
  return follows.filter((follow) => follow.followingId === accountId).length;
}

function renderReaderCard(account) {
  const stats = statsFor(account.id);
  const following = isFollowing(account.id);
  return `
    <article class="reader-card">
      <div class="reader-identity">
        <div class="mini-avatar">${avatarMarkup(account)}</div>
        <div>
          <h3>${escapeHtml(account.username)}</h3>
          <p>${followerCount(account.id)} followers / ${followingCount(account.id)} following</p>
        </div>
      </div>
      <div class="reader-stats">
        <div class="reader-stat"><strong>${stats.total}</strong><span>Owned</span></div>
        <div class="reader-stat"><strong>${stats.read}</strong><span>Read</span></div>
        <div class="reader-stat"><strong>${stats.unread}</strong><span>To read</span></div>
      </div>
      <div class="reader-actions">
        <button
          class="follow-button ${following ? "following" : ""}"
          type="button"
          data-community-action="follow"
          data-id="${account.id}"
        >${following ? "Following" : "Follow"}</button>
        <button
          class="view-profile-button"
          type="button"
          data-community-action="profile"
          data-id="${account.id}"
        >View profile</button>
      </div>
    </article>
  `;
}

function renderReaders() {
  if (!currentAccount) return;
  const otherAccounts = accounts.filter(
    (account) => account.id !== currentAccount.id,
  );
  elements.readerGrid.innerHTML = otherAccounts.map(renderReaderCard).join("");
  elements.readerGrid.hidden = otherAccounts.length === 0;
  elements.readerEmptyState.hidden = otherAccounts.length > 0;
}

function renderShareCard(share) {
  const sender = accounts.find((account) => account.id === share.senderId);
  const recipient = accounts.find((account) => account.id === share.recipientId);
  if (!sender || !recipient) return "";
  const isBook = share.kind === "book";
  const isSender = share.senderId === currentAccount.id;
  const otherReader = isSender ? recipient : sender;
  const myReadAt = isSender ? share.senderReadAt : share.recipientReadAt;
  const otherReadAt = isSender ? share.recipientReadAt : share.senderReadAt;
  const accountBooks = ownedByCurrent(books);
  const accountWishlist = ownedByCurrent(wishlist);
  const matchesBook = (item) =>
    normalize(item.title) === normalize(share.payload.title) &&
    normalize(item.author) === normalize(share.payload.author);
  const alreadyOwned = isBook && accountBooks.some(matchesBook);
  const alreadyWishlisted = isBook && accountWishlist.some(matchesBook);
  const comments = share.comments || [];
  return `
    <article class="share-card ${myReadAt ? "" : "unread"}" data-share-id="${share.id}">
      <div class="mini-avatar">${avatarMarkup(otherReader)}</div>
      <div>
        <div class="share-card-heading">
          <h3>${isBook ? "Book recommendation" : "Shared passage"}</h3>
          <span class="share-direction">${isSender ? (myReadAt ? "Sent" : "New reply") : myReadAt ? "Read" : "Unread"}</span>
        </div>
        <p class="share-meta">${isSender ? `To ${escapeHtml(recipient.username)}` : `From ${escapeHtml(sender.username)}`} / ${new Date(share.createdAt).toLocaleDateString()}</p>
        <p class="share-content">${
          isBook
            ? `${escapeHtml(share.payload.title)} by ${escapeHtml(share.payload.author)}`
            : `"${escapeHtml(share.payload.text || "Photographed passage")}" - ${escapeHtml(share.payload.title)}, page ${escapeHtml(share.payload.page)}`
        }</p>
        ${
          !isBook && share.payload.image
            ? `<img class="shared-passage-image" src="${share.payload.image}" alt="Shared highlighted passage from ${escapeHtml(share.payload.title)}" />`
            : ""
        }
        ${share.message ? `<p class="share-message">${escapeHtml(share.message)}</p>` : ""}
        ${
          isBook && !isSender
            ? `<div class="recommendation-collection-check">
                <strong>${alreadyOwned ? "Already in your collection" : alreadyWishlisted ? "Already on your wishlist" : "Not in your collection"}</strong>
                ${
                  !alreadyOwned && !alreadyWishlisted
                    ? `<button type="button" data-share-action="wishlist" data-id="${share.id}">Add to wishlist</button>`
                    : ""
                }
              </div>`
            : ""
        }
        <div class="recommendation-thread">
          <p class="share-read-status">
            ${otherReadAt ? `${escapeHtml(otherReader.username)} has seen this conversation.` : `${escapeHtml(otherReader.username)} has not seen the latest message yet.`}
          </p>
          <div class="recommendation-comments">
            ${
              comments.length
                ? comments
                    .map((comment) => {
                      const author = accounts.find((account) => account.id === comment.authorId);
                      return `<div class="recommendation-comment">
                        <strong>${escapeHtml(author?.username || "Reader")}</strong>
                        <span>${escapeHtml(comment.comment)}</span>
                        <time>${new Date(comment.createdAt).toLocaleString()}</time>
                      </div>`;
                    })
                    .join("")
                : '<p class="no-recommendation-comments">No comments yet.</p>'
            }
          </div>
          <form class="recommendation-reply-form" data-share-id="${share.id}">
            <label>
              <span class="sr-only">Comment on this recommendation</span>
              <input name="comment" maxlength="1000" placeholder="Write a response..." required />
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </article>
  `;
}

function renderShareFeed() {
  if (!currentAccount) return;
  const conversations = shares
    .filter(
      (share) =>
        share.recipientId === currentAccount.id ||
        share.senderId === currentAccount.id,
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const unreadCount = conversations.filter((share) =>
    share.senderId === currentAccount.id
      ? !share.senderReadAt
      : !share.recipientReadAt,
  ).length;
  elements.recommendationUnreadCount.textContent = unreadCount
    ? `(${unreadCount})`
    : "";
  elements.shareFeed.innerHTML = conversations.map(renderShareCard).join("");
  elements.shareFeed.hidden = conversations.length === 0;
  elements.shareEmptyState.hidden = conversations.length > 0;
}

async function markRecommendationThreadsRead() {
  if (!currentAccount) return;
  const unread = shares.filter((share) =>
    share.senderId === currentAccount.id
      ? !share.senderReadAt
      : share.recipientId === currentAccount.id && !share.recipientReadAt,
  );
  if (!unread.length) return;
  await Promise.all(
    unread.map((share) =>
      apiRequest("share-read", {
        method: "POST",
        body: { shareId: share.id },
      }),
    ),
  );
  await loadCommunity();
  renderCommunity();
}

async function commentOnRecommendation(shareId, comment) {
  try {
    await apiRequest("share-comment", {
      method: "POST",
      body: { shareId, comment },
    });
    await loadCommunity();
    renderCommunity();
    showToast("Your response was sent.");
  } catch (error) {
    showToast(error.message);
  }
}

function addRecommendationToWishlist(shareId) {
  const share = shares.find(
    (item) =>
      item.id === shareId &&
      item.kind === "book" &&
      item.recipientId === currentAccount?.id,
  );
  if (!share) return;
  const duplicate = [...ownedByCurrent(books), ...ownedByCurrent(wishlist)].some(
    (item) =>
      normalize(item.title) === normalize(share.payload.title) &&
      normalize(item.author) === normalize(share.payload.author),
  );
  if (duplicate) {
    showToast("That book is already in your collection or wishlist.");
    renderShareFeed();
    return;
  }
  wishlist.unshift({
    id: crypto.randomUUID(),
    title: share.payload.title,
    author: share.payload.author,
    genre: share.payload.genre || "Uncategorized",
    createdAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  });
  saveWishlist();
  renderWishlist();
  renderShareFeed();
  showToast(`"${share.payload.title}" added to your wishlist.`);
}

function renderAdminAccounts() {
  if (!currentAccount || currentAccount.role !== "admin") {
    elements.adminAccountList.innerHTML = "";
    return;
  }
  elements.adminAccountList.innerHTML = accounts
    .map((account) => {
      const stats = statsFor(account.id);
      return `
        <div class="admin-account-row">
          <div>
            <strong>${escapeHtml(account.username)}</strong>
            <p>${stats.total} books / ${followerCount(account.id)} followers</p>
          </div>
          <span class="admin-role">${escapeHtml(account.role)}</span>
          ${
            account.id === currentAccount.id
              ? ""
              : `<button class="admin-delete-button" type="button" data-admin-action="delete" data-id="${account.id}">Delete account</button>`
          }
        </div>
      `;
    })
    .join("");
}

function setCommunityView(view) {
  if (view === "admin" && currentAccount?.role !== "admin") return;
  elements.communityReadersView.hidden = view !== "readers";
  elements.communityFeedView.hidden = view !== "feed";
  elements.communityAdminView.hidden = view !== "admin";
  document.querySelectorAll("[data-community-view]").forEach((button) => {
    const selected = button.dataset.communityView === view;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  if (view === "feed") {
    markRecommendationThreadsRead().catch((error) => showToast(error.message));
  }
}

function renderCommunity() {
  if (!currentAccount) return;
  const adminTab = document.querySelector(".admin-community-tab");
  adminTab.hidden = currentAccount.role !== "admin";
  if (currentAccount.role !== "admin" && !elements.communityAdminView.hidden) {
    setCommunityView("readers");
  }
  renderReaders();
  renderShareFeed();
  renderAdminAccounts();
}

async function toggleFollow(accountId) {
  if (!currentAccount || accountId === currentAccount.id) return;
  try {
    await apiRequest("follow", {
      method: "POST",
      body: { accountId },
    });
    await loadCommunity();
    renderCommunity();
  } catch (error) {
    showToast(error.message);
  }
}

function renderReaderCatalogue() {
  const query = elements.readerCatalogueSearch.value.trim().toLowerCase();
  const status = elements.readerCatalogueStatus.value;
  const filteredBooks = activeReaderCatalogue.filter((book) => {
    const matchesQuery = [book.title, book.author, book.genre]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return matchesQuery && (status === "all" || book.status === status);
  });
  elements.readerCatalogueCount.textContent = `${filteredBooks.length} ${
    filteredBooks.length === 1 ? "book" : "books"
  }${filteredBooks.length !== activeReaderCatalogue.length ? ` of ${activeReaderCatalogue.length}` : ""}`;
  elements.readerProfileBookList.innerHTML = filteredBooks.length
    ? filteredBooks
        .map((book) => {
          const rating = Number(book.rating) || 0;
          return `
            <article class="reader-profile-book-item">
              <div>
                <strong>${escapeHtml(book.title)}</strong>
                <span>${escapeHtml(book.author)}</span>
              </div>
              <div class="reader-profile-book-meta">
                <span>${escapeHtml(book.genre || "Uncategorized")}</span>
                <span class="reader-book-status ${book.status}">
                  ${book.status === "read" ? "Read" : "To be read"}
                </span>
                <span class="reader-book-rating" aria-label="${rating ? `${rating} out of 5 stars` : "Not rated"}">
                  ${rating ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)}` : "Not rated"}
                </span>
              </div>
            </article>
          `;
        })
        .join("")
    : `<p class="reader-catalogue-empty">${
        activeReaderCatalogue.length
          ? "No books match this search."
          : "No books added yet."
      }</p>`;
}

async function openReaderProfile(accountId) {
  const account = accounts.find((item) => item.id === accountId);
  if (!account) return;
  const stats = statsFor(account.id);
  elements.readerProfileName.textContent = account.username;
  elements.readerProfileAvatar.innerHTML = avatarMarkup(account);
  elements.readerProfileStats.innerHTML = `
    <div class="reader-stat"><strong>${stats.total}</strong><span>Owned</span></div>
    <div class="reader-stat"><strong>${stats.read}</strong><span>Read</span></div>
    <div class="reader-stat"><strong>${stats.unread}</strong><span>To read</span></div>
  `;
  activeReaderCatalogue = [];
  elements.readerCatalogueSearch.value = "";
  elements.readerCatalogueStatus.value = "all";
  elements.readerCatalogueCount.textContent = "Loading collection...";
  elements.readerProfileBookList.innerHTML =
    '<p class="reader-catalogue-empty">Loading books...</p>';
  elements.readerProfileDialog.showModal();
  try {
    const result = await apiRequest("catalogue", {
      method: "POST",
      body: { accountId },
    });
    activeReaderCatalogue = (result.books || []).sort((first, second) =>
      first.title.localeCompare(second.title),
    );
    renderReaderCatalogue();
  } catch (error) {
    elements.readerCatalogueCount.textContent = "Catalogue unavailable";
    elements.readerProfileBookList.innerHTML = `<p class="reader-catalogue-empty">${escapeHtml(error.message)}</p>`;
  }
}

function openShareDialog(kind, itemId) {
  if (!currentAccount) return;
  const recipients = accounts.filter(
    (account) => account.id !== currentAccount.id,
  );
  if (!recipients.length) {
    showToast("Another reader needs an account before you can share.");
    return;
  }
  const item =
    kind === "book"
      ? books.find(
          (book) =>
            book.id === itemId && book.ownerId === currentAccount.id,
        )
      : passages.find(
          (passage) =>
            passage.id === itemId && passage.ownerId === currentAccount.id,
        );
  if (!item) return;
  elements.shareForm.reset();
  elements.shareError.textContent = "";
  elements.shareKindInput.value = kind;
  elements.shareItemIdInput.value = itemId;
  elements.shareItemSummary.textContent =
    kind === "book"
      ? `${item.title} by ${item.author}`
      : `${item.title}, page ${item.page}`;
  elements.shareRecipientInput.innerHTML = recipients
    .map(
      (account) =>
        `<option value="${account.id}">${escapeHtml(account.username)}</option>`,
    )
    .join("");
  elements.shareDialog.showModal();
}

async function shareItem(formData) {
  const kind = formData.get("kind");
  const itemId = formData.get("itemId");
  const recipientId = formData.get("recipientId");
  const recipient = accounts.find((account) => account.id === recipientId);
  const item =
    kind === "book"
      ? books.find(
          (book) => book.id === itemId && book.ownerId === currentAccount?.id,
        )
      : passages.find(
          (passage) =>
            passage.id === itemId && passage.ownerId === currentAccount?.id,
        );
  if (!recipient || !item) {
    elements.shareError.textContent = "That item or reader is no longer available.";
    return;
  }
  const payload =
      kind === "book"
        ? {
            title: item.title,
            author: item.author,
            genre: item.genre,
            rating: item.rating || 0,
          }
        : {
            title: item.title,
            author: item.author,
            page: item.page,
            text: item.text || "",
            image: item.image || "",
            reflection: item.reflection || "",
          };
  try {
    await apiRequest("share", {
      method: "POST",
      body: {
        recipientId,
        kind,
        payload,
        message: formData.get("message").trim(),
      },
    });
    await loadCommunity();
    renderCommunity();
    elements.shareDialog.close();
    showToast(`Shared with ${recipient.username}.`);
  } catch (error) {
    elements.shareError.textContent = error.message;
  }
}

async function deleteAccountAsAdmin(accountId) {
  if (!currentAccount || currentAccount.role !== "admin") return;
  const account = accounts.find((item) => item.id === accountId);
  if (!account || account.role === "admin") return;
  try {
    await apiRequest("delete-user", {
      method: "POST",
      body: { accountId },
    });
    await loadCommunity();
    renderCommunity();
    showToast(`Account "${account.username}" was deleted.`);
  } catch (error) {
    showToast(error.message);
  }
}

document
  .querySelector("#open-form-button")
  .addEventListener("click", openBookForm);
document
  .querySelector("#empty-add-button")
  .addEventListener("click", openBookForm);
document
  .querySelector("#close-form-button")
  .addEventListener("click", () => elements.dialog.close());
document
  .querySelector("#open-log-button")
  .addEventListener("click", openLogForm);
document
  .querySelector("#empty-log-button")
  .addEventListener("click", openLogForm);
document
  .querySelector("#close-log-button")
  .addEventListener("click", () => elements.logDialog.close());
document
  .querySelector("#open-wishlist-button")
  .addEventListener("click", openWishlistForm);
document
  .querySelector("#empty-wishlist-button")
  .addEventListener("click", openWishlistForm);
document
  .querySelector("#close-wishlist-button")
  .addEventListener("click", () => elements.wishlistDialog.close());
document
  .querySelector("#close-cover-button")
  .addEventListener("click", () => elements.coverDialog.close());
document
  .querySelector("#open-passage-button")
  .addEventListener("click", openPassageForm);
document
  .querySelector("#empty-passage-button")
  .addEventListener("click", openPassageForm);
document
  .querySelector("#close-passage-button")
  .addEventListener("click", () => elements.passageDialog.close());
document
  .querySelector("#clear-highlight-button")
  .addEventListener("click", () => {
    highlightRect = null;
    drawHighlightCanvas();
  });
document.querySelectorAll("[data-auth-view]").forEach((button) => {
  button.addEventListener("click", () => setAuthView(button.dataset.authView));
});
document
  .querySelector("#open-profile-button")
  .addEventListener("click", openProfileForm);
document
  .querySelector("#close-profile-button")
  .addEventListener("click", () => elements.profileDialog.close());
document
  .querySelector("#close-reader-profile-button")
  .addEventListener("click", () => elements.readerProfileDialog.close());
document
  .querySelector("#close-share-button")
  .addEventListener("click", () => elements.shareDialog.close());
document.querySelector("#logout-button").addEventListener("click", () => {
  elements.profileDialog.close();
  showLoginScreen();
});

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (elements.loginForm.reportValidity()) {
    await login(new FormData(elements.loginForm));
  }
});

elements.signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (elements.signupForm.reportValidity()) {
    await createAccount(new FormData(elements.signupForm));
  }
});

elements.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.profileForm.reportValidity()) {
    saveProfile(new FormData(elements.profileForm));
  }
});

elements.shareForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.shareForm.reportValidity()) {
    shareItem(new FormData(elements.shareForm));
  }
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (elements.form.reportValidity()) {
    await addBook(new FormData(elements.form));
  }
});

elements.logForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.logForm.reportValidity()) {
    addReadingSession(new FormData(elements.logForm));
  }
});

elements.wishlistForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.wishlistForm.reportValidity()) {
    addWishlistItem(new FormData(elements.wishlistForm));
  }
});

elements.coverForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.coverForm.reportValidity()) saveReplacementCover();
});

elements.passageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.passageForm.reportValidity()) {
    addPassage(new FormData(elements.passageForm));
  }
});

elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});

elements.logDialog.addEventListener("click", (event) => {
  if (event.target === elements.logDialog) elements.logDialog.close();
});

elements.wishlistDialog.addEventListener("click", (event) => {
  if (event.target === elements.wishlistDialog) {
    elements.wishlistDialog.close();
  }
});

elements.coverDialog.addEventListener("click", (event) => {
  if (event.target === elements.coverDialog) elements.coverDialog.close();
});

elements.passageDialog.addEventListener("click", (event) => {
  if (event.target === elements.passageDialog) elements.passageDialog.close();
});

elements.profileDialog.addEventListener("click", (event) => {
  if (event.target === elements.profileDialog) elements.profileDialog.close();
});

elements.readerProfileDialog.addEventListener("click", (event) => {
  if (event.target === elements.readerProfileDialog) {
    elements.readerProfileDialog.close();
  }
});

elements.shareDialog.addEventListener("click", (event) => {
  if (event.target === elements.shareDialog) elements.shareDialog.close();
});

elements.bookGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "toggle") toggleStatus(id);
  if (action === "rate") rateBook(id, button.dataset.rating);
  if (action === "share") openShareDialog("book", id);
  if (action === "delete") removeBook(id);
  if (action === "cover") openCoverForm(id);
  if (action === "menu") {
    openMenuId = openMenuId === id ? null : id;
    renderBooks();
  }
});

elements.logList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-log-action]");
  if (button?.dataset.logAction === "delete") {
    removeReadingSession(button.dataset.id);
  }
});

elements.wishlistGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-wishlist-action]");
  if (!button) return;
  if (button.dataset.wishlistAction === "delete") {
    removeWishlistItem(button.dataset.id);
  }
  if (button.dataset.wishlistAction === "acquired") {
    moveWishlistItemToCollection(button.dataset.id);
  }
});

elements.passageGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-passage-action]");
  if (button?.dataset.passageAction === "delete") {
    removePassage(button.dataset.id);
  }
  if (button?.dataset.passageAction === "share") {
    openShareDialog("passage", button.dataset.id);
  }
});

elements.readerGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-community-action]");
  if (!button) return;
  if (button.dataset.communityAction === "follow") {
    toggleFollow(button.dataset.id);
  }
  if (button.dataset.communityAction === "profile") {
    openReaderProfile(button.dataset.id);
  }
});

elements.readerCatalogueSearch.addEventListener("input", renderReaderCatalogue);
elements.readerCatalogueStatus.addEventListener("change", renderReaderCatalogue);

elements.shareFeed.addEventListener("submit", (event) => {
  const form = event.target.closest(".recommendation-reply-form");
  if (!form) return;
  event.preventDefault();
  const comment = new FormData(form).get("comment").trim();
  if (comment) commentOnRecommendation(form.dataset.shareId, comment);
});

elements.shareFeed.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-share-action]");
  if (button?.dataset.shareAction === "wishlist") {
    addRecommendationToWishlist(button.dataset.id);
  }
});

elements.adminAccountList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-admin-action]");
  if (button?.dataset.adminAction === "delete") {
    deleteAccountAsAdmin(button.dataset.id);
  }
});

elements.searchInput.addEventListener("input", renderBooks);
elements.genreFilter.addEventListener("change", renderBooks);
elements.statusFilter.addEventListener("change", renderBooks);
elements.logBookFilter.addEventListener("change", renderReadingLog);
elements.logTitleInput.addEventListener("input", fillAuthorFromCollection);
elements.startPageInput.addEventListener("input", suggestPagesRead);
elements.endPageInput.addEventListener("input", suggestPagesRead);
elements.startTimeInput.addEventListener("input", updateDurationPreview);
elements.endTimeInput.addEventListener("input", updateDurationPreview);
elements.replaceCoverInput.addEventListener("change", previewReplacementCover);
elements.passagePhotoInput.addEventListener("change", handlePagePhoto);
elements.passageTitleInput.addEventListener("input", fillPassageAuthor);
elements.passageSearchInput.addEventListener("input", renderPassages);
elements.passageBookFilter.addEventListener("change", renderPassages);
elements.profilePhotoInput.addEventListener("change", previewProfilePhoto);
document.querySelectorAll("[data-passage-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    setPassageMode(button.dataset.passageMode);
  });
});
document.querySelectorAll("[data-community-view]").forEach((button) => {
  button.addEventListener("click", () => {
    setCommunityView(button.dataset.communityView);
  });
});
elements.highlightCanvas.addEventListener("pointerdown", startHighlight);
elements.highlightCanvas.addEventListener("pointermove", moveHighlight);
elements.highlightCanvas.addEventListener("pointerup", endHighlight);
elements.highlightCanvas.addEventListener("pointercancel", endHighlight);

document.addEventListener("click", (event) => {
  if (
    openMenuId &&
    !event.target.closest(".book-card") &&
    !event.target.closest(".menu-button")
  ) {
    openMenuId = null;
    renderBooks();
  }
});

migrateAccountData();
initializeAuthentication();
