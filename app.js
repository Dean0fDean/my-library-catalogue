const STORAGE_KEY = "my-library-books-v1";
const LOG_STORAGE_KEY = "my-library-reading-log-v1";
const PASSAGE_STORAGE_KEY = "my-library-passages-v1";
const WISHLIST_STORAGE_KEY = "my-library-wishlist-v1";
const ACCOUNTS_STORAGE_KEY = "my-library-accounts-v1";
const CURRENT_ACCOUNT_KEY = "my-library-current-account-v1";
const FOLLOWS_STORAGE_KEY = "my-library-follows-v1";
const SHARES_STORAGE_KEY = "my-library-shares-v1";
const API_TOKEN_KEY = "my-library-api-token-v1";
const CREATIVE_WRITING_STORAGE_KEY = "my-library-creative-writing-v1";
const WORDHUB_STORAGE_KEY = "my-library-wordhub-v1";
const DREAMS_STORAGE_KEY = "my-library-dreams-v1";
const BREAK_REMINDER_DISMISSED_KEY = "my-library-break-reminder-dismissed";
const BREAK_REMINDER_DELAY = 25 * 60 * 1000;

const DREAM_ARCHETYPES = [
  { name: "The Self", group: "Central Jungian patterns", description: "Wholeness and the regulating centre of the psyche; often approached through mandalas, sacred centres, or unifying figures." },
  { name: "The Persona", group: "Central Jungian patterns", description: "The social mask or role presented to the world, including tensions between public identity and private experience." },
  { name: "The Shadow", group: "Central Jungian patterns", description: "Qualities the conscious personality rejects, hides, or has not yet recognised, including neglected strengths." },
  { name: "Anima", group: "Central Jungian patterns", description: "A mediating inner figure traditionally described by Jung as feminine, connecting consciousness with feeling and the unconscious." },
  { name: "Animus", group: "Central Jungian patterns", description: "A mediating inner figure traditionally described by Jung as masculine, connecting consciousness with meaning and conviction." },
  { name: "The Ego", group: "Central Jungian patterns", description: "The dreamer's familiar conscious identity, often represented by the viewpoint or central character in a dream." },
  { name: "The Mother", group: "Family and ancestral figures", description: "Nurture, origin, protection, containment, dependence, or an engulfing force; meaning depends on personal experience." },
  { name: "The Father", group: "Family and ancestral figures", description: "Authority, order, law, inheritance, protection, judgement, or the principles by which life is organised." },
  { name: "The Great Mother", group: "Family and ancestral figures", description: "The larger maternal pattern in its nourishing and terrible aspects: fertility, nature, shelter, devouring, and transformation." },
  { name: "The Ancestor", group: "Family and ancestral figures", description: "Inherited memory, tradition, family patterns, cultural roots, or unfinished relationships with the past." },
  { name: "The Divine Child", group: "Growth and development", description: "Vulnerability joined with future potential, renewal, new consciousness, and something small that may transform a life." },
  { name: "The Orphan", group: "Growth and development", description: "Abandonment, exile, lost belonging, self-reliance, or the search for a dependable inner and outer home." },
  { name: "Puer / Puella Aeternus", group: "Growth and development", description: "The eternal youth: imagination, possibility, spontaneity, and the difficulty of accepting limits or commitment." },
  { name: "The Senex", group: "Growth and development", description: "Age, discipline, structure, responsibility, and wisdom, with a negative pole of rigidity, sterility, or excessive control." },
  { name: "The Hero", group: "Journey and transformation", description: "The conscious personality confronting trials, separating from old dependencies, and seeking a larger way of being." },
  { name: "The Seeker / Wanderer", group: "Journey and transformation", description: "Restlessness, pilgrimage, exploration, and the search for identity, truth, vocation, or a missing part of life." },
  { name: "The Initiate", group: "Journey and transformation", description: "A person crossing into a new stage through testing, instruction, symbolic death, or acceptance into a community." },
  { name: "The Sacrificed One", group: "Journey and transformation", description: "Necessary surrender, costly change, scapegoating, or the release of an identity that can no longer continue." },
  { name: "Death and Rebirth", group: "Journey and transformation", description: "An archetypal process of ending, descent, dissolution, renewal, and the emergence of a changed personality." },
  { name: "The Wise Old Man", group: "Guides and mediators", description: "Meaning, counsel, insight, and spiritual or intellectual guidance, sometimes appearing when conscious resources are exhausted." },
  { name: "The Wise Old Woman", group: "Guides and mediators", description: "Embodied wisdom, intuition, healing knowledge, protection, or guidance rooted in nature, memory, and experience." },
  { name: "The Guide / Mentor", group: "Guides and mediators", description: "A teacher, helper, or orienting presence that offers a tool, instruction, warning, or direction." },
  { name: "The Psychopomp", group: "Guides and mediators", description: "A mediator between conscious and unconscious realms, often escorting the dreamer across boundaries or through descent." },
  { name: "The Healer / Wounded Healer", group: "Guides and mediators", description: "Restoration that arises through attending to wounds, limits, compassion, and knowledge earned through suffering." },
  { name: "The Trickster", group: "Disruptive figures", description: "Boundary-breaking instinct, humour, appetite, contradiction, deception, and creative disruption of a rigid attitude." },
  { name: "The Double / Twin", group: "Disruptive figures", description: "An alternative identity, unlived possibility, rivalry, hidden similarity, or a split within the personality." },
  { name: "The Adversary", group: "Disruptive figures", description: "Opposition, conflict, fear, or resistance that may guard something the dreamer needs to confront or integrate." },
  { name: "The Outcast", group: "Disruptive figures", description: "Excluded experience, shame, difference, social rejection, or a neglected part seeking recognition and belonging." },
  { name: "The Lover", group: "Relationship and creation", description: "Longing, union, attraction, devotion, beauty, and the urge to bridge separation within oneself or with another." },
  { name: "The Companion", group: "Relationship and creation", description: "Loyalty, mutual support, shared endeavour, and qualities that accompany the ego through difficult territory." },
  { name: "The Creator", group: "Relationship and creation", description: "The drive to give form to imagination through art, craft, work, parenthood, invention, or a new way of living." },
  { name: "The Magician / Transformer", group: "Relationship and creation", description: "Knowledge of hidden processes, transformation, altered perspective, and the power or danger of influencing change." },
  { name: "The Ruler", group: "Power and society", description: "Order, sovereignty, responsibility, control, leadership, and the question of who governs the inner or outer world." },
  { name: "The Warrior", group: "Power and society", description: "Courage, boundaries, disciplined action, aggression, defence, and the focused pursuit of a difficult aim." },
  { name: "The Rebel", group: "Power and society", description: "Resistance to authority, liberation from a dead system, protest, and the risk of defining oneself only through opposition." },
  { name: "The Judge", group: "Power and society", description: "Conscience, discernment, guilt, evaluation, fairness, condemnation, or an internal authority deciding what is acceptable." },
  { name: "The Animal", group: "Instinct and the more-than-human world", description: "Embodied instinct and species-specific qualities; the particular animal and the dreamer's associations are essential." },
  { name: "The Tree / World Tree", group: "Instinct and the more-than-human world", description: "Growth, rootedness, ancestry, vertical connection, seasonal change, and the organisation of a living whole." },
  { name: "The Mandala / Sacred Centre", group: "Instinct and the more-than-human world", description: "Images of centred wholeness, balance, enclosure, and psychic reorganisation, often appearing during disorientation." },
  { name: "The Threshold Guardian", group: "Instinct and the more-than-human world", description: "A figure or obstacle at a boundary, testing readiness before the dreamer enters unfamiliar psychic territory." },
];

const JUNG_CONCEPTS = [
  { name: "Analytical psychology", group: "Foundations", description: "Jung's school of psychology, emphasizing symbolic life, unconscious processes, psychological development, and movement toward a more integrated personality." },
  { name: "Psyche", group: "Foundations", description: "The whole field of psychological life, including conscious and unconscious processes rather than consciousness alone." },
  { name: "Ego", group: "Structure of the psyche", description: "The centre of conscious identity: the familiar sense of 'I' that organizes awareness but does not encompass the whole psyche." },
  { name: "Personal unconscious", group: "Structure of the psyche", description: "Forgotten, repressed, subliminal, or not-yet-conscious material arising from an individual's experience." },
  { name: "Collective unconscious", group: "Structure of the psyche", description: "Jung's hypothesis of a deeper, inherited layer of the psyche structured by universal predispositions called archetypes." },
  { name: "Archetype", group: "Structure of the psyche", description: "An underlying pattern that can generate many images and behaviours; it is not a fixed symbol with one dictionary meaning." },
  { name: "Archetypal image", group: "Structure of the psyche", description: "A culturally and personally shaped image through which an underlying archetypal pattern becomes perceptible." },
  { name: "Complex", group: "Structure of the psyche", description: "An emotionally charged cluster of memories, ideas, and reactions that can temporarily behave like a partial personality." },
  { name: "The Self", group: "Development", description: "The regulating archetype of psychic wholeness and the larger totality of conscious and unconscious life." },
  { name: "Individuation", group: "Development", description: "The lifelong process of becoming a more differentiated and integrated individual by engaging neglected parts of the psyche." },
  { name: "Integration", group: "Development", description: "Bringing previously unconscious attitudes or contents into a workable relationship with conscious life, without simply acting them out." },
  { name: "Differentiation", group: "Development", description: "Developing a psychological function or attitude so it can operate distinctly rather than remaining fused with other reactions." },
  { name: "Transcendent function", group: "Development", description: "A symbolic process through which tension between conscious and unconscious positions may produce a new, mediating standpoint." },
  { name: "Enantiodromia", group: "Development", description: "The tendency of an extreme one-sided position to produce or turn into its opposite over time." },
  { name: "Compensation", group: "Dreams and symbols", description: "The unconscious tendency to balance, correct, or supplement a one-sided conscious attitude, often through dreams." },
  { name: "Prospective function", group: "Dreams and symbols", description: "The possibility that a dream sketches emerging tendencies or future psychological development without literally predicting events." },
  { name: "Amplification", group: "Dreams and symbols", description: "Exploring a dream image through personal associations alongside parallels in myth, religion, art, folklore, and culture." },
  { name: "Active imagination", group: "Dreams and symbols", description: "Deliberate engagement with images, fantasies, or inner figures while awake, often through writing, art, movement, or dialogue." },
  { name: "Symbol", group: "Dreams and symbols", description: "An image or expression that points beyond what can be fully captured by a single rational definition." },
  { name: "Sign", group: "Dreams and symbols", description: "A conventional pointer to a known meaning; Jung warned against reducing living dream images to fixed signs." },
  { name: "Numinous", group: "Dreams and symbols", description: "An experience carrying an uncanny, sacred, fascinating, or overwhelming emotional charge." },
  { name: "Synchronicity", group: "Meaning and relationship", description: "Jung's proposed principle of meaningful coincidence between inner and outer events without a demonstrated causal connection." },
  { name: "Projection", group: "Meaning and relationship", description: "Unconsciously experiencing an aspect of one's own psyche as though it belonged primarily to another person or object." },
  { name: "Withdrawal of projection", group: "Meaning and relationship", description: "Recognizing and taking responsibility for qualities previously attributed to someone or something outside oneself." },
  { name: "Participation mystique", group: "Meaning and relationship", description: "Psychological identification in which the boundary between oneself and another person, group, or object is blurred." },
  { name: "Libido", group: "Psychic energy", description: "In Jung's broader usage, general psychic energy or motivational intensity rather than sexual energy alone." },
  { name: "Psychological type", group: "Psychological types", description: "A pattern of conscious orientation described through attitudes and functions; a map of preference, not a complete identity." },
  { name: "Introversion", group: "Psychological types", description: "An attitude that tends to orient energy toward subjective factors and the inner world." },
  { name: "Extraversion", group: "Psychological types", description: "An attitude that tends to orient energy toward people, objects, and circumstances in the outer world." },
  { name: "Thinking", group: "Psychological types", description: "A judging function that evaluates through concepts, logic, and connections between ideas." },
  { name: "Feeling", group: "Psychological types", description: "A judging function that evaluates worth, importance, acceptance, and rejection; it is not simply emotion." },
  { name: "Sensation", group: "Psychological types", description: "A perceiving function concerned with concrete sensory information and what is presently given." },
  { name: "Intuition", group: "Psychological types", description: "A perceiving function attentive to possibilities, patterns, origins, and likely developments beyond immediate sensory data." },
  { name: "Inferior function", group: "Psychological types", description: "The least differentiated conscious function, often carrying vulnerability, spontaneity, and a bridge toward unconscious material." },
  { name: "Persona", group: "Archetypal dynamics", description: "The adaptive social face or role through which a person meets collective expectations." },
  { name: "Shadow", group: "Archetypal dynamics", description: "Qualities excluded from the conscious self-image, including difficult traits and neglected capacities." },
  { name: "Anima and animus", group: "Archetypal dynamics", description: "Historically gendered inner figures; contemporary readers often approach them more flexibly as forms of otherness within the psyche." },
  { name: "Coniunctio", group: "Archetypal dynamics", description: "The symbolic union of opposites, drawn especially from alchemical imagery, suggesting a new relationship between divided psychic factors." },
];

const elements = {
  bookGrid: document.querySelector("#book-grid"),
  catalogueExpandButton: document.querySelector("#catalogue-expand-button"),
  emptyState: document.querySelector("#empty-state"),
  emptyTitle: document.querySelector("#empty-title"),
  emptyMessage: document.querySelector("#empty-message"),
  totalCount: document.querySelector("#total-count"),
  readCount: document.querySelector("#read-count"),
  readingCount: document.querySelector("#reading-count"),
  unreadCount: document.querySelector("#unread-count"),
  searchInput: document.querySelector("#search-input"),
  genreFilter: document.querySelector("#genre-filter"),
  statusFilter: document.querySelector("#status-filter"),
  dialog: document.querySelector("#book-dialog"),
  form: document.querySelector("#book-form"),
  titleInput: document.querySelector("#title-input"),
  bookDialogEyebrow: document.querySelector("#book-dialog-eyebrow"),
  bookDialogTitle: document.querySelector("#book-dialog-title"),
  bookSubmitButton: document.querySelector("#book-submit-button"),
  authorSuggestions: document.querySelector("#author-suggestions"),
  toast: document.querySelector("#toast"),
  logDialog: document.querySelector("#log-dialog"),
  logForm: document.querySelector("#log-form"),
  logTitleInput: document.querySelector("#log-title-input"),
  logAuthorInput: document.querySelector("#log-author-input"),
  pagesReadInput: document.querySelector("#pages-read-input"),
  startPageInput: document.querySelector("#start-page-input"),
  endPageInput: document.querySelector("#end-page-input"),
  continuePageInput: document.querySelector("#continue-page-input"),
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
  pagesSessionInsight: document.querySelector("#pages-session-insight"),
  topBookInsight: document.querySelector("#top-book-insight"),
  topBookDetail: document.querySelector("#top-book-detail"),
  activeDaysInsight: document.querySelector("#active-days-insight"),
  activeDaysDetail: document.querySelector("#active-days-detail"),
  projectedPagesInsight: document.querySelector("#projected-pages-insight"),
  readingDeepInsights: document.querySelector("#reading-deep-insights"),
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
  passageDialogTitle: document.querySelector("#passage-dialog-title"),
  passageSubmitButton: document.querySelector("#passage-submit-button"),
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
  journalGrid: document.querySelector("#journal-grid"),
  journalEmptyState: document.querySelector("#journal-empty-state"),
  journalDialog: document.querySelector("#journal-dialog"),
  journalForm: document.querySelector("#journal-form"),
  journalDateInput: document.querySelector("#journal-date-input"),
  journalBookOptions: document.querySelector("#journal-book-options"),
  journalReflectionInput: document.querySelector("#journal-reflection-input"),
  journalError: document.querySelector("#journal-error"),
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
  homeReaderName: document.querySelector("#home-reader-name"),
  menuToggle: document.querySelector("#menu-toggle"),
  featureMenu: document.querySelector("#feature-menu"),
  profilePhoto: document.querySelector("#profile-photo"),
  profilePlaceholder: document.querySelector("#profile-placeholder"),
  profileDialog: document.querySelector("#profile-dialog"),
  profileForm: document.querySelector("#profile-form"),
  profileUsernameInput: document.querySelector("#profile-username-input"),
  profilePhotoInput: document.querySelector("#profile-photo-input"),
  profilePreview: document.querySelector("#profile-preview"),
  profilePreviewImage: document.querySelector("#profile-preview-image"),
  profileError: document.querySelector("#profile-error"),
  profileInsightGrid: document.querySelector("#profile-insight-grid"),
  dreamProfileSymbolCount: document.querySelector("#dream-profile-symbol-count"),
  dreamProfileEntryCount: document.querySelector("#dream-profile-entry-count"),
  archetypeSearchInput: document.querySelector("#archetype-search-input"),
  archetypeReferenceList: document.querySelector("#archetype-reference-list"),
  archetypeReferenceEmpty: document.querySelector("#archetype-reference-empty"),
  jungConceptSearchInput: document.querySelector("#jung-concept-search-input"),
  jungConceptReferenceList: document.querySelector("#jung-concept-reference-list"),
  jungConceptReferenceEmpty: document.querySelector("#jung-concept-reference-empty"),
  dreamFactBanner: document.querySelector("#dream-fact-banner"),
  dreamFactText: document.querySelector("#dream-fact-text"),
  profileNotificationCount: document.querySelector("#profile-notification-count"),
  headerNotificationCount: document.querySelector("#header-notification-count"),
  notificationChimeButton: document.querySelector("#notification-chime-button"),
  notificationsPanel: document.querySelector("#notifications-panel"),
  profileNotificationList: document.querySelector("#profile-notification-list"),
  markNotificationsRead: document.querySelector("#mark-notifications-read"),
  profileAchievementGrid: document.querySelector("#profile-achievement-grid"),
  dreamList: document.querySelector("#dream-list"),
  dreamEmpty: document.querySelector("#dream-empty"),
  dreamDialog: document.querySelector("#dream-dialog"),
  dreamForm: document.querySelector("#dream-form"),
  dreamDialogTitle: document.querySelector("#dream-dialog-title"),
  dreamIdInput: document.querySelector("#dream-id-input"),
  dreamTitleInput: document.querySelector("#dream-title-input"),
  dreamDateInput: document.querySelector("#dream-date-input"),
  dreamTimeInput: document.querySelector("#dream-time-input"),
  dreamTextInput: document.querySelector("#dream-text-input"),
  dreamRelatedOptions: document.querySelector("#dream-related-options"),
  dreamAnalysisDialog: document.querySelector("#dream-analysis-dialog"),
  dreamAnalysisForm: document.querySelector("#dream-analysis-form"),
  dreamAnalysisId: document.querySelector("#dream-analysis-id"),
  dreamAnalysisSummary: document.querySelector("#dream-analysis-summary"),
  printSheet: document.querySelector("#print-sheet"),
  storyList: document.querySelector("#story-list"),
  storyCount: document.querySelector("#story-count"),
  storyEmpty: document.querySelector("#story-empty"),
  storyEditor: document.querySelector("#story-editor"),
  storyEditorEmpty: document.querySelector("#story-editor-empty"),
  storyIdInput: document.querySelector("#story-id-input"),
  storyTitleInput: document.querySelector("#story-title-input"),
  storyGenreInput: document.querySelector("#story-genre-input"),
  storyPovInput: document.querySelector("#story-pov-input"),
  storyPremiseInput: document.querySelector("#story-premise-input"),
  storyCharactersInput: document.querySelector("#story-characters-input"),
  storySettingInput: document.querySelector("#story-setting-input"),
  storyOutlineInput: document.querySelector("#story-outline-input"),
  storyDraftInput: document.querySelector("#story-draft-input"),
  storyPlanView: document.querySelector("#story-plan-view"),
  storyDraftView: document.querySelector("#story-draft-view"),
  storyWordCount: document.querySelector("#story-word-count"),
  storySaveStatus: document.querySelector("#story-save-status"),
  wordhubForm: document.querySelector("#wordhub-form"),
  wordhubIdInput: document.querySelector("#wordhub-id-input"),
  wordhubFormTitle: document.querySelector("#wordhub-form-title"),
  wordhubCancelEdit: document.querySelector("#wordhub-cancel-edit"),
  wordhubWordInput: document.querySelector("#wordhub-word-input"),
  wordhubMeaningInput: document.querySelector("#wordhub-meaning-input"),
  wordhubLookupButton: document.querySelector("#wordhub-lookup-button"),
  wordhubLookupStatus: document.querySelector("#wordhub-lookup-status"),
  wordhubBookInput: document.querySelector("#wordhub-book-input"),
  wordhubPageInput: document.querySelector("#wordhub-page-input"),
  wordhubSentenceInput: document.querySelector("#wordhub-sentence-input"),
  wordhubSearchInput: document.querySelector("#wordhub-search-input"),
  wordhubList: document.querySelector("#wordhub-list"),
  wordhubEmpty: document.querySelector("#wordhub-empty"),
  wordhubCount: document.querySelector("#wordhub-count"),
  profileRunesCount: document.querySelector("#profile-runes-count"),
  profileStreakCount: document.querySelector("#profile-streak-count"),
  profileStreakBest: document.querySelector("#profile-streak-best"),
  learningRunesCount: document.querySelector("#learning-runes-count"),
  learningStreakCount: document.querySelector("#learning-streak-count"),
  streakRewardDialog: document.querySelector("#streak-reward-dialog"),
  streakRewardCount: document.querySelector("#streak-reward-count"),
  breakReminderDialog: document.querySelector("#break-reminder-dialog"),
  learningTaskGrid: document.querySelector("#learning-task-grid"),
  chippingsRunesCount: document.querySelector("#chippings-runes-count"),
  chippingsGrid: document.querySelector("#chippings-grid"),
  chippingsEmpty: document.querySelector("#chippings-empty"),
  readerGrid: document.querySelector("#reader-grid"),
  readerEmptyState: document.querySelector("#reader-empty-state"),
  shareFeed: document.querySelector("#share-feed"),
  shareEmptyState: document.querySelector("#share-empty-state"),
  recommendationUnreadCount: document.querySelector("#recommendation-unread-count"),
  adminAccountList: document.querySelector("#admin-account-list"),
  adminFactForm: document.querySelector("#admin-fact-form"),
  adminFactInput: document.querySelector("#admin-fact-input"),
  adminFactError: document.querySelector("#admin-fact-error"),
  adminFactList: document.querySelector("#admin-fact-list"),
  adminDreamFactForm: document.querySelector("#admin-dream-fact-form"),
  adminDreamFactInput: document.querySelector("#admin-dream-fact-input"),
  adminDreamFactError: document.querySelector("#admin-dream-fact-error"),
  adminDreamFactList: document.querySelector("#admin-dream-fact-list"),
  adminQuandaryList: document.querySelector("#admin-quandary-list"),
  adminQuandaryEmpty: document.querySelector("#admin-quandary-empty"),
  readingFactBanner: document.querySelector("#reading-fact-banner"),
  readingFactText: document.querySelector("#reading-fact-text"),
  dismissReadingFact: document.querySelector("#dismiss-reading-fact"),
  coverViewDialog: document.querySelector("#cover-view-dialog"),
  coverViewImage: document.querySelector("#cover-view-image"),
  coverViewTitle: document.querySelector("#cover-view-title"),
  coverViewAuthor: document.querySelector("#cover-view-author"),
  readerProfileDialog: document.querySelector("#reader-profile-dialog"),
  readerProfileName: document.querySelector("#reader-profile-name"),
  readerProfileAvatar: document.querySelector("#reader-profile-avatar"),
  readerProfileStats: document.querySelector("#reader-profile-stats"),
  readerCatalogueCount: document.querySelector("#reader-catalogue-count"),
  readerCatalogueSearch: document.querySelector("#reader-catalogue-search"),
  readerCatalogueStatus: document.querySelector("#reader-catalogue-status"),
  readerProfileBookList: document.querySelector("#reader-profile-book-list"),
  readerCatalogueExpandButton: document.querySelector(
    "#reader-catalogue-expand-button",
  ),
  openReaderChallenge: document.querySelector("#open-reader-challenge"),
  readingChallengeDialog: document.querySelector("#reading-challenge-dialog"),
  readingChallengeForm: document.querySelector("#reading-challenge-form"),
  readingChallengeInviteeId: document.querySelector("#reading-challenge-invitee-id"),
  readingChallengeSummary: document.querySelector("#reading-challenge-summary"),
  readingChallengeDeadline: document.querySelector("#reading-challenge-deadline"),
  readingChallengeError: document.querySelector("#reading-challenge-error"),
  shareDialog: document.querySelector("#share-dialog"),
  shareForm: document.querySelector("#share-form"),
  shareKindInput: document.querySelector("#share-kind-input"),
  shareItemIdInput: document.querySelector("#share-item-id-input"),
  shareItemSummary: document.querySelector("#share-item-summary"),
  shareRecipientInput: document.querySelector("#share-recipient-input"),
  shareError: document.querySelector("#share-error"),
  recommendationEditDialog: document.querySelector("#recommendation-edit-dialog"),
  recommendationEditForm: document.querySelector("#recommendation-edit-form"),
  recommendationEditId: document.querySelector("#recommendation-edit-id"),
  recommendationEditTitle: document.querySelector("#recommendation-edit-title"),
  recommendationEditAuthor: document.querySelector("#recommendation-edit-author"),
  recommendationEditMessage: document.querySelector("#recommendation-edit-message"),
  recommendationEditError: document.querySelector("#recommendation-edit-error"),
  communityReadersView: document.querySelector("#community-readers-view"),
  communityFollowersView: document.querySelector("#community-followers-view"),
  communityFollowingView: document.querySelector("#community-following-view"),
  followerGrid: document.querySelector("#follower-grid"),
  followingGrid: document.querySelector("#following-grid"),
  followerEmptyState: document.querySelector("#follower-empty-state"),
  followingEmptyState: document.querySelector("#following-empty-state"),
  followersTabCount: document.querySelector("#followers-tab-count"),
  followingTabCount: document.querySelector("#following-tab-count"),
  communityFeedView: document.querySelector("#community-feed-view"),
  communityJournalsView: document.querySelector("#community-journals-view"),
  communityJournalFeed: document.querySelector("#community-journal-feed"),
  communityJournalEmpty: document.querySelector("#community-journal-empty"),
  communityMarketplaceView: document.querySelector(
    "#community-marketplace-view",
  ),
  communityDebatesView: document.querySelector("#community-debates-view"),
  communityChallengesView: document.querySelector("#community-challenges-view"),
  challengeList: document.querySelector("#challenge-list"),
  challengeEmpty: document.querySelector("#challenge-empty"),
  debateList: document.querySelector("#debate-list"),
  debateEmpty: document.querySelector("#debate-empty"),
  debateInviteDialog: document.querySelector("#debate-invite-dialog"),
  debateInviteForm: document.querySelector("#debate-invite-form"),
  debateInviteeId: document.querySelector("#debate-invitee-id"),
  debateInviteeSummary: document.querySelector("#debate-invitee-summary"),
  debateInviteError: document.querySelector("#debate-invite-error"),
  quandaryDialog: document.querySelector("#quandary-dialog"),
  quandaryForm: document.querySelector("#quandary-form"),
  quandaryError: document.querySelector("#quandary-error"),
  communityBulletinView: document.querySelector("#community-bulletin-view"),
  announcementForm: document.querySelector("#announcement-form"),
  announcementError: document.querySelector("#announcement-error"),
  announcementList: document.querySelector("#announcement-list"),
  announcementEmpty: document.querySelector("#announcement-empty"),
  marketplaceGrid: document.querySelector("#marketplace-grid"),
  marketplaceEmpty: document.querySelector("#marketplace-empty"),
  marketListingDialog: document.querySelector("#market-listing-dialog"),
  marketListingForm: document.querySelector("#market-listing-form"),
  marketBookIdInput: document.querySelector("#market-book-id-input"),
  marketBookSummary: document.querySelector("#market-book-summary"),
  marketPriceInput: document.querySelector("#market-price-input"),
  marketListingError: document.querySelector("#market-listing-error"),
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
let journals = [];
let sharedJournals = [];
let readingFacts = [];
let dreamFacts = [];
let marketplaceListings = [];
let learningTasks = [];
let debates = [];
let readingChallenges = [];
let announcements = [];
let quandaries = [];
let creativeWriting = loadArray(CREATIVE_WRITING_STORAGE_KEY);
let wordhub = loadArray(WORDHUB_STORAGE_KEY);
let dreams = loadArray(DREAMS_STORAGE_KEY);
let storeItems = [];
let equippedTheme = "";
let equippedFrame = "";
let storeView = "all";
let runesBalance = 0;
let streakCurrent = 0;
let streakLongest = 0;
let dailyStreakRewardEarned = false;
let readingFactIndex = 0;
let readingFactTimer;
let dreamFactIndex = 0;
let dreamFactTimer;
let notificationPollTimer;
let breakReminderTimer;
let knownNotificationIds = new Set();
let notificationBaselineReady = false;
let audioContext;
let openMenuId = null;
let activeCoverBookId = null;
let activeEditingBookId = null;
let pendingCoverImage = "";
let passageMode = "photo";
let activePassageId = null;
let pageImage = null;
let highlightRect = null;
let highlightStart = null;
let isHighlighting = false;
let currentAccount = null;
let pendingProfileImage = "";
let toastTimer;
let statsSyncTimer;
let dataSyncTimer;
let storySaveTimer;
let isApplyingCloudData = false;
let apiToken = localStorage.getItem(API_TOKEN_KEY) || "";
let activeReaderCatalogue = [];
let activeReaderId = "";
let profileNotifications = [];
let profileAchievements = [];
let catalogueExpanded = false;
let readerCatalogueExpanded = false;
const CATALOGUE_PREVIEW_LIMIT = 8;

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
  [books, readingLog, passages, wishlist, creativeWriting, wordhub, dreams].forEach((items) => {
    items.forEach((item) => {
      if (item.ownerId === localAccount.id) item.ownerId = onlineAccount.id;
    });
  });
  saveBooks();
  saveReadingLog();
  savePassages();
  saveWishlist();
  saveCreativeWriting();
  saveWordhub();
  saveDreams();
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

function saveCreativeWriting() {
  const saved = saveCollection(CREATIVE_WRITING_STORAGE_KEY, creativeWriting);
  if (saved) scheduleDataSync();
  return saved;
}

function saveWordhub() {
  const saved = saveCollection(WORDHUB_STORAGE_KEY, wordhub);
  if (saved) scheduleDataSync();
  return saved;
}

function saveDreams() {
  const saved = saveCollection(DREAMS_STORAGE_KEY, dreams);
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
  const reading = accountBooks.filter(
    (book) => book.status === "reading",
  ).length;
  return {
    total: accountBooks.length,
    read,
    reading,
    unread: accountBooks.length - read - reading,
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
    [books, readingLog, passages, wishlist, creativeWriting, wordhub, dreams].forEach((items) => {
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
  let creativeWritingChanged = false;
  let wordhubChanged = false;
  let dreamsChanged = false;
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
  creativeWriting.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      creativeWritingChanged = true;
    }
  });
  wordhub.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      wordhubChanged = true;
    }
  });
  dreams.forEach((item) => {
    if (!item.ownerId) {
      item.ownerId = admin.id;
      dreamsChanged = true;
    }
  });
  if (changedAccounts) saveAccounts();
  if (booksChanged) saveBooks();
  if (logsChanged) saveReadingLog();
  if (passagesChanged) savePassages();
  if (wishlistChanged) saveWishlist();
  if (creativeWritingChanged) saveCreativeWriting();
  if (wordhubChanged) saveWordhub();
  if (dreamsChanged) saveDreams();
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
  elements.homeReaderName.textContent = currentAccount.username;
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
  renderProfileInsights();
  renderProfileActivity();
  elements.profileRunesCount.textContent = runesBalance;
  elements.profileStreakCount.textContent = streakCurrent;
  elements.profileStreakBest.textContent = streakLongest
    ? `(best: ${streakLongest})`
    : "";
  elements.profilePhoto.closest(".profile-photo-wrap").dataset.frame =
    equippedFrame;
}

function setFeatureMenu(open) {
  elements.featureMenu.hidden = !open;
  elements.menuToggle.setAttribute("aria-expanded", String(open));
  elements.menuToggle.classList.toggle("open", open);
  document.body.classList.toggle("feature-menu-open", open);
}

function closeFeatureMenu() {
  setFeatureMenu(false);
}

function readingSnapshot() {
  const accountBooks = ownedByCurrent(books);
  const accountLog = ownedByCurrent(readingLog);
  return {
    ownedBooks: accountBooks.length,
    readBooks: accountBooks.filter((book) => book.status === "read").length,
    passages: ownedByCurrent(passages).length,
    sessions: accountLog.length,
    pages: accountLog.reduce((total, entry) => total + (Number(entry.pagesRead) || 0), 0),
    minutes: accountLog.reduce((total, entry) => total + (Number(entry.durationMinutes) || 0), 0),
    journals: journals.length,
    dreams: ownedByCurrent(dreams).length,
  };
}

function listedDreamSymbols(value) {
  return String(value || "")
    .replace(/[•·]/g, ",")
    .split(/[,;\n|]+/)
    .map((symbol) => symbol.trim())
    .filter(Boolean);
}

function estimatedDreamSymbolCount() {
  return ownedByCurrent(dreams).reduce(
    (total, dream) => total + listedDreamSymbols(dream.symbols).length,
    0,
  );
}

function renderProfileInsights() {
  if (!currentAccount) return;
  const snapshot = readingSnapshot();
  const averagePages = snapshot.sessions
    ? Math.round(snapshot.pages / snapshot.sessions)
    : 0;
  elements.profileInsightGrid.innerHTML = `
    <div><strong>${snapshot.readBooks}</strong><span>Books finished</span></div>
    <div><strong>${snapshot.dreams}</strong><span>Dreams recorded</span></div>
    <div><strong>${snapshot.pages}</strong><span>Pages logged</span></div>
    <div><strong>${formatDuration(snapshot.minutes)}</strong><span>Reading time</span></div>
    <div><strong>${averagePages}</strong><span>Pages per session</span></div>
  `;
  elements.dreamProfileSymbolCount.textContent = estimatedDreamSymbolCount();
  elements.dreamProfileEntryCount.textContent = snapshot.dreams;
}

function notificationIcon(type) {
  return {
    achievement: "A",
    follow: "+",
    recommendation: "R",
    passage: "\"",
    journal: "J",
    marketplace: "$",
    learning: "R",
    debate: "D",
    challenge: "C",
    announcement: "!",
    streak: "S",
    quandary: "?",
    store: "C",
    insight: "i",
  }[type] || "i";
}

function renderProfileActivity() {
  if (!currentAccount) return;
  const unread = profileNotifications.filter((item) => !item.readAt).length;
  elements.profileNotificationCount.textContent = unread ? `(${unread})` : "";
  elements.headerNotificationCount.textContent = unread;
  elements.headerNotificationCount.hidden = unread === 0;
  elements.notificationChimeButton.classList.toggle("has-unread", unread > 0);
  elements.notificationChimeButton.setAttribute(
    "aria-label",
    unread
      ? `Open notifications, ${unread} unread`
      : "Open notifications",
  );
  elements.markNotificationsRead.hidden = unread === 0;
  elements.profileNotificationList.innerHTML = profileNotifications.length
    ? profileNotifications
        .map(
          (item) => `
            <article class="profile-notification ${item.readAt ? "" : "unread"}">
              <span class="profile-notification-icon">${notificationIcon(item.type)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <p>${escapeHtml(item.message)}</p>
                <time>${new Date(item.createdAt).toLocaleString()}</time>
              </div>
              ${
                item.readAt
                  ? ""
                  : `<button type="button" data-notification-id="${item.id}">Mark read</button>`
              }
            </article>
          `,
        )
        .join("")
    : '<p class="profile-panel-empty">No notifications yet.</p>';
  elements.profileAchievementGrid.innerHTML = profileAchievements.length
    ? profileAchievements
        .map(
          (item) => `
            <article class="profile-achievement">
              <span class="achievement-medal">A</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.description)}</p>
              <time>${new Date(item.unlockedAt).toLocaleDateString()}</time>
            </article>
          `,
        )
        .join("")
    : '<p class="profile-panel-empty">Your reading milestones will appear here.</p>';
}

async function refreshProfileActivity() {
  if (!currentAccount || !apiToken) return;
  const snapshot = readingSnapshot();
  await apiRequest("activity-snapshot", {
    method: "POST",
    body: snapshot,
  });
  const data = await apiRequest("profile-activity");
  const nextNotifications = data.notifications || [];
  const newlyReceived = notificationBaselineReady
    ? nextNotifications.filter(
        (item) => !item.readAt && !knownNotificationIds.has(item.id),
      )
    : [];
  profileNotifications = nextNotifications;
  profileAchievements = data.achievements || [];
  knownNotificationIds = new Set(nextNotifications.map((item) => item.id));
  if (notificationBaselineReady && newlyReceived.length) {
    playNotificationChime();
  }
  notificationBaselineReady = true;
  renderProfileInsights();
  renderProfileActivity();
}

async function markNotificationsRead(notificationId = "") {
  try {
    await apiRequest("notification-read", {
      method: "POST",
      body: notificationId ? { notificationId } : { all: true },
    });
    await refreshProfileActivity();
  } catch (error) {
    showToast(error.message);
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
      body: {
        owned: stats.total,
        read: stats.read,
        reading: stats.reading,
        unread: stats.unread,
        recentBooks,
      },
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

async function saveCloudBookCover(book) {
  if (!book?.coverImage || !apiToken) return;
  await apiRequest("cover-save", {
    method: "POST",
    body: { bookId: book.id, image: book.coverImage },
  });
}

async function loadCloudBookCovers() {
  if (!currentAccount || !apiToken) return;
  const index = await apiRequest("cover-index");
  const bookIds = new Set(index.bookIds || []);
  await Promise.all(
    booksFor(currentAccount.id)
      .filter((book) => bookIds.has(book.id))
      .map(async (book) => {
        const result = await apiRequest("cover-load", {
          method: "POST",
          body: { bookId: book.id },
        });
        if (result.image) book.coverImage = result.image;
      }),
  );
  saveCollection(STORAGE_KEY, books);
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
    creativeWriting: creativeWriting
      .filter((item) => item.ownerId === accountId)
      .map(cloudSafeItem),
    wordhub: wordhub
      .filter((item) => item.ownerId === accountId)
      .map(cloudSafeItem),
    dreams: dreams
      .filter((item) => item.ownerId === accountId)
      .map(cloudSafeItem),
  };
}

function hasCloudData(data) {
  return [
    "books",
    "readingLog",
    "passages",
    "wishlist",
    "creativeWriting",
    "wordhub",
    "dreams",
  ].some(
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

function mergeVersionedItems(localItems, incomingItems) {
  const merged = new Map();
  [...localItems, ...incomingItems].forEach((item) => {
    if (!item?.id) return;
    const previous = merged.get(item.id);
    const previousTime =
      Date.parse(previous?.updatedAt || previous?.createdAt || 0) || 0;
    const nextTime = Date.parse(item.updatedAt || item.createdAt || 0) || 0;
    if (!previous || nextTime >= previousTime) merged.set(item.id, item);
  });
  return [...merged.values()];
}

async function loadAccountData() {
  if (!currentAccount || !apiToken) return;
  const cloud = await apiRequest("data");
  const local = cloudDataFor(currentAccount.id);
  if (!hasCloudData(cloud) && hasCloudData(local)) {
    await syncAccountData();
    await Promise.all(
      booksFor(currentAccount.id).map((book) =>
        saveCloudBookCover(book).catch(() => {}),
      ),
    );
    return;
  }
  if (!hasCloudData(cloud)) return;
  const localCovers = new Map(
    booksFor(currentAccount.id)
      .filter((book) => book.coverImage)
      .map((book) => [book.id, book.coverImage]),
  );
  isApplyingCloudData = true;
  books = replaceAccountItems(
    books,
    currentAccount.id,
    (cloud.books || []).map((book) => ({
      ...book,
      coverImage: book.coverImage || localCovers.get(book.id) || "",
    })),
  );
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
  creativeWriting = replaceAccountItems(
    creativeWriting,
    currentAccount.id,
    cloud.creativeWriting || [],
  );
  wordhub = replaceAccountItems(
    wordhub,
    currentAccount.id,
    cloud.wordhub || [],
  );
  dreams = replaceAccountItems(
    dreams,
    currentAccount.id,
    mergeVersionedItems(
      ownedByCurrent(dreams),
      (cloud.dreams || []).map((dream) => ({
        ...dream,
        ownerId: currentAccount.id,
      })),
    ),
  );
  saveCollection(STORAGE_KEY, books);
  saveCollection(LOG_STORAGE_KEY, readingLog);
  saveCollection(PASSAGE_STORAGE_KEY, passages);
  saveCollection(WISHLIST_STORAGE_KEY, wishlist);
  saveCollection(CREATIVE_WRITING_STORAGE_KEY, creativeWriting);
  saveCollection(WORDHUB_STORAGE_KEY, wordhub);
  saveCollection(DREAMS_STORAGE_KEY, dreams);
  isApplyingCloudData = false;
  await syncAccountData();
  await Promise.all(
    booksFor(currentAccount.id)
      .filter((book) => localCovers.has(book.id))
      .map((book) => saveCloudBookCover(book).catch(() => {})),
  );
  await loadCloudBookCovers().catch(() => {});
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
  sharedJournals = data.journals || [];
}

async function loadJournals() {
  if (!apiToken) return;
  const data = await apiRequest("journals");
  journals = data.journals || [];
}

async function loadReadingFacts() {
  if (!apiToken) return;
  const data = await apiRequest("facts");
  readingFacts = data.facts || [];
  renderReadingFact();
  renderAdminFacts();
}

async function loadDreamFacts() {
  if (!apiToken) return;
  const data = await apiRequest("dream-facts");
  dreamFacts = data.facts || [];
  renderDreamFact();
  renderAdminDreamFacts();
}

async function loadMarketplace() {
  if (!apiToken) return;
  const data = await apiRequest("marketplace");
  marketplaceListings = data.listings || [];
}

async function loadLearningNook() {
  if (!apiToken) return;
  const data = await apiRequest("learning");
  learningTasks = data.tasks || [];
  runesBalance = Number(data.runes) || 0;
  streakCurrent = Number(data.streak?.current) || 0;
  streakLongest = Number(data.streak?.longest) || 0;
  dailyStreakRewardEarned = Boolean(data.streak?.earnedDailyReward);
  renderLearningNook();
  elements.profileRunesCount.textContent = runesBalance;
  elements.profileStreakCount.textContent = streakCurrent;
  elements.profileStreakBest.textContent = streakLongest
    ? `(best: ${streakLongest})`
    : "";
  if (storeItems.length) renderChippings();
}

async function loadChippings() {
  if (!apiToken) return;
  const data = await apiRequest("store");
  storeItems = data.items || [];
  runesBalance = Number(data.balance) || 0;
  equippedTheme = data.equipped?.theme || "";
  equippedFrame = data.equipped?.frame || "";
  applyEquippedCosmetics();
  renderChippings();
}

async function loadSocialSpaces() {
  if (!apiToken) return;
  const [debateData, challengeData, announcementData, quandaryData] = await Promise.all([
    apiRequest("debates"),
    apiRequest("reading-challenges"),
    apiRequest("announcements"),
    apiRequest("quandaries"),
  ]);
  debates = debateData.debates || [];
  readingChallenges = challengeData.challenges || [];
  announcements = announcementData.announcements || [];
  quandaries = quandaryData.quandaries || [];
}

async function refreshCommunity() {
  try {
    await syncCommunityStats();
    await Promise.all([loadCommunity(), loadSocialSpaces()]);
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
    await loadJournals();
    await loadReadingFacts();
    await loadDreamFacts();
    await loadMarketplace();
    await loadLearningNook();
    await loadChippings();
    await loadSocialSpaces();
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
  renderJournals();
  renderStories();
  renderWordhub();
  renderDreams();
  renderCommunity();
  if (dailyStreakRewardEarned) {
    showDailyStreakReward();
  }
  await refreshCommunity();
  await refreshProfileActivity().catch((error) => showToast(error.message));
  window.clearInterval(notificationPollTimer);
  notificationPollTimer = window.setInterval(() => {
    refreshProfileActivity().catch(() => {});
  }, 30_000);
  scheduleBreakReminder();
}

function showLoginScreen() {
  window.clearInterval(notificationPollTimer);
  window.clearInterval(dreamFactTimer);
  window.clearTimeout(breakReminderTimer);
  notificationBaselineReady = false;
  knownNotificationIds = new Set();
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

  return ownedByCurrent(books)
    .filter((book) => {
      const matchesQuery =
        !query ||
        normalize(book.title).includes(query) ||
        normalize(book.author).includes(query);
      const matchesGenre = genre === "all" || book.genre === genre;
      const matchesStatus = status === "all" || book.status === status;
      return matchesQuery && matchesGenre && matchesStatus;
    })
    .sort(
      (first, second) =>
        first.title.localeCompare(second.title, undefined, {
          sensitivity: "base",
        }) ||
        first.author.localeCompare(second.author, undefined, {
          sensitivity: "base",
        }),
    );
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

function updateAuthorSuggestions() {
  const authors = [
    ...new Set(
      ownedByCurrent(books)
        .map((book) => book.author?.trim())
        .filter(Boolean),
    ),
  ].sort((first, second) =>
    first.localeCompare(second, undefined, { sensitivity: "base" }),
  );
  elements.authorSuggestions.innerHTML = authors
    .map((author) => `<option value="${escapeHtml(author)}"></option>`)
    .join("");
}

function updateStats() {
  const accountBooks = ownedByCurrent(books);
  const readBooks = accountBooks.filter((book) => book.status === "read").length;
  const readingBooks = accountBooks.filter(
    (book) => book.status === "reading",
  ).length;
  elements.totalCount.textContent = accountBooks.length;
  elements.readCount.textContent = readBooks;
  elements.readingCount.textContent = readingBooks;
  elements.unreadCount.textContent =
    accountBooks.length - readBooks - readingBooks;
}

function bookFormatLabel(format) {
  return {
    ebook: "E-book",
    audiobook: "Audiobook",
    print: "Printed book",
  }[format] || "Printed book";
}

function renderBook(book) {
  const menuIsOpen = openMenuId === book.id;
  const rating = Number(book.rating) || 0;
  const cover = book.coverImage
    ? `<img src="${book.coverImage}" alt="The user's copy of ${escapeHtml(book.title)}" />`
    : `<div class="book-cover-placeholder" aria-hidden="true">${escapeHtml(book.title.charAt(0).toUpperCase())}</div>`;
  return `
    <article class="book-card" data-book-id="${book.id}" style="--card-accent: ${colorForGenre(book.genre)}">
      <div class="book-cover" title="${book.coverImage ? "View full picture" : "No picture added"}">${cover}</div>
      <div class="book-card-top">
        <div class="book-card-labels">
          <p class="genre-label">${escapeHtml(book.genre)}</p>
          <span class="book-format-badge ${escapeHtml(book.format || "print")}">${escapeHtml(bookFormatLabel(book.format))}</span>
        </div>
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
              <button type="button" data-action="edit" data-id="${book.id}">
                Edit details
              </button>
              <button type="button" data-action="sell" data-id="${book.id}">
                List for sale
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
      <div class="book-status-options" role="group" aria-label="Reading status for ${escapeHtml(book.title)}">
        ${[
          ["unread", "To be read"],
          ["reading", "Busy reading"],
          ["read", "Read"],
        ]
          .map(
            ([status, label]) => `
              <button
                class="status-button ${status} ${book.status === status ? "active" : ""}"
                type="button"
                data-action="status"
                data-status="${status}"
                data-id="${book.id}"
                aria-pressed="${book.status === status}"
              >${label}</button>
            `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderBooks() {
  updateGenreOptions();
  updateAuthorSuggestions();
  updateStats();
  updateBookSuggestions();

  const matchingBooks = filteredBooks();
  const visibleBooks = catalogueExpanded
    ? matchingBooks
    : matchingBooks.slice(0, CATALOGUE_PREVIEW_LIMIT);
  elements.bookGrid.innerHTML = visibleBooks.map(renderBook).join("");
  elements.catalogueExpandButton.hidden =
    matchingBooks.length <= CATALOGUE_PREVIEW_LIMIT;
  elements.catalogueExpandButton.textContent = catalogueExpanded
    ? "Show fewer books"
    : `Show all ${matchingBooks.length} books`;
  const hasBooks = ownedByCurrent(books).length > 0;
  const hasResults = matchingBooks.length > 0;
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

function showDailyStreakReward() {
  elements.streakRewardCount.textContent = streakCurrent;
  elements.streakRewardDialog.showModal();
  dailyStreakRewardEarned = false;
}

function scheduleBreakReminder(delay = BREAK_REMINDER_DELAY) {
  window.clearTimeout(breakReminderTimer);
  if (
    !currentAccount ||
    sessionStorage.getItem(BREAK_REMINDER_DISMISSED_KEY)
  ) {
    return;
  }
  breakReminderTimer = window.setTimeout(showBreakReminder, delay);
}

function showBreakReminder() {
  if (
    !currentAccount ||
    sessionStorage.getItem(BREAK_REMINDER_DISMISSED_KEY)
  ) {
    return;
  }
  if (document.querySelector("dialog[open]")) {
    scheduleBreakReminder(2 * 60 * 1000);
    return;
  }
  elements.breakReminderDialog.showModal();
}

function dismissBreakReminder() {
  sessionStorage.setItem(BREAK_REMINDER_DISMISSED_KEY, "1");
  window.clearTimeout(breakReminderTimer);
  elements.breakReminderDialog.close();
}

function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioContext = new AudioContextClass();
  }
  if (audioContext?.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
}

function playNotificationChime() {
  ensureAudioContext();
  if (!audioContext || audioContext.state !== "running") return;
  const now = audioContext.currentTime;
  [
    { frequency: 659.25, start: 0, duration: 0.22 },
    { frequency: 880, start: 0.16, duration: 0.34 },
  ].forEach(({ frequency, start, duration }) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(0.09, now + start + 0.025);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + start + duration,
    );
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now + start);
    oscillator.stop(now + start + duration + 0.03);
  });
}

function renderLearningNook() {
  elements.learningRunesCount.textContent = runesBalance;
  elements.learningStreakCount.textContent = streakCurrent;
  elements.learningTaskGrid.innerHTML = learningTasks
    .map(
      (task) => `
        <article class="learning-task ${task.completed ? "completed" : ""}">
          <div class="learning-task-heading">
            ${owlIconMarkup("owl-seal")}
            <div>
              <p>${task.type === "choice" ? "LANGUAGE INQUIRY" : "WRITING ASSIGNMENT"}</p>
              <h3>${escapeHtml(task.title)}</h3>
            </div>
            <strong>+${task.runes} Runes</strong>
          </div>
          <p class="learning-prompt">${escapeHtml(task.prompt)}</p>
          ${
            task.type === "choice"
                ? `<form class="learning-choice-form" data-task-key="${task.key}">
                    ${task.options
                      .map(
                        (option, index) => `
                          <label>
                            <input type="radio" name="answer" value="${index}" required />
                            <span>${escapeHtml(option)}</span>
                          </label>
                        `,
                      )
                      .join("")}
                    <p class="learning-task-error" role="alert"></p>
                    <button type="submit">Submit answer</button>
                  </form>`
                : `<form class="learning-writing-form" data-task-key="${task.key}">
                    <textarea
                      name="response"
                      rows="7"
                      maxlength="5000"
                      minlength="${task.minimumLength}"
                      placeholder="Write your response here..."
                      required
                    ></textarea>
                    <small>Minimum ${task.minimumLength} characters</small>
                    <p class="learning-task-error" role="alert"></p>
                    <button type="submit">Complete assignment</button>
                  </form>`
          }
        </article>
      `,
    )
    .join("");
}

function owlIconMarkup(className = "") {
  return `
    <svg class="owl-icon ${className}" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 21 9 8l18 9a24 24 0 0 1 10 0L55 8l-5 13a23 23 0 1 1-36 0Z"></path>
      <circle cx="23" cy="30" r="7"></circle>
      <circle cx="41" cy="30" r="7"></circle>
      <path d="m28 39 4 5 4-5M20 52h24"></path>
    </svg>
  `;
}

async function completeLearningTask(form) {
  const formData = new FormData(form);
  const errorElement = form.querySelector(".learning-task-error");
  errorElement.textContent = "";
  try {
    const data = await apiRequest("learning-complete", {
      method: "POST",
      body: {
        taskKey: form.dataset.taskKey,
        answer: formData.get("answer"),
        response: formData.get("response"),
      },
    });
    await Promise.all([loadLearningNook(), refreshProfileActivity()]);
    showToast(`The Parliament of Owls awarded ${data.runesAwarded} Runes.`);
  } catch (error) {
    errorElement.textContent = error.message;
  }
}

function openBookForm() {
  activeEditingBookId = null;
  elements.form.reset();
  elements.bookDialogEyebrow.textContent = "A NEW STORY";
  elements.bookDialogTitle.textContent = "Add a book";
  elements.bookSubmitButton.textContent = "Add to my library";
  elements.dialog.showModal();
  window.setTimeout(() => elements.titleInput.focus(), 0);
}

function openBookEditForm(id) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book) return;
  activeEditingBookId = book.id;
  elements.form.reset();
  elements.titleInput.value = book.title;
  document.querySelector("#author-input").value = book.author;
  document.querySelector("#genre-input").value = book.genre;
  document.querySelector("#book-format-input").value = book.format || "print";
  const statusInput = elements.form.querySelector(
    `input[name="status"][value="${book.status}"]`,
  );
  if (statusInput) statusInput.checked = true;
  elements.bookDialogEyebrow.textContent = "BOOK DETAILS";
  elements.bookDialogTitle.textContent = "Edit book";
  elements.bookSubmitButton.textContent = "Save changes";
  openMenuId = null;
  elements.dialog.showModal();
  window.setTimeout(() => elements.titleInput.focus(), 0);
}

async function saveBook(formData) {
  const existingBook = activeEditingBookId
    ? books.find(
        (item) =>
          item.id === activeEditingBookId &&
          item.ownerId === currentAccount?.id,
      )
    : null;
  let coverImage = existingBook?.coverImage || "";
  const coverFile = elements.coverInput.files[0];
  if (coverFile) {
    try {
      coverImage = await compressImage(coverFile, 560, 0.64);
    } catch (error) {
      showToast(error.message);
      return;
    }
  }
  const book = {
    id: existingBook?.id || crypto.randomUUID(),
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    genre: formData.get("genre").trim(),
    format: formData.get("format") || "print",
    status: formData.get("status"),
    coverImage,
    rating: existingBook?.rating || 0,
    ownerId: currentAccount.id,
  };
  const previousBooks = [...books];
  if (existingBook) {
    books = books.map((item) => (item.id === existingBook.id ? book : item));
  } else {
    books.unshift(book);
  }
  if (!saveBooks()) {
    books = previousBooks;
    return;
  }
  renderBooks();
  scheduleStatsSync();
  elements.dialog.close();
  showToast(
    existingBook
      ? `Details for "${book.title}" updated.`
      : `"${book.title}" added to your library.`,
  );
  if (coverFile || !existingBook) {
    saveCloudBookCover(book).catch(() => {
      showToast("The book was saved, but its photo will sync when online.");
    });
  }
  activeEditingBookId = null;
  refreshProfileActivity().catch(() => {});
}

function setBookStatus(id, status) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book || !["unread", "reading", "read"].includes(status)) return;
  book.status = status;
  saveBooks();
  renderBooks();
  scheduleStatsSync();
  showToast(
    status === "read"
      ? `Marked "${book.title}" as read.`
      : status === "reading"
        ? `Marked "${book.title}" as busy reading.`
        : `Moved "${book.title}" to your reading list.`,
  );
  refreshProfileActivity().catch(() => {});
}

function openFullCover(book) {
  if (!book?.coverImage) {
    showToast("No picture has been added for this book.");
    return;
  }
  elements.coverViewImage.src = book.coverImage;
  elements.coverViewImage.alt = `Full picture of the user's copy of ${book.title}`;
  elements.coverViewTitle.textContent = book.title;
  elements.coverViewAuthor.textContent = `by ${book.author}`;
  elements.coverViewDialog.showModal();
}

function openMarketListingForm(id) {
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!book) return;
  const existing = marketplaceListings.find(
    (listing) =>
      listing.sellerId === currentAccount.id && listing.bookId === book.id,
  );
  if (existing) {
    showToast("That book is already listed in the marketplace.");
    return;
  }
  elements.marketListingForm.reset();
  openMenuId = null;
  renderBooks();
  elements.marketListingError.textContent = "";
  elements.marketBookIdInput.value = book.id;
  elements.marketBookSummary.textContent = `${book.title} by ${book.author}`;
  elements.marketListingDialog.showModal();
  window.setTimeout(() => elements.marketPriceInput.focus(), 0);
}

async function createMarketListing(formData) {
  const book = books.find(
    (item) =>
      item.id === formData.get("bookId") &&
      item.ownerId === currentAccount?.id,
  );
  if (!book) {
    elements.marketListingError.textContent =
      "That book is no longer in your collection.";
    return;
  }
  elements.marketListingError.textContent = "";
  try {
    await apiRequest("market-list", {
      method: "POST",
      body: {
        bookId: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: formData.get("price"),
        currency: formData.get("currency"),
        note: formData.get("note").trim(),
      },
    });
    await loadMarketplace();
    renderMarketplace();
    elements.marketListingDialog.close();
    showToast(`"${book.title}" is now listed for sale.`);
  } catch (error) {
    elements.marketListingError.textContent = error.message;
  }
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
  apiRequest("cover-delete", {
    method: "POST",
    body: { bookId: id },
  }).catch(() => {});
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
    pendingCoverImage = await compressImage(file, 560, 0.64);
    elements.coverPreview.src = pendingCoverImage;
    elements.coverPreviewFrame.hidden = false;
  } catch (error) {
    pendingCoverImage = "";
    showToast(error.message);
  }
}

async function saveReplacementCover() {
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
  try {
    await saveCloudBookCover(book);
  } catch {
    showToast("The photo is saved here and will sync when online.");
    return;
  }
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
  const averagePages = sessionCount
    ? Math.round(totalPages / sessionCount)
    : 0;
  const streak = calculateStreak();
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 29);
  const recentEntries = accountLog.filter((entry) => {
    const date = new Date(`${entry.date}T12:00:00`);
    return date >= thirtyDaysAgo && date <= today;
  });
  const recentPages = recentEntries.reduce(
    (total, entry) => total + (Number(entry.pagesRead) || 0),
    0,
  );
  const recentMinutes = recentEntries.reduce(
    (total, entry) => total + (Number(entry.durationMinutes) || 0),
    0,
  );
  const activeDays = new Set(recentEntries.map((entry) => entry.date)).size;
  const projectedPages = recentPages
    ? Math.round((recentPages / 30) * 365)
    : 0;
  const byBook = accountLog.reduce((totals, entry) => {
    const key = `${entry.title}\u0000${entry.author}`;
    totals[key] ||= { title: entry.title, author: entry.author, pages: 0, minutes: 0, sessions: 0 };
    totals[key].pages += Number(entry.pagesRead) || 0;
    totals[key].minutes += Number(entry.durationMinutes) || 0;
    totals[key].sessions += 1;
    return totals;
  }, {});
  const topBook = Object.values(byBook).sort(
    (first, second) => second.minutes - first.minutes || second.pages - first.pages,
  )[0];
  const weekdayTotals = accountLog.reduce((totals, entry) => {
    const label = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(
      new Date(`${entry.date}T12:00:00`),
    );
    totals[label] = (totals[label] || 0) + (Number(entry.durationMinutes) || 0);
    return totals;
  }, {});
  const strongestWeekday = Object.entries(weekdayTotals).sort(
    (first, second) => second[1] - first[1],
  )[0];
  const longestSession = sessionCount
    ? Math.max(...accountLog.map((entry) => Number(entry.durationMinutes) || 0))
    : 0;
  const shortestSession = sessionCount
    ? Math.min(...accountLog.map((entry) => Number(entry.durationMinutes) || 0))
    : 0;

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
  elements.pagesSessionInsight.textContent = averagePages
    ? averagePages.toLocaleString()
    : "--";
  elements.topBookInsight.textContent = topBook
    ? topBook.title
    : "--";
  elements.topBookDetail.textContent = topBook
    ? `${formatDuration(topBook.minutes)} across ${topBook.sessions} ${topBook.sessions === 1 ? "session" : "sessions"}`
    : "Log sessions to compare books";
  elements.activeDaysInsight.textContent = sessionCount
    ? `${activeDays}/30`
    : "--";
  elements.activeDaysDetail.textContent = recentEntries.length
    ? `${recentEntries.length} sessions and ${formatDuration(recentMinutes)}`
    : "No sessions in the last 30 days";
  elements.projectedPagesInsight.textContent = projectedPages
    ? projectedPages.toLocaleString()
    : "--";
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
    elements.readingDeepInsights.innerHTML =
      '<p class="reading-deep-empty">Detailed comparisons will appear after your first reading session.</p>';
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
  elements.habitTitle.textContent = `You read most ${favoritePeriod}.`;
  elements.habitMessage.textContent =
    `Your average session is ${formatDuration(averageMinutes)}, and your longest is ${formatDuration(longestSession)}. ` +
    (streak > 1
      ? `You are on a ${streak}-day streak; protecting that time can help the habit stick.`
      : "A regular reading window can help turn individual sessions into a lasting habit.");
  elements.readingDeepInsights.innerHTML = `
    <article>
      <span>Strongest weekday</span>
      <strong>${escapeHtml(strongestWeekday?.[0] || "--")}</strong>
      <p>${strongestWeekday ? `${formatDuration(strongestWeekday[1])} logged on that weekday overall.` : "More sessions will reveal a pattern."}</p>
    </article>
    <article>
      <span>Session range</span>
      <strong>${shortestSession ? `${formatDuration(shortestSession)} - ${formatDuration(longestSession)}` : "--"}</strong>
      <p>Your shortest and longest logged reading sessions.</p>
    </article>
    <article>
      <span>Recent consistency</span>
      <strong>${activeDays ? `${Math.round((activeDays / 30) * 100)}%` : "--"}</strong>
      <p>Percentage of the last 30 days containing at least one session.</p>
    </article>
    <article>
      <span>Recent pace</span>
      <strong>${recentMinutes ? `${Math.round((recentPages / recentMinutes) * 60)} p/h` : "--"}</strong>
      <p>Calculated from the last 30 days rather than your lifetime average.</p>
    </article>
  `;
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
        <small>Pages ${entry.startPage}-${entry.endPage}; continue at ${entry.continuePage ?? entry.endPage + 1}</small>
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
    elements.pagesReadInput.value = endPage - startPage + 1;
    elements.continuePageInput.value = endPage + 1;
  }
}

function addReadingSession(formData) {
  const durationMinutes = updateDurationPreview();
  const startPage = Number(formData.get("startPage"));
  const endPage = Number(formData.get("endPage"));
  const continuePage = Number(formData.get("continuePage"));
  if (!durationMinutes) return;
  if (endPage < startPage) {
    elements.endPageInput.setCustomValidity(
      "The finishing page cannot be before the starting page.",
    );
    elements.endPageInput.reportValidity();
    return;
  }
  elements.endPageInput.setCustomValidity("");
  if (continuePage < endPage) {
    elements.continuePageInput.setCustomValidity(
      "The continuation page cannot be before the finishing page.",
    );
    elements.continuePageInput.reportValidity();
    return;
  }
  elements.continuePageInput.setCustomValidity("");

  const entry = {
    id: crypto.randomUUID(),
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    pagesRead: Number(formData.get("pagesRead")),
    startPage,
    endPage,
    continuePage,
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
  refreshProfileActivity().catch(() => {});
  loadSocialSpaces()
    .then(renderReadingChallenges)
    .catch(() => {});
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

function openPassageForm(passageId = null) {
  const passage = passageId
    ? passages.find(
        (item) =>
          item.id === passageId && item.ownerId === currentAccount?.id,
      )
    : null;
  activePassageId = passage?.id || null;
  elements.passageForm.reset();
  resetHighlightCanvas();
  elements.passageDialogTitle.textContent = passage
    ? "Edit passage"
    : "Save a passage";
  elements.passageSubmitButton.textContent = passage
    ? "Save changes"
    : "Save passage";
  if (passage) {
    elements.passageTitleInput.value = passage.title;
    elements.passageAuthorInput.value = passage.author;
    elements.passagePageInput.value = passage.page;
    elements.passageReflectionInput.value = passage.reflection || "";
    elements.passageTextInput.value = passage.text || "";
    setPassageMode(passage.mode);
    if (passage.mode === "photo" && passage.image) {
      loadPageImage(passage.image)
        .then(() => {
          elements.passagePhotoInput.required = false;
        })
        .catch((error) => showToast(error.message));
    }
  } else {
    setPassageMode("photo");
  }
  elements.passageDialog.showModal();
  window.setTimeout(
    () =>
      (passage
        ? elements.passageTitleInput
        : elements.passagePhotoInput
      ).focus(),
    0,
  );
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
            class="passage-edit-button"
            type="button"
            data-passage-action="edit"
            data-id="${passage.id}"
            aria-label="Edit saved passage from ${escapeHtml(passage.title)}"
          >Edit</button>
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

function savePassage(formData) {
  if (passageMode === "photo" && !pageImage) {
    elements.passagePhotoInput.setCustomValidity("Please add a page photo.");
    elements.passagePhotoInput.reportValidity();
    return;
  }
  elements.passagePhotoInput.setCustomValidity("");
  const existingPassage = activePassageId
    ? passages.find(
        (item) =>
          item.id === activePassageId &&
          item.ownerId === currentAccount?.id,
      )
    : null;
  const passage = {
    id: existingPassage?.id || crypto.randomUUID(),
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
    createdAt: existingPassage?.createdAt || new Date().toISOString(),
    ownerId: currentAccount.id,
  };
  const previousPassages = [...passages];
  if (existingPassage) {
    passages = passages.map((item) =>
      item.id === existingPassage.id ? passage : item,
    );
  } else {
    passages.unshift(passage);
  }
  if (!savePassages()) {
    passages = previousPassages;
    return;
  }
  renderPassages();
  elements.passageDialog.close();
  showToast(
    existingPassage
      ? `Passage from "${passage.title}" updated.`
      : `Passage from "${passage.title}" saved.`,
  );
  refreshProfileActivity().catch(() => {});
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

function storyWordTotal(text) {
  const words = String(text || "").trim().match(/\b[\w'-]+\b/g);
  return words ? words.length : 0;
}

function currentStory() {
  return creativeWriting.find(
    (story) =>
      story.id === elements.storyIdInput.value &&
      story.ownerId === currentAccount?.id,
  );
}

function storyDateLabel(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function renderStories() {
  if (!currentAccount) return;
  const stories = ownedByCurrent(creativeWriting).sort((first, second) =>
    String(second.updatedAt).localeCompare(String(first.updatedAt)),
  );
  const activeId = elements.storyIdInput.value;
  elements.storyCount.textContent = stories.length;
  elements.storyList.innerHTML = stories
    .map(
      (story) => `
        <button
          class="story-list-item ${story.id === activeId ? "active" : ""}"
          type="button"
          data-story-id="${story.id}"
        >
          <strong>${escapeHtml(story.title || "Untitled story")}</strong>
          <span>${escapeHtml(story.genre || "Unspecified genre")}</span>
          <small>${storyWordTotal(story.draft)} words / ${escapeHtml(storyDateLabel(story.updatedAt))}</small>
        </button>
      `,
    )
    .join("");
  elements.storyEmpty.hidden = stories.length > 0;
}

function setWritingView(view) {
  elements.storyPlanView.hidden = view !== "plan";
  elements.storyDraftView.hidden = view !== "draft";
  document.querySelectorAll("[data-writing-view]").forEach((button) => {
    const selected = button.dataset.writingView === view;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  if (view === "draft") elements.storyDraftInput.focus();
}

function openStory(storyId) {
  const story = creativeWriting.find(
    (item) => item.id === storyId && item.ownerId === currentAccount?.id,
  );
  if (!story) return;
  elements.storyIdInput.value = story.id;
  elements.storyTitleInput.value = story.title || "";
  elements.storyGenreInput.value = story.genre || "";
  elements.storyPovInput.value = story.pov || "";
  elements.storyPremiseInput.value = story.premise || "";
  elements.storyCharactersInput.value = story.characters || "";
  elements.storySettingInput.value = story.setting || "";
  elements.storyOutlineInput.value = story.outline || "";
  elements.storyDraftInput.value = story.draft || "";
  elements.storyWordCount.textContent = storyWordTotal(story.draft);
  elements.storySaveStatus.textContent = "All changes saved";
  elements.storyEditor.hidden = false;
  elements.storyEditorEmpty.hidden = true;
  setWritingView("plan");
  renderStories();
}

function createStory() {
  if (!currentAccount) return;
  const story = {
    id: crypto.randomUUID(),
    title: "Untitled story",
    genre: "",
    pov: "",
    premise: "",
    characters: "",
    setting: "",
    outline: "",
    draft: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  };
  creativeWriting.unshift(story);
  saveCreativeWriting();
  openStory(story.id);
  elements.storyTitleInput.select();
}

function saveOpenStory() {
  const story = currentStory();
  if (!story) return;
  story.title = elements.storyTitleInput.value.trim() || "Untitled story";
  story.genre = elements.storyGenreInput.value.trim();
  story.pov = elements.storyPovInput.value;
  story.premise = elements.storyPremiseInput.value.trim();
  story.characters = elements.storyCharactersInput.value.trim();
  story.setting = elements.storySettingInput.value.trim();
  story.outline = elements.storyOutlineInput.value.trim();
  story.draft = elements.storyDraftInput.value;
  story.updatedAt = new Date().toISOString();
  elements.storyWordCount.textContent = storyWordTotal(story.draft);
  saveCreativeWriting();
  renderStories();
  elements.storySaveStatus.textContent = "All changes saved";
}

function scheduleStorySave() {
  if (!currentStory()) return;
  window.clearTimeout(storySaveTimer);
  elements.storySaveStatus.textContent = "Saving...";
  elements.storyWordCount.textContent = storyWordTotal(
    elements.storyDraftInput.value,
  );
  storySaveTimer = window.setTimeout(saveOpenStory, 600);
}

function deleteOpenStory() {
  const story = currentStory();
  if (!story) return;
  creativeWriting = creativeWriting.filter((item) => item.id !== story.id);
  saveCreativeWriting();
  elements.storyEditor.reset();
  elements.storyIdInput.value = "";
  elements.storyEditor.hidden = true;
  elements.storyEditorEmpty.hidden = false;
  renderStories();
  showToast(`"${story.title || "Untitled story"}" deleted.`);
}

function resetWordhubForm() {
  elements.wordhubForm.reset();
  elements.wordhubIdInput.value = "";
  elements.wordhubFormTitle.textContent = "Add a word";
  elements.wordhubCancelEdit.hidden = true;
  elements.wordhubForm.querySelector(".submit-button").textContent = "Save word";
  elements.wordhubLookupStatus.textContent =
    "Uses the Free Dictionary API. Review and adapt the result before saving.";
}

async function lookupWordDefinition() {
  const word = elements.wordhubWordInput.value.trim();
  if (!word) {
    elements.wordhubWordInput.focus();
    elements.wordhubLookupStatus.textContent = "Enter a word first.";
    return;
  }
  elements.wordhubLookupButton.disabled = true;
  elements.wordhubLookupStatus.textContent = `Looking up "${word}"...`;
  try {
    const data = await apiRequest("dictionary", {
      method: "POST",
      body: { word },
    });
    const first = data.definitions?.[0];
    if (!first) throw new Error("No definition was returned.");
    const alternatives = data.definitions
      .slice(1, 3)
      .map((item) => `${item.partOfSpeech ? `${item.partOfSpeech}: ` : ""}${item.definition}`)
      .join("\n");
    elements.wordhubMeaningInput.value = [
      `${first.partOfSpeech ? `${first.partOfSpeech}: ` : ""}${first.definition}`,
      alternatives,
    ]
      .filter(Boolean)
      .join("\n");
    elements.wordhubLookupStatus.textContent =
      `${data.source}. Review the wording and make it your own before saving.`;
  } catch (error) {
    elements.wordhubLookupStatus.textContent = error.message;
  } finally {
    elements.wordhubLookupButton.disabled = false;
  }
}

function renderWordhub() {
  if (!currentAccount) return;
  const query = normalize(elements.wordhubSearchInput.value);
  const entries = ownedByCurrent(wordhub)
    .filter((entry) => {
      const searchable = [
        entry.word,
        entry.meaning,
        entry.book,
        entry.sentence,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return !query || searchable.includes(query);
    })
    .sort((first, second) =>
      first.word.localeCompare(second.word, undefined, { sensitivity: "base" }),
    );
  const total = ownedByCurrent(wordhub).length;
  elements.wordhubCount.textContent = total;
  elements.wordhubList.innerHTML = entries
    .map(
      (entry) => `
        <article class="wordhub-card">
          <div class="wordhub-card-heading">
            <div>
              <p class="eyebrow">WORD</p>
              <h3>${escapeHtml(entry.word)}</h3>
            </div>
            <div class="wordhub-card-actions">
              <button type="button" data-wordhub-action="edit" data-id="${entry.id}">Edit</button>
              <button type="button" data-wordhub-action="delete" data-id="${entry.id}">Remove</button>
            </div>
          </div>
          <p class="wordhub-meaning">${escapeHtml(entry.meaning)}</p>
          ${
            entry.book
              ? `<p class="wordhub-source">Found in <strong>${escapeHtml(entry.book)}</strong>${entry.page ? `, page ${escapeHtml(entry.page)}` : ""}</p>`
              : ""
          }
          <blockquote>${escapeHtml(entry.sentence)}</blockquote>
        </article>
      `,
    )
    .join("");
  elements.wordhubList.hidden = entries.length === 0;
  elements.wordhubEmpty.hidden = entries.length > 0;
  elements.wordhubEmpty.querySelector("h3").textContent =
    total && !entries.length
      ? "No matching words."
      : "Build a living vocabulary.";
}

function saveWordhubEntry() {
  const id = elements.wordhubIdInput.value;
  const word = elements.wordhubWordInput.value.trim();
  const existingDuplicate = ownedByCurrent(wordhub).find(
    (entry) => normalize(entry.word) === normalize(word) && entry.id !== id,
  );
  if (existingDuplicate) {
    elements.wordhubWordInput.setCustomValidity(
      "That word is already in your alcove.",
    );
    elements.wordhubWordInput.reportValidity();
    return;
  }
  elements.wordhubWordInput.setCustomValidity("");
  const previous = wordhub.find(
    (entry) => entry.id === id && entry.ownerId === currentAccount?.id,
  );
  const entry = {
    id: previous?.id || crypto.randomUUID(),
    word,
    meaning: elements.wordhubMeaningInput.value.trim(),
    book: elements.wordhubBookInput.value.trim(),
    page: elements.wordhubPageInput.value.trim(),
    sentence: elements.wordhubSentenceInput.value.trim(),
    createdAt: previous?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  };
  if (previous) {
    wordhub = wordhub.map((item) => (item.id === previous.id ? entry : item));
  } else {
    wordhub.unshift(entry);
  }
  saveWordhub();
  resetWordhubForm();
  renderWordhub();
  showToast(previous ? `"${entry.word}" updated.` : `"${entry.word}" saved.`);
}

function editWordhubEntry(id) {
  const entry = wordhub.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!entry) return;
  elements.wordhubIdInput.value = entry.id;
  elements.wordhubWordInput.value = entry.word;
  elements.wordhubMeaningInput.value = entry.meaning;
  elements.wordhubBookInput.value = entry.book || "";
  elements.wordhubPageInput.value = entry.page || "";
  elements.wordhubSentenceInput.value = entry.sentence;
  elements.wordhubFormTitle.textContent = "Edit word";
  elements.wordhubCancelEdit.hidden = false;
  elements.wordhubForm.querySelector(".submit-button").textContent =
    "Save changes";
  elements.wordhubWordInput.focus();
}

function deleteWordhubEntry(id) {
  const entry = wordhub.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!entry) return;
  wordhub = wordhub.filter((item) => item.id !== id);
  saveWordhub();
  if (elements.wordhubIdInput.value === id) resetWordhubForm();
  renderWordhub();
  showToast(`"${entry.word}" removed.`);
}

function dreamDateLabel(value) {
  return journalDateLabel(value);
}

function dreamTimeLabel(value) {
  if (!value) return "";
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
}

function renderArchetypeReference() {
  const query = elements.archetypeSearchInput.value.trim().toLowerCase();
  const matches = DREAM_ARCHETYPES.filter((archetype) =>
    [archetype.name, archetype.group, archetype.description]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
  const groups = matches.reduce((result, archetype) => {
    (result[archetype.group] ||= []).push(archetype);
    return result;
  }, {});
  elements.archetypeReferenceList.innerHTML = Object.entries(groups)
    .map(
      ([group, archetypes]) => `
        <section class="archetype-reference-group">
          <h4>${escapeHtml(group)}</h4>
          <div class="archetype-reference-grid">
            ${archetypes
              .map(
                (archetype) => `
                  <article>
                    <strong>${escapeHtml(archetype.name)}</strong>
                    <p>${escapeHtml(archetype.description)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
  elements.archetypeReferenceEmpty.hidden = matches.length > 0;
}

function renderJungConceptReference() {
  const query = elements.jungConceptSearchInput.value.trim().toLowerCase();
  const matches = JUNG_CONCEPTS.filter((concept) =>
    [concept.name, concept.group, concept.description]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
  const groups = matches.reduce((result, concept) => {
    (result[concept.group] ||= []).push(concept);
    return result;
  }, {});
  elements.jungConceptReferenceList.innerHTML = Object.entries(groups)
    .map(
      ([group, concepts]) => `
        <section class="archetype-reference-group">
          <h4>${escapeHtml(group)}</h4>
          <div class="archetype-reference-grid">
            ${concepts
              .map(
                (concept) => `
                  <article>
                    <strong>${escapeHtml(concept.name)}</strong>
                    <p>${escapeHtml(concept.description)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
  elements.jungConceptReferenceEmpty.hidden = matches.length > 0;
}

function dreamNote(label, value) {
  return value
    ? `<div><strong>${label}</strong><p>${escapeHtml(value)}</p></div>`
    : "";
}

function dreamAccent(dream) {
  return colorForGenre(
    [dream.archetypes, dream.motifs, dream.symbols, dream.title]
      .find(Boolean) || "Dream",
  );
}

function dreamSymbolIcon(value) {
  return {
    moon: "&#9790;",
    heart: "&#9829;",
    chain: "&#128279;",
    wizard: "&#129497;",
    key: "&#128273;",
    eye: "&#128065;",
    star: "&#9733;",
    tree: "&#127795;",
    water: "&#8776;",
    door: "&#128682;",
  }[value] || "&#9790;";
}

function analysisCategoryLabel(key) {
  return {
    compensatory: "Compensatory dream",
    prospective: "Prospective dream",
    big: "Big / archetypal dream",
    reductive: "Reductive dream",
    prophetic: "Prophetic-seeming dream",
  }[key] || key;
}

function likelihoodLabel(score) {
  if (score >= 7) return "strong possibility";
  if (score >= 4) return "moderate possibility";
  return "tentative possibility";
}

function keywordScore(text, words, weight = 1) {
  return words.reduce(
    (score, word) => score + (text.includes(word) ? weight : 0),
    0,
  );
}

function uniqueDreamImages(dream) {
  const source = [dream.symbols, dream.archetypes, dream.motifs]
    .filter(Boolean)
    .join(", ");
  return [
    ...new Set(
      source
        .split(/[,;\n]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ].slice(0, 6);
}

function createJungianAnalysis(dream, wakingContext, focusQuestion) {
  const text = [
    dream.dream,
    dream.archetypes,
    dream.motifs,
    dream.symbols,
    wakingContext,
  ]
    .join(" ")
    .toLocaleLowerCase();
  const scores = {
    compensatory:
      3 +
      keywordScore(text, [
        "opposite",
        "contrast",
        "shadow",
        "denied",
        "hidden",
        "forbidden",
        "balance",
      ]),
    prospective: keywordScore(
      text,
      [
        "future",
        "tomorrow",
        "journey",
        "road",
        "path",
        "door",
        "threshold",
        "choice",
        "new",
        "change",
        "becoming",
      ],
      2,
    ),
    big:
      keywordScore(
        text,
        [
          "god",
          "goddess",
          "king",
          "queen",
          "wizard",
          "dragon",
          "world",
          "cosmic",
          "ancient",
          "temple",
          "death",
          "rebirth",
          "ocean",
          "sun",
          "moon",
        ],
        2,
      ) +
      (dream.dream.length > 1200 ? 3 : 0) +
      (dream.archetypes ? 2 : 0),
    reductive: keywordScore(
      text,
      [
        "fall",
        "collapse",
        "failure",
        "humiliation",
        "lost",
        "broken",
        "powerless",
        "small",
        "ruin",
      ],
      2,
    ),
    prophetic: keywordScore(
      text,
      ["prediction", "prophecy", "foretell", "came true", "deja vu"],
      2,
    ),
  };
  if (!scores.prospective) scores.prospective = 2;
  const categories = Object.entries(scores)
    .map(([key, score]) => ({
      key,
      label: analysisCategoryLabel(key),
      score,
      likelihood: likelihoodLabel(score),
      note:
        key === "prophetic"
          ? "This describes a felt resemblance to events, not evidence that a dream predicts the future."
          : "",
    }))
    .sort((first, second) => second.score - first.score);
  const primary = categories[0];
  const images = uniqueDreamImages(dream);
  const contextNote = wakingContext
    ? `The waking situation you supplied may help locate the tension or possibility the dream is exploring.`
    : "No waking-life context was supplied, so this interpretation is especially tentative. Jungian work normally compares the dream with the dreamer's conscious situation.";
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    wakingContext,
    focusQuestion,
    primaryCategory: primary.key,
    categories,
    overview: `The strongest available lens is ${primary.label.toLocaleLowerCase()}, but this is a ${primary.likelihood}, not a classification. ${contextNote}`,
    amplification: images.length
      ? `Images worth amplifying through your own memories, cultural associations, stories, and art include ${images.join(", ")}.`
      : "Choose the images with the strongest emotional charge and write your personal associations before consulting general symbol traditions.",
    reflectionQuestions: [
      focusQuestion ||
        "What conscious attitude, plan, fear, or certainty might this dream be balancing or enlarging?",
      "Which figure or image feels most unlike your usual conscious attitude?",
      "If every figure represented part of you, what quality would each contribute?",
      "What small waking-life experiment could honour the dream without obeying it literally?",
    ],
    sources: [
      "C. G. Jung, Man and His Symbols",
      "C. G. Jung, The Structure and Dynamics of the Psyche (Collected Works, Vol. 8)",
      "C. G. Jung, The Practice of Psychotherapy (Collected Works, Vol. 16)",
      "C. G. Jung, Modern Man in Search of a Soul",
    ],
    disclaimer:
      "This automated reflection is uncertain and educational. It does not diagnose mental illness, establish universal symbol meanings, or verify prophecy. Distressing or persistent experiences are best discussed with a qualified professional.",
  };
}

function renderDreamAnalysis(analysis) {
  return `
    <article class="dream-analysis">
      <div class="dream-analysis-heading">
        <div>
          <p class="eyebrow">SAVED JUNGIAN REFLECTION</p>
          <h5>${escapeHtml(analysisCategoryLabel(analysis.primaryCategory))}</h5>
        </div>
        <time>${escapeHtml(new Date(analysis.createdAt).toLocaleDateString())}</time>
      </div>
      <div class="dream-analysis-categories">
        ${(analysis.categories || [])
          .slice(0, 3)
          .map(
            (category) =>
              `<span><strong>${escapeHtml(category.label)}</strong>${escapeHtml(category.likelihood)}</span>`,
          )
          .join("")}
      </div>
      <p>${escapeHtml(analysis.overview)}</p>
      <p><strong>Amplification:</strong> ${escapeHtml(analysis.amplification)}</p>
      <div class="dream-analysis-questions">
        <strong>Questions for your own analysis</strong>
        <ul>${(analysis.reflectionQuestions || [])
          .map((question) => `<li>${escapeHtml(question)}</li>`)
          .join("")}</ul>
      </div>
      <details>
        <summary>Sources and limits</summary>
        <ul>${(analysis.sources || [])
          .map((source) => `<li>${escapeHtml(source)}</li>`)
          .join("")}</ul>
        <p>${escapeHtml(analysis.disclaimer)}</p>
      </details>
    </article>
  `;
}

function renderDreams() {
  if (!currentAccount) return;
  const accountDreams = ownedByCurrent(dreams).sort((first, second) =>
    String(second.dreamDate).localeCompare(String(first.dreamDate)),
  );
  const dreamById = new Map(accountDreams.map((dream) => [dream.id, dream]));
  elements.dreamList.innerHTML = accountDreams
    .map((dream) => {
      const related = (dream.relatedDreamIds || [])
        .map((id) => dreamById.get(id))
        .filter(Boolean);
      return `
        <article class="dream-card" style="--card-accent: ${dreamAccent(dream)}">
          <div class="dream-card-top">
            <p class="dream-date">
              <time datetime="${escapeHtml(dream.dreamDate)}">${escapeHtml(dreamDateLabel(dream.dreamDate))}</time>
            </p>
            <span class="dream-mark" aria-hidden="true">${dreamSymbolIcon(dream.symbolIcon)}</span>
          </div>
          <h4>${escapeHtml(dream.title)}</h4>
          ${dream.rememberedTime ? `<p class="dream-remembered-time">Remembered around ${escapeHtml(dreamTimeLabel(dream.rememberedTime))}</p>` : ""}
          <p class="dream-preview">${escapeHtml(dream.dream)}</p>
          <div class="dream-card-tags">
            ${dream.archetypes ? "<span>Archetypes</span>" : ""}
            ${dream.motifs ? "<span>Motifs</span>" : ""}
            ${dream.symbols ? "<span>Symbols</span>" : ""}
            ${related.length ? `<span>${related.length} connected</span>` : ""}
          </div>
          <details class="dream-card-details">
            <summary>View dream</summary>
            <p class="dream-text">${escapeHtml(dream.dream)}</p>
            <div class="dream-notes">
              ${dreamNote("Archetypes", dream.archetypes)}
              ${dreamNote("Motifs", dream.motifs)}
              ${dreamNote("Symbols", dream.symbols)}
            </div>
            ${
              related.length
                ? `<div class="dream-connections"><strong>Connected dreams</strong>${related
                    .map((item) => `<span>${escapeHtml(item.title)}</span>`)
                    .join("")}</div>`
                : ""
            }
            <div class="dream-analysis-history">
              ${(dream.analyses || []).length
                ? dream.analyses.map(renderDreamAnalysis).join("")
                : '<p class="dream-analysis-empty">No saved Jungian reflections yet.</p>'}
            </div>
          </details>
          <div class="dream-card-actions">
            <button type="button" data-dream-action="analyse" data-id="${dream.id}">Analyse</button>
            <button type="button" data-dream-action="edit" data-id="${dream.id}">Edit</button>
            <button type="button" data-dream-action="delete" data-id="${dream.id}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
  elements.dreamList.hidden = accountDreams.length === 0;
  elements.dreamEmpty.hidden = accountDreams.length > 0;
}

function openDreamForm(dreamId = "") {
  const dream = dreams.find(
    (item) => item.id === dreamId && item.ownerId === currentAccount?.id,
  );
  elements.dreamForm.reset();
  elements.dreamIdInput.value = dream?.id || "";
  elements.dreamDialogTitle.textContent = dream ? "Edit dream" : "Record a dream";
  elements.dreamDateInput.value =
    dream?.dreamDate || localDateString(new Date());
  elements.dreamTitleInput.value = dream?.title || "";
  elements.dreamTimeInput.value = dream?.rememberedTime || "";
  elements.dreamTextInput.value = dream?.dream || "";
  elements.dreamForm.elements.archetypes.value = dream?.archetypes || "";
  elements.dreamForm.elements.motifs.value = dream?.motifs || "";
  elements.dreamForm.elements.symbols.value = dream?.symbols || "";
  const iconValue = dream?.symbolIcon || "moon";
  const iconInput = elements.dreamForm.querySelector(
    `input[name="symbolIcon"][value="${iconValue}"]`,
  );
  if (iconInput) iconInput.checked = true;
  const selected = new Set(dream?.relatedDreamIds || []);
  const possibleConnections = ownedByCurrent(dreams)
    .filter((item) => item.id !== dream?.id)
    .sort((first, second) =>
      String(second.dreamDate).localeCompare(String(first.dreamDate)),
    );
  elements.dreamRelatedOptions.innerHTML = possibleConnections.length
    ? possibleConnections
        .map(
          (item) => `
            <label>
              <input type="checkbox" name="relatedDreamIds" value="${item.id}" ${selected.has(item.id) ? "checked" : ""} />
              <span><strong>${escapeHtml(item.title)}</strong> ${escapeHtml(dreamDateLabel(item.dreamDate))}</span>
            </label>
          `,
        )
        .join("")
    : "<p>Record another dream before adding a connection.</p>";
  elements.dreamDialog.showModal();
  window.setTimeout(() => elements.dreamTitleInput.focus(), 0);
}

function saveDreamEntry(formData) {
  const id = formData.get("id");
  const previous = dreams.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  const entry = {
    id: previous?.id || crypto.randomUUID(),
    title: formData.get("title").trim(),
    dreamDate: formData.get("dreamDate"),
    rememberedTime: formData.get("rememberedTime"),
    dream: formData.get("dream").trim(),
    archetypes: formData.get("archetypes").trim(),
    motifs: formData.get("motifs").trim(),
    symbols: formData.get("symbols").trim(),
    symbolIcon: formData.get("symbolIcon") || "moon",
    relatedDreamIds: formData.getAll("relatedDreamIds"),
    analyses: previous?.analyses || [],
    createdAt: previous?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  };
  if (previous) {
    dreams = dreams.map((item) => (item.id === previous.id ? entry : item));
  } else {
    dreams.unshift(entry);
  }
  saveDreams();
  renderDreams();
  renderProfileInsights();
  elements.dreamDialog.close();
  awardDreamRunes(entry).catch(() => {
    showToast("Dream saved. Rune rewards will update when online.");
  });
  showToast(previous ? `"${entry.title}" updated.` : `"${entry.title}" recorded.`);
}

async function awardDreamRunes(dream) {
  await syncAccountData();
  const data = await apiRequest("dream-reward", {
    method: "POST",
    body: {
      dreamId: dream.id,
      hasNotes: Boolean(dream.archetypes || dream.motifs || dream.symbols),
    },
  });
  if (data.runesAwarded > 0) {
    await loadLearningNook();
    showToast(
      `The Parliament of Owls awarded ${data.runesAwarded} Runes for your dream journal.`,
    );
  }
}

function openDreamAnalysis(dreamId) {
  const dream = dreams.find(
    (item) => item.id === dreamId && item.ownerId === currentAccount?.id,
  );
  if (!dream) return;
  elements.dreamAnalysisForm.reset();
  elements.dreamAnalysisId.value = dream.id;
  elements.dreamAnalysisSummary.textContent =
    `"${dream.title}" — ${dreamDateLabel(dream.dreamDate)}`;
  elements.dreamAnalysisDialog.showModal();
}

function saveDreamAnalysis(formData) {
  const dream = dreams.find(
    (item) =>
      item.id === formData.get("dreamId") &&
      item.ownerId === currentAccount?.id,
  );
  if (!dream) return;
  const analysis = createJungianAnalysis(
    dream,
    formData.get("wakingContext").trim(),
    formData.get("focusQuestion").trim(),
  );
  dream.analyses = [analysis, ...(dream.analyses || [])];
  dream.updatedAt = new Date().toISOString();
  saveDreams();
  renderDreams();
  elements.dreamAnalysisDialog.close();
  showToast("Jungian reflection saved with this dream.");
}

function deleteDream(id) {
  const dream = dreams.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!dream) return;
  dreams = dreams
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      relatedDreamIds: (item.relatedDreamIds || []).filter(
        (relatedId) => relatedId !== id,
      ),
    }));
  saveDreams();
  renderDreams();
  renderProfileInsights();
  showToast(`"${dream.title}" deleted.`);
}

function printEmpty(message) {
  return `<p class="print-empty">${escapeHtml(message)}</p>`;
}

function buildPrintContent(kind) {
  if (kind === "collection") {
    const entries = ownedByCurrent(books).sort((first, second) =>
      first.title.localeCompare(second.title, undefined, { sensitivity: "base" }),
    );
    return {
      title: "My Collection",
      content: entries.length
        ? `<ol>${entries
            .map((book) => {
              const status = {
                read: "Read",
                reading: "Busy reading",
                unread: "To be read",
              }[book.status] || "To be read";
              return `<li><strong>${escapeHtml(book.title)}</strong><span>by ${escapeHtml(book.author)} / ${escapeHtml(book.genre || "Unspecified genre")} / ${status}${book.rating ? ` / ${book.rating} of 5 stars` : ""}</span></li>`;
            })
            .join("")}</ol>`
        : printEmpty("No books have been added to this collection."),
    };
  }
  if (kind === "passages") {
    const entries = ownedByCurrent(passages);
    return {
      title: "Saved Passages",
      content: entries.length
        ? entries
            .map(
              (passage) => `
                <article>
                  <h2>${escapeHtml(passage.title)}</h2>
                  <p class="print-meta">by ${escapeHtml(passage.author)} / page ${escapeHtml(passage.page)}</p>
                  <blockquote>${escapeHtml(passage.text || "[Photographed passage]")}</blockquote>
                  ${passage.reflection ? `<p><strong>Reflection:</strong> ${escapeHtml(passage.reflection)}</p>` : ""}
                </article>
              `,
            )
            .join("")
        : printEmpty("No passages have been saved."),
    };
  }
  if (kind === "journal") {
    const entries = [...journals].sort((first, second) =>
      String(second.entryDate).localeCompare(String(first.entryDate)),
    );
    return {
      title: "Journal Entries",
      content: entries.length
        ? entries
            .map(
              (entry) => `
                <article>
                  <h2>${escapeHtml(journalDateLabel(entry.entryDate))}</h2>
                  <p class="print-meta">${entry.books?.length ? entry.books.map((book) => escapeHtml(book.title)).join(", ") : "General reflection"} / ${entry.isShared ? "Shared" : "Private"}</p>
                  <p>${escapeHtml(entry.reflection)}</p>
                </article>
              `,
            )
            .join("")
        : printEmpty("No journal entries have been written."),
    };
  }
  const entries = ownedByCurrent(creativeWriting).sort((first, second) =>
    String(second.updatedAt).localeCompare(String(first.updatedAt)),
  );
  return {
    title: "Writing Projects",
    content: entries.length
      ? entries
          .map(
            (story) => `
              <article>
                <h2>${escapeHtml(story.title || "Untitled story")}</h2>
                <p class="print-meta">${escapeHtml(story.genre || "Unspecified genre")} / ${escapeHtml(story.pov || "Unspecified point of view")} / ${storyWordTotal(story.draft)} words</p>
                ${story.premise ? `<p><strong>Premise:</strong> ${escapeHtml(story.premise)}</p>` : ""}
                ${story.outline ? `<p><strong>Outline:</strong> ${escapeHtml(story.outline)}</p>` : ""}
              </article>
            `,
          )
          .join("")
      : printEmpty("No writing projects have been created."),
  };
}

function printList(kind) {
  const printable = buildPrintContent(kind);
  const previousTitle = document.title;
  elements.printSheet.innerHTML = `
    <header>
      <p>MY LIBRARY</p>
      <h1>${escapeHtml(printable.title)}</h1>
      <span>${escapeHtml(currentAccount?.username || "Reader")} / Printed ${escapeHtml(new Date().toLocaleDateString())}</span>
    </header>
    <main>${printable.content}</main>
  `;
  elements.printSheet.setAttribute("aria-hidden", "false");
  document.title = `${printable.title} - My Library`;
  const cleanUp = () => {
    document.title = previousTitle;
    elements.printSheet.setAttribute("aria-hidden", "true");
    window.removeEventListener("afterprint", cleanUp);
  };
  window.addEventListener("afterprint", cleanUp);
  window.print();
}

function avatarMarkup(account) {
  return account.profileImage
    ? `<img src="${account.profileImage}" alt="" />`
    : escapeHtml(account.username.charAt(0).toUpperCase());
}

function avatarFrameAttribute(account) {
  return `data-frame="${escapeHtml(account.equippedFrame || "")}"`;
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
        <div class="mini-avatar" ${avatarFrameAttribute(account)}>${avatarMarkup(account)}</div>
        <div>
          <h3>${escapeHtml(account.username)}</h3>
          <p>${followerCount(account.id)} followers / ${followingCount(account.id)} following</p>
        </div>
      </div>
      <div class="reader-stats">
        <div class="reader-stat"><strong>${stats.total}</strong><span>Owned</span></div>
        <div class="reader-stat"><strong>${stats.read}</strong><span>Read</span></div>
        <div class="reader-stat"><strong>${stats.reading || 0}</strong><span>Reading</span></div>
        <div class="reader-stat"><strong>${stats.unread}</strong><span>To read</span></div>
        <div class="reader-stat rune-stat"><strong>${Number(account.runes) || 0}</strong><span>Runes</span></div>
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
        <button
          class="debate-invite-button"
          type="button"
          data-community-action="debate"
          data-id="${account.id}"
        >Invite to debate</button>
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

function renderFollowLists() {
  if (!currentAccount) return;
  const followerIds = new Set(
    follows
      .filter((follow) => follow.followingId === currentAccount.id)
      .map((follow) => follow.followerId),
  );
  const followingIds = new Set(
    follows
      .filter((follow) => follow.followerId === currentAccount.id)
      .map((follow) => follow.followingId),
  );
  const followers = accounts.filter((account) => followerIds.has(account.id));
  const followingAccounts = accounts.filter((account) =>
    followingIds.has(account.id),
  );

  elements.followerGrid.innerHTML = followers.map(renderReaderCard).join("");
  elements.followingGrid.innerHTML = followingAccounts
    .map(renderReaderCard)
    .join("");
  elements.followerGrid.hidden = followers.length === 0;
  elements.followingGrid.hidden = followingAccounts.length === 0;
  elements.followerEmptyState.hidden = followers.length > 0;
  elements.followingEmptyState.hidden = followingAccounts.length > 0;
  elements.followersTabCount.textContent = followerIds.size;
  elements.followingTabCount.textContent = followingIds.size;
}

function journalDateLabel(value) {
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

function journalBookTags(books) {
  if (!books?.length) return '<span class="journal-no-books">General reflection</span>';
  return books
    .map(
      (book) =>
        `<span class="journal-book-tag">${escapeHtml(book.title)}</span>`,
    )
    .join("");
}

function renderJournals() {
  const ordered = [...journals].sort((first, second) =>
    String(second.entryDate).localeCompare(String(first.entryDate)),
  );
  elements.journalGrid.innerHTML = ordered
    .map(
      (entry) => `
        <article class="journal-card">
          <div class="journal-card-heading">
            <time datetime="${escapeHtml(String(entry.entryDate).slice(0, 10))}">
              ${escapeHtml(journalDateLabel(entry.entryDate))}
            </time>
            <span class="journal-privacy ${entry.isShared ? "shared" : ""}">
              ${entry.isShared ? "Shared" : "Private"}
            </span>
          </div>
          <div class="journal-book-tags">${journalBookTags(entry.books)}</div>
          <p class="journal-reflection">${escapeHtml(entry.reflection)}</p>
          <button
            class="journal-delete-button"
            type="button"
            data-journal-action="delete"
            data-id="${entry.id}"
          >Delete entry</button>
        </article>
      `,
    )
    .join("");
  elements.journalGrid.hidden = ordered.length === 0;
  elements.journalEmptyState.hidden = ordered.length > 0;
}

function openJournalForm() {
  elements.journalForm.reset();
  elements.journalError.textContent = "";
  elements.journalDateInput.value = localDateString(new Date());
  const accountBooks = ownedByCurrent(books).sort((first, second) =>
    first.title.localeCompare(second.title, undefined, { sensitivity: "base" }),
  );
  elements.journalBookOptions.innerHTML = accountBooks.length
    ? accountBooks
        .map(
          (book) => `
            <label>
              <input type="checkbox" name="bookIds" value="${book.id}" />
              <span><strong>${escapeHtml(book.title)}</strong> by ${escapeHtml(book.author)}</span>
            </label>
          `,
        )
        .join("")
    : '<p>Add books to your collection to tag them here.</p>';
  elements.journalDialog.showModal();
  window.setTimeout(() => elements.journalReflectionInput.focus(), 0);
}

async function saveJournalEntry(formData) {
  const selectedIds = new Set(formData.getAll("bookIds"));
  const taggedBooks = ownedByCurrent(books)
    .filter((book) => selectedIds.has(book.id))
    .map(({ id, title, author }) => ({ id, title, author }));
  elements.journalError.textContent = "";
  try {
    await apiRequest("journal-save", {
      method: "POST",
      body: {
        id: crypto.randomUUID(),
        entryDate: formData.get("entryDate"),
        reflection: formData.get("reflection").trim(),
        books: taggedBooks,
        isShared: formData.get("isShared") === "on",
      },
    });
    await Promise.all([loadJournals(), loadCommunity()]);
    renderJournals();
    renderCommunity();
    await refreshProfileActivity().catch(() => {});
    elements.journalDialog.close();
    showToast("Journal entry saved.");
  } catch (error) {
    elements.journalError.textContent = error.message;
  }
}

async function deleteJournalEntry(id) {
  try {
    await apiRequest("journal-delete", { method: "POST", body: { id } });
    await Promise.all([loadJournals(), loadCommunity()]);
    renderJournals();
    renderCommunity();
    showToast("Journal entry removed.");
  } catch (error) {
    showToast(error.message);
  }
}

function renderSharedJournals() {
  const visible = sharedJournals;
  elements.communityJournalFeed.innerHTML = visible
    .map((entry) => {
      const author = accounts.find((account) => account.id === entry.authorId) || {
        username: entry.author,
        profileImage: entry.profileImage,
      };
      return `
        <article class="community-journal-card">
          <div class="community-journal-author">
            <div class="mini-avatar" ${avatarFrameAttribute(author)}>${avatarMarkup(author)}</div>
            <div>
              <strong>${escapeHtml(entry.author)}</strong>
              <time datetime="${escapeHtml(String(entry.entryDate).slice(0, 10))}">
                ${escapeHtml(journalDateLabel(entry.entryDate))}
              </time>
            </div>
          </div>
          <div class="journal-book-tags">${journalBookTags(entry.books)}</div>
          <p>${escapeHtml(entry.reflection)}</p>
        </article>
      `;
    })
    .join("");
  elements.communityJournalFeed.hidden = visible.length === 0;
  elements.communityJournalEmpty.hidden = visible.length > 0;
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
      <div class="mini-avatar" ${avatarFrameAttribute(otherReader)}>${avatarMarkup(otherReader)}</div>
      <div>
        <div class="share-card-heading">
          <h3>${isBook ? "Book recommendation" : "Shared passage"}</h3>
          <div class="share-heading-actions">
            ${
              isBook && isSender
                ? `<button type="button" data-share-action="edit" data-id="${share.id}">Edit</button>
                   <button class="share-delete-action" type="button" data-share-action="delete" data-id="${share.id}">Delete</button>`
                : ""
            }
            <span class="share-direction">${isSender ? (myReadAt ? "Sent" : "New reply") : myReadAt ? "Read" : "Unread"}</span>
          </div>
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

function openRecommendationEdit(shareId) {
  const share = shares.find(
    (item) =>
      item.id === shareId &&
      item.kind === "book" &&
      item.senderId === currentAccount?.id,
  );
  if (!share) return;
  elements.recommendationEditForm.reset();
  elements.recommendationEditError.textContent = "";
  elements.recommendationEditId.value = share.id;
  elements.recommendationEditTitle.value = share.payload.title || "";
  elements.recommendationEditAuthor.value = share.payload.author || "";
  elements.recommendationEditMessage.value = share.message || "";
  elements.recommendationEditDialog.showModal();
}

async function saveRecommendationEdit() {
  elements.recommendationEditError.textContent = "";
  try {
    await apiRequest("share-edit", {
      method: "POST",
      body: {
        shareId: elements.recommendationEditId.value,
        title: elements.recommendationEditTitle.value.trim(),
        author: elements.recommendationEditAuthor.value.trim(),
        message: elements.recommendationEditMessage.value.trim(),
      },
    });
    elements.recommendationEditDialog.close();
    await loadCommunity();
    renderCommunity();
    showToast("Recommendation updated.");
  } catch (error) {
    elements.recommendationEditError.textContent = error.message;
  }
}

async function deleteRecommendation(shareId) {
  try {
    await apiRequest("share-delete", {
      method: "POST",
      body: { shareId },
    });
    await loadCommunity();
    renderCommunity();
    await refreshProfileActivity().catch(() => {});
    showToast("Recommendation deleted.");
  } catch (error) {
    showToast(error.message);
  }
}

async function addRecommendationToWishlist(shareId) {
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
  try {
    await apiRequest("recommendation-wishlist", {
      method: "POST",
      body: { shareId },
    });
  } catch {
    // The wishlist remains saved if the social notification is briefly offline.
  }
  await refreshProfileActivity().catch(() => {});
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

function currentReadingFact() {
  if (!readingFacts.length || !currentAccount) return null;
  return readingFacts[readingFactIndex % readingFacts.length];
}

function renderReadingFact() {
  window.clearInterval(readingFactTimer);
  const fact = currentReadingFact();
  if (!fact || sessionStorage.getItem("reading-facts-dismissed")) {
    elements.readingFactBanner.hidden = true;
    return;
  }
  elements.readingFactText.textContent = fact.fact;
  elements.readingFactBanner.dataset.factId = fact.id;
  elements.readingFactBanner.hidden = false;
  if (readingFacts.length > 1) {
    readingFactTimer = window.setInterval(() => {
      readingFactIndex = (readingFactIndex + 1) % readingFacts.length;
      const nextFact = currentReadingFact();
      elements.readingFactText.classList.add("changing");
      window.setTimeout(() => {
        elements.readingFactText.textContent = nextFact.fact;
        elements.readingFactBanner.dataset.factId = nextFact.id;
        elements.readingFactText.classList.remove("changing");
      }, 180);
    }, 30_000);
  }
}

function dismissReadingFact() {
  sessionStorage.setItem("reading-facts-dismissed", "1");
  window.clearInterval(readingFactTimer);
  elements.readingFactBanner.hidden = true;
}

function currentDreamFact() {
  if (!dreamFacts.length || !currentAccount) return null;
  return dreamFacts[dreamFactIndex % dreamFacts.length];
}

function renderDreamFact() {
  window.clearInterval(dreamFactTimer);
  const fact = currentDreamFact();
  if (!fact || sessionStorage.getItem("dream-facts-dismissed")) {
    elements.dreamFactBanner.hidden = true;
    return;
  }
  elements.dreamFactText.textContent = fact.fact;
  elements.dreamFactBanner.dataset.factId = fact.id;
  elements.dreamFactBanner.hidden = false;
  if (dreamFacts.length > 1) {
    dreamFactTimer = window.setInterval(() => {
      dreamFactIndex = (dreamFactIndex + 1) % dreamFacts.length;
      const nextFact = currentDreamFact();
      elements.dreamFactText.classList.add("changing");
      window.setTimeout(() => {
        elements.dreamFactText.textContent = nextFact.fact;
        elements.dreamFactBanner.dataset.factId = nextFact.id;
        elements.dreamFactText.classList.remove("changing");
      }, 180);
    }, 30_000);
  }
}

function dismissDreamFact() {
  sessionStorage.setItem("dream-facts-dismissed", "1");
  window.clearInterval(dreamFactTimer);
  elements.dreamFactBanner.hidden = true;
}

function formatMarketPrice(price, currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${currency} ${Number(price).toFixed(2)}`;
  }
}

function renderMarketplace() {
  if (!currentAccount) return;
  elements.marketplaceGrid.innerHTML = marketplaceListings
    .map((listing) => {
      const seller = accounts.find(
        (account) => account.id === listing.sellerId,
      ) || {
        username: listing.seller,
        profileImage: listing.sellerImage,
      };
      const isSeller = listing.sellerId === currentAccount.id;
      return `
        <article class="marketplace-card">
          <div class="marketplace-card-heading">
            <div class="mini-avatar" ${avatarFrameAttribute(seller)}>${avatarMarkup(seller)}</div>
            <div>
              <h3>${escapeHtml(listing.title)}</h3>
              <p>by ${escapeHtml(listing.author)} / listed by ${escapeHtml(listing.seller)}</p>
            </div>
            <strong class="marketplace-price">${escapeHtml(formatMarketPrice(listing.price, listing.currency))}</strong>
          </div>
          ${listing.genre ? `<span class="marketplace-genre">${escapeHtml(listing.genre)}</span>` : ""}
          ${listing.note ? `<p class="marketplace-note">${escapeHtml(listing.note)}</p>` : ""}
          <div class="marketplace-thread">
            <h4>Price discussion</h4>
            <div class="marketplace-messages">
              ${
                (listing.messages || []).length
                  ? listing.messages
                      .map(
                        (message) => `
                          <div class="marketplace-message">
                            <strong>${escapeHtml(message.author)}</strong>
                            ${
                              message.offerPrice !== null
                                ? `<span class="marketplace-offer">Offers ${escapeHtml(formatMarketPrice(message.offerPrice, listing.currency))}</span>`
                                : ""
                            }
                            ${message.message ? `<p>${escapeHtml(message.message)}</p>` : ""}
                            <time>${new Date(message.createdAt).toLocaleString()}</time>
                          </div>
                        `,
                      )
                      .join("")
                  : '<p class="marketplace-no-messages">No discussion yet.</p>'
              }
            </div>
            <form class="marketplace-message-form" data-listing-id="${listing.id}">
              <label>
                <span class="sr-only">Comment about ${escapeHtml(listing.title)}</span>
                <input name="message" maxlength="1000" placeholder="Ask a question or discuss the price..." />
              </label>
              <label>
                <span>Offer (${escapeHtml(listing.currency)})</span>
                <input name="offerPrice" type="number" min="0.01" max="1000000" step="0.01" inputmode="decimal" />
              </label>
              <button type="submit">Post</button>
            </form>
          </div>
          ${
            isSeller
              ? `<button class="marketplace-withdraw" type="button" data-market-action="withdraw" data-id="${listing.id}">Withdraw listing</button>`
              : ""
          }
        </article>
      `;
    })
    .join("");
  elements.marketplaceGrid.hidden = marketplaceListings.length === 0;
  elements.marketplaceEmpty.hidden = marketplaceListings.length > 0;
}

async function postMarketMessage(listingId, formData) {
  try {
    await apiRequest("market-message", {
      method: "POST",
      body: {
        listingId,
        message: formData.get("message").trim(),
        offerPrice: formData.get("offerPrice"),
      },
    });
    await loadMarketplace();
    renderMarketplace();
    showToast("Your marketplace response was posted.");
  } catch (error) {
    showToast(error.message);
  }
}

async function withdrawMarketListing(listingId) {
  try {
    await apiRequest("market-withdraw", {
      method: "POST",
      body: { listingId },
    });
    await loadMarketplace();
    renderMarketplace();
    showToast("The listing was withdrawn.");
  } catch (error) {
    showToast(error.message);
  }
}

function applyEquippedCosmetics() {
  if (equippedTheme) document.body.dataset.theme = equippedTheme;
  else delete document.body.dataset.theme;
  const profileWrap = elements.profilePhoto.closest(".profile-photo-wrap");
  if (profileWrap) profileWrap.dataset.frame = equippedFrame;
  elements.profileRunesCount.textContent = runesBalance;
  elements.chippingsRunesCount.textContent = runesBalance;
}

function storePreviewMarkup(item) {
  const colors = item.preview || [];
  if (item.type === "theme") {
    return `
      <div class="store-theme-preview" style="--preview-one:${colors[0]};--preview-two:${colors[1]};--preview-three:${colors[2]}">
        <span></span><span></span><span></span>
        <i></i>
      </div>
    `;
  }
  return `
    <div class="store-frame-preview" data-frame="${item.key}">
      <span>R</span>
    </div>
  `;
}

function renderChippings() {
  elements.chippingsRunesCount.textContent = runesBalance;
  const visibleItems = storeItems.filter((item) => {
    if (storeView === "owned") return item.owned;
    return storeView === "all" || item.type === storeView;
  });
  elements.chippingsGrid.innerHTML = visibleItems
    .map((item) => {
      const equipped =
        item.type === "theme"
          ? equippedTheme === item.key
          : equippedFrame === item.key;
      return `
        <article class="chippings-card ${item.owned ? "owned" : ""} ${equipped ? "equipped" : ""}">
          ${storePreviewMarkup(item)}
          <div class="chippings-card-copy">
            <p>${item.type === "theme" ? "UI THEME" : "PROFILE FRAME"}</p>
            <h3>${escapeHtml(item.name)}</h3>
            <span>${escapeHtml(item.description)}</span>
          </div>
          <div class="chippings-card-action">
            ${
              item.owned
                ? `<button
                    type="button"
                    data-store-action="equip"
                    data-type="${item.type}"
                    data-key="${item.key}"
                    ${equipped ? "disabled" : ""}
                  >${equipped ? "Equipped" : "Equip"}</button>`
                : `<button
                    type="button"
                    data-store-action="purchase"
                    data-key="${item.key}"
                    ${runesBalance < item.price ? "disabled" : ""}
                  >Buy for ${item.price} Runes</button>`
            }
            ${item.owned ? '<strong>Owned</strong>' : `<strong>${item.price} Runes</strong>`}
          </div>
        </article>
      `;
    })
    .join("");
  elements.chippingsGrid.hidden = visibleItems.length === 0;
  elements.chippingsEmpty.hidden = visibleItems.length > 0;
}

async function purchaseStoreItem(itemKey) {
  try {
    await apiRequest("store-purchase", {
      method: "POST",
      body: { itemKey },
    });
    await Promise.all([
      loadChippings(),
      loadCommunity(),
      refreshProfileActivity(),
    ]);
    renderCommunity();
    showToast("Your purchase has been added to your collection.");
  } catch (error) {
    showToast(error.message);
  }
}

async function equipStoreItem(type, itemKey) {
  try {
    await apiRequest("store-equip", {
      method: "POST",
      body: { type, itemKey },
    });
    await Promise.all([loadChippings(), loadCommunity()]);
    renderCommunity();
    updateProfileDisplay();
    showToast(type === "theme" ? "Theme equipped." : "Profile frame equipped.");
  } catch (error) {
    showToast(error.message);
  }
}

function renderAdminFacts() {
  if (!currentAccount || currentAccount.role !== "admin") {
    elements.adminFactList.innerHTML = "";
    return;
  }
  elements.adminFactList.innerHTML = readingFacts
    .map(
      (item) => `
        <article class="admin-fact-row">
          <p>${escapeHtml(item.fact)}</p>
          ${
            item.removable
              ? `<button type="button" data-fact-action="delete" data-id="${item.id}">Delete</button>`
              : '<span>Built in</span>'
          }
        </article>
      `,
    )
    .join("");
}

function renderAdminDreamFacts() {
  if (!currentAccount || currentAccount.role !== "admin") {
    elements.adminDreamFactList.innerHTML = "";
    return;
  }
  elements.adminDreamFactList.innerHTML = dreamFacts
    .map(
      (item) => `
        <article class="admin-fact-row">
          <p>${escapeHtml(item.fact)}</p>
          ${
            item.removable
              ? `<button type="button" data-dream-fact-action="delete" data-id="${item.id}">Delete</button>`
              : "<span>Built in</span>"
          }
        </article>
      `,
    )
    .join("");
}

async function addDreamFact(formData) {
  elements.adminDreamFactError.textContent = "";
  try {
    await apiRequest("dream-fact-save", {
      method: "POST",
      body: { fact: formData.get("fact").trim() },
    });
    elements.adminDreamFactForm.reset();
    await loadDreamFacts();
    showToast("Dream fact added for everyone.");
  } catch (error) {
    elements.adminDreamFactError.textContent = error.message;
  }
}

async function deleteDreamFact(id) {
  try {
    await apiRequest("dream-fact-delete", { method: "POST", body: { id } });
    await loadDreamFacts();
    showToast("Dream fact removed.");
  } catch (error) {
    showToast(error.message);
  }
}

async function addReadingFact(formData) {
  elements.adminFactError.textContent = "";
  try {
    await apiRequest("fact-save", {
      method: "POST",
      body: { fact: formData.get("fact").trim() },
    });
    elements.adminFactForm.reset();
    await loadReadingFacts();
    showToast("Reading fact added for everyone.");
  } catch (error) {
    elements.adminFactError.textContent = error.message;
  }
}

async function deleteReadingFact(id) {
  try {
    await apiRequest("fact-delete", { method: "POST", body: { id } });
    await loadReadingFacts();
    showToast("Reading fact removed.");
  } catch (error) {
    showToast(error.message);
  }
}

function debateParticipantMarkup(name, image) {
  return image
    ? `<span class="debate-person"><img src="${image}" alt="" />${escapeHtml(name)}</span>`
    : `<span class="debate-person"><i>${escapeHtml(name.charAt(0).toUpperCase())}</i>${escapeHtml(name)}</span>`;
}

function renderDebates() {
  if (!currentAccount) return;
  elements.debateList.innerHTML = debates
    .map((debate) => {
      const isInviter = debate.inviterId === currentAccount.id;
      const isInvitee = debate.inviteeId === currentAccount.id;
      const isParticipant = isInviter || isInvitee;
      const pending = debate.status === "pending";
      return `
        <article class="debate-card ${pending ? "pending" : ""}">
          <div class="debate-card-heading">
            <div>
              <p class="eyebrow">${pending ? "PENDING INVITATION" : "PUBLIC DEBATE"}</p>
              <h3>${escapeHtml(debate.topic)}</h3>
            </div>
            <span class="debate-access">${pending ? "Invitation" : isParticipant ? "Participant" : "Read only"}</span>
          </div>
          <div class="debate-participants">
            ${debateParticipantMarkup(debate.inviter, debate.inviterImage)}
            <span>and</span>
            ${debateParticipantMarkup(debate.invitee, debate.inviteeImage)}
          </div>
          ${
            pending
              ? `<div class="debate-invitation-actions">
                  ${
                    isInvitee
                      ? `<button type="button" data-debate-action="respond" data-decision="accepted" data-id="${debate.id}">Accept</button>
                         <button type="button" data-debate-action="respond" data-decision="declined" data-id="${debate.id}">Decline</button>`
                      : `<p>Waiting for ${escapeHtml(debate.invitee)} to respond.</p>`
                  }
                </div>`
              : `<div class="debate-messages">
                  ${
                    debate.messages.length
                      ? debate.messages
                          .map(
                            (message) => `
                              <div class="debate-message">
                                <strong>${escapeHtml(message.author)}</strong>
                                <p>${escapeHtml(message.message)}</p>
                                <time>${new Date(message.createdAt).toLocaleString()}</time>
                              </div>
                            `,
                          )
                          .join("")
                      : '<p class="debate-no-messages">The floor is open. No messages yet.</p>'
                  }
                </div>
                ${
                  isParticipant
                    ? `<form class="debate-message-form" data-debate-id="${debate.id}">
                        <label>
                          <span class="sr-only">Add to this debate</span>
                          <textarea name="message" rows="3" maxlength="3000" placeholder="Make your point..." required></textarea>
                        </label>
                        <button type="submit">Send message</button>
                      </form>`
                    : '<p class="debate-spectator-note">You may follow this exchange, but only the invited participants can contribute.</p>'
                }`
          }
        </article>
      `;
    })
    .join("");
  elements.debateList.hidden = debates.length === 0;
  elements.debateEmpty.hidden = debates.length > 0;
}

function openDebateInvite(accountId) {
  const account = accounts.find((item) => item.id === accountId);
  if (!account || account.id === currentAccount?.id) return;
  elements.debateInviteForm.reset();
  elements.debateInviteError.textContent = "";
  elements.debateInviteeId.value = account.id;
  elements.debateInviteeSummary.textContent = `Invite ${account.username} to a public, two-person debate.`;
  elements.debateInviteDialog.showModal();
}

async function sendDebateInvite(formData) {
  elements.debateInviteError.textContent = "";
  try {
    await apiRequest("debate-invite", {
      method: "POST",
      body: {
        inviteeId: formData.get("inviteeId"),
        topic: formData.get("topic").trim(),
      },
    });
    elements.debateInviteDialog.close();
    await loadSocialSpaces();
    renderDebates();
    setCommunityView("debates");
    showToast("Debate invitation sent.");
  } catch (error) {
    elements.debateInviteError.textContent = error.message;
  }
}

async function respondToDebate(debateId, decision) {
  try {
    await apiRequest("debate-respond", {
      method: "POST",
      body: { debateId, decision },
    });
    await loadSocialSpaces();
    renderDebates();
    showToast(
      decision === "accepted"
        ? "Debate invitation accepted."
        : "Debate invitation declined.",
    );
  } catch (error) {
    showToast(error.message);
  }
}

async function postDebateMessage(debateId, message) {
  try {
    await apiRequest("debate-message", {
      method: "POST",
      body: { debateId, message },
    });
    await loadSocialSpaces();
    renderDebates();
  } catch (error) {
    showToast(error.message);
  }
}

function challengeUnit(type, value) {
  if (type === "minutes") return formatDuration(value);
  if (type === "sessions") {
    return `${value} ${value === 1 ? "session" : "sessions"}`;
  }
  return `${Number(value).toLocaleString()} ${value === 1 ? "page" : "pages"}`;
}

function renderReadingChallenges() {
  elements.challengeList.innerHTML = readingChallenges
    .map((challenge) => {
      const received = challenge.inviteeId === currentAccount?.id;
      const progress = Math.min(challenge.progress, challenge.target);
      const percent = Math.min(
        100,
        Math.round((progress / challenge.target) * 100),
      );
      return `
        <article class="challenge-card ${escapeHtml(challenge.status)}">
          <div class="challenge-card-heading">
            <div>
              <p class="eyebrow">${received ? `FROM ${escapeHtml(challenge.inviter)}` : `FOR ${escapeHtml(challenge.invitee)}`}</p>
              <h3>${escapeHtml(challenge.title)}</h3>
            </div>
            <span>${escapeHtml(challenge.status)}</span>
          </div>
          ${challenge.message ? `<p>${escapeHtml(challenge.message)}</p>` : ""}
          <div class="challenge-progress">
            <div><span style="width:${percent}%"></span></div>
            <strong>${escapeHtml(challengeUnit(challenge.type, progress))} / ${escapeHtml(challengeUnit(challenge.type, challenge.target))}</strong>
          </div>
          <footer>Deadline: ${escapeHtml(formatDate(challenge.deadline))}</footer>
          ${
            received && challenge.status === "pending"
              ? `<div class="challenge-actions">
                  <button type="button" data-challenge-action="respond" data-decision="accepted" data-id="${challenge.id}">Accept</button>
                  <button type="button" data-challenge-action="respond" data-decision="declined" data-id="${challenge.id}">Decline</button>
                </div>`
              : ""
          }
        </article>
      `;
    })
    .join("");
  elements.challengeList.hidden = readingChallenges.length === 0;
  elements.challengeEmpty.hidden = readingChallenges.length > 0;
}

function openReadingChallenge(accountId = activeReaderId) {
  const account = accounts.find((item) => item.id === accountId);
  if (!account || account.id === currentAccount?.id) return;
  elements.readingChallengeForm.reset();
  elements.readingChallengeError.textContent = "";
  elements.readingChallengeInviteeId.value = account.id;
  elements.readingChallengeSummary.textContent =
    `Set a friendly, measurable reading goal for ${account.username}.`;
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  elements.readingChallengeDeadline.value = localDateString(deadline);
  elements.readerProfileDialog.close();
  elements.readingChallengeDialog.showModal();
}

async function sendReadingChallenge(formData) {
  elements.readingChallengeError.textContent = "";
  try {
    await apiRequest("reading-challenge-invite", {
      method: "POST",
      body: {
        inviteeId: formData.get("inviteeId"),
        title: formData.get("title").trim(),
        type: formData.get("type"),
        target: Number(formData.get("target")),
        deadline: formData.get("deadline"),
        message: formData.get("message").trim(),
      },
    });
    elements.readingChallengeDialog.close();
    await loadSocialSpaces();
    renderReadingChallenges();
    setCommunityView("challenges");
    showToast("Reading challenge sent.");
  } catch (error) {
    elements.readingChallengeError.textContent = error.message;
  }
}

async function respondToReadingChallenge(challengeId, decision) {
  try {
    await apiRequest("reading-challenge-respond", {
      method: "POST",
      body: { challengeId, decision },
    });
    await loadSocialSpaces();
    renderReadingChallenges();
    showToast(
      decision === "accepted"
        ? "Reading challenge accepted."
        : "Reading challenge declined.",
    );
  } catch (error) {
    showToast(error.message);
  }
}

function renderAnnouncements() {
  if (!currentAccount) return;
  elements.announcementForm.hidden = currentAccount.role !== "admin";
  elements.announcementList.innerHTML = announcements
    .map(
      (announcement) => `
        <article class="announcement-card">
          <div class="announcement-card-heading">
            <div>
              <p class="eyebrow">COMMUNITY NOTICE</p>
              <h3>${escapeHtml(announcement.title)}</h3>
            </div>
            ${
              currentAccount.role === "admin"
                ? `<button type="button" data-announcement-action="delete" data-id="${announcement.id}">Delete</button>`
                : ""
            }
          </div>
          <p>${escapeHtml(announcement.message)}</p>
          <footer>Posted by ${escapeHtml(announcement.author)} on ${new Date(announcement.createdAt).toLocaleDateString()}</footer>
        </article>
      `,
    )
    .join("");
  elements.announcementList.hidden = announcements.length === 0;
  elements.announcementEmpty.hidden = announcements.length > 0;
}

async function saveAnnouncement(formData) {
  elements.announcementError.textContent = "";
  try {
    await apiRequest("announcement-save", {
      method: "POST",
      body: {
        title: formData.get("title").trim(),
        message: formData.get("message").trim(),
      },
    });
    elements.announcementForm.reset();
    await loadSocialSpaces();
    renderAnnouncements();
    showToast("Announcement posted for everyone.");
  } catch (error) {
    elements.announcementError.textContent = error.message;
  }
}

async function deleteAnnouncement(id) {
  try {
    await apiRequest("announcement-delete", {
      method: "POST",
      body: { id },
    });
    await loadSocialSpaces();
    renderAnnouncements();
    showToast("Announcement removed.");
  } catch (error) {
    showToast(error.message);
  }
}

function renderAdminQuandaries() {
  if (!currentAccount || currentAccount.role !== "admin") {
    elements.adminQuandaryList.innerHTML = "";
    elements.adminQuandaryEmpty.hidden = true;
    return;
  }
  elements.adminQuandaryList.innerHTML = quandaries
    .map(
      (item) => `
        <article class="admin-quandary ${item.status}">
          <div class="admin-quandary-heading">
            <div>
              <span>${escapeHtml(item.category)}</span>
              <h4>${escapeHtml(item.title)}</h4>
              <p>Reported by ${escapeHtml(item.username)} on ${new Date(item.createdAt).toLocaleString()}</p>
            </div>
            <strong>${escapeHtml(item.status)}</strong>
          </div>
          <p class="admin-quandary-details">${escapeHtml(item.details)}</p>
          ${
            item.status === "open"
              ? `<form class="quandary-resolve-form" data-quandary-id="${item.id}">
                  <label>
                    <span>Reply or resolution note (optional)</span>
                    <textarea name="adminNote" rows="3" maxlength="2000" placeholder="Tell the reader how this was handled."></textarea>
                  </label>
                  <button type="submit">Mark resolved</button>
                </form>`
              : `<p class="admin-quandary-note">${
                  item.adminNote
                    ? `Admin response: ${escapeHtml(item.adminNote)}`
                    : "Reviewed by the administrator."
                }</p>`
          }
        </article>
      `,
    )
    .join("");
  elements.adminQuandaryList.hidden = quandaries.length === 0;
  elements.adminQuandaryEmpty.hidden = quandaries.length > 0;
}

function openQuandaryForm() {
  elements.quandaryForm.reset();
  elements.quandaryError.textContent = "";
  elements.quandaryDialog.showModal();
}

async function saveQuandary(formData) {
  elements.quandaryError.textContent = "";
  try {
    await apiRequest("quandary-save", {
      method: "POST",
      body: {
        category: formData.get("category"),
        title: formData.get("title").trim(),
        details: formData.get("details").trim(),
      },
    });
    elements.quandaryDialog.close();
    await Promise.all([loadSocialSpaces(), refreshProfileActivity()]);
    renderAdminQuandaries();
    showToast("Your quandary was reported to the Admin.");
  } catch (error) {
    elements.quandaryError.textContent = error.message;
  }
}

async function resolveQuandary(id, adminNote) {
  try {
    await apiRequest("quandary-resolve", {
      method: "POST",
      body: { id, adminNote },
    });
    await loadSocialSpaces();
    renderAdminQuandaries();
    showToast("Quandary marked as resolved.");
  } catch (error) {
    showToast(error.message);
  }
}

function setCommunityView(view) {
  if (view === "admin" && currentAccount?.role !== "admin") return;
  elements.communityReadersView.hidden = view !== "readers";
  elements.communityFollowersView.hidden = view !== "followers";
  elements.communityFollowingView.hidden = view !== "following";
  elements.communityFeedView.hidden = view !== "feed";
  elements.communityJournalsView.hidden = view !== "journals";
  elements.communityMarketplaceView.hidden = view !== "marketplace";
  elements.communityDebatesView.hidden = view !== "debates";
  elements.communityChallengesView.hidden = view !== "challenges";
  elements.communityBulletinView.hidden = view !== "bulletin";
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
  renderFollowLists();
  renderShareFeed();
  renderSharedJournals();
  renderMarketplace();
  renderDebates();
  renderReadingChallenges();
  renderAnnouncements();
  renderAdminFacts();
  renderAdminQuandaries();
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

function renderReaderCatalogueLegacy() {
  const query = elements.readerCatalogueSearch.value.trim().toLowerCase();
  const status = elements.readerCatalogueStatus.value;
  const filteredBooks = activeReaderCatalogue
    .filter((book) => {
      const matchesQuery = [book.title, book.author, book.genre]
        .join(" ")
        .toLowerCase()
        .includes(query);
      return matchesQuery && (status === "all" || book.status === status);
    })
    .sort((first, second) =>
      first.title.localeCompare(second.title, undefined, {
        sensitivity: "base",
      }),
    );
  const displayedBooks = readerCatalogueExpanded
    ? filteredBooks
    : filteredBooks.slice(0, CATALOGUE_PREVIEW_LIMIT);
  elements.readerCatalogueCount.textContent = `${filteredBooks.length} ${
    filteredBooks.length === 1 ? "book" : "books"
  }${filteredBooks.length !== activeReaderCatalogue.length ? ` of ${activeReaderCatalogue.length}` : ""}`;
  elements.readerCatalogueExpandButton.hidden =
    filteredBooks.length <= CATALOGUE_PREVIEW_LIMIT;
  elements.readerCatalogueExpandButton.textContent = readerCatalogueExpanded
    ? "Show fewer books"
    : `Show all ${filteredBooks.length} books`;
  elements.readerProfileBookList.innerHTML = filteredBooks.length
    ? displayedBooks
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
                  ${book.status === "read" ? "Read" : book.status === "reading" ? "Busy reading" : "To be read"}
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

function renderReaderCatalogue() {
  const query = elements.readerCatalogueSearch.value.trim().toLowerCase();
  const status = elements.readerCatalogueStatus.value;
  const filteredBooks = activeReaderCatalogue
    .filter((book) => {
      const matchesQuery = [book.title, book.author, book.genre, book.format]
        .join(" ")
        .toLowerCase()
        .includes(query);
      return matchesQuery && (status === "all" || book.status === status);
    })
    .sort((first, second) =>
      first.title.localeCompare(second.title, undefined, {
        sensitivity: "base",
      }),
    );
  const displayedBooks = readerCatalogueExpanded
    ? filteredBooks
    : filteredBooks.slice(0, CATALOGUE_PREVIEW_LIMIT);
  elements.readerCatalogueCount.textContent = `${filteredBooks.length} ${
    filteredBooks.length === 1 ? "book" : "books"
  }${filteredBooks.length !== activeReaderCatalogue.length ? ` of ${activeReaderCatalogue.length}` : ""}`;
  elements.readerCatalogueExpandButton.hidden =
    filteredBooks.length <= CATALOGUE_PREVIEW_LIMIT;
  elements.readerCatalogueExpandButton.textContent = readerCatalogueExpanded
    ? "Show fewer books"
    : `Show all ${filteredBooks.length} books`;
  elements.readerProfileBookList.innerHTML = filteredBooks.length
    ? `<div class="reader-public-book-grid">${displayedBooks
        .map((book) => {
          const rating = Number(book.rating) || 0;
          const cover = book.coverImage
            ? `<img src="${book.coverImage}" alt="The user's copy of ${escapeHtml(book.title)}" />`
            : `<div class="book-cover-placeholder" aria-hidden="true">${escapeHtml(book.title.charAt(0).toUpperCase())}</div>`;
          return `
            <article class="book-card reader-public-book-card" data-public-book-id="${escapeHtml(book.id)}" style="--card-accent: ${colorForGenre(book.genre)}">
              <div class="book-cover" title="${book.coverImage ? "View full picture" : "No picture added"}">${cover}</div>
              <div class="book-card-labels">
                <p class="genre-label">${escapeHtml(book.genre || "Uncategorized")}</p>
                <span class="book-format-badge ${escapeHtml(book.format || "print")}">${escapeHtml(bookFormatLabel(book.format))}</span>
              </div>
              <h3 class="book-title">${escapeHtml(book.title)}</h3>
              <p class="book-author">by ${escapeHtml(book.author)}</p>
              <div class="reader-public-rating" aria-label="${rating ? `${rating} out of 5 stars` : "Not rated"}">
                ${rating ? `${"&#9733;".repeat(rating)}${"&#9734;".repeat(5 - rating)}` : "Not rated"}
              </div>
              <span class="reader-book-status ${book.status}">
                ${book.status === "read" ? "Read" : book.status === "reading" ? "Busy reading" : "To be read"}
              </span>
            </article>
          `;
        })
        .join("")}</div>`
    : `<p class="reader-catalogue-empty">${
        activeReaderCatalogue.length
          ? "No books match this search."
          : "No books added yet."
      }</p>`;
}

async function openReaderProfile(accountId) {
  const account = accounts.find((item) => item.id === accountId);
  if (!account) return;
  activeReaderId = account.id;
  const stats = statsFor(account.id);
  elements.readerProfileName.textContent = account.username;
  elements.readerProfileAvatar.innerHTML = avatarMarkup(account);
  elements.readerProfileAvatar.dataset.frame = account.equippedFrame || "";
  elements.readerProfileStats.innerHTML = `
    <div class="reader-stat"><strong>${stats.total}</strong><span>Owned</span></div>
    <div class="reader-stat"><strong>${stats.read}</strong><span>Read</span></div>
    <div class="reader-stat"><strong>${stats.reading || 0}</strong><span>Reading</span></div>
    <div class="reader-stat"><strong>${stats.unread}</strong><span>To read</span></div>
    <div class="reader-stat rune-stat"><strong>${Number(account.runes) || 0}</strong><span>Runes</span></div>
  `;
  activeReaderCatalogue = [];
  readerCatalogueExpanded = false;
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
    await refreshProfileActivity().catch(() => {});
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
  .querySelector("#close-streak-reward-button")
  .addEventListener("click", () => elements.streakRewardDialog.close());
document
  .querySelector("#acknowledge-streak-reward")
  .addEventListener("click", () => elements.streakRewardDialog.close());
document
  .querySelector("#close-break-reminder")
  .addEventListener("click", dismissBreakReminder);
document
  .querySelector("#dismiss-break-reminder")
  .addEventListener("click", dismissBreakReminder);
document
  .querySelector("#open-journal-button")
  .addEventListener("click", openJournalForm);
document
  .querySelector("#empty-journal-button")
  .addEventListener("click", openJournalForm);
document
  .querySelector("#new-story-button")
  .addEventListener("click", createStory);
document
  .querySelector("#empty-new-story-button")
  .addEventListener("click", createStory);
document
  .querySelector("#delete-story-button")
  .addEventListener("click", deleteOpenStory);
document
  .querySelector("#close-journal-button")
  .addEventListener("click", () => elements.journalDialog.close());
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
  .querySelector("#open-dream-button")
  .addEventListener("click", () => openDreamForm());
document
  .querySelector("#close-dream-button")
  .addEventListener("click", () => elements.dreamDialog.close());
document
  .querySelector("#close-dream-analysis")
  .addEventListener("click", () => elements.dreamAnalysisDialog.close());
document
  .querySelector("#close-reader-profile-button")
  .addEventListener("click", () => elements.readerProfileDialog.close());
elements.openReaderChallenge.addEventListener("click", () =>
  openReadingChallenge(),
);
document
  .querySelector("#close-reading-challenge")
  .addEventListener("click", () => elements.readingChallengeDialog.close());
document
  .querySelector("#close-share-button")
  .addEventListener("click", () => elements.shareDialog.close());
document
  .querySelector("#close-recommendation-edit")
  .addEventListener("click", () => elements.recommendationEditDialog.close());
document
  .querySelector("#close-debate-invite-button")
  .addEventListener("click", () => elements.debateInviteDialog.close());
document
  .querySelector("#open-quandary-button")
  .addEventListener("click", openQuandaryForm);
document
  .querySelector("#close-quandary-button")
  .addEventListener("click", () => elements.quandaryDialog.close());
document
  .querySelector("#close-cover-view-button")
  .addEventListener("click", () => elements.coverViewDialog.close());
document
  .querySelector("#close-market-listing-button")
  .addEventListener("click", () => elements.marketListingDialog.close());
elements.menuToggle.addEventListener("click", () => {
  setFeatureMenu(elements.featureMenu.hidden);
});
elements.notificationChimeButton.addEventListener("click", () => {
  closeFeatureMenu();
  window.location.hash = "notifications-panel";
  window.setTimeout(() => {
    elements.notificationsPanel.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 80);
});
elements.featureMenu.addEventListener("click", (event) => {
  if (event.target.closest("a[href^='#']")) closeFeatureMenu();
});
elements.readingFactBanner.addEventListener("click", dismissReadingFact);
elements.readingFactBanner.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    dismissReadingFact();
  }
});
elements.dreamFactBanner.addEventListener("click", dismissDreamFact);
elements.dreamFactBanner.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    dismissDreamFact();
  }
});
document.querySelector("#logout-button").addEventListener("click", () => {
  saveOpenStory();
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

elements.dreamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.dreamForm.reportValidity()) {
    saveDreamEntry(new FormData(elements.dreamForm));
  }
});

elements.dreamAnalysisForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.dreamAnalysisForm.reportValidity()) {
    saveDreamAnalysis(new FormData(elements.dreamAnalysisForm));
  }
});

elements.shareForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.shareForm.reportValidity()) {
    shareItem(new FormData(elements.shareForm));
  }
});

elements.recommendationEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.recommendationEditForm.reportValidity()) {
    saveRecommendationEdit();
  }
});

elements.debateInviteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.debateInviteForm.reportValidity()) {
    sendDebateInvite(new FormData(elements.debateInviteForm));
  }
});

elements.readingChallengeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.readingChallengeForm.reportValidity()) {
    sendReadingChallenge(new FormData(elements.readingChallengeForm));
  }
});

elements.quandaryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.quandaryForm.reportValidity()) {
    saveQuandary(new FormData(elements.quandaryForm));
  }
});

elements.announcementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.announcementForm.reportValidity()) {
    saveAnnouncement(new FormData(elements.announcementForm));
  }
});

elements.adminFactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.adminFactForm.reportValidity()) {
    addReadingFact(new FormData(elements.adminFactForm));
  }
});

elements.adminDreamFactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.adminDreamFactForm.reportValidity()) {
    addDreamFact(new FormData(elements.adminDreamFactForm));
  }
});

elements.marketListingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.marketListingForm.reportValidity()) {
    createMarketListing(new FormData(elements.marketListingForm));
  }
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (elements.form.reportValidity()) {
    await saveBook(new FormData(elements.form));
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
    savePassage(new FormData(elements.passageForm));
  }
});

elements.journalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.journalForm.reportValidity()) {
    saveJournalEntry(new FormData(elements.journalForm));
  }
});

elements.storyEditor.addEventListener("submit", (event) => {
  event.preventDefault();
  saveOpenStory();
});

elements.storyEditor.addEventListener("input", scheduleStorySave);
elements.storyEditor.addEventListener("change", scheduleStorySave);

elements.storyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-story-id]");
  if (button) {
    saveOpenStory();
    openStory(button.dataset.storyId);
  }
});

document.querySelectorAll("[data-writing-view]").forEach((button) => {
  button.addEventListener("click", () => {
    setWritingView(button.dataset.writingView);
  });
});

elements.wordhubForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.wordhubForm.reportValidity()) saveWordhubEntry();
});

elements.wordhubCancelEdit.addEventListener("click", resetWordhubForm);
elements.wordhubSearchInput.addEventListener("input", renderWordhub);
elements.wordhubWordInput.addEventListener("input", () => {
  elements.wordhubWordInput.setCustomValidity("");
});
elements.wordhubList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-wordhub-action]");
  if (!button) return;
  if (button.dataset.wordhubAction === "edit") editWordhubEntry(button.dataset.id);
  if (button.dataset.wordhubAction === "delete") {
    deleteWordhubEntry(button.dataset.id);
  }
});

window.addEventListener("beforeunload", saveOpenStory);

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

elements.streakRewardDialog.addEventListener("click", (event) => {
  if (event.target === elements.streakRewardDialog) {
    elements.streakRewardDialog.close();
  }
});

elements.breakReminderDialog.addEventListener("click", (event) => {
  if (event.target === elements.breakReminderDialog) dismissBreakReminder();
});
elements.breakReminderDialog.addEventListener("close", () => {
  sessionStorage.setItem(BREAK_REMINDER_DISMISSED_KEY, "1");
  window.clearTimeout(breakReminderTimer);
});

elements.journalDialog.addEventListener("click", (event) => {
  if (event.target === elements.journalDialog) elements.journalDialog.close();
});

elements.dreamDialog.addEventListener("click", (event) => {
  if (event.target === elements.dreamDialog) elements.dreamDialog.close();
});

elements.dreamAnalysisDialog.addEventListener("click", (event) => {
  if (event.target === elements.dreamAnalysisDialog) {
    elements.dreamAnalysisDialog.close();
  }
});

elements.debateInviteDialog.addEventListener("click", (event) => {
  if (event.target === elements.debateInviteDialog) {
    elements.debateInviteDialog.close();
  }
});

elements.quandaryDialog.addEventListener("click", (event) => {
  if (event.target === elements.quandaryDialog) {
    elements.quandaryDialog.close();
  }
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

elements.recommendationEditDialog.addEventListener("click", (event) => {
  if (event.target === elements.recommendationEditDialog) {
    elements.recommendationEditDialog.close();
  }
});

elements.coverViewDialog.addEventListener("click", (event) => {
  if (event.target === elements.coverViewDialog) {
    elements.coverViewDialog.close();
  }
});

elements.marketListingDialog.addEventListener("click", (event) => {
  if (event.target === elements.marketListingDialog) {
    elements.marketListingDialog.close();
  }
});

elements.bookGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    const card = event.target.closest(".book-card");
    const book = books.find(
      (item) =>
        item.id === card?.dataset.bookId &&
        item.ownerId === currentAccount?.id,
    );
    if (book) openFullCover(book);
    return;
  }
  const { action, id } = button.dataset;
  if (action === "status") setBookStatus(id, button.dataset.status);
  if (action === "rate") rateBook(id, button.dataset.rating);
  if (action === "share") openShareDialog("book", id);
  if (action === "delete") removeBook(id);
  if (action === "cover") openCoverForm(id);
  if (action === "edit") openBookEditForm(id);
  if (action === "sell") openMarketListingForm(id);
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
  if (button?.dataset.passageAction === "edit") {
    openPassageForm(button.dataset.id);
  }
});

elements.journalGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-journal-action]");
  if (button?.dataset.journalAction === "delete") {
    deleteJournalEntry(button.dataset.id);
  }
});

elements.dreamList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-dream-action]");
  if (!button) return;
  if (button.dataset.dreamAction === "analyse") {
    openDreamAnalysis(button.dataset.id);
  }
  if (button.dataset.dreamAction === "edit") openDreamForm(button.dataset.id);
  if (button.dataset.dreamAction === "delete") deleteDream(button.dataset.id);
});

document.querySelectorAll("[data-print-list]").forEach((button) => {
  button.addEventListener("click", () => printList(button.dataset.printList));
});

function handleReaderAction(event) {
  const button = event.target.closest("button[data-community-action]");
  if (!button) return;
  if (button.dataset.communityAction === "follow") {
    toggleFollow(button.dataset.id);
  }
  if (button.dataset.communityAction === "profile") {
    openReaderProfile(button.dataset.id);
  }
  if (button.dataset.communityAction === "debate") {
    openDebateInvite(button.dataset.id);
  }
}

[
  elements.readerGrid,
  elements.followerGrid,
  elements.followingGrid,
].forEach((grid) => grid.addEventListener("click", handleReaderAction));

elements.readerCatalogueSearch.addEventListener("input", () => {
  readerCatalogueExpanded = false;
  renderReaderCatalogue();
});
elements.readerCatalogueStatus.addEventListener("change", () => {
  readerCatalogueExpanded = false;
  renderReaderCatalogue();
});
elements.readerCatalogueExpandButton.addEventListener("click", () => {
  readerCatalogueExpanded = !readerCatalogueExpanded;
  renderReaderCatalogue();
});
elements.readerProfileBookList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-public-book-id]");
  if (!card) return;
  const book = activeReaderCatalogue.find(
    (item) => item.id === card.dataset.publicBookId,
  );
  if (book) openFullCover(book);
});

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
  if (button?.dataset.shareAction === "edit") {
    openRecommendationEdit(button.dataset.id);
  }
  if (button?.dataset.shareAction === "delete") {
    deleteRecommendation(button.dataset.id);
  }
});

elements.profileNotificationList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-notification-id]");
  if (button) markNotificationsRead(button.dataset.notificationId);
});

elements.markNotificationsRead.addEventListener("click", () => {
  markNotificationsRead();
});

elements.adminAccountList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-admin-action]");
  if (button?.dataset.adminAction === "delete") {
    deleteAccountAsAdmin(button.dataset.id);
  }
});

elements.adminFactList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-fact-action]");
  if (button?.dataset.factAction === "delete") {
    deleteReadingFact(button.dataset.id);
  }
});

elements.adminDreamFactList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-dream-fact-action]");
  if (button?.dataset.dreamFactAction === "delete") {
    deleteDreamFact(button.dataset.id);
  }
});

elements.adminQuandaryList.addEventListener("submit", (event) => {
  const form = event.target.closest(".quandary-resolve-form");
  if (!form) return;
  event.preventDefault();
  resolveQuandary(
    form.dataset.quandaryId,
    new FormData(form).get("adminNote").trim(),
  );
});

elements.marketplaceGrid.addEventListener("submit", (event) => {
  const form = event.target.closest(".marketplace-message-form");
  if (!form) return;
  event.preventDefault();
  postMarketMessage(form.dataset.listingId, new FormData(form));
});

elements.marketplaceGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-market-action]");
  if (button?.dataset.marketAction === "withdraw") {
    withdrawMarketListing(button.dataset.id);
  }
});

elements.debateList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-debate-action]");
  if (button?.dataset.debateAction === "respond") {
    respondToDebate(
      button.dataset.id,
      button.dataset.decision,
    );
  }
});

elements.debateList.addEventListener("submit", (event) => {
  const form = event.target.closest(".debate-message-form");
  if (!form) return;
  event.preventDefault();
  const message = new FormData(form).get("message").trim();
  if (message) postDebateMessage(form.dataset.debateId, message);
});

elements.challengeList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-challenge-action]");
  if (button?.dataset.challengeAction === "respond") {
    respondToReadingChallenge(button.dataset.id, button.dataset.decision);
  }
});

elements.announcementList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-announcement-action]");
  if (button?.dataset.announcementAction === "delete") {
    deleteAnnouncement(button.dataset.id);
  }
});

elements.learningTaskGrid.addEventListener("submit", (event) => {
  const form = event.target.closest(
    ".learning-choice-form, .learning-writing-form",
  );
  if (!form) return;
  event.preventDefault();
  if (form.reportValidity()) completeLearningTask(form);
});

elements.chippingsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-store-action]");
  if (!button) return;
  if (button.dataset.storeAction === "purchase") {
    purchaseStoreItem(button.dataset.key);
  }
  if (button.dataset.storeAction === "equip") {
    equipStoreItem(button.dataset.type, button.dataset.key);
  }
});

document.querySelectorAll("[data-store-view]").forEach((button) => {
  button.addEventListener("click", () => {
    storeView = button.dataset.storeView;
    document.querySelectorAll("[data-store-view]").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    renderChippings();
  });
});

document.querySelectorAll("[data-store-reset]").forEach((button) => {
  button.addEventListener("click", () => {
    equipStoreItem(button.dataset.storeReset, "");
  });
});

elements.searchInput.addEventListener("input", () => {
  catalogueExpanded = false;
  renderBooks();
});
elements.genreFilter.addEventListener("change", () => {
  catalogueExpanded = false;
  renderBooks();
});
elements.statusFilter.addEventListener("change", () => {
  catalogueExpanded = false;
  renderBooks();
});
elements.catalogueExpandButton.addEventListener("click", () => {
  catalogueExpanded = !catalogueExpanded;
  renderBooks();
});
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
elements.archetypeSearchInput.addEventListener("input", renderArchetypeReference);
elements.jungConceptSearchInput.addEventListener("input", renderJungConceptReference);
elements.wordhubLookupButton.addEventListener("click", lookupWordDefinition);
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
  ensureAudioContext();
  if (
    !elements.featureMenu.hidden &&
    !event.target.closest(".site-nav")
  ) {
    closeFeatureMenu();
  }
  if (
    openMenuId &&
    !event.target.closest(".book-card") &&
    !event.target.closest(".menu-button")
  ) {
    openMenuId = null;
    renderBooks();
  }
});

document.addEventListener("keydown", (event) => {
  ensureAudioContext();
  if (event.key === "Escape" && !elements.featureMenu.hidden) {
    closeFeatureMenu();
    elements.menuToggle.focus();
  }
});
window.addEventListener("hashchange", closeFeatureMenu);

renderArchetypeReference();
renderJungConceptReference();
migrateAccountData();
initializeAuthentication();
