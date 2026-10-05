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
const LIFESTYLE_STORAGE_KEY = "my-library-lifestyle-v1";
const DREAMS_STORAGE_KEY = "my-library-dreams-v1";
const NILLION_VOICE_KEY = "my-library-nillion-voice-v1";
const COLLECTION_VIEW_KEY = "my-library-collection-view-v1";
const READING_CHART_TYPE_KEY = "my-library-reading-chart-type-v1";
const BREAK_REMINDER_DISMISSED_KEY = "my-library-break-reminder-dismissed";
const BREAK_REMINDER_DELAY = 25 * 60 * 1000;
const READING_CHART_TYPES = new Set([
  "pages-over-time",
  "reading-speed",
  "books",
  "genres",
  "formats",
  "time-of-day",
  "weekdays",
  "session-length",
]);

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

const WRITING_PROMPT_BANK = {
  genre: [
    "Write a mystery in which the clue everyone ignored was sitting in a library all along.",
    "Write a quiet literary scene where two people realise they have been reading the same life differently.",
    "Write a fantasy premise shaped by a rule hidden inside an old catalogue card.",
    "Write a memoir fragment about a book that changed how someone speaks to themselves.",
  ],
  character: [
    "A meticulous archivist who cannot remember their own childhood.",
    "A bookseller who recommends the wrong book on purpose for the right reason.",
    "A poet who only writes when copying words from someone else's margins.",
    "A stubborn scholar trying to prove a family myth false.",
  ],
  setting: [
    "A library wing that opens only during storms.",
    "A boarding house above a second-hand bookshop.",
    "A reading room where every desk is reserved for someone who has not arrived yet.",
    "A city train line where commuters leave annotated paperbacks for strangers.",
  ],
  object: [
    "A pressed flower used as a bookmark for three generations.",
    "A cracked fountain pen that writes only when its owner tells the truth.",
    "A library card with one name crossed out and another written beneath it.",
    "A key hidden inside a hollowed-out dictionary.",
  ],
  "first line": [
    "\"By the time the library bell rang, I had already lied twice.\"",
    "\"No one noticed the missing page until it began changing the ending.\"",
    "\"The book was returned seventy years late, still warm.\"",
    "\"My grandmother told me to read the margins before I trusted the story.\"",
  ],
  "library-inspired": [
    "Write a story in which the act of shelving books becomes a map of someone's inner life.",
    "Write about two readers who meet only through notes left inside borrowed books.",
    "Write a scene where a catalogue system reveals a hidden relationship between strangers.",
    "Write about an overdue book that keeps returning by itself.",
  ],
  "book-inspired": [
    "Take a beloved novel's emotional atmosphere and place it in a completely different setting.",
    "Write about the reader rather than the hero: how a difficult book changes the one reading it.",
    "Imagine a side character from a classic text secretly keeping a private journal.",
    "Write a scene where a recommendation changes the course of someone's week.",
  ],
};

const elements = {
  bookGrid: document.querySelector("#book-grid"),
  nillionAssistant: document.querySelector("#nillion-assistant"),
  nillionStage: document.querySelector("#nillion-stage"),
  nillionForm: document.querySelector("#nillion-form"),
  nillionInput: document.querySelector("#nillion-input"),
  nillionResponse: document.querySelector("#nillion-response"),
  nillionVoiceToggle: document.querySelector("#nillion-voice-toggle"),
  nillionVoiceLabel: document.querySelector("#nillion-voice-label"),
  collectionViewDescription: document.querySelector("#collection-view-description"),
  coverFlow: document.querySelector("#cover-flow"),
  coverFlowTrack: document.querySelector("#cover-flow-track"),
  coverFlowDetails: document.querySelector("#cover-flow-details"),
  coverFlowPrevious: document.querySelector("#cover-flow-previous"),
  coverFlowNext: document.querySelector("#cover-flow-next"),
  coverFlowPosition: document.querySelector("#cover-flow-position"),
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
  bookFirstPageInput: document.querySelector("#book-first-page-input"),
  bookLastPageInput: document.querySelector("#book-last-page-input"),
  bookCurrentPageInput: document.querySelector("#book-current-page-input"),
  authorSuggestions: document.querySelector("#author-suggestions"),
  toast: document.querySelector("#toast"),
  logDialog: document.querySelector("#log-dialog"),
  logForm: document.querySelector("#log-form"),
  logTitleInput: document.querySelector("#log-title-input"),
  logAuthorInput: document.querySelector("#log-author-input"),
  pagesReadInput: document.querySelector("#pages-read-input"),
  specificPagesInput: document.querySelector("#specific-pages-input"),
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
  lifetimePagesInsight: document.querySelector("#lifetime-pages-insight"),
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
  readingChartPanel: document.querySelector("#reading-chart-panel"),
  generateReadingChartsButton: document.querySelector("#generate-reading-charts"),
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
  profileNotificationCount: document.querySelector("#profile-notification-count"),
  headerNotificationCount: document.querySelector("#header-notification-count"),
  notificationChimeButton: document.querySelector("#notification-chime-button"),
  notificationsPanel: document.querySelector("#notifications-panel"),
  profileNotificationList: document.querySelector("#profile-notification-list"),
  markNotificationsRead: document.querySelector("#mark-notifications-read"),
  profileAchievementGrid: document.querySelector("#profile-achievement-grid"),
  printSheet: document.querySelector("#print-sheet"),
  storyList: document.querySelector("#story-list"),
  storyCount: document.querySelector("#story-count"),
  storyEmpty: document.querySelector("#story-empty"),
  storyEditor: document.querySelector("#story-editor"),
  storyEditorEmpty: document.querySelector("#story-editor-empty"),
  storyIdInput: document.querySelector("#story-id-input"),
  writingDashboard: document.querySelector("#writing-dashboard"),
  writingResearchLibrary: document.querySelector("#writing-research-library"),
  openResearchLibraryButton: document.querySelector("#open-research-library-button"),
  storySearchInput: document.querySelector("#story-search-input"),
  storySortInput: document.querySelector("#story-sort-input"),
  storyStatusFilter: document.querySelector("#story-status-filter"),
  storyTitleInput: document.querySelector("#story-title-input"),
  storyTypeInput: document.querySelector("#story-type-input"),
  storyGenreInput: document.querySelector("#story-genre-input"),
  storyStatusInput: document.querySelector("#story-status-input"),
  storyTargetInput: document.querySelector("#story-target-input"),
  storyCurrentCountInput: document.querySelector("#story-current-count-input"),
  storyCreatedInput: document.querySelector("#story-created-input"),
  storyUpdatedInput: document.querySelector("#story-updated-input"),
  storyMoodInput: document.querySelector("#story-mood-input"),
  storyThemeInput: document.querySelector("#story-theme-input"),
  storySymbolInput: document.querySelector("#story-symbol-input"),
  storyConflictInput: document.querySelector("#story-conflict-input"),
  storyPremiseInput: document.querySelector("#story-premise-input"),
  storyOutlineInput: document.querySelector("#story-outline-input"),
  writingProjectForm: document.querySelector("#writing-project-form"),
  storyDraftInput: document.querySelector("#story-draft-input"),
  storyPlanView: document.querySelector("#story-overview-view"),
  storyDraftView: document.querySelector("#story-manuscript-view"),
  storyChaptersView: document.querySelector("#story-chapters-view"),
  storyCharactersView: document.querySelector("#story-characters-view"),
  storyWorldbuildingView: document.querySelector("#story-worldbuilding-view"),
  storyTimelineView: document.querySelector("#story-timeline-view"),
  storyResearchView: document.querySelector("#story-research-view"),
  storyQuotesView: document.querySelector("#story-quotes-view"),
  storyGoalsView: document.querySelector("#story-goals-view"),
  storyPromptsView: document.querySelector("#story-prompts-view"),
  storyRevisionView: document.querySelector("#story-revision-view"),
  storyExportView: document.querySelector("#story-export-view"),
  storyWordCount: document.querySelector("#story-word-count"),
  storyCharacterCount: document.querySelector("#story-character-count"),
  storySaveStatus: document.querySelector("#story-save-status"),
  storyLastSaved: document.querySelector("#story-last-saved"),
  storyManualSaveButton: document.querySelector("#story-manual-save-button"),
  storyFocusButton: document.querySelector("#story-focus-button"),
  publishJournalButton: document.querySelector("#publish-journal-button"),
  newJournalDocumentButton: document.querySelector("#new-journal-document-button"),
  wordProcessorWindow: document.querySelector("#word-processor-window"),
  wordDocumentTitle: document.querySelector("#word-document-title"),
  writingStyleSelect: document.querySelector("#writing-style-select"),
  writingFontSelect: document.querySelector("#writing-font-select"),
  writingSizeSelect: document.querySelector("#writing-size-select"),
  writingTextColour: document.querySelector("#writing-text-colour"),
  writingHighlightColour: document.querySelector("#writing-highlight-colour"),
  writingLinkButton: document.querySelector("#writing-link-button"),
  writingResearchLinkButton: document.querySelector("#writing-research-link-button"),
  writingOpenResearchButton: document.querySelector("#writing-open-research-button"),
  writingRuleButton: document.querySelector("#writing-rule-button"),
  writingPageBreakButton: document.querySelector("#writing-page-break-button"),
  writingInsertDateButton: document.querySelector("#writing-insert-date-button"),
  writingInsertTableButton: document.querySelector("#writing-insert-table-button"),
  writingMarginSelect: document.querySelector("#writing-margin-select"),
  writingOrientationSelect: document.querySelector("#writing-orientation-select"),
  writingLineSpacingSelect: document.querySelector("#writing-line-spacing-select"),
  writingFindInput: document.querySelector("#writing-find-input"),
  writingReplaceInput: document.querySelector("#writing-replace-input"),
  writingFindNextButton: document.querySelector("#writing-find-next-button"),
  writingReplaceButton: document.querySelector("#writing-replace-button"),
  writingReplaceAllButton: document.querySelector("#writing-replace-all-button"),
  writingParagraphCount: document.querySelector("#writing-paragraph-count"),
  writingReadingTime: document.querySelector("#writing-reading-time"),
  writingPageCount: document.querySelector("#writing-page-count"),
  writingZoomOut: document.querySelector("#writing-zoom-out"),
  writingZoomIn: document.querySelector("#writing-zoom-in"),
  writingZoomLabel: document.querySelector("#writing-zoom-label"),
  writingProjectMeta: document.querySelector("#writing-project-meta"),
  storyProgressBarFill: document.querySelector("#story-progress-bar-fill"),
  storyProgressLabel: document.querySelector("#story-progress-label"),
  storyDraftNotesInput: document.querySelector("#story-draft-notes-input"),
  storyManuscriptSearchInput: document.querySelector("#story-manuscript-search-input"),
  storySearchResults: document.querySelector("#story-search-results"),
  storyRepeatedWords: document.querySelector("#story-repeated-words"),
  duplicateStoryButton: document.querySelector("#duplicate-story-button"),
  chapterForm: document.querySelector("#chapter-form"),
  chapterIdInput: document.querySelector("#chapter-id-input"),
  chapterFormTitle: document.querySelector("#chapter-form-title"),
  chapterCancelEdit: document.querySelector("#chapter-cancel-edit"),
  chapterTitleInput: document.querySelector("#chapter-title-input"),
  chapterOrderInput: document.querySelector("#chapter-order-input"),
  chapterStatusInput: document.querySelector("#chapter-status-input"),
  chapterSummaryInput: document.querySelector("#chapter-summary-input"),
  chapterWordCountInput: document.querySelector("#chapter-word-count-input"),
  chapterThemeInput: document.querySelector("#chapter-theme-input"),
  chapterSymbolInput: document.querySelector("#chapter-symbol-input"),
  chapterList: document.querySelector("#chapter-list"),
  sceneForm: document.querySelector("#scene-form"),
  sceneIdInput: document.querySelector("#scene-id-input"),
  sceneFormTitle: document.querySelector("#scene-form-title"),
  sceneCancelEdit: document.querySelector("#scene-cancel-edit"),
  sceneChapterInput: document.querySelector("#scene-chapter-input"),
  sceneTitleInput: document.querySelector("#scene-title-input"),
  sceneOrderInput: document.querySelector("#scene-order-input"),
  sceneSummaryInput: document.querySelector("#scene-summary-input"),
  scenePovInput: document.querySelector("#scene-pov-input"),
  sceneSettingInput: document.querySelector("#scene-setting-input"),
  sceneConflictInput: document.querySelector("#scene-conflict-input"),
  sceneGoalInput: document.querySelector("#scene-goal-input"),
  sceneOutcomeInput: document.querySelector("#scene-outcome-input"),
  sceneWordCountInput: document.querySelector("#scene-word-count-input"),
  sceneStatusInput: document.querySelector("#scene-status-input"),
  sceneCharactersInput: document.querySelector("#scene-characters-input"),
  sceneMoodInput: document.querySelector("#scene-mood-input"),
  sceneThemeInput: document.querySelector("#scene-theme-input"),
  sceneSymbolInput: document.querySelector("#scene-symbol-input"),
  writingTagFilterInput: document.querySelector("#writing-tag-filter-input"),
  characterForm: document.querySelector("#character-form"),
  characterIdInput: document.querySelector("#character-id-input"),
  characterFormTitle: document.querySelector("#character-form-title"),
  characterCancelEdit: document.querySelector("#character-cancel-edit"),
  characterNameInput: document.querySelector("#character-name-input"),
  characterAgeInput: document.querySelector("#character-age-input"),
  characterRoleInput: document.querySelector("#character-role-input"),
  characterAppearanceInput: document.querySelector("#character-appearance-input"),
  characterPersonalityInput: document.querySelector("#character-personality-input"),
  characterStrengthsInput: document.querySelector("#character-strengths-input"),
  characterWeaknessesInput: document.querySelector("#character-weaknesses-input"),
  characterGoalInput: document.querySelector("#character-goal-input"),
  characterFearInput: document.querySelector("#character-fear-input"),
  characterBackstoryInput: document.querySelector("#character-backstory-input"),
  characterArcInput: document.querySelector("#character-arc-input"),
  characterRelationshipsInput: document.querySelector("#character-relationships-input"),
  characterNotesInput: document.querySelector("#character-notes-input"),
  characterList: document.querySelector("#character-list"),
  worldbuildingForm: document.querySelector("#worldbuilding-form"),
  worldbuildingIdInput: document.querySelector("#worldbuilding-id-input"),
  worldbuildingFormTitle: document.querySelector("#worldbuilding-form-title"),
  worldbuildingCancelEdit: document.querySelector("#worldbuilding-cancel-edit"),
  worldbuildingTitleInput: document.querySelector("#worldbuilding-title-input"),
  worldbuildingCategoryInput: document.querySelector("#worldbuilding-category-input"),
  worldbuildingCharactersInput: document.querySelector("#worldbuilding-characters-input"),
  worldbuildingDescriptionInput: document.querySelector("#worldbuilding-description-input"),
  worldbuildingScenesInput: document.querySelector("#worldbuilding-scenes-input"),
  worldbuildingNotesInput: document.querySelector("#worldbuilding-notes-input"),
  worldbuildingList: document.querySelector("#worldbuilding-list"),
  timelineForm: document.querySelector("#timeline-form"),
  timelineIdInput: document.querySelector("#timeline-id-input"),
  timelineFormTitle: document.querySelector("#timeline-form-title"),
  timelineCancelEdit: document.querySelector("#timeline-cancel-edit"),
  timelineTitleInput: document.querySelector("#timeline-title-input"),
  timelineDateInput: document.querySelector("#timeline-date-input"),
  timelineTypeInput: document.querySelector("#timeline-type-input"),
  timelineDescriptionInput: document.querySelector("#timeline-description-input"),
  timelineCharactersInput: document.querySelector("#timeline-characters-input"),
  timelineScenesInput: document.querySelector("#timeline-scenes-input"),
  timelineList: document.querySelector("#timeline-list"),
  researchForm: document.querySelector("#research-form"),
  researchIdInput: document.querySelector("#research-id-input"),
  researchFormTitle: document.querySelector("#research-form-title"),
  researchCancelEdit: document.querySelector("#research-cancel-edit"),
  researchCatalogueSelect: document.querySelector("#research-catalogue-select"),
  researchTagsInput: document.querySelector("#research-tags-input"),
  researchChapterInput: document.querySelector("#research-chapter-input"),
  researchSceneInput: document.querySelector("#research-scene-input"),
  researchNotesInput: document.querySelector("#research-notes-input"),
  researchList: document.querySelector("#research-list"),
  researchLibrarySearch: document.querySelector("#research-library-search"),
  researchLibraryFilter: document.querySelector("#research-library-filter"),
  researchLibraryResults: document.querySelector("#research-library-results"),
  researchResultCount: document.querySelector("#research-result-count"),
  writingLinkDialog: document.querySelector("#writing-link-dialog"),
  writingLinkForm: document.querySelector("#writing-link-form"),
  writingLinkSelectionText: document.querySelector("#writing-link-selection-text"),
  writingLinkUrl: document.querySelector("#writing-link-url"),
  writingLinkSearch: document.querySelector("#writing-link-search"),
  writingLinkFilter: document.querySelector("#writing-link-filter"),
  writingLinkResults: document.querySelector("#writing-link-results"),
  writingLinkError: document.querySelector("#writing-link-error"),
  removeWritingLinkButton: document.querySelector("#remove-writing-link-button"),
  writingLinkPopover: document.querySelector("#writing-link-popover"),
  quoteForm: document.querySelector("#quote-form"),
  quoteIdInput: document.querySelector("#quote-id-input"),
  quoteFormTitle: document.querySelector("#quote-form-title"),
  quoteCancelEdit: document.querySelector("#quote-cancel-edit"),
  quoteTextInput: document.querySelector("#quote-text-input"),
  quoteSourceTitleInput: document.querySelector("#quote-source-title-input"),
  quoteAuthorInput: document.querySelector("#quote-author-input"),
  quotePageInput: document.querySelector("#quote-page-input"),
  quoteTagsInput: document.querySelector("#quote-tags-input"),
  quoteChapterInput: document.querySelector("#quote-chapter-input"),
  quoteSceneInput: document.querySelector("#quote-scene-input"),
  quoteNoteInput: document.querySelector("#quote-note-input"),
  quoteList: document.querySelector("#quote-list"),
  writingGoalsForm: document.querySelector("#writing-goals-form"),
  writingDailyGoalInput: document.querySelector("#writing-daily-goal-input"),
  writingWeeklyGoalInput: document.querySelector("#writing-weekly-goal-input"),
  writingProjectGoalInput: document.querySelector("#writing-project-goal-input"),
  writingDeadlineInput: document.querySelector("#writing-deadline-input"),
  writingGoalSummary: document.querySelector("#writing-goal-summary"),
  promptTypeInput: document.querySelector("#prompt-type-input"),
  promptGeneratedText: document.querySelector("#prompt-generated-text"),
  generatePromptButton: document.querySelector("#generate-prompt-button"),
  saveGeneratedPromptButton: document.querySelector("#save-generated-prompt-button"),
  promptForm: document.querySelector("#prompt-form"),
  promptIdInput: document.querySelector("#prompt-id-input"),
  promptFormTitle: document.querySelector("#prompt-form-title"),
  promptCancelEdit: document.querySelector("#prompt-cancel-edit"),
  promptCustomTypeInput: document.querySelector("#prompt-custom-type-input"),
  promptUsedInput: document.querySelector("#prompt-used-input"),
  promptTextInput: document.querySelector("#prompt-text-input"),
  promptList: document.querySelector("#prompt-list"),
  storyRevisionNotesInput: document.querySelector("#story-revision-notes-input"),
  storyContinuityNotesInput: document.querySelector("#story-continuity-notes-input"),
  saveRevisionNotesButton: document.querySelector("#save-revision-notes-button"),
  revisionCommentForm: document.querySelector("#revision-comment-form"),
  revisionCommentInput: document.querySelector("#revision-comment-input"),
  storyVersionList: document.querySelector("#story-version-list"),
  sceneChecklistList: document.querySelector("#scene-checklist-list"),
  revisionCommentList: document.querySelector("#revision-comment-list"),
  exportSelectionList: document.querySelector("#export-selection-list"),
  exportTxtButton: document.querySelector("#export-txt-button"),
  exportMarkdownButton: document.querySelector("#export-markdown-button"),
  exportPdfButton: document.querySelector("#export-pdf-button"),
  exportWordButton: document.querySelector("#export-word-button"),
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
  openHabitButton: document.querySelector("#open-habit-button"),
  emptyHabitButton: document.querySelector("#empty-habit-button"),
  habitGrid: document.querySelector("#habit-grid"),
  habitEmpty: document.querySelector("#habit-empty"),
  lifestyleHabitCount: document.querySelector("#lifestyle-habit-count"),
  lifestyleTodayCount: document.querySelector("#lifestyle-today-count"),
  lifestyleWeekCount: document.querySelector("#lifestyle-week-count"),
  lifestyleRate: document.querySelector("#lifestyle-rate"),
  habitDialog: document.querySelector("#habit-dialog"),
  habitForm: document.querySelector("#habit-form"),
  habitIdInput: document.querySelector("#habit-id-input"),
  habitFormTitle: document.querySelector("#habit-form-title"),
  habitNameInput: document.querySelector("#habit-name-input"),
  habitCategoryInput: document.querySelector("#habit-category-input"),
  habitIntentionInput: document.querySelector("#habit-intention-input"),
  habitDialogCategoryLabel: document.querySelector("#habit-dialog-category-label"),
  habitRewardDialog: document.querySelector("#habit-reward-dialog"),
  habitRewardName: document.querySelector("#habit-reward-name"),
  habitRewardCount: document.querySelector("#habit-reward-count"),
  habitRewardTotal: document.querySelector("#habit-reward-total"),
  habitHeartCount: document.querySelector("#habit-heart-count"),
  profileRunesCount: document.querySelector("#profile-runes-count"),
  profileStreakCount: document.querySelector("#profile-streak-count"),
  profileStreakBest: document.querySelector("#profile-streak-best"),
  learningRunesCount: document.querySelector("#learning-runes-count"),
  learningStreakCount: document.querySelector("#learning-streak-count"),
  streakRewardDialog: document.querySelector("#streak-reward-dialog"),
  streakRewardCount: document.querySelector("#streak-reward-count"),
  streakBookCount: document.querySelector("#streak-book-count"),
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
let lifestyleHabits = loadArray(LIFESTYLE_STORAGE_KEY);
// Historical dream records remain in storage for compatibility, but the
// retired Dream Journal is not loaded into the application.
let dreams = [];
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
let nillionVoiceEnabled = localStorage.getItem(NILLION_VOICE_KEY) === "1";
let nillionResponseTimer;
let nillionSpeechSession = 0;
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
let currentWritingView = "manuscript";
let currentGeneratedPrompt = "";
let writingFocusMode = false;
let writingZoom = 100;
let lastWritingSelectionRange = null;
let writingFindCursor = 0;
let activeWritingRibbon = "home";
let writingLinkRange = null;
let writingLinkAnchor = null;
let writingLinkPopoverTimer = null;
let writingLinkSelectedKeys = new Set();
let isApplyingCloudData = false;
let apiToken = localStorage.getItem(API_TOKEN_KEY) || "";
let activeReaderCatalogue = [];
let activeReaderId = "";
let profileNotifications = [];
let profileAchievements = [];
let catalogueExpanded = false;
let collectionView = localStorage.getItem(COLLECTION_VIEW_KEY) === "coverflow"
  ? "coverflow"
  : "catalogue";
let activeCoverFlowBookId = "";
let coverFlowPointerStart = null;
let coverFlowSuppressClick = false;
let readerCatalogueExpanded = false;
let highlightedCollectionBookId = "";
let highlightedCollectionBookTimer;
let habitRewardCounterAnimation;
let readingChartsVisible = false;
let readingAnalyticsRange = "recent-30";
let readingChartType = READING_CHART_TYPES.has(localStorage.getItem(READING_CHART_TYPE_KEY))
  ? localStorage.getItem(READING_CHART_TYPE_KEY)
  : "pages-over-time";
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

async function apiRequestWithToken(action, token, options = {}) {
  const response = await fetch(
    `/api/index?action=${encodeURIComponent(action)}`,
    {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
  [books, readingLog, passages, wishlist, creativeWriting, wordhub, lifestyleHabits].forEach((items) => {
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
  saveLifestyleHabits();
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

function localSafeBooks() {
  return books.map((book) => ({ ...book, coverImage: "" }));
}

function saveBooks() {
  const saved = saveCollection(STORAGE_KEY, localSafeBooks());
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

function saveLifestyleHabits() {
  const saved = saveCollection(LIFESTYLE_STORAGE_KEY, lifestyleHabits);
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
    [books, readingLog, passages, wishlist, creativeWriting, wordhub].forEach((items) => {
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
  if (changedAccounts) saveAccounts();
  if (booksChanged) saveBooks();
  if (logsChanged) saveReadingLog();
  if (passagesChanged) savePassages();
  if (wishlistChanged) saveWishlist();
  if (creativeWritingChanged) saveCreativeWriting();
  if (wordhubChanged) saveWordhub();
}

function normalize(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
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
    words: ownedByCurrent(wordhub).length,
  };
}

function renderProfileInsights() {
  if (!currentAccount) return;
  const snapshot = readingSnapshot();
  const averagePages = snapshot.sessions
    ? Math.round(snapshot.pages / snapshot.sessions)
    : 0;
  elements.profileInsightGrid.innerHTML = `
    <div><strong>${snapshot.readBooks}</strong><span>Books finished</span></div>
    <div><strong>${snapshot.ownedBooks}</strong><span>Books owned</span></div>
    <div><strong>${snapshot.pages}</strong><span>Pages logged</span></div>
    <div><strong>${formatDuration(snapshot.minutes)}</strong><span>Reading time</span></div>
    <div><strong>${averagePages}</strong><span>Pages per session</span></div>
  `;
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

async function refreshProfileActivity({ syncSnapshot = true } = {}) {
  if (!currentAccount || !apiToken) return;
  if (syncSnapshot) {
    const snapshot = readingSnapshot();
    await apiRequest("activity-snapshot", {
      method: "POST",
      body: snapshot,
    });
  }
  const data = await apiRequest("profile-activity");
  const nextNotifications = (data.notifications || []).filter(
    (item) => !/^Dream journal Runes$/i.test(item.title || ""),
  );
  const newlyReceived = notificationBaselineReady
    ? nextNotifications.filter(
        (item) => !item.readAt && !knownNotificationIds.has(item.id),
      )
    : [];
  profileNotifications = nextNotifications;
  const retiredDreamAchievements = new Set([
    "first-dream",
    "ten-dreams",
    "twenty-five-dreams",
  ]);
  profileAchievements = (data.achievements || []).filter(
    (item) => !retiredDreamAchievements.has(item.key),
  );
  knownNotificationIds = new Set(nextNotifications.map((item) => item.id));
  if (notificationBaselineReady && newlyReceived.length) {
    playNotificationChime();
  }
  notificationBaselineReady = true;
  renderProfileInsights();
  renderProfileActivity();
}

async function markNotificationsRead(notificationId = "") {
  const previousNotifications = profileNotifications;
  const readAt = new Date().toISOString();
  profileNotifications = profileNotifications.map((item) =>
    !notificationId || item.id === notificationId
      ? { ...item, readAt }
      : item,
  );
  renderProfileActivity();
  try {
    await apiRequest("notification-read", {
      method: "POST",
      body: notificationId ? { notificationId } : { all: true },
    });
    await refreshProfileActivity({ syncSnapshot: false });
  } catch (error) {
    profileNotifications = previousNotifications;
    renderProfileActivity();
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
  saveCollection(STORAGE_KEY, localSafeBooks());
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
    lifestyleHabits: lifestyleHabits
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
    "lifestyleHabits",
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
  lifestyleHabits = replaceAccountItems(
    lifestyleHabits,
    currentAccount.id,
    cloud.lifestyleHabits || [],
  );
  saveCollection(STORAGE_KEY, localSafeBooks());
  saveCollection(LOG_STORAGE_KEY, readingLog);
  saveCollection(PASSAGE_STORAGE_KEY, passages);
  saveCollection(WISHLIST_STORAGE_KEY, wishlist);
  saveCollection(CREATIVE_WRITING_STORAGE_KEY, creativeWriting);
  saveCollection(WORDHUB_STORAGE_KEY, wordhub);
  saveCollection(LIFESTYLE_STORAGE_KEY, lifestyleHabits);
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

async function seedLegacyCommunityAccounts() {
  if (!currentAccount || !apiToken || legacyAccountsSnapshot.length < 2) {
    return;
  }
  const community = await apiRequest("community");
  const existingUsernames = new Set(
    (community.accounts || []).map((account) => normalize(account.username)),
  );
  let seeded = 0;
  for (const account of legacyAccountsSnapshot) {
    const username = String(account.username || "").trim();
    const normalized = normalize(username);
    if (
      !username ||
      normalized === normalize(currentAccount.username) ||
      existingUsernames.has(normalized)
    ) {
      continue;
    }
    if (
      !/^[a-f0-9]{32}$/i.test(String(account.salt || "")) ||
      !/^[a-f0-9]{64}$/i.test(String(account.passwordHash || ""))
    ) {
      continue;
    }
    let migrated;
    try {
      migrated = await apiRequest("migrate", {
        method: "POST",
        body: {
          username,
          salt: account.salt,
          passwordHash: account.passwordHash,
          profileImage: account.profileImage || "",
        },
      });
    } catch (error) {
      if (String(error.message || "").includes("already in use")) {
        existingUsernames.add(normalized);
        continue;
      }
      throw error;
    }
    const migrationToken = migrated.token;
    await apiRequestWithToken("data", migrationToken, {
      method: "POST",
      body: cloudDataFor(account.id),
    });
    const stats = statsFor(account.id);
    const recentBooks = booksFor(account.id)
      .slice(0, 5)
      .map(({ title, author, status }) => ({ title, author, status }));
    await apiRequestWithToken("stats", migrationToken, {
      method: "POST",
      body: {
        owned: stats.total,
        read: stats.read,
        reading: stats.reading,
        unread: stats.unread,
        recentBooks,
      },
    });
    await Promise.all(
      booksFor(account.id)
        .filter((book) => book.coverImage)
        .map((book) =>
          apiRequestWithToken("cover-save", migrationToken, {
            method: "POST",
            body: {
              bookId: book.id,
              image: book.coverImage,
            },
          }).catch(() => {}),
        ),
    );
    existingUsernames.add(normalized);
    seeded += 1;
  }
  if (seeded > 0) {
    const refreshed = await apiRequest("community");
    accounts = refreshed.accounts;
    follows = refreshed.follows;
    shares = refreshed.shares;
    sharedJournals = refreshed.journals || [];
  }
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

async function runStartupStep(step) {
  try {
    await step();
  } catch (error) {
    showToast(error.message);
  }
}

function settleInitialAppRoute() {
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}#home`,
  );
  const scrollHome = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };
  scrollHome();
  window.requestAnimationFrame(() => {
    scrollHome();
    window.requestAnimationFrame(scrollHome);
  });
}

async function showAuthenticatedApp(account) {
  currentAccount = account;
  localStorage.setItem(CURRENT_ACCOUNT_KEY, account.id);
  await runStartupStep(importLegacyUsers);
  await runStartupStep(loadAccountData);
  await runStartupStep(seedLegacyCommunityAccounts);
  await Promise.all([
    runStartupStep(loadCommunity),
    runStartupStep(loadJournals),
    runStartupStep(loadReadingFacts),
    runStartupStep(loadMarketplace),
    runStartupStep(loadLearningNook),
    runStartupStep(loadChippings),
    runStartupStep(loadSocialSpaces),
  ]);
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
  renderLifestyle();
  renderCommunity();
  settleInitialAppRoute();
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
  setAuthView("login");
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

function bookStatusLabel(status) {
  return {
    read: "Read",
    reading: "Busy reading",
    unread: "To be read",
  }[status] || "To be read";
}

function nillionList(values, limit = 5) {
  const cleaned = values.filter(Boolean);
  const visible = cleaned.slice(0, limit);
  if (!visible.length) return "none";
  const joined = visible.length === 1
    ? visible[0]
    : `${visible.slice(0, -1).join(", ")} and ${visible[visible.length - 1]}`;
  return cleaned.length > limit
    ? `${joined}, plus ${cleaned.length - limit} more`
    : joined;
}

function nillionReadingScope(query, accountLog) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const todayKey = localDateString(today);
  if (query.includes("today")) {
    return {
      label: "today",
      entries: accountLog.filter((entry) => entry.date === todayKey),
    };
  }
  if (query.includes("yesterday")) {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const key = localDateString(yesterday);
    return {
      label: "yesterday",
      entries: accountLog.filter((entry) => entry.date === key),
    };
  }
  if (query.includes("this week") || query.includes("past week") || query.includes("last 7 days")) {
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    const startKey = localDateString(start);
    return {
      label: "over the last seven days",
      entries: accountLog.filter((entry) => entry.date >= startKey && entry.date <= todayKey),
    };
  }
  if (query.includes("this month")) {
    const monthKey = todayKey.slice(0, 7);
    return {
      label: "this month",
      entries: accountLog.filter((entry) => String(entry.date || "").startsWith(monthKey)),
    };
  }
  if (query.includes("this year")) {
    const yearKey = todayKey.slice(0, 4);
    return {
      label: "this year",
      entries: accountLog.filter((entry) => String(entry.date || "").startsWith(yearKey)),
    };
  }
  return { label: "across your complete reading log", entries: accountLog };
}

function nillionReadingSummary(entries) {
  const byBook = new Map();
  entries.forEach((entry) => {
    const key = `${normalize(entry.title)}\u0000${normalize(entry.author)}`;
    const current = byBook.get(key) || {
      title: entry.title || "Untitled book",
      author: entry.author || "Unknown author",
      pages: 0,
      minutes: 0,
      sessions: 0,
    };
    current.pages += Number(entry.pagesRead) || 0;
    current.minutes += Number(entry.durationMinutes) || 0;
    current.sessions += 1;
    byBook.set(key, current);
  });
  return [...byBook.values()].sort(
    (first, second) => second.pages - first.pages || first.title.localeCompare(second.title),
  );
}

function nillionBookAnswer(book) {
  const progress = bookProgressInfo(book);
  const rating = Number(book.rating) || 0;
  const details = [
    `${book.title} by ${book.author}`,
    book.genre || "Uncategorized",
    bookFormatLabel(book.format),
    bookStatusLabel(book.status),
  ];
  if (progress.hasRange) details.push(`${progress.percent}% complete`);
  if (rating) details.push(`${rating} out of 5 stars`);
  const sessions = readingSessionsForBook(book);
  const pages = sessions.reduce((total, entry) => total + (Number(entry.pagesRead) || 0), 0);
  if (sessions.length) {
    details.push(`${sessions.length} logged ${sessions.length === 1 ? "session" : "sessions"} and ${pages} logged pages`);
  }
  return `${details.join("; ")}.`;
}

function nillionSummarizeResearchSource(source) {
  const rawText = [source.excerpt, source.meta]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (!rawText || /^(book in your collection|reading session|empty writing studio document)\.?$/i.test(rawText)) {
    return `Nillion found ${source.title}${source.author ? ` by ${source.author}` : ""}, but there is not enough saved text to produce a useful summary yet.`;
  }
  const sentences = rawText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const selected = [];
  for (const sentence of sentences) {
    const normalizedSentence = normalize(sentence);
    if (selected.some((item) => normalize(item) === normalizedSentence)) continue;
    selected.push(sentence);
    if (selected.join(" ").length >= 420 || selected.length === 3) break;
  }
  const summary = researchPreview(selected.join(" ") || rawText, 520);
  return `Nillion summary of ${source.title}${source.author ? ` by ${source.author}` : ""}: ${summary} This summary is based only on the material saved in your Research Library.`;
}

function nillionDocumentSources() {
  return allStoryProjects()
    .map((project) => ({
      id: project.id,
      title: project.title || "Untitled document",
      text: String(
        project.manuscriptText ||
          richTextToPlain(project.manuscriptHtml) ||
          project.description ||
          project.notes ||
          "",
      )
        .replace(/\s+/g, " ")
        .trim(),
      wordCount: currentStoryWordCount(project),
      updatedAt: project.updatedAt || project.createdAt || "",
    }))
    .sort((first, second) => String(second.updatedAt).localeCompare(String(first.updatedAt)));
}

function nillionQuotedValues(value) {
  const matches = [];
  const pattern = /"([^"]+)"|'([^']+)'|\u201c([^\u201d]+)\u201d|\u2018([^\u2019]+)\u2019/g;
  let match = pattern.exec(String(value || ""));
  while (match) {
    matches.push(match.slice(1).find(Boolean).trim());
    match = pattern.exec(String(value || ""));
  }
  return matches.filter(Boolean);
}

function nillionNamedDocument(query, documents) {
  if (/\b(this|current|open) document\b/.test(query)) {
    const active = currentStory();
    if (active) return documents.find((document) => document.id === active.id) || null;
  }
  return documents
    .slice()
    .sort((first, second) => second.title.length - first.title.length)
    .find((document) => {
      const title = normalize(document.title);
      return title.length > 1 && query.includes(title);
    }) || null;
}

function nillionDocumentSearchTerm(rawQuestion, document) {
  const quoted = nillionQuotedValues(rawQuestion).filter(
    (value) => !document || normalize(value) !== normalize(document.title),
  );
  if (quoted.length) return quoted[0];

  const whereMatch = String(rawQuestion || "").match(
    /^\s*where\s+(?:does|do)\s+(.+?)\s+(?:appear|occur)(?:s)?(?:\s+(?:in|inside|across|through).*)?[?!.]*$/i,
  );
  if (whereMatch) {
    return whereMatch[1]
      .replace(/^(?:the\s+)?(?:word|phrase|sentence|line|text|passage)\s+/i, "")
      .trim();
  }

  let term = String(rawQuestion || "")
    .replace(/[?!.]+$/g, "")
    .replace(
      /^.*?\b(?:find|locate|search(?:\s+(?:through|across|inside))?|scan(?:\s+(?:through|across))?|which\s+documents?\s+(?:contain|mention)|where\s+(?:does|do)\s+.+?\s+(?:appear|occur)|read)\b\s*/i,
      "",
    )
    .replace(/^(?:for\s+)?(?:the\s+)?(?:word|phrase|sentence|line|text|passage)\s+/i, "")
    .replace(/^containing\s+/i, "");

  if (document) {
    const titleIndex = normalize(term).lastIndexOf(normalize(document.title));
    if (titleIndex > 0) term = term.slice(0, titleIndex);
  }
  term = term
    .replace(
      /\s+(?:in|inside|through|across|from)\s+(?:all\s+)?(?:of\s+)?(?:my\s+)?(?:writing\s+studio\s+)?documents?(?:\s+and\s+manuscripts?)?.*$/i,
      "",
    )
    .replace(/\s+(?:in|inside|from)\s+(?:the\s+)?(?:document|manuscript)\b.*$/i, "")
    .trim();
  return term;
}

function nillionCountDocumentMatches(text, term, wholeWord = false) {
  const source = normalize(text);
  const target = normalize(term);
  if (!source || !target) return 0;
  if (wholeWord && !target.includes(" ")) {
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (source.match(new RegExp(`\\b${escaped}\\b`, "g")) || []).length;
  }
  let count = 0;
  let index = source.indexOf(target);
  while (index !== -1) {
    count += 1;
    index = source.indexOf(target, index + Math.max(1, target.length));
  }
  return count;
}

function nillionDocumentContexts(text, term, wholeWord = false, limit = 3) {
  const sentences = String(text || "")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const contexts = sentences.filter(
    (sentence) => nillionCountDocumentMatches(sentence, term, wholeWord) > 0,
  );
  if (contexts.length) return [...new Set(contexts)].slice(0, limit);

  const normalizedText = normalize(text);
  const normalizedTerm = normalize(term);
  const index = normalizedText.indexOf(normalizedTerm);
  if (index < 0) return [];
  const start = Math.max(0, index - 80);
  const end = Math.min(String(text).length, index + String(term).length + 120);
  return [String(text).slice(start, end).replace(/\s+/g, " ").trim()];
}

function nillionDocumentSearchAnswer(rawQuestion, query, documents, document) {
  const term = nillionDocumentSearchTerm(rawQuestion, document);
  if (!term || normalize(term).length < 1) {
    return {
      text: "Tell me the word, phrase, or sentence to find. Quotation marks help with exact phrases, for example: Find \"green light\" in my documents.",
    };
  }
  const wholeWord = /\bword\b/.test(query) && !term.includes(" ");
  const selectedDocuments = document ? [document] : documents;
  const matches = selectedDocuments
    .map((item) => ({
      document: item,
      count: nillionCountDocumentMatches(item.text, term, wholeWord),
      contexts: nillionDocumentContexts(item.text, term, wholeWord),
    }))
    .filter((item) => item.count > 0);
  const total = matches.reduce((sum, item) => sum + item.count, 0);
  if (!matches.length) {
    const scope = document ? ` in ${document.title}` : " in your Writing Studio documents";
    return { text: `I did not find \"${term}\"${scope}.` };
  }

  const locations = matches.map(
    (item) => `${item.document.title} (${item.count} ${item.count === 1 ? "match" : "matches"})`,
  );
  const contexts = matches
    .flatMap((item) =>
      item.contexts.map((context) => `${item.document.title}: ${context}`),
    )
    .slice(0, 8);
  const readMatches = /\b(read|recite|speak)\b/.test(query);
  const text = [
    `I found \"${term}\" ${total} ${total === 1 ? "time" : "times"} in ${matches.length} ${matches.length === 1 ? "document" : "documents"}: ${locations.join("; ")}.`,
    contexts.length ? `Matching context:\n${contexts.map((context) => `- ${context}`).join("\n")}` : "",
    total > contexts.length ? `${total - contexts.length} additional ${total - contexts.length === 1 ? "match is" : "matches are"} recorded above.` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  return {
    text,
    speech: readMatches
      ? contexts.join(" ")
      : `I found ${total} ${total === 1 ? "match" : "matches"}. ${locations.join("; ")}.`,
  };
}

function nillionDocumentAnswer(rawQuestion, query) {
  const readIntent = /^\s*(?:please\s+)?(?:read|recite|speak)\b/i.test(rawQuestion);
  const documents = nillionDocumentSources();
  const document = nillionNamedDocument(query, documents);
  const mentionsDocuments = /\b(document|documents|manuscript|manuscripts|writing studio)\b/.test(query);
  const searchVerb = /\b(find|locate|search|scan|contain|contains|mention|mentions|appear|occurs?)\b/.test(query);
  const readExcerptIntent = readIntent && /\b(word|phrase|sentence|line|passage|part|containing)\b/.test(query);
  if (!mentionsDocuments && !readExcerptIntent && !(document && (readIntent || searchVerb))) return "";
  const readAllDocuments = readIntent && /\b(?:all(?:\s+of)?\s+my|every)\s+(?:writing\s+studio\s+)?(?:document|documents|manuscript|manuscripts)\b/.test(query);
  const fullDocumentRead = readIntent && (
    Boolean(document) ||
    readAllDocuments ||
    /\b(entire|whole|full|all of the)\s+(?:document|manuscript)\b/.test(query) ||
    /\b(?:document|manuscript)\s+(?:in full|from start to finish)\b/.test(query)
  ) && !/\b(word|phrase|sentence|line|passage|part|containing)\b/.test(query);
  const searchIntent = /\b(find|locate|search|scan|contain|contains|mention|mentions|appear|occurs?|containing)\b/.test(query) ||
    (readIntent && /\b(word|phrase|sentence|line|passage|part)\b/.test(query));
  const listIntent = /\b(list|show|what|which)\b/.test(query) &&
    /\b(documents|manuscripts|writing studio)\b/.test(query) &&
    !searchIntent;

  if (!documents.length) {
    return { text: "You do not have any Writing Studio documents for me to scan yet." };
  }
  if (fullDocumentRead) {
    if (readAllDocuments) {
      const readable = documents.filter((item) => item.text);
      if (!readable.length) {
        return { text: "Your Writing Studio documents do not contain any manuscript text yet." };
      }
      return {
        text: `Reading ${readable.length} ${readable.length === 1 ? "document" : "documents"}:\n\n${readable.map((item) => `${item.title} (${item.wordCount.toLocaleString()} words)\n${item.text}`).join("\n\n")}`,
        speech: readable.map((item) => `${item.title}. ${item.text}`).join(" "),
      };
    }
    const selected = document || (documents.length === 1 ? documents[0] : null);
    if (!selected) {
      return {
        text: `Name the document you want me to read. Your documents are ${nillionList(documents.map((item) => item.title), 10)}.`,
      };
    }
    if (!selected.text) {
      return { text: `${selected.title} does not contain any manuscript text yet.` };
    }
    return {
      text: `Reading ${selected.title} (${selected.wordCount.toLocaleString()} words):\n\n${selected.text}`,
      speech: `${selected.title}. ${selected.text}`,
    };
  }
  if (searchIntent) {
    return nillionDocumentSearchAnswer(rawQuestion, query, documents, document);
  }
  if (listIntent || query === "documents" || query === "my documents") {
    return {
      text: `Your Writing Studio contains ${documents.length} ${documents.length === 1 ? "document" : "documents"}: ${nillionList(documents.map((item) => `${item.title} (${item.wordCount.toLocaleString()} words)`), 10)}. You can ask me to read one or find an exact word, phrase, or sentence across all of them.`,
    };
  }
  return "";
}

function nillionResearchAnswer(query) {
  const sources = allWritingResearchSources();
  const namesResearch =
    query.includes("research library") ||
    query.includes("research file") ||
    query.includes("saved source") ||
    query.includes("source file") ||
    query.includes("read file");
  const exactSource = sources
    .slice()
    .sort((first, second) => String(second.title).length - String(first.title).length)
    .find((source) => {
      const title = normalize(source.title);
      return title.length > 2 && query.includes(title);
    });
  const asksForSummary = query.includes("summarize") || query.includes("summary of");
  if (!namesResearch && !(asksForSummary && exactSource)) return "";
  if (!sources.length) return "Your Research Library is empty.";
  if (exactSource) return nillionSummarizeResearchSource(exactSource);

  const overviewRequest =
    query.includes("what is in") ||
    query.includes("what's in") ||
    query.includes("overview") ||
    query.includes("list") ||
    query === "research library" ||
    query.includes("summarize my research library");
  if (overviewRequest) {
    const counts = sources.reduce((result, source) => {
      result[source.kind] = (result[source.kind] || 0) + 1;
      return result;
    }, {});
    const breakdown = Object.entries(counts)
      .sort((first, second) => second[1] - first[1])
      .map(([kind, count]) => `${count} ${kind}${count === 1 ? "" : "s"}`);
    return `Your Research Library contains ${sources.length} searchable ${sources.length === 1 ? "file" : "files"}: ${nillionList(breakdown, 9)}. Ask me to summarize a file by naming its title.`;
  }

  const stopWords = new Set([
    "about", "file", "from", "give", "library", "nillion", "please", "read", "research", "source", "summarize", "summary", "that", "the", "this",
  ]);
  const tokens = query
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
  const match = sources
    .map((source) => ({
      source,
      score: tokens.reduce((score, token) => {
        if (normalize(source.title).includes(token)) return score + 4;
        if (normalize(source.author).includes(token)) return score + 2;
        if (normalize(`${source.meta} ${source.excerpt}`).includes(token)) return score + 1;
        return score;
      }, 0),
    }))
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score)[0];
  if (match) return nillionSummarizeResearchSource(match.source);
  return `I could not identify a particular research file. Try including its title. Recent searchable files include ${nillionList(sources.slice(0, 6).map((source) => source.title), 6)}.`;
}

function nillionSearchAnswer(query) {
  const accountBooks = ownedByCurrent(books);
  const exactBook = [...accountBooks]
    .sort((first, second) => second.title.length - first.title.length)
    .find((book) => normalize(book.title).length > 2 && query.includes(normalize(book.title)));
  if (exactBook) return nillionBookAnswer(exactBook);

  const matchingAuthor = accountBooks.filter(
    (book) => normalize(book.author).length > 2 && query.includes(normalize(book.author)),
  );
  if (matchingAuthor.length) {
    return `You own ${matchingAuthor.length} ${matchingAuthor.length === 1 ? "book" : "books"} by ${matchingAuthor[0].author}: ${nillionList(matchingAuthor.map((book) => book.title))}.`;
  }

  const accountWords = ownedByCurrent(wordhub);
  const matchingWord = accountWords.find(
    (entry) => normalize(entry.word).length > 2 && query.includes(normalize(entry.word)),
  );
  if (matchingWord) {
    return `${matchingWord.word}: ${matchingWord.meaning}${matchingWord.book ? ` You found it in ${matchingWord.book}${matchingWord.page ? ` on page ${matchingWord.page}` : ""}.` : ""}`;
  }

  const stopWords = new Set([
    "about", "could", "from", "have", "library", "nillion", "please", "show", "tell", "that", "the", "this", "what", "where", "which", "with", "would", "your",
  ]);
  const tokens = query.split(/[^a-z0-9]+/).filter((word) => word.length > 2 && !stopWords.has(word));
  if (!tokens.length) return "";
  const sources = allWritingResearchSources()
    .map((item) => ({
      category: item.kind,
      title: item.title,
      text: `${item.title} ${item.author} ${item.meta} ${item.excerpt} ${item.citation}`,
    }))
    .map((item) => ({
      ...item,
      score: tokens.filter((token) => normalize(item.text).includes(token)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 5);
  return sources.length
    ? `I found these relevant records: ${sources.map((item) => `${item.category}: ${item.title}`).join("; ")}.`
    : "";
}

function answerNillionQuestion(rawQuestion) {
  const query = normalize(rawQuestion).replace(/[?!.]+$/g, "");
  if (!query) return "Ask me a question and I will search your saved library data.";
  if (!currentAccount) return "Please sign in so I can read your library data.";

  const accountBooks = ownedByCurrent(books);
  const accountLog = ownedByCurrent(readingLog);
  const accountPassages = ownedByCurrent(passages);
  const accountWishlist = ownedByCurrent(wishlist);
  const accountWords = ownedByCurrent(wordhub);
  const accountHabits = ownedByCurrent(lifestyleHabits);
  const projects = allStoryProjects();
  const scope = nillionReadingScope(query, accountLog);
  const scopedBooks = nillionReadingSummary(scope.entries);
  const scopedPages = scope.entries.reduce((total, entry) => total + (Number(entry.pagesRead) || 0), 0);
  const scopedMinutes = scope.entries.reduce((total, entry) => total + (Number(entry.durationMinutes) || 0), 0);

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
    return `Hello${currentAccount.username ? `, ${currentAccount.username}` : ""}. I am Nillion. What would you like to know about your library?`;
  }
  if (query.includes("what can you do") || query.includes("how can you help") || query === "help") {
    return "I can answer questions about your collection, reading sessions and pace, saved passages, wishlist, Writing Studio projects, journals, WordHub vocabulary, Lifestyle habits, followers, recommendations, Runes, streaks, notifications, and achievements. I can scan every Writing Studio document for an exact word, phrase, or sentence, read matching context, read an entire document, and summarize saved Research Library files.";
  }
  const documentAnswer = nillionDocumentAnswer(rawQuestion, query);
  if (documentAnswer) return documentAnswer;
  const researchAnswer = nillionResearchAnswer(query);
  if (researchAnswer) return researchAnswer;
  if (query.includes("currently reading") || query.includes("busy reading") || query.includes("reading now")) {
    const current = accountBooks.filter((book) => book.status === "reading");
    return current.length
      ? `You are currently reading ${nillionList(current.map((book) => `${book.title} by ${book.author}`))}.`
      : "No book in your collection is marked Busy Reading right now.";
  }
  if ((query.includes("book") && (query.includes("did i read") || query.includes("have i read") || query.includes("read today") || query.includes("read yesterday"))) || query.includes("reading sessions today")) {
    if (!scope.entries.length) return `You have no reading sessions logged ${scope.label}.`;
    return `You logged ${scope.entries.length} ${scope.entries.length === 1 ? "session" : "sessions"} ${scope.label}: ${nillionList(scopedBooks.map((book) => `${book.title} (${book.pages} pages)`), 6)}. Total time: ${formatDuration(scopedMinutes)}.`;
  }
  if (query.includes("how fast") || query.includes("reading speed") || query.includes("reading pace") || query.includes("pages per hour")) {
    const paced = scope.entries.filter(
      (entry) => Number(entry.pagesRead) > 0 && Number(entry.durationMinutes) > 0,
    );
    const pages = paced.reduce((total, entry) => total + Number(entry.pagesRead), 0);
    const minutes = paced.reduce((total, entry) => total + Number(entry.durationMinutes), 0);
    if (!paced.length || !minutes) {
      return `I need at least one reading session with both pages and duration to calculate your pace ${scope.label}.`;
    }
    const pace = Math.round((pages / minutes) * 60);
    const averageMinutes = Math.round(minutes / paced.length);
    return `Your measured pace ${scope.label} is about ${pace} pages per hour across ${paced.length} ${paced.length === 1 ? "session" : "sessions"}. The average timed session lasted ${formatDuration(averageMinutes)}. Different formats and difficult books can naturally change this rate.`;
  }
  if (query.includes("how many pages") || query.includes("pages read") || query.includes("page total")) {
    const pages = scope.label === "across your complete reading log"
      ? lifetimePagesReadFrom(accountLog)
      : scopedPages;
    return `You have read ${pages.toLocaleString()} ${pages === 1 ? "page" : "pages"} ${scope.label}. ${scope.entries.length ? `That period contains ${scope.entries.length} logged ${scope.entries.length === 1 ? "session" : "sessions"}.` : "There are no sessions in that period."}`;
  }
  if (query.includes("how long") || query.includes("reading time") || query.includes("time spent reading")) {
    return `You logged ${formatDuration(scopedMinutes)} of reading ${scope.label} across ${scope.entries.length} ${scope.entries.length === 1 ? "session" : "sessions"}.`;
  }
  if (query.includes("reading habit") || query.includes("reading insight") || query.includes("reading pattern")) {
    if (!accountLog.length) return "Log a few reading sessions and I will be able to identify your pace, session length, and active reading days.";
    const timed = accountLog.filter((entry) => Number(entry.durationMinutes) > 0);
    const totalMinutes = timed.reduce((total, entry) => total + Number(entry.durationMinutes), 0);
    const totalPages = timed.reduce((total, entry) => total + (Number(entry.pagesRead) || 0), 0);
    const dates = new Set(accountLog.map((entry) => entry.date)).size;
    const averagePages = Math.round(accountLog.reduce((total, entry) => total + (Number(entry.pagesRead) || 0), 0) / accountLog.length);
    const pace = totalMinutes ? Math.round((totalPages / totalMinutes) * 60) : 0;
    return `Across ${accountLog.length} sessions on ${dates} active days, you average ${averagePages} pages per session${pace ? ` and about ${pace} pages per hour in timed sessions` : ""}. Your current reading streak is ${calculateStreak()} ${calculateStreak() === 1 ? "day" : "days"}. Open Reading Log for the full charts and period comparisons.`;
  }
  if (query.includes("wishlist") || query.includes("want to buy") || query.includes("want to purchase")) {
    return accountWishlist.length
      ? `Your wishlist contains ${accountWishlist.length} ${accountWishlist.length === 1 ? "book" : "books"}: ${nillionList(accountWishlist.map((item) => item.title), 7)}.`
      : "Your wishlist is empty.";
  }
  if (query.includes("passage") || query.includes("quote")) {
    const recent = [...accountPassages].sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt)));
    return recent.length
      ? `You have ${recent.length} saved ${recent.length === 1 ? "passage" : "passages"}. Your most recent is from ${recent[0].title} by ${recent[0].author}${recent[0].page ? `, page ${recent[0].page}` : ""}.`
      : "You have not saved any passages yet.";
  }
  if (query.includes("journal") || query.includes("reflection")) {
    const recent = [...journals].sort((first, second) => String(second.entryDate).localeCompare(String(first.entryDate)));
    return recent.length
      ? `You have ${recent.length} saved writing ${recent.length === 1 ? "entry" : "entries"}. The latest is dated ${journalDateLabel(recent[0].entryDate)}${recent[0].books?.length ? ` and references ${nillionList(recent[0].books.map((book) => book.title), 3)}` : ""}.`
      : "You have not saved a journal reflection yet.";
  }
  if (query.includes("wordhub") || query.includes("vocabulary") || query.includes("saved words")) {
    return accountWords.length
      ? `Your WordHub Alcove holds ${accountWords.length} ${accountWords.length === 1 ? "word" : "words"}: ${nillionList(accountWords.map((entry) => entry.word), 8)}.`
      : "Your WordHub Alcove is empty.";
  }
  if (
    query.includes("lifestyle") ||
    query.includes("daily habit") ||
    query.includes("habits today") ||
    query.includes("habit streak") ||
    (query.includes("habit") && !query.includes("reading habit"))
  ) {
    if (!accountHabits.length) {
      return "You have not added any Lifestyle habits yet.";
    }
    const today = localDateString(new Date());
    const completed = accountHabits.filter((habit) =>
      normalizedHabitDates(habit).includes(today),
    );
    const strongest = [...accountHabits]
      .map((habit) => ({ habit, streak: habitStreakStats(habit).current }))
      .sort((first, second) => second.streak - first.streak)[0];
    const completionLine = completed.length
      ? `Today you completed ${nillionList(completed.map((habit) => habit.name), 6)}.`
      : "You have not checked in a habit today yet.";
    return `You are tracking ${accountHabits.length} ${accountHabits.length === 1 ? "habit" : "habits"}. ${completionLine} Your strongest current habit streak is ${strongest.streak} ${strongest.streak === 1 ? "day" : "days"} for ${strongest.habit.name}.`;
  }
  if (query.includes("writing project") || query.includes("manuscript") || query.includes("creative writing")) {
    const totalWords = projects.reduce((total, project) => total + currentStoryWordCount(project), 0);
    return projects.length
      ? `Your Writing Studio has ${projects.length} ${projects.length === 1 ? "project" : "projects"} with ${totalWords.toLocaleString()} manuscript words in total: ${nillionList(projects.map((project) => project.title), 6)}.`
      : "You have no Writing Studio projects yet.";
  }
  if (query.includes("follower") || query.includes("following")) {
    const followers = follows.filter((follow) => follow.followingId === currentAccount.id).length;
    const following = follows.filter((follow) => follow.followerId === currentAccount.id).length;
    return `You have ${followers} ${followers === 1 ? "follower" : "followers"} and you follow ${following} ${following === 1 ? "reader" : "readers"}.`;
  }
  if (query.includes("recommendation")) {
    const received = shares.filter((share) => share.recipientId === currentAccount.id && share.kind === "book");
    const sent = shares.filter((share) => share.senderId === currentAccount.id && share.kind === "book");
    const unread = received.filter((share) => !share.recipientReadAt).length;
    return `You have received ${received.length} book ${received.length === 1 ? "recommendation" : "recommendations"} and sent ${sent.length}. ${unread ? `${unread} received ${unread === 1 ? "recommendation is" : "recommendations are"} unread.` : "You have no unread recommendations."}`;
  }
  if (query.includes("notification")) {
    const unread = profileNotifications.filter((item) => !item.readAt).length;
    return `You have ${profileNotifications.length} notifications in total, with ${unread} unread.`;
  }
  if (query.includes("achievement")) {
    return profileAchievements.length
      ? `You have unlocked ${profileAchievements.length} ${profileAchievements.length === 1 ? "achievement" : "achievements"}: ${nillionList(profileAchievements.map((item) => item.title), 6)}.`
      : "You have not unlocked an achievement yet.";
  }
  if (query.includes("rune") || query.includes("streak")) {
    return `You have ${runesBalance.toLocaleString()} Runes. Your current daily streak is ${streakCurrent} ${streakCurrent === 1 ? "day" : "days"}, and your longest is ${streakLongest} ${streakLongest === 1 ? "day" : "days"}.`;
  }
  if (query.includes("genre")) {
    const totals = accountBooks.reduce((result, book) => {
      const genre = book.genre || "Uncategorized";
      result[genre] = (result[genre] || 0) + 1;
      return result;
    }, {});
    const ordered = Object.entries(totals).sort((first, second) => second[1] - first[1]);
    return ordered.length
      ? `Your most represented genres are ${nillionList(ordered.map(([genre, count]) => `${genre} (${count})`), 6)}.`
      : "Add books with genres and I can summarize your collection by genre.";
  }
  if (query.includes("finished") || query.includes("books have i read") || query.includes("read books")) {
    const finished = accountBooks.filter((book) => book.status === "read");
    return finished.length
      ? `You have marked ${finished.length} ${finished.length === 1 ? "book" : "books"} as read: ${nillionList(finished.map((book) => book.title), 7)}.`
      : "No books in your collection are marked Read yet.";
  }
  if (query.includes("to be read") || query.includes("unread book") || query.includes("not read")) {
    const unread = accountBooks.filter((book) => book.status === "unread");
    return unread.length
      ? `You have ${unread.length} ${unread.length === 1 ? "book" : "books"} waiting to be read: ${nillionList(unread.map((book) => book.title), 7)}.`
      : "Every book in your collection has been started or marked Read.";
  }
  if (query.includes("collection") || query.includes("my library") || query.includes("library overview") || query.includes("how many books")) {
    const read = accountBooks.filter((book) => book.status === "read").length;
    const reading = accountBooks.filter((book) => book.status === "reading").length;
    const unread = accountBooks.length - read - reading;
    return `Your collection has ${accountBooks.length} ${accountBooks.length === 1 ? "book" : "books"}: ${read} read, ${reading} busy reading, and ${unread} to be read. You also have ${accountWishlist.length} on your wishlist and ${accountPassages.length} saved passages.`;
  }

  const searchResult = nillionSearchAnswer(query);
  return searchResult || "I could not find a confident answer in your saved data. Try asking about a title, author, reading period, passage, project, word, wishlist, recommendation, or profile statistic.";
}

function updateNillionVoiceControl() {
  if (!elements.nillionVoiceToggle) return;
  const supported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  if (!supported) nillionVoiceEnabled = false;
  elements.nillionVoiceToggle.setAttribute("aria-pressed", String(nillionVoiceEnabled));
  elements.nillionVoiceToggle.setAttribute("aria-disabled", String(!supported));
  elements.nillionVoiceToggle.title = supported
    ? `${nillionVoiceEnabled ? "Disable" : "Enable"} spoken answers`
    : "Spoken answers are not supported by this browser";
  elements.nillionVoiceLabel.textContent = supported
    ? `Voice ${nillionVoiceEnabled ? "on" : "off"}`
    : "Voice unavailable";
}

function speakNillionAnswer(answer) {
  if (!nillionVoiceEnabled || !("speechSynthesis" in window)) return;
  const session = ++nillionSpeechSession;
  window.speechSynthesis.cancel();
  const chunks = String(answer || "")
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.flatMap((sentence) => {
      const cleaned = sentence.replace(/\s+/g, " ").trim();
      if (cleaned.length <= 240) return cleaned ? [cleaned] : [];
      const parts = [];
      let remaining = cleaned;
      while (remaining.length > 240) {
        let splitAt = remaining.lastIndexOf(" ", 240);
        if (splitAt < 80) splitAt = 240;
        parts.push(remaining.slice(0, splitAt).trim());
        remaining = remaining.slice(splitAt).trim();
      }
      if (remaining) parts.push(remaining);
      return parts;
    }) || [];
  if (!chunks.length) return;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((item) => /^en(-|_)/i.test(item.lang)) || null;
  let index = 0;
  const finish = () => {
    if (session === nillionSpeechSession) {
      elements.nillionAssistant?.classList.remove("speaking");
    }
  };
  const speakNext = () => {
    if (session !== nillionSpeechSession || index >= chunks.length) {
      finish();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = voice;
    utterance.rate = 0.94;
    utterance.pitch = 0.96;
    utterance.onstart = () => elements.nillionAssistant?.classList.add("speaking");
    utterance.onend = () => {
      index += 1;
      speakNext();
    };
    utterance.onerror = finish;
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
}

function askNillion(question) {
  const trimmed = String(question || "").trim();
  if (!trimmed) return;
  window.clearTimeout(nillionResponseTimer);
  nillionSpeechSession += 1;
  window.speechSynthesis?.cancel();
  elements.nillionAssistant.classList.remove("speaking");
  elements.nillionAssistant.classList.add("thinking");
  elements.nillionResponse.textContent = "Searching your library...";
  nillionResponseTimer = window.setTimeout(() => {
    const result = answerNillionQuestion(trimmed);
    const answer = typeof result === "string" ? { text: result } : result;
    elements.nillionResponse.textContent = answer.text;
    elements.nillionAssistant.classList.remove("thinking");
    speakNillionAnswer(answer.speech || answer.text);
  }, 360);
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

function parsePageNumber(value) {
  return parsePageReference(value).number;
}

function romanToNumber(value) {
  const numerals = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 };
  const text = String(value || "").trim().toLocaleLowerCase();
  if (!/^[ivxlcdm]+$/.test(text)) return 0;
  let total = 0;
  let previous = 0;
  for (let index = text.length - 1; index >= 0; index -= 1) {
    const current = numerals[text[index]];
    if (!current) return 0;
    total += current < previous ? -current : current;
    previous = Math.max(previous, current);
  }
  return total > 0 ? total : 0;
}

function numberToRoman(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0 || number > 3999) return "";
  const numerals = [
    [1000, "m"],
    [900, "cm"],
    [500, "d"],
    [400, "cd"],
    [100, "c"],
    [90, "xc"],
    [50, "l"],
    [40, "xl"],
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ];
  let remaining = number;
  let result = "";
  numerals.forEach(([amount, numeral]) => {
    while (remaining >= amount) {
      result += numeral;
      remaining -= amount;
    }
  });
  return result;
}

function parsePageReference(value) {
  const raw = String(value || "").trim();
  if (!raw) return { raw, number: 0, isValid: true, isEmpty: true, label: "" };
  if (/^\d+$/.test(raw)) {
    const number = Number(raw);
    return {
      raw,
      number: Number.isFinite(number) && number >= 0 ? Math.floor(number) : 0,
      isValid: Number.isFinite(number) && number >= 0,
      isEmpty: false,
      label: raw,
      kind: "numeric",
    };
  }
  const roman = romanToNumber(raw);
  return {
    raw,
    number: roman,
    isValid: roman > 0,
    isEmpty: false,
    label: raw,
    kind: roman > 0 ? "roman" : "invalid",
  };
}

function countPagesBetweenReferences(startRef, endRef) {
  if (
    !startRef?.isValid ||
    !endRef?.isValid ||
    startRef.isEmpty ||
    endRef.isEmpty ||
    !startRef.number ||
    !endRef.number
  ) {
    return 0;
  }
  if (startRef.kind === endRef.kind) {
    return endRef.number >= startRef.number
      ? endRef.number - startRef.number + 1
      : 0;
  }
  if (startRef.kind === "roman" && endRef.kind === "numeric") {
    return endRef.number + 1;
  }
  return 0;
}

function isPageRangeOrderValid(startRef, endRef) {
  if (
    !startRef?.isValid ||
    !endRef?.isValid ||
    startRef.isEmpty ||
    endRef.isEmpty
  ) {
    return true;
  }
  if (startRef.kind === endRef.kind) return endRef.number >= startRef.number;
  return startRef.kind === "roman" && endRef.kind === "numeric";
}

function isContinueBeforeFinish(endRef, continueRef) {
  if (
    !endRef?.isValid ||
    !continueRef?.isValid ||
    endRef.isEmpty ||
    continueRef.isEmpty
  ) {
    return false;
  }
  if (endRef.kind === continueRef.kind) return continueRef.number < endRef.number;
  return endRef.kind === "numeric" && continueRef.kind === "roman";
}

function suggestedContinuePage(endRef) {
  if (!endRef?.isValid || endRef.isEmpty || !endRef.number) return "";
  return endRef.kind === "roman"
    ? numberToRoman(endRef.number + 1)
    : String(endRef.number + 1);
}

function parseSpecificPageToken(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  const numeric = parsePageNumber(text);
  if (/^\d+$/.test(text)) {
    return { key: `n:${numeric}`, label: String(numeric), numeric };
  }
  const roman = romanToNumber(text);
  if (roman) {
    return { key: `r:${roman}`, label: text, numeric: 0 };
  }
  return { key: `t:${normalize(text)}`, label: text, numeric: 0 };
}

function pageRangeTokens(startToken, endToken) {
  const start = parseSpecificPageToken(startToken);
  const end = parseSpecificPageToken(endToken);
  if (!start || !end) return [];
  const startRef = parsePageReference(startToken);
  const endRef = parsePageReference(endToken);
  const keys = pageReferenceKeysBetween(startRef, endRef);
  if (!keys.length) {
    return [start, end];
  }
  return keys.map((key) => {
    const [type, valueText] = key.split(":");
    const value = Number(valueText);
    return {
      key,
      label: type === "n" ? String(value) : numberToRoman(value),
      numeric: type === "n" ? value : 0,
    };
  });
}

function pageReferenceKey(ref) {
  if (!ref?.isValid || ref.isEmpty || !ref.number) return "";
  return `${ref.kind === "roman" ? "r" : "n"}:${ref.number}`;
}

function pageReferenceKeysBetween(startRef, endRef) {
  if (!countPagesBetweenReferences(startRef, endRef)) return [];
  if (startRef.kind === endRef.kind) {
    const prefix = startRef.kind === "roman" ? "r" : "n";
    const rangeSize = Math.min(endRef.number - startRef.number + 1, 1500);
    return Array.from(
      { length: rangeSize },
      (_, index) => `${prefix}:${startRef.number + index}`,
    );
  }
  if (startRef.kind === "roman" && endRef.kind === "numeric") {
    const numericKeys = Array.from(
      { length: Math.min(endRef.number, 1500) },
      (_, index) => `n:${index + 1}`,
    );
    return [`r:${startRef.number}`, ...numericKeys];
  }
  return [];
}

function parseSpecificPages(value) {
  const pages = new Map();
  String(value || "")
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((item) => {
      const rangeParts = item.split(/\s*[-–—]\s*/);
      const tokens =
        rangeParts.length === 2
          ? pageRangeTokens(rangeParts[0], rangeParts[1])
          : [parseSpecificPageToken(item)].filter(Boolean);
      tokens.forEach((token) => {
        if (!pages.has(token.key)) pages.set(token.key, token);
      });
    });
  const entries = [...pages.values()];
  const numericPages = entries
    .map((item) => item.numeric)
    .filter((page) => page > 0)
    .sort((a, b) => a - b);
  return {
    count: entries.length,
    display: String(value || "").trim(),
    pageKeys: entries.map((item) => item.key),
    numericPages,
    firstNumericPage: numericPages[0] || 0,
    highestNumericPage: numericPages[numericPages.length - 1] || 0,
  };
}

function normalizeBookPages(book, status = book?.status || "unread") {
  const firstPage = parsePageNumber(book?.firstPage);
  const lastPage = parsePageNumber(book?.lastPage);
  let currentPage = parsePageNumber(book?.currentPage);
  if (status === "read" && firstPage && lastPage && lastPage >= firstPage) {
    currentPage = lastPage;
  }
  if (status === "reading" && firstPage && !currentPage) {
    currentPage = firstPage;
  }
  return { firstPage, lastPage, currentPage };
}

function loggedPageReached(entry) {
  const endPage = parsePageNumber(entry?.endPage);
  if (endPage) return endPage;
  const highestPageRead = parsePageNumber(entry?.highestPageRead);
  if (highestPageRead) return highestPageRead;
  const continuePage = parsePageNumber(entry?.continuePage);
  if (continuePage > 1) return continuePage - 1;
  const startPage = parsePageNumber(entry?.startPage);
  const pagesRead = parsePageNumber(entry?.pagesRead);
  return startPage && pagesRead ? startPage + pagesRead - 1 : 0;
}

function readingSessionsForBook(book) {
  if (!book || book.ownerId !== currentAccount?.id) return [];
  const titleKey = normalize(book.title);
  const authorKey = normalize(book.author);
  return ownedByCurrent(readingLog).filter((entry) => {
    const sameTitle = normalize(entry.title) === titleKey;
    const entryAuthorKey = normalize(entry.author);
    const sameAuthor =
      !authorKey || !entryAuthorKey || entryAuthorKey === authorKey;
    return sameTitle && sameAuthor;
  });
}

function loggedBookProgress(book) {
  const sessions = readingSessionsForBook(book);
  return sessions.reduce(
    (best, entry) => Math.max(best, loggedPageReached(entry)),
    0,
  );
}

function bookPageCount(book) {
  const { firstPage, lastPage } = normalizeBookPages(book);
  return firstPage && lastPage && lastPage >= firstPage
    ? lastPage - firstPage + 1
    : 0;
}

function loggedPagesForBook(book) {
  return readingSessionsForBook(book).reduce(
    (total, entry) => total + (Number(entry.pagesRead) || 0),
    0,
  );
}

function loggedPageKeysForEntry(entry) {
  if (entry?.specificPages) {
    return parseSpecificPages(entry.specificPages).pageKeys || [];
  }
  const startRef = parsePageReference(entry?.startPageLabel || entry?.startPage);
  const endRef = parsePageReference(entry?.endPageLabel || entry?.endPage);
  return pageReferenceKeysBetween(startRef, endRef);
}

function distinctLoggedPagesFromSessions(sessions) {
  const pageKeys = new Set();
  let unkeyedPages = 0;
  sessions.forEach((entry) => {
    const keys = loggedPageKeysForEntry(entry);
    if (keys.length) {
      keys.forEach((key) => pageKeys.add(key));
    } else {
      unkeyedPages += Number(entry.pagesRead) || 0;
    }
  });
  return pageKeys.size + unkeyedPages;
}

function progressPagesForBook(book) {
  const { firstPage, lastPage, currentPage } = normalizeBookPages(book);
  if (!firstPage || !lastPage || lastPage < firstPage) return 0;
  const reachedPage = Math.min(Math.max(currentPage || firstPage - 1, firstPage - 1), lastPage);
  return Math.max(0, reachedPage - firstPage + 1);
}

function lifetimePagesForBook(book) {
  const pageCount = bookPageCount(book);
  const loggedPages = distinctLoggedPagesFromSessions(readingSessionsForBook(book));
  if (book.status === "read" && pageCount) return pageCount;
  const progressPages = progressPagesForBook(book);
  const bestKnownPages = Math.max(progressPages, loggedPages);
  return pageCount ? Math.min(pageCount, bestKnownPages) : bestKnownPages;
}

function lifetimePagesReadFrom(accountLog) {
  const accountBooks = booksFor(currentAccount?.id);
  const matchedEntryIds = new Set();
  const bookPages = accountBooks.reduce((total, book) => {
    readingSessionsForBook(book).forEach((entry) => matchedEntryIds.add(entry.id));
    return total + lifetimePagesForBook(book);
  }, 0);
  const unmatchedGroups = accountLog
    .filter((entry) => !matchedEntryIds.has(entry.id))
    .reduce((groups, entry) => {
      const key = `${normalize(entry.title)}\u0000${normalize(entry.author)}`;
      groups[key] ||= [];
      groups[key].push(entry);
      return groups;
    }, {});
  const unmatchedPages = Object.values(unmatchedGroups).reduce(
    (total, sessions) => total + distinctLoggedPagesFromSessions(sessions),
    0,
  );
  return bookPages + unmatchedPages;
}

function bookProgressInfo(book) {
  const { firstPage, lastPage, currentPage } = normalizeBookPages(book);
  const hasRange = Boolean(firstPage && lastPage && lastPage >= firstPage);
  if (!hasRange) {
    return {
      firstPage,
      lastPage,
      currentPage,
      percent: 0,
      hasRange: false,
      detail: "Add the first and last page to track progress.",
    };
  }
  const loggedPage = loggedBookProgress(book);
  const bestCurrentPage = Math.max(currentPage, loggedPage);
  const totalPages = lastPage - firstPage + 1;
  const pageReached = Math.min(
    Math.max(bestCurrentPage || firstPage - 1, firstPage - 1),
    lastPage,
  );
  const hasStarted = pageReached >= firstPage;
  const pagesRead = Math.max(0, pageReached - firstPage + 1);
  const percent = Math.min(
    100,
    Math.max(0, Math.round((pagesRead / totalPages) * 100)),
  );
  const detailSource = loggedPage > currentPage ? " from reading log" : "";
  return {
    firstPage,
    lastPage,
    currentPage: pageReached,
    percent,
    hasRange: true,
    detail: hasStarted
      ? `Pages ${firstPage}-${lastPage}; reached ${pageReached}${detailSource}`
      : `Pages ${firstPage}-${lastPage}; not started`,
  };
}

function renderBookProgress(book) {
  const progress = bookProgressInfo(book);
  return `
    <div class="book-progress" aria-label="Reading progress for ${escapeHtml(book.title)}">
      <div class="book-progress-meta">
        <span>Reading progress</span>
        <strong>${progress.percent}%</strong>
      </div>
      <div class="book-progress-track" aria-hidden="true">
        <span style="width: ${progress.percent}%"></span>
      </div>
      <small>${escapeHtml(progress.detail)}</small>
    </div>
  `;
}

function renderBook(book) {
  const menuIsOpen = openMenuId === book.id;
  const rating = Number(book.rating) || 0;
  const spotlighted = highlightedCollectionBookId === book.id;
  const cover = book.coverImage
    ? `<img src="${book.coverImage}" alt="The user's copy of ${escapeHtml(book.title)}" />`
    : `<div class="book-cover-placeholder" aria-hidden="true">${escapeHtml(book.title.charAt(0).toUpperCase())}</div>`;
  return `
    <article class="book-card ${spotlighted ? "spotlight" : ""}" data-book-id="${book.id}" style="--card-accent: ${colorForGenre(book.genre)}" tabindex="-1">
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
      ${renderBookProgress(book)}
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

function renderCoverFlowCover(book, index, activeIndex) {
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const hidden = distance > 3;
  const cover = book.coverImage
    ? `<img src="${book.coverImage}" alt="Cover of ${escapeHtml(book.title)}" />`
    : `
        <span class="cover-flow-placeholder" style="--flow-accent:${colorForGenre(book.genre)}">
          <small>${escapeHtml(book.genre || "My Library")}</small>
          <strong>${escapeHtml(book.title)}</strong>
          <em>${escapeHtml(book.author)}</em>
        </span>
      `;
  return `
    <button
      class="cover-flow-item ${offset === 0 ? "active" : ""}"
      type="button"
      role="option"
      data-cover-flow-id="${book.id}"
      aria-label="Select ${escapeHtml(book.title)} by ${escapeHtml(book.author)}"
      aria-selected="${offset === 0}"
      ${hidden ? 'aria-hidden="true" tabindex="-1"' : ""}
      style="
        --flow-offset:${offset};
        --flow-x:${offset * 160}px;
        --flow-depth:${distance * -90}px;
        --flow-rotation:${offset * -34}deg;
        --flow-scale:${Math.max(0.68, 1 - distance * 0.11)};
        --flow-opacity:${hidden ? 0 : Math.max(0.28, 1 - distance * 0.2)};
        --flow-layer:${20 - distance};
      "
    >
      <span class="cover-flow-art">${cover}</span>
      <span class="cover-flow-item-label">
        <strong>${escapeHtml(book.title)}</strong>
        <small>${escapeHtml(book.author)}</small>
      </span>
    </button>
  `;
}

function renderCoverFlowDetails(book) {
  if (!book) {
    return '<p class="cover-flow-empty">No books match the current filters.</p>';
  }
  const rating = Number(book.rating) || 0;
  return `
    <div class="cover-flow-details-heading">
      <div class="book-card-labels">
        <p class="genre-label">${escapeHtml(book.genre || "Uncategorized")}</p>
        <span class="book-format-badge ${escapeHtml(book.format || "print")}">${escapeHtml(bookFormatLabel(book.format))}</span>
      </div>
      <span class="cover-flow-status ${escapeHtml(book.status || "unread")}">${escapeHtml(bookStatusLabel(book.status))}</span>
    </div>
    <h3>${escapeHtml(book.title)}</h3>
    <p class="cover-flow-author">by ${escapeHtml(book.author)}</p>
    ${renderBookProgress(book)}
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
    <div class="cover-flow-primary-actions">
      <button type="button" data-action="view" data-id="${book.id}" ${book.coverImage ? "" : "disabled"}>
        View full cover
      </button>
      <button type="button" data-action="edit" data-id="${book.id}">Edit details</button>
      <button type="button" data-action="share" data-id="${book.id}">Recommend</button>
    </div>
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
    <details class="cover-flow-more-actions">
      <summary>More book actions</summary>
      <div>
        <button type="button" data-action="cover" data-id="${book.id}">${book.coverImage ? "Change photo" : "Add photo"}</button>
        <button type="button" data-action="sell" data-id="${book.id}">List for sale</button>
        <button class="remove-action" type="button" data-action="delete" data-id="${book.id}">Remove from collection</button>
      </div>
    </details>
  `;
}

function renderCoverFlow(matchingBooks) {
  if (!elements.coverFlowTrack) return;
  const activeIndexFromId = matchingBooks.findIndex(
    (book) => book.id === activeCoverFlowBookId,
  );
  const activeIndex = activeIndexFromId >= 0 ? activeIndexFromId : 0;
  const activeBook = matchingBooks[activeIndex] || null;
  activeCoverFlowBookId = activeBook?.id || "";
  elements.coverFlowTrack.innerHTML = matchingBooks
    .map((book, index) => renderCoverFlowCover(book, index, activeIndex))
    .join("");
  elements.coverFlowDetails.innerHTML = renderCoverFlowDetails(activeBook);
  elements.coverFlowPosition.textContent = matchingBooks.length
    ? `${activeIndex + 1} of ${matchingBooks.length}`
    : "0 of 0";
  elements.coverFlowPrevious.disabled = activeIndex <= 0;
  elements.coverFlowNext.disabled = activeIndex >= matchingBooks.length - 1;
}

function setActiveCoverFlowBook(bookId, { focus = false } = {}) {
  const matchingBooks = filteredBooks();
  if (!matchingBooks.some((book) => book.id === bookId)) return;
  activeCoverFlowBookId = bookId;
  renderCoverFlow(matchingBooks);
  if (focus) {
    window.requestAnimationFrame(() => {
      const activeCover = elements.coverFlowTrack.querySelector(".cover-flow-item.active");
      activeCover?.focus({ preventScroll: true });
    });
  }
}

function moveCoverFlow(direction) {
  const matchingBooks = filteredBooks();
  if (!matchingBooks.length) return;
  const currentIndex = Math.max(
    0,
    matchingBooks.findIndex((book) => book.id === activeCoverFlowBookId),
  );
  const nextIndex = Math.min(
    matchingBooks.length - 1,
    Math.max(0, currentIndex + direction),
  );
  setActiveCoverFlowBook(matchingBooks[nextIndex].id, { focus: true });
}

function setCollectionView(view) {
  collectionView = view === "coverflow" ? "coverflow" : "catalogue";
  localStorage.setItem(COLLECTION_VIEW_KEY, collectionView);
  renderBooks();
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
  const coverFlowActive = collectionView === "coverflow";
  document.querySelectorAll("[data-collection-view]").forEach((button) => {
    const active = button.dataset.collectionView === collectionView;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  elements.collectionViewDescription.textContent = coverFlowActive
    ? "Cover flow"
    : "Catalogue cards";
  renderCoverFlow(matchingBooks);
  elements.coverFlow.hidden = !coverFlowActive || matchingBooks.length === 0;
  elements.catalogueExpandButton.hidden =
    coverFlowActive || matchingBooks.length <= CATALOGUE_PREVIEW_LIMIT;
  elements.catalogueExpandButton.textContent = catalogueExpanded
    ? "Show fewer books"
    : `Show all ${matchingBooks.length} books`;
  const hasBooks = ownedByCurrent(books).length > 0;
  const hasResults = matchingBooks.length > 0;
  elements.bookGrid.hidden = !hasResults || coverFlowActive;
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

function handleCollectionBookAction(button) {
  if (!button) return;
  const { action, id } = button.dataset;
  const book = books.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (action === "view") openFullCover(book);
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
}

function focusCollectionBook(bookId) {
  const book = books.find(
    (item) => item.id === bookId && item.ownerId === currentAccount?.id,
  );
  if (!book) {
    showToast("That source book is no longer in your collection.");
    return;
  }
  window.location.hash = "#collection";
  elements.searchInput.value = book.title || "";
  elements.genreFilter.value = "all";
  elements.statusFilter.value = "all";
  catalogueExpanded = true;
  highlightedCollectionBookId = book.id;
  window.clearTimeout(highlightedCollectionBookTimer);
  renderBooks();
  window.requestAnimationFrame(() => {
    const escapedId =
      window.CSS && typeof window.CSS.escape === "function"
        ? window.CSS.escape(book.id)
        : book.id;
    const card = elements.bookGrid.querySelector(
      `.book-card[data-book-id="${escapedId}"]`,
    );
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    card.focus({ preventScroll: true });
  });
  highlightedCollectionBookTimer = window.setTimeout(() => {
    highlightedCollectionBookId = "";
    renderBooks();
  }, 2600);
  showToast(`Opened "${book.title}" in your Collection.`);
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
  elements.streakBookCount.textContent = streakCurrent;
  elements.streakRewardDialog.classList.remove("celebrating");
  void elements.streakRewardDialog.offsetWidth;
  document.body.classList.add("streak-celebration-open");
  elements.streakRewardDialog.showModal();
  window.requestAnimationFrame(() => {
    elements.streakRewardDialog.classList.add("celebrating");
  });
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
  elements.bookFirstPageInput.value = book.firstPage || "";
  elements.bookLastPageInput.value = book.lastPage || "";
  elements.bookCurrentPageInput.value = book.currentPage || "";
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
  const rawFirstPage = String(formData.get("firstPage") || "").trim();
  const rawLastPage = String(formData.get("lastPage") || "").trim();
  const rawCurrentPage = String(formData.get("currentPage") || "").trim();
  const firstPage = parsePageNumber(rawFirstPage);
  const lastPage = parsePageNumber(rawLastPage);
  const currentPage = parsePageNumber(rawCurrentPage);
  const pageFieldsStarted = Boolean(rawFirstPage || rawLastPage || rawCurrentPage);
  elements.bookFirstPageInput.setCustomValidity("");
  elements.bookLastPageInput.setCustomValidity("");
  elements.bookCurrentPageInput.setCustomValidity("");
  if (pageFieldsStarted && (!rawFirstPage || !rawLastPage)) {
    const target = rawFirstPage ? elements.bookLastPageInput : elements.bookFirstPageInput;
    target.setCustomValidity("Add both the first and last page to track progress.");
    target.reportValidity();
    return;
  }
  if (rawFirstPage && rawLastPage && lastPage < firstPage) {
    elements.bookLastPageInput.setCustomValidity(
      "The last page cannot be before the first page.",
    );
    elements.bookLastPageInput.reportValidity();
    return;
  }
  if (rawCurrentPage && rawLastPage && currentPage > lastPage) {
    elements.bookCurrentPageInput.setCustomValidity(
      "The page reached cannot be after the last page.",
    );
    elements.bookCurrentPageInput.reportValidity();
    return;
  }
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
  const status = formData.get("status");
  const normalizedPages = normalizeBookPages(
    {
      firstPage: rawFirstPage ? firstPage : 0,
      lastPage: rawLastPage ? lastPage : 0,
      currentPage: rawCurrentPage ? currentPage : 0,
    },
    status,
  );
  const book = {
    id: existingBook?.id || crypto.randomUUID(),
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    genre: formData.get("genre").trim(),
    format: formData.get("format") || "print",
    status,
    firstPage: normalizedPages.firstPage,
    lastPage: normalizedPages.lastPage,
    currentPage: normalizedPages.currentPage,
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
  Object.assign(book, normalizeBookPages(book, status));
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

function ensureLifetimePagesCard() {
  if (elements.lifetimePagesInsight) return;
  const pagesCard = elements.pagesInsight?.closest(".insight-card");
  if (!pagesCard) return;
  const card = document.createElement("article");
  card.className = "insight-card";
  card.innerHTML = `
    <span>Lifetime pages</span>
    <strong id="lifetime-pages-insight">0</strong>
    <small>Completed books plus unique logged progress</small>
  `;
  pagesCard.insertAdjacentElement("afterend", card);
  elements.lifetimePagesInsight = card.querySelector("#lifetime-pages-insight");
}

function ensureSpecificPagesField() {
  if (elements.specificPagesInput) return;
  const continueLabel = elements.continuePageInput?.closest("label");
  if (!continueLabel) return;
  const wrapper = document.createElement("label");
  wrapper.className = "specific-pages-field";
  wrapper.innerHTML = `
    <span>Specific pages read (optional)</span>
    <textarea
      id="specific-pages-input"
      name="specificPages"
      rows="3"
      placeholder="For example: x, xiii, 1, 2, 3 or 45-52"
    ></textarea>
    <small class="field-help">Use this for front matter, skipped pages, rereading, or non-contiguous pages.</small>
  `;
  continueLabel.insertAdjacentElement("afterend", wrapper);
  elements.specificPagesInput = wrapper.querySelector("#specific-pages-input");
  elements.specificPagesInput.addEventListener("input", suggestPagesRead);
}

function ensureReadingChartPanel() {
  if (!elements.generateReadingChartsButton) {
    const heading = document.querySelector("#reading-log .section-heading");
    if (heading) {
      const button = document.createElement("button");
      button.className = "primary-button light-button reading-chart-toggle";
      button.id = "generate-reading-charts";
      button.type = "button";
      button.textContent = "Generate charts";
      heading.appendChild(button);
      elements.generateReadingChartsButton = button;
      button.addEventListener("click", () => {
        readingChartsVisible = !readingChartsVisible;
        renderReadingInsights();
      });
    }
  }
  if (elements.readingChartPanel) return;
  const insights = elements.readingDeepInsights;
  if (!insights) return;
  const panel = document.createElement("div");
  panel.id = "reading-chart-panel";
  panel.className = "reading-chart-panel";
  panel.hidden = true;
  insights.insertAdjacentElement("afterend", panel);
  elements.readingChartPanel = panel;
}

function ensureReadingEnhancementStyles() {
  if (document.querySelector("#reading-enhancement-styles")) return;
  const style = document.createElement("style");
  style.id = "reading-enhancement-styles";
  style.textContent = `
    .specific-pages-field{padding:1rem;background:rgba(201,137,69,.08);border:1px solid rgba(23,42,34,.12)}
    #log-form textarea{width:100%;min-height:96px;padding:.85rem .9rem 0;color:var(--ink);background:rgba(255,255,255,.45);border:1px solid rgba(23,42,34,.25);border-radius:2px;line-height:1.45;resize:vertical}
    #log-form textarea::placeholder{color:rgba(23,42,34,.48);font-style:italic}
    .reading-chart-toggle{flex:0 0 auto}
    .reading-chart-panel{margin:-1.4rem 0 3rem;padding:clamp(1rem,3vw,1.5rem);background:rgba(244,240,231,.08);border:1px solid rgba(244,240,231,.16)}
    .reading-chart-panel[hidden]{display:none}
    .reading-chart-heading{display:grid;grid-template-columns:minmax(0,.9fr) minmax(260px,1.1fr);gap:1.25rem;align-items:end;margin-bottom:1.2rem}
    .reading-chart-heading h3{margin:0;color:var(--paper);font-size:clamp(1.6rem,3vw,2.2rem);font-weight:400}
    .reading-chart-heading>div:last-child>p:first-child{margin:0;color:rgba(244,240,231,.72);line-height:1.55}
    .reading-chart-period{margin:.4rem 0 0;color:rgba(244,240,231,.56);font-size:.82rem}
    .reading-chart-controls{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1rem;align-items:end}
    .reading-chart-controls label{display:grid;gap:.35rem;min-width:min(230px,100%)}
    .reading-chart-controls span{color:rgba(244,240,231,.62);font-size:.68rem;letter-spacing:.09em;text-transform:uppercase}
    .reading-chart-controls select{min-height:42px;padding:0 .75rem;color:var(--ink);background:rgba(244,240,231,.9);border:1px solid rgba(244,240,231,.28);border-radius:2px}
    .reading-chart-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
    .reading-selected-chart{grid-column:1/-1}
    .reading-selected-chart .reading-chart-card{min-height:320px}
    .reading-chart-card{min-height:260px;padding:1.2rem;background:rgba(8,29,22,.34);border:1px solid rgba(244,240,231,.14)}
    .reading-chart-card.wide{min-height:auto}
    .reading-chart-card h4{margin:0 0 1rem;color:var(--paper);font-size:1.2rem;font-weight:400}
    .reading-chart-card p{color:rgba(244,240,231,.68)}
    .pie-chart{width:min(180px,56vw);aspect-ratio:1;margin:0 auto 1rem;border:10px solid rgba(244,240,231,.08);border-radius:50%;box-shadow:inset 0 0 0 28px rgba(8,29,22,.34)}
    .chart-legend,.reading-bar-chart{display:grid;gap:.55rem;padding:0;margin:0;list-style:none}
    .chart-legend li,.reading-bar-chart li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:.55rem;color:rgba(244,240,231,.72);font-size:.8rem}
    .chart-legend li>span{width:.72rem;height:.72rem;background:var(--swatch);border-radius:50%}
    .chart-legend strong,.reading-bar-chart span{overflow:hidden;color:var(--paper);font-weight:400;text-overflow:ellipsis;white-space:nowrap}
    .chart-legend small,.reading-bar-chart small{color:rgba(244,240,231,.58)}
    .reading-bar-chart li{grid-template-columns:minmax(90px,.8fr) minmax(120px,1.2fr) auto}
    .reading-bar-chart div{height:.62rem;overflow:hidden;background:rgba(244,240,231,.12);border-radius:999px}
    .reading-bar-chart b{height:100%;display:block;border-radius:inherit}
    .reading-line-chart{display:flex;align-items:end;gap:.25rem;height:150px;padding:.8rem .4rem;border-bottom:1px solid rgba(244,240,231,.18)}
    .reading-line-chart span{flex:1;min-width:6px;background:linear-gradient(180deg,var(--gold),rgba(213,167,68,.38));border-radius:999px 999px 0 0}
    .reading-line-chart span.quiet{background:rgba(244,240,231,.16)}
    .reading-chart-note{margin:.75rem 0 0;color:rgba(244,240,231,.62);font-size:.82rem}
    .reading-speed-list{display:grid;gap:.7rem;margin:0;padding:0;list-style:none}
    .reading-speed-list li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.6rem;padding:.65rem .7rem;background:rgba(244,240,231,.08);border:1px solid rgba(244,240,231,.1)}
    .reading-speed-list strong{color:var(--paper);font-weight:500}
    .reading-speed-list small{color:rgba(244,240,231,.62)}
    .reading-speed-chart{display:grid;gap:.85rem}
    .reading-speed-plot{width:100%;height:auto;min-height:220px;overflow:visible}
    .reading-speed-grid{stroke:rgba(244,240,231,.14);stroke-width:1}
    .reading-speed-line{fill:none;stroke:var(--gold);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
    .reading-speed-area{fill:url(#reading-speed-fill)}
    .reading-speed-point{fill:var(--paper);stroke:var(--gold);stroke-width:2}
    .reading-speed-axis{display:flex;justify-content:space-between;gap:.5rem;color:rgba(244,240,231,.55);font-size:.72rem}
    .reading-analytics-grid{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.75rem}
    .reading-analytics-grid article{padding:.9rem;background:rgba(244,240,231,.08);border:1px solid rgba(244,240,231,.12)}
    .reading-analytics-grid span{display:block;margin-bottom:.35rem;color:rgba(244,240,231,.56);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}
    .reading-analytics-grid strong{display:block;color:var(--paper);font-size:clamp(1.25rem,2vw,1.65rem);font-weight:400}
    .reading-analytics-grid p{margin:.35rem 0 0;color:rgba(244,240,231,.62);font-size:.78rem;line-height:1.35}
    @media(max-width:900px){.reading-analytics-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:800px){.reading-chart-heading,.reading-chart-grid{grid-template-columns:1fr}}
    @media(max-width:540px){.reading-chart-controls,.reading-chart-controls button{width:100%}.reading-bar-chart li,.reading-speed-list li{grid-template-columns:1fr;align-items:start}.reading-analytics-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function configureReadingPageInputs() {
  [
    { input: elements.startPageInput, placeholder: "1 or x" },
    { input: elements.endPageInput, placeholder: "25 or xiii" },
    { input: elements.continuePageInput, placeholder: "26 or xiv" },
  ].forEach(({ input, placeholder }) => {
    if (!input) return;
    input.type = "text";
    input.setAttribute("inputmode", "text");
    input.placeholder = placeholder;
    input.removeAttribute("min");
    input.removeAttribute("step");
    input.removeAttribute("pattern");
    input.removeAttribute("required");
  });
}

function ensureReadingLogEnhancements() {
  ensureReadingEnhancementStyles();
  ensureSpecificPagesField();
  ensureLifetimePagesCard();
  ensureReadingChartPanel();
  [elements.pagesReadInput, elements.startPageInput, elements.endPageInput, elements.continuePageInput]
    .filter(Boolean)
    .forEach((input) => input.removeAttribute("required"));
  configureReadingPageInputs();
}

function chartColor(index) {
  return [
    "#d5a744",
    "#ad5f45",
    "#8da071",
    "#7393b3",
    "#b86f52",
    "#a982b5",
    "#54a7a2",
  ][index % 7];
}

function sortedTotals(totals) {
  return Object.entries(totals)
    .filter(([, value]) => value > 0)
    .sort((first, second) => second[1] - first[1]);
}

function renderPieChart(totals, label) {
  const entries = sortedTotals(totals);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (!total) {
    return `<article class="reading-chart-card"><h4>${escapeHtml(label)}</h4><p>No chart data yet.</p></article>`;
  }
  let cursor = 0;
  const segments = entries
    .map(([name, value], index) => {
      const start = cursor;
      cursor += (value / total) * 100;
      return `${chartColor(index)} ${start}% ${cursor}%`;
    })
    .join(", ");
  const legend = entries
    .map(
      ([name, value], index) => `
        <li>
          <span style="--swatch:${chartColor(index)}"></span>
          <strong>${escapeHtml(name)}</strong>
          <small>${Math.round((value / total) * 100)}%</small>
        </li>
      `,
    )
    .join("");
  return `
    <article class="reading-chart-card">
      <h4>${escapeHtml(label)}</h4>
      <div class="pie-chart" style="background: conic-gradient(${segments})" role="img" aria-label="${escapeHtml(label)} pie chart"></div>
      <ul class="chart-legend">${legend}</ul>
    </article>
  `;
}

function renderBarChart(totals, label, unit = "pages") {
  const entries = sortedTotals(totals).slice(0, 6);
  const maximum = Math.max(...entries.map(([, value]) => value), 1);
  const rows = entries.length
    ? entries
        .map(
          ([name, value], index) => `
            <li>
              <span>${escapeHtml(name)}</span>
              <div><b style="width:${Math.max(6, (value / maximum) * 100)}%; background:${chartColor(index)}"></b></div>
              <small>${value.toLocaleString()} ${unit}</small>
            </li>
          `,
        )
        .join("")
    : "<li>No chart data yet.</li>";
  return `
    <article class="reading-chart-card wide">
      <h4>${escapeHtml(label)}</h4>
      <ul class="reading-bar-chart">${rows}</ul>
    </article>
  `;
}

function getRecentReadingDays(dayCount = 30) {
  const days = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  for (let offset = dayCount - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    days.push({
      date: localDateString(date),
      label: new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
      }).format(date),
      shortLabel: new Intl.DateTimeFormat(undefined, { day: "numeric" }).format(date),
    });
  }
  return days;
}

function medianNumber(values) {
  const sorted = values
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((first, second) => first - second);
  if (!sorted.length) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function readingMonthLabel(monthKey) {
  const [year, month] = String(monthKey || "").split("-").map(Number);
  if (!year || !month) return "Unknown month";
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1, 12));
}

function readingAnalyticsPeriodOptions(accountLog) {
  const months = new Set();
  const years = new Set();
  accountLog.forEach((entry) => {
    const date = String(entry.date || "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      months.add(date.slice(0, 7));
      years.add(date.slice(0, 4));
    }
  });
  return [
    { value: "recent-30", label: "Last 30 days" },
    ...[...months]
      .sort((first, second) => second.localeCompare(first))
      .map((month) => ({ value: `month:${month}`, label: readingMonthLabel(month) })),
    ...[...years]
      .sort((first, second) => second.localeCompare(first))
      .map((year) => ({ value: `year:${year}`, label: year })),
    { value: "all", label: "All time" },
  ];
}

function ensureReadingAnalyticsRange(accountLog) {
  const options = readingAnalyticsPeriodOptions(accountLog);
  if (!options.some((option) => option.value === readingAnalyticsRange)) {
    readingAnalyticsRange = options[0]?.value || "recent-30";
  }
}

function monthDays(year, monthIndex) {
  const days = [];
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, monthIndex, day, 12);
    days.push({
      key: localDateString(date),
      label: new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
      }).format(date),
    });
  }
  return days;
}

function readingAnalyticsScope(accountLog, rangeValue = readingAnalyticsRange) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  if (rangeValue.startsWith("month:")) {
    const monthKey = rangeValue.replace("month:", "");
    const [year, month] = monthKey.split("-").map(Number);
    const entries = accountLog.filter((entry) => String(entry.date || "").startsWith(`${monthKey}-`));
    const days = monthDays(year, month - 1);
    const totals = entries.reduce((summary, entry) => {
      summary[entry.date] = (summary[entry.date] || 0) + (Number(entry.pagesRead) || 0);
      return summary;
    }, {});
    return {
      entries,
      intervalItems: days.map((day) => ({ label: day.label, value: totals[day.key] || 0 })),
      label: readingMonthLabel(monthKey),
      intervalLabel: `Pages during ${readingMonthLabel(monthKey)}`,
      intervalUnit: "pages",
      dayCount: days.length,
    };
  }
  if (rangeValue.startsWith("year:")) {
    const year = rangeValue.replace("year:", "");
    const entries = accountLog.filter((entry) => String(entry.date || "").startsWith(`${year}-`));
    const totals = entries.reduce((summary, entry) => {
      const month = String(entry.date || "").slice(0, 7);
      summary[month] = (summary[month] || 0) + (Number(entry.pagesRead) || 0);
      return summary;
    }, {});
    const intervalItems = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(Number(year), index, 1, 12);
      const key = `${year}-${String(index + 1).padStart(2, "0")}`;
      return {
        label: new Intl.DateTimeFormat(undefined, { month: "short" }).format(date),
        value: totals[key] || 0,
      };
    });
    return {
      entries,
      intervalItems,
      label: year,
      intervalLabel: `Pages by month in ${year}`,
      intervalUnit: "pages",
      dayCount: 365,
    };
  }
  if (rangeValue === "all") {
    const entries = [...accountLog];
    const years = [...new Set(entries.map((entry) => String(entry.date || "").slice(0, 4)).filter(Boolean))]
      .sort((first, second) => first.localeCompare(second));
    const totals = entries.reduce((summary, entry) => {
      const year = String(entry.date || "").slice(0, 4);
      summary[year] = (summary[year] || 0) + (Number(entry.pagesRead) || 0);
      return summary;
    }, {});
    return {
      entries,
      intervalItems: years.length
        ? years.map((year) => ({ label: year, value: totals[year] || 0 }))
        : [{ label: "No years yet", value: 0 }],
      label: "All time",
      intervalLabel: "Pages by year",
      intervalUnit: "pages",
      dayCount: Math.max(years.length * 365, 1),
    };
  }
  const recentDays = getRecentReadingDays(30);
  const recentDates = new Set(recentDays.map((day) => day.date));
  const entries = accountLog.filter((entry) => recentDates.has(entry.date));
  const pagesByDate = entries.reduce((summary, entry) => {
    summary[entry.date] = (summary[entry.date] || 0) + (Number(entry.pagesRead) || 0);
    return summary;
  }, {});
  return {
    entries,
    intervalItems: recentDays.map((day) => ({
      label: day.label,
      value: pagesByDate[day.date] || 0,
    })),
    label: "Last 30 days",
    intervalLabel: "Pages over the last 30 days",
    intervalUnit: "pages",
    dayCount: 30,
  };
}

function summarizeReadingLogByBook(logEntries) {
  return logEntries.reduce((totals, entry) => {
    const key = `${entry.title}\u0000${entry.author}`;
    totals[key] ||= { title: entry.title, author: entry.author, pages: 0, minutes: 0, sessions: 0 };
    totals[key].pages += Number(entry.pagesRead) || 0;
    totals[key].minutes += Number(entry.durationMinutes) || 0;
    totals[key].sessions += 1;
    return totals;
  }, {});
}

function renderColumnChart(items, label, unit = "pages") {
  const maximum = Math.max(...items.map((item) => item.value), 1);
  const bars = items
    .map((item) => {
      const height = item.value ? Math.max(8, (item.value / maximum) * 100) : 3;
      return `<span class="${item.value ? "" : "quiet"}" style="height:${height}%" title="${escapeHtml(item.label)}: ${item.value.toLocaleString()} ${unit}"></span>`;
    })
    .join("");
  const total = items.reduce((sum, item) => sum + item.value, 0);
  return `
    <article class="reading-chart-card wide">
      <h4>${escapeHtml(label)}</h4>
      <div class="reading-line-chart" role="img" aria-label="${escapeHtml(label)} column chart">${bars}</div>
      <p class="reading-chart-note">${total.toLocaleString()} ${unit} across ${items.length} chart intervals. Hover over a bar to see its value.</p>
    </article>
  `;
}

function renderSpeedTrendChart(entries) {
  const paceEntries = entries
    .filter((entry) => Number(entry.durationMinutes) > 0 && Number(entry.pagesRead) > 0)
    .sort((first, second) =>
      `${first.date}T${first.startTime || "00:00"}`.localeCompare(`${second.date}T${second.startTime || "00:00"}`),
    )
    .slice(-12)
    .map((entry) => ({
      ...entry,
      pace: Math.round(((Number(entry.pagesRead) || 0) / Number(entry.durationMinutes)) * 60),
    }));
  if (!paceEntries.length) {
    return `<article class="reading-chart-card wide"><h4>Reading speed trend</h4><p>No speed data yet. Log pages and a session duration to build this graph.</p></article>`;
  }
  const maximum = Math.max(...paceEntries.map((entry) => entry.pace), 1);
  const denominator = Math.max(paceEntries.length - 1, 1);
  const points = paceEntries.map((entry, index) => ({
    ...entry,
    x: 5 + (index / denominator) * 90,
    y: 92 - (entry.pace / maximum) * 82,
  }));
  const pointList = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `5,92 ${pointList} ${points[points.length - 1].x},92`;
  const markers = points
    .map(
      (point) => `
        <circle class="reading-speed-point" cx="${point.x}" cy="${point.y}" r="2.2">
          <title>${escapeHtml(point.title)} / ${formatDate(point.date)}: ${point.pace} pages per hour</title>
        </circle>
      `,
    )
    .join("");
  return `
    <article class="reading-chart-card wide">
      <h4>Reading speed trend</h4>
      <div class="reading-speed-chart">
        <svg class="reading-speed-plot" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Reading speed line graph for the latest ${paceEntries.length} sessions">
          <defs>
            <linearGradient id="reading-speed-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#d5a744" stop-opacity=".34"></stop>
              <stop offset="100%" stop-color="#d5a744" stop-opacity=".03"></stop>
            </linearGradient>
          </defs>
          <line class="reading-speed-grid" x1="5" y1="10" x2="95" y2="10"></line>
          <line class="reading-speed-grid" x1="5" y1="51" x2="95" y2="51"></line>
          <line class="reading-speed-grid" x1="5" y1="92" x2="95" y2="92"></line>
          <polygon class="reading-speed-area" points="${areaPoints}"></polygon>
          <polyline class="reading-speed-line" points="${pointList}"></polyline>
          ${markers}
        </svg>
        <div class="reading-speed-axis" aria-hidden="true">
          <span>${escapeHtml(formatDate(paceEntries[0].date))}</span>
          <span>Peak ${maximum} p/h</span>
          <span>${escapeHtml(formatDate(paceEntries[paceEntries.length - 1].date))}</span>
        </div>
      </div>
      <p class="reading-chart-note">Latest ${paceEntries.length} sessions with both page and duration data. Hover over a point for details.</p>
    </article>
  `;
}

function renderAnalyticsCards(cards) {
  return `
    <div class="reading-analytics-grid">
      ${cards
        .map(
          (card) => `
            <article>
              <span>${escapeHtml(card.label)}</span>
              <strong>${escapeHtml(card.value)}</strong>
              <p>${escapeHtml(card.note)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function bookForLogEntry(entry) {
  const titleKey = normalize(entry.title);
  const authorKey = normalize(entry.author);
  return booksFor(currentAccount?.id).find((book) => {
    const sameTitle = normalize(book.title) === titleKey;
    const sameAuthor = !authorKey || !normalize(book.author) || normalize(book.author) === authorKey;
    return sameTitle && sameAuthor;
  });
}

function readingSuggestion({
  sessionCount,
  activeDays,
  averageMinutes,
  averagePages,
  pace,
  recentPages,
  favoritePeriod,
  strongestWeekday,
}) {
  if (!sessionCount) {
    return "Start with three short sessions this week. A small baseline makes later patterns much easier to see.";
  }
  if (activeDays < 4) {
    return "Your recent reading is concentrated into a few days. Try scheduling one shorter extra session on a quiet day to make the habit steadier.";
  }
  if (averageMinutes > 75 && averagePages < 20) {
    return "Your sessions are long but page totals are modest. That may mean dense reading; consider logging quick reflections so slower sessions still show their value.";
  }
  if (pace >= 45) {
    return "Your pace is strong. Use that momentum for lighter books, and reserve slower time for books that need annotation or rereading.";
  }
  if (recentPages > 0 && recentPages < 60) {
    return "Your recent page count is gentle. A realistic next target is adding 10-15 pages to your weekly total.";
  }
  return `Your best pattern is ${favoritePeriod}${strongestWeekday ? `, especially around ${strongestWeekday[0]}` : ""}. Protecting that window is likely to help most.`;
}

function renderReadingCharts({
  accountLog,
  periodMinutes,
  weekdayTotals,
  sessionCount,
  activeDays,
  averageMinutes,
  averagePages,
  pace,
  recentPages,
  favoritePeriod,
  strongestWeekday,
}) {
  if (!elements.readingChartPanel) return;
  ensureReadingAnalyticsRange(accountLog);
  elements.readingChartPanel.hidden = !readingChartsVisible;
  if (elements.generateReadingChartsButton) {
    elements.generateReadingChartsButton.textContent = readingChartsVisible
      ? "Hide charts"
      : "Generate charts";
  }
  if (!readingChartsVisible) return;
  const periodOptions = readingAnalyticsPeriodOptions(accountLog);
  const scope = readingAnalyticsScope(accountLog, readingAnalyticsRange);
  const chartLog = scope.entries;
  const scopedSessionCount = chartLog.length;
  const scopedMinutes = chartLog.reduce(
    (total, entry) => total + (Number(entry.durationMinutes) || 0),
    0,
  );
  const scopedPages = chartLog.reduce(
    (total, entry) => total + (Number(entry.pagesRead) || 0),
    0,
  );
  const scopedPace = scopedMinutes
    ? Math.round((scopedPages / scopedMinutes) * 60)
    : 0;
  const scopedAverageMinutes = scopedSessionCount
    ? Math.round(scopedMinutes / scopedSessionCount)
    : 0;
  const scopedAveragePages = scopedSessionCount
    ? Math.round(scopedPages / scopedSessionCount)
    : 0;
  const scopedActiveDays = new Set(chartLog.map((entry) => entry.date)).size;
  const scopedPeriodMinutes = chartLog.reduce((totals, entry) => {
    const period = getTimePeriod(entry.startTime);
    totals[period] = (totals[period] || 0) + (Number(entry.durationMinutes) || 0);
    return totals;
  }, {});
  const scopedWeekdayTotals = chartLog.reduce((totals, entry) => {
    const label = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(
      new Date(`${entry.date}T12:00:00`),
    );
    totals[label] = (totals[label] || 0) + (Number(entry.durationMinutes) || 0);
    return totals;
  }, {});
  const scopedStrongestWeekday = Object.entries(scopedWeekdayTotals).sort(
    (first, second) => second[1] - first[1],
  )[0] || strongestWeekday;
  const scopedFavoritePeriod = Object.entries(scopedPeriodMinutes).sort(
    (first, second) => second[1] - first[1],
  )[0]?.[0] || favoritePeriod || "your logged sessions";
  const scopedByBook = summarizeReadingLogByBook(chartLog);
  const pagesByBook = Object.values(scopedByBook).reduce((totals, book) => {
    totals[book.title] = (totals[book.title] || 0) + book.pages;
    return totals;
  }, {});
  const pagesByGenre = chartLog.reduce((totals, entry) => {
    const book = bookForLogEntry(entry);
    const genre = book?.genre || "Unmatched log entries";
    totals[genre] = (totals[genre] || 0) + (Number(entry.pagesRead) || 0);
    return totals;
  }, {});
  const pagesByFormat = chartLog.reduce((totals, entry) => {
    const book = bookForLogEntry(entry);
    const format = bookFormatLabel(book?.format || "print");
    totals[format] = (totals[format] || 0) + (Number(entry.pagesRead) || 0);
    return totals;
  }, {});
  const sessionLengthTotals = chartLog.reduce((totals, entry) => {
    const minutes = Number(entry.durationMinutes) || 0;
    const bucket =
      minutes <= 20
        ? "Short sessions"
        : minutes <= 45
        ? "Steady sessions"
        : minutes <= 90
        ? "Deep sessions"
        : "Very long sessions";
    totals[bucket] = (totals[bucket] || 0) + 1;
    return totals;
  }, {});
  const paceValues = chartLog
    .filter((entry) => Number(entry.durationMinutes) > 0 && Number(entry.pagesRead) > 0)
    .map((entry) => Math.round(((Number(entry.pagesRead) || 0) / Number(entry.durationMinutes)) * 60));
  const medianPace = medianNumber(paceValues);
  const bestPace = Math.max(...paceValues, 0);
  const quietIntervals = scope.intervalItems.filter((item) => !item.value).length;
  const consistencyScore = scope.intervalItems.length
    ? Math.round(((scope.intervalItems.length - quietIntervals) / scope.intervalItems.length) * 100)
    : 0;
  const expectedWeeklyPages = scopedPages && scope.dayCount
    ? Math.round((scopedPages / scope.dayCount) * 7)
    : 0;
  const speedNote =
    medianPace && scopedPace
      ? medianPace > scopedPace
        ? "Your typical session in this period is faster than its overall average, so one or two slower sessions are weighing it down."
        : "Your typical session is at or below this period's average, suggesting a steady or more reflective pace."
      : "More sessions will make this comparison stronger.";
  const rangeOptionsHtml = periodOptions
    .map(
      (option) =>
        `<option value="${escapeHtml(option.value)}"${option.value === readingAnalyticsRange ? " selected" : ""}>${escapeHtml(option.label)}</option>`,
    )
    .join("");
  const chartDefinitions = {
    "pages-over-time": {
      label: "Pages over time (column graph)",
      html: renderColumnChart(scope.intervalItems, scope.intervalLabel),
    },
    "reading-speed": {
      label: "Reading speed (line graph)",
      html: renderSpeedTrendChart(chartLog),
    },
    books: {
      label: "Top books (bar graph)",
      html: renderBarChart(pagesByBook, "Top books by pages"),
    },
    genres: {
      label: "Genres (bar graph)",
      html: renderBarChart(pagesByGenre, "Pages by genre"),
    },
    formats: {
      label: "Book formats (bar graph)",
      html: renderBarChart(pagesByFormat, "Pages by book format"),
    },
    "time-of-day": {
      label: "Time of day (pie graph)",
      html: renderPieChart(scopedPeriodMinutes, "Time of day"),
    },
    weekdays: {
      label: "Weekday rhythm (pie graph)",
      html: renderPieChart(scopedWeekdayTotals, "Weekday rhythm"),
    },
    "session-length": {
      label: "Session length (pie graph)",
      html: renderPieChart(sessionLengthTotals, "Session length mix"),
    },
  };
  if (!chartDefinitions[readingChartType]) readingChartType = "pages-over-time";
  const chartTypeOptionsHtml = Object.entries(chartDefinitions)
    .map(
      ([value, definition]) =>
        `<option value="${value}"${value === readingChartType ? " selected" : ""}>${escapeHtml(definition.label)}</option>`,
    )
    .join("");
  elements.readingChartPanel.innerHTML = `
    <div class="reading-chart-heading">
      <div>
        <p class="eyebrow">VISUAL PATTERNS</p>
        <h3>Reading charts and suggestions</h3>
        <p class="reading-chart-period">Currently viewing: ${escapeHtml(scope.label)}</p>
      </div>
      <div>
        <p>${escapeHtml(readingSuggestion({
          sessionCount: scopedSessionCount,
          activeDays: scopedActiveDays,
          averageMinutes: scopedAverageMinutes,
          averagePages: scopedAveragePages,
          pace: scopedPace,
          recentPages: scopedPages,
          favoritePeriod: scopedFavoritePeriod,
          strongestWeekday: scopedStrongestWeekday,
        }))}</p>
        <div class="reading-chart-controls">
          <label>
            <span>View period</span>
            <select id="reading-analytics-range">${rangeOptionsHtml}</select>
          </label>
          <label>
            <span>Graph to display</span>
            <select id="reading-analytics-chart-type">${chartTypeOptionsHtml}</select>
          </label>
          <button class="primary-button light-button" type="button" id="print-reading-analytics">Print selected graph</button>
        </div>
      </div>
    </div>
    <div class="reading-chart-grid">
      ${renderAnalyticsCards([
        {
          label: "Median speed",
          value: medianPace ? `${medianPace} p/h` : "--",
          note: speedNote,
        },
        {
          label: "Fastest pace",
          value: bestPace ? `${bestPace} p/h` : "--",
          note: "Your quickest logged session, useful for spotting easier or more fluent reading.",
        },
        {
          label: "Period consistency",
          value: scopedSessionCount ? `${consistencyScore}%` : "--",
          note: `${scope.intervalItems.length - quietIntervals} of ${scope.intervalItems.length} chart intervals include logged reading.`,
        },
        {
          label: "Likely weekly pages",
          value: expectedWeeklyPages ? expectedWeeklyPages.toLocaleString() : "--",
          note: `Projected from ${scope.label}, so it changes with the period you choose.`,
        },
      ])}
      <div class="reading-selected-chart" aria-live="polite">
        ${chartDefinitions[readingChartType].html}
      </div>
    </div>
  `;
  elements.readingChartPanel
    .querySelector("#reading-analytics-range")
    ?.addEventListener("change", (event) => {
      readingAnalyticsRange = event.target.value;
      renderReadingInsights();
    });
  elements.readingChartPanel
    .querySelector("#reading-analytics-chart-type")
    ?.addEventListener("change", (event) => {
      readingChartType = event.target.value;
      localStorage.setItem(READING_CHART_TYPE_KEY, readingChartType);
      renderReadingInsights();
    });
  elements.readingChartPanel
    .querySelector("#print-reading-analytics")
    ?.addEventListener("click", printReadingAnalytics);
}

function renderReadingInsights() {
  ensureReadingLogEnhancements();
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
  const lifetimePages = lifetimePagesReadFrom(accountLog);
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
  const periodMinutes = accountLog.reduce((counts, entry) => {
    const period = getTimePeriod(entry.startTime);
    counts[period] = (counts[period] || 0) + entry.durationMinutes;
    return counts;
  }, {});

  elements.totalTimeInsight.textContent = formatDuration(totalMinutes);
  elements.sessionCountInsight.textContent = sessionCount
    ? `${sessionCount} ${sessionCount === 1 ? "session" : "sessions"} logged`
    : "No sessions yet";
  elements.pagesInsight.textContent = totalPages.toLocaleString();
  elements.pagesWeekInsight.textContent =
    `${weeklyPages.toLocaleString()} in the last 7 days`;
  if (elements.lifetimePagesInsight) {
    elements.lifetimePagesInsight.textContent = lifetimePages.toLocaleString();
  }
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
    renderReadingCharts({
      accountLog,
      byBook,
      periodMinutes,
      weekdayTotals,
      sessionCount,
      activeDays,
      averageMinutes,
      averagePages,
      pace,
      recentPages,
      favoritePeriod: "",
      strongestWeekday,
    });
    return;
  }

  const favoritePeriod = Object.entries(periodMinutes).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
  const uniqueBookCount = Object.keys(byBook).length;
  const dominantBookShare = topBook && totalPages
    ? Math.round((topBook.pages / totalPages) * 100)
    : 0;
  const pagesPerActiveDay = activeDays
    ? Math.round(recentPages / activeDays)
    : 0;
  const bestPaceEntry = accountLog
    .filter((entry) => Number(entry.durationMinutes) > 0)
    .map((entry) => ({
      ...entry,
      pace: Math.round(((Number(entry.pagesRead) || 0) / entry.durationMinutes) * 60),
    }))
    .sort((first, second) => second.pace - first.pace)[0];
  elements.habitTitle.textContent = `You read most ${favoritePeriod}.`;
  elements.habitMessage.textContent =
    `Your average session is ${formatDuration(averageMinutes)}, and your longest is ${formatDuration(longestSession)}. ` +
    (streak > 1
      ? `You are on a ${streak}-day streak; protecting that time can help the habit stick.`
      : "A regular reading window can help turn individual sessions into a lasting habit.");
  renderReadingCharts({
    accountLog,
    byBook,
    periodMinutes,
    weekdayTotals,
    sessionCount,
    activeDays,
    averageMinutes,
    averagePages,
    pace,
    recentPages,
    favoritePeriod,
    strongestWeekday,
  });
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
    <article>
      <span>Book variety</span>
      <strong>${uniqueBookCount}</strong>
      <p>${uniqueBookCount === 1 ? "All logged sessions are focused on one book." : `Your sessions are spread across ${uniqueBookCount} books.`}</p>
    </article>
    <article>
      <span>Reading concentration</span>
      <strong>${dominantBookShare ? `${dominantBookShare}%` : "--"}</strong>
      <p>${topBook ? `Share of logged pages coming from ${escapeHtml(topBook.title)}.` : "Log pages to reveal concentration."}</p>
    </article>
    <article>
      <span>Pages per active day</span>
      <strong>${pagesPerActiveDay || "--"}</strong>
      <p>Average pages on days when you actually logged a session in the last 30 days.</p>
    </article>
    <article>
      <span>Fastest logged pace</span>
      <strong>${bestPaceEntry ? `${bestPaceEntry.pace} p/h` : "--"}</strong>
      <p>${bestPaceEntry ? `${escapeHtml(bestPaceEntry.title)} on ${formatDate(bestPaceEntry.date)}.` : "More sessions will reveal your fastest pace."}</p>
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
  const pagesRead = Number(entry.pagesRead) || 0;
  const pace = Math.round((pagesRead / entry.durationMinutes) * 60);
  const startLabel = entry.startPageLabel || entry.startPage;
  const endLabel = entry.endPageLabel || entry.endPage;
  const continueLabel =
    entry.continuePageLabel || entry.continuePage || (entry.endPage ? entry.endPage + 1 : "");
  const hasRange = Boolean(startLabel && endLabel);
  const pageDetail = entry.specificPages
    ? `Specific pages: ${escapeHtml(entry.specificPages)}`
    : hasRange
    ? `Pages ${escapeHtml(startLabel)}-${escapeHtml(endLabel)}${
        continueLabel ? `; continue at ${escapeHtml(continueLabel)}` : ""
      }`
    : "Page range not specified";
  return `
    <article class="log-entry">
      <div class="log-book">
        <h4>${escapeHtml(entry.title)}</h4>
        <p>${escapeHtml(entry.author)} / ${formatDate(entry.date)}</p>
      </div>
      <div class="log-metric">
        <strong>${pagesRead} pages</strong>
        <small>${pageDetail}</small>
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
  ensureReadingLogEnhancements();
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
  configureReadingPageInputs();
  const specific = parseSpecificPages(elements.specificPagesInput?.value || "");
  elements.startPageInput?.setCustomValidity("");
  elements.endPageInput?.setCustomValidity("");
  elements.continuePageInput?.setCustomValidity("");
  if (specific.count) {
    elements.pagesReadInput.value = specific.count;
    if (!elements.startPageInput.value && specific.firstNumericPage) {
      elements.startPageInput.value = specific.firstNumericPage;
    }
    if (!elements.endPageInput.value && specific.highestNumericPage) {
      elements.endPageInput.value = specific.highestNumericPage;
    }
    if (!elements.continuePageInput.value && specific.highestNumericPage) {
      elements.continuePageInput.value = specific.highestNumericPage + 1;
    }
    return;
  }
  const startPageRef = parsePageReference(elements.startPageInput.value);
  const endPageRef = parsePageReference(elements.endPageInput.value);
  if (!startPageRef.isValid || !endPageRef.isValid) return;
  const pagesFromRange = countPagesBetweenReferences(startPageRef, endPageRef);
  if (
    elements.startPageInput.value &&
    elements.endPageInput.value &&
    pagesFromRange
  ) {
    elements.pagesReadInput.value = pagesFromRange;
    const continuePage = suggestedContinuePage(endPageRef);
    if (continuePage) elements.continuePageInput.value = continuePage;
  }
}

function updateCollectionProgressFromReadingSession(entry) {
  const titleKey = normalize(entry.title);
  const authorKey = normalize(entry.author);
  const book = ownedByCurrent(books).find((item) => {
    const sameTitle = normalize(item.title) === titleKey;
    const sameAuthor = !authorKey || normalize(item.author) === authorKey;
    return sameTitle && sameAuthor;
  });
  if (!book) return;
  const endPage = loggedPageReached(entry);
  const startPage = parsePageNumber(entry.startPage);
  if (!endPage) return;
  if (!book.firstPage && startPage) book.firstPage = startPage;
  const lastPage = parsePageNumber(book.lastPage);
  const currentPage = Math.max(parsePageNumber(book.currentPage), endPage);
  book.currentPage = lastPage ? Math.min(currentPage, lastPage) : currentPage;
  if (lastPage && book.currentPage >= lastPage) {
    book.status = "read";
  } else if (book.status === "unread") {
    book.status = "reading";
  }
  Object.assign(book, normalizeBookPages(book, book.status));
  saveBooks();
  renderBooks();
}

function addReadingSession(formData) {
  const durationMinutes = updateDurationPreview();
  const exactPages = parseSpecificPages(formData.get("specificPages"));
  const rawStartPage = String(formData.get("startPage") || "").trim();
  const rawEndPage = String(formData.get("endPage") || "").trim();
  const rawContinuePage = String(formData.get("continuePage") || "").trim();
  const startPageRef = parsePageReference(rawStartPage);
  const endPageRef = parsePageReference(rawEndPage);
  const continuePageRef = parsePageReference(rawContinuePage);
  const startPage = startPageRef.number;
  const endPage = endPageRef.number;
  const continuePage = continuePageRef.number;
  const pagesFromRange = countPagesBetweenReferences(startPageRef, endPageRef);
  const pagesRead = exactPages.count || Number(formData.get("pagesRead")) || pagesFromRange;
  if (!durationMinutes) return;
  elements.pagesReadInput.setCustomValidity("");
  elements.startPageInput.setCustomValidity("");
  elements.endPageInput.setCustomValidity("");
  elements.continuePageInput.setCustomValidity("");
  if (!startPageRef.isValid) {
    elements.startPageInput.setCustomValidity(
      "Enter a page number or a Roman numeral, such as 1 or x.",
    );
    elements.startPageInput.reportValidity();
    return;
  }
  if (!endPageRef.isValid) {
    elements.endPageInput.setCustomValidity(
      "Enter a page number or a Roman numeral, such as 25 or xiii.",
    );
    elements.endPageInput.reportValidity();
    return;
  }
  if (!continuePageRef.isValid) {
    elements.continuePageInput.setCustomValidity(
      "Enter a page number or a Roman numeral, such as 26 or xiv.",
    );
    elements.continuePageInput.reportValidity();
    return;
  }
  if (!pagesRead) {
    elements.pagesReadInput.setCustomValidity(
      "Enter the number of pages read, a page range, or specific pages read.",
    );
    elements.pagesReadInput.reportValidity();
    return;
  }
  if (!isPageRangeOrderValid(startPageRef, endPageRef)) {
    elements.endPageInput.setCustomValidity(
      "The finishing page cannot be before the starting page. Roman front-matter pages can lead into regular page numbers, for example xiii to 3.",
    );
    elements.endPageInput.reportValidity();
    return;
  }
  elements.endPageInput.setCustomValidity("");
  if (isContinueBeforeFinish(endPageRef, continuePageRef)) {
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
    pagesRead,
    specificPages: exactPages.display,
    highestPageRead: exactPages.highestNumericPage || endPage || 0,
    startPage,
    startPageLabel: rawStartPage,
    endPage,
    endPageLabel: rawEndPage,
    continuePage,
    continuePageLabel: rawContinuePage,
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    durationMinutes,
    ownerId: currentAccount.id,
  };
  readingLog.unshift(entry);
  saveReadingLog();
  updateCollectionProgressFromReadingSession(entry);
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

function storyCharacterTotal(text) {
  return String(text || "").replace(/\s+/g, " ").trim().length;
}

function storyDateLabel(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

function storyDateTimeLabel(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not yet saved"
    : date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

function parseTagList(value) {
  return [
    ...new Set(
      String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

function formatTagList(values) {
  return (Array.isArray(values) ? values : []).join(", ");
}

function plainTextToParagraphHtml(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function richTextToPlain(html) {
  const node = document.createElement("div");
  node.innerHTML = String(html || "");
  return node.textContent || "";
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readMultiSelectValues(select) {
  return Array.from(select?.selectedOptions || []).map((option) => option.value);
}

function setMultiSelectValues(select, values) {
  const selected = new Set(Array.isArray(values) ? values : []);
  Array.from(select?.options || []).forEach((option) => {
    option.selected = selected.has(option.value);
  });
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizePromptType(value) {
  return Object.hasOwn(WRITING_PROMPT_BANK, value) ? value : "genre";
}

function defaultSceneChecklist(checklist = {}) {
  return {
    clarity: Boolean(checklist.clarity),
    tension: Boolean(checklist.tension),
    continuity: Boolean(checklist.continuity),
    sensory: Boolean(checklist.sensory),
    ending: Boolean(checklist.ending),
  };
}

function ensureScene(scene, fallbackOrder = 1) {
  const item = scene || {};
  if (!item.id) item.id = crypto.randomUUID();
  if (!item.title) item.title = "Untitled scene";
  if (!item.order) item.order = fallbackOrder;
  if (!item.summary) item.summary = "";
  if (!item.povCharacter) item.povCharacter = "";
  if (!item.setting) item.setting = "";
  if (!item.conflict) item.conflict = "";
  if (!item.goal) item.goal = "";
  if (!item.outcome) item.outcome = "";
  if (!item.wordCount) item.wordCount = 0;
  if (!item.status) item.status = "planning";
  if (!Array.isArray(item.relatedCharacterIds)) item.relatedCharacterIds = [];
  if (!Array.isArray(item.moodTags)) item.moodTags = [];
  if (!Array.isArray(item.themeTags)) item.themeTags = [];
  if (!Array.isArray(item.symbolTags)) item.symbolTags = [];
  item.checklist = defaultSceneChecklist(item.checklist);
  return item;
}

function ensureChapter(chapter, fallbackOrder = 1) {
  const item = chapter || {};
  if (!item.id) item.id = crypto.randomUUID();
  if (!item.title) item.title = "Untitled chapter";
  if (!item.order) item.order = fallbackOrder;
  if (!item.summary) item.summary = "";
  if (!item.wordCount) item.wordCount = 0;
  if (!item.status) item.status = "planning";
  if (!Array.isArray(item.themeTags)) item.themeTags = [];
  if (!Array.isArray(item.symbolTags)) item.symbolTags = [];
  if (!Array.isArray(item.scenes)) item.scenes = [];
  item.scenes = item.scenes.map((scene, index) => ensureScene(scene, index + 1));
  return item;
}

function ensurePrompt(prompt) {
  const item = prompt || {};
  if (!item.id) item.id = crypto.randomUUID();
  if (!item.type) item.type = "genre";
  item.type = normalizePromptType(item.type);
  if (!item.text) item.text = "";
  item.used = Boolean(item.used);
  if (!item.createdAt) item.createdAt = new Date().toISOString();
  return item;
}

function ensureWritingProject(project) {
  const item = project || {};
  if (!item.id) item.id = crypto.randomUUID();
  if (!item.title) item.title = "Untitled project";
  if (!item.type) item.type = "other";
  if (!item.genre) item.genre = "";
  if (!item.description) item.description = item.premise || "";
  if (item.targetWordCount == null) item.targetWordCount = 0;
  if (!item.status) item.status = storyWordTotal(item.draft || "") ? "drafting" : "planning";
  if (!item.createdAt) item.createdAt = new Date().toISOString();
  if (!item.updatedAt) item.updatedAt = item.createdAt;
  if (!Array.isArray(item.moodTags)) item.moodTags = parseTagList(item.moodTags);
  if (!Array.isArray(item.themeTags)) item.themeTags = parseTagList(item.themeTags);
  if (!Array.isArray(item.symbolTags)) item.symbolTags = parseTagList(item.symbolTags);
  if (!Array.isArray(item.conflictTags)) item.conflictTags = parseTagList(item.conflictTags);
  if (!item.notes) item.notes = item.outline || "";
  if (!item.draftNotes) item.draftNotes = "";
  if (!item.manuscriptHtml) item.manuscriptHtml = plainTextToParagraphHtml(item.draft || "");
  if (!item.manuscriptText) item.manuscriptText = richTextToPlain(item.manuscriptHtml);
  if (!item.documentLayout || typeof item.documentLayout !== "object") {
    item.documentLayout = {};
  }
  if (!["normal", "narrow", "wide"].includes(item.documentLayout.margins)) {
    item.documentLayout.margins = "normal";
  }
  if (!["portrait", "landscape"].includes(item.documentLayout.orientation)) {
    item.documentLayout.orientation = "portrait";
  }
  if (!["1", "1.15", "1.5", "2"].includes(String(item.documentLayout.lineSpacing))) {
    item.documentLayout.lineSpacing = "1.15";
  }
  if (!Array.isArray(item.chapters)) item.chapters = [];
  if (!Array.isArray(item.charactersList)) item.charactersList = [];
  if (!Array.isArray(item.worldbuilding)) item.worldbuilding = [];
  if (!Array.isArray(item.timeline)) item.timeline = [];
  if (!Array.isArray(item.researchShelf)) item.researchShelf = [];
  if (!Array.isArray(item.quoteReferences)) item.quoteReferences = [];
  if (!Array.isArray(item.prompts)) item.prompts = [];
  if (!Array.isArray(item.versions)) item.versions = [];
  if (!Array.isArray(item.comments)) item.comments = [];
  if (!Array.isArray(item.writingLog)) item.writingLog = [];
  if (!item.revisionNotes) item.revisionNotes = "";
  if (!item.continuityNotes) item.continuityNotes = "";
  if (item.dailyWordGoal == null) item.dailyWordGoal = 0;
  if (item.weeklyWordGoal == null) item.weeklyWordGoal = 0;
  if (item.projectWordGoal == null) item.projectWordGoal = item.targetWordCount || 0;
  if (!item.deadline) item.deadline = "";
  item.chapters = item.chapters.map((chapter, index) => ensureChapter(chapter, index + 1));
  item.charactersList = item.charactersList.map((character) => ({
    id: character.id || crypto.randomUUID(),
    name: character.name || "Unnamed character",
    age: character.age || "",
    role: character.role || "",
    appearance: character.appearance || "",
    personality: character.personality || "",
    strengths: character.strengths || "",
    weaknesses: character.weaknesses || "",
    goal: character.goal || "",
    fear: character.fear || "",
    backstory: character.backstory || "",
    arc: character.arc || "",
    relationships: character.relationships || "",
    notes: character.notes || "",
  }));
  item.worldbuilding = item.worldbuilding.map((entry) => ({
    id: entry.id || crypto.randomUUID(),
    title: entry.title || "Untitled entry",
    category: entry.category || "locations",
    description: entry.description || "",
    relatedCharacterIds: Array.isArray(entry.relatedCharacterIds)
      ? entry.relatedCharacterIds
      : [],
    relatedSceneIds: Array.isArray(entry.relatedSceneIds)
      ? entry.relatedSceneIds
      : [],
    notes: entry.notes || "",
  }));
  item.timeline = item.timeline.map((entry) => ({
    id: entry.id || crypto.randomUUID(),
    title: entry.title || "Untitled event",
    dateOrOrder: entry.dateOrOrder || "",
    description: entry.description || "",
    relatedCharacterIds: Array.isArray(entry.relatedCharacterIds)
      ? entry.relatedCharacterIds
      : [],
    relatedSceneIds: Array.isArray(entry.relatedSceneIds)
      ? entry.relatedSceneIds
      : [],
    type: entry.type || "",
  }));
  item.researchShelf = item.researchShelf.map((entry) => ({
    id: entry.id || crypto.randomUUID(),
    catalogueItemId: entry.catalogueItemId || "",
    sourceType: entry.sourceType || (entry.catalogueItemId ? "book" : "note"),
    sourceId: entry.sourceId || entry.catalogueItemId || "",
    title: entry.title || "",
    author: entry.author || "",
    excerpt: entry.excerpt || "",
    citation: entry.citation || "",
    notes: entry.notes || "",
    tags: Array.isArray(entry.tags) ? entry.tags : parseTagList(entry.tags),
    chapterId: entry.chapterId || "",
    sceneId: entry.sceneId || "",
  }));
  item.quoteReferences = item.quoteReferences.map((entry) => ({
    id: entry.id || crypto.randomUUID(),
    text: entry.text || "",
    sourceTitle: entry.sourceTitle || "",
    author: entry.author || "",
    page: entry.page || "",
    tags: Array.isArray(entry.tags) ? entry.tags : parseTagList(entry.tags),
    chapterId: entry.chapterId || "",
    sceneId: entry.sceneId || "",
    personalNote: entry.personalNote || "",
  }));
  item.prompts = item.prompts.map(ensurePrompt);
  item.versions = item.versions.map((version) => ({
    id: version.id || crypto.randomUUID(),
    label: version.label || "Saved version",
    createdAt: version.createdAt || new Date().toISOString(),
    html: version.html || "",
    notes: version.notes || "",
    words: toNumber(version.words),
  }));
  item.comments = item.comments.map((comment) => ({
    id: comment.id || crypto.randomUUID(),
    text: comment.text || "",
    createdAt: comment.createdAt || new Date().toISOString(),
  }));
  item.writingLog = item.writingLog.map((entry) => ({
    date: entry.date || new Date().toISOString().slice(0, 10),
    words: Math.max(0, toNumber(entry.words)),
  }));
  if (!item.__writingV2Migrated) {
    const legacyNotes = [
      item.characters ? `Legacy character notes:\n${item.characters}` : "",
      item.setting ? `Legacy setting notes:\n${item.setting}` : "",
      item.pov ? `Legacy POV note: ${item.pov}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    if (legacyNotes) {
      item.notes = [item.notes, legacyNotes].filter(Boolean).join("\n\n");
    }
    item.__writingV2Migrated = true;
  }
  return item;
}

function migrateCreativeWritingProjects() {
  let changed = false;
  creativeWriting.forEach((project) => {
    const before = JSON.stringify(project);
    ensureWritingProject(project);
    if (JSON.stringify(project) !== before) changed = true;
  });
  if (changed) saveCreativeWriting();
}

function currentStory() {
  const project = creativeWriting.find(
    (story) =>
      story.id === elements.storyIdInput.value &&
      story.ownerId === currentAccount?.id,
  );
  return project ? ensureWritingProject(project) : null;
}

function allStoryProjects() {
  return ownedByCurrent(creativeWriting).map(ensureWritingProject);
}

function currentStoryWordCount(project = currentStory()) {
  if (!project) return 0;
  return storyWordTotal(project.manuscriptText || richTextToPlain(project.manuscriptHtml));
}

function currentStoryCharacterCount(project = currentStory()) {
  if (!project) return 0;
  return storyCharacterTotal(project.manuscriptText || richTextToPlain(project.manuscriptHtml));
}

function chapterSceneOptions(project) {
  return project.chapters
    .sort((first, second) => first.order - second.order)
    .flatMap((chapter) =>
      chapter.scenes
        .sort((first, second) => first.order - second.order)
        .map((scene) => ({
          id: scene.id,
          label: `Chapter ${chapter.order}: ${chapter.title} / Scene ${scene.order}: ${scene.title}`,
          chapterId: chapter.id,
        })),
    );
}

function storyTagSearchText(project) {
  return normalize(
    [
      project.title,
      project.type,
      project.genre,
      project.status,
      project.description,
      project.notes,
      ...(project.moodTags || []),
      ...(project.themeTags || []),
      ...(project.symbolTags || []),
      ...(project.conflictTags || []),
    ].join(" "),
  );
}

function storyProgress(project) {
  const current = currentStoryWordCount(project);
  const target = toNumber(project.projectWordGoal || project.targetWordCount);
  const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  return { current, target, percentage };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function writingProgressStats(project) {
  const byDate = new Map();
  project.writingLog.forEach((entry) => {
    byDate.set(entry.date, (byDate.get(entry.date) || 0) + toNumber(entry.words));
  });
  const today = todayKey();
  const todayWords = byDate.get(today) || 0;
  const weeklyWords = Array.from(byDate.entries())
    .filter(([date]) => {
      const diff =
        (new Date(`${today}T00:00:00`).getTime() - new Date(`${date}T00:00:00`).getTime()) /
        86400000;
      return diff >= 0 && diff < 7;
    })
    .reduce((sum, [, words]) => sum + words, 0);
  let streak = 0;
  for (let index = 0; index < 365; index += 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const key = date.toISOString().slice(0, 10);
    if ((byDate.get(key) || 0) > 0) streak += 1;
    else break;
  }
  const dailyAverage = Array.from(byDate.values()).slice(-14).reduce((sum, value) => sum + value, 0) /
    Math.max(1, Math.min(14, byDate.size || 1));
  let estimatedCompletion = "Unknown";
  const progress = storyProgress(project);
  if (progress.target > 0 && dailyAverage > 0 && progress.current < progress.target) {
    const remaining = progress.target - progress.current;
    const days = Math.ceil(remaining / dailyAverage);
    const date = new Date();
    date.setDate(date.getDate() + days);
    estimatedCompletion = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else if (progress.current >= progress.target && progress.target > 0) {
    estimatedCompletion = "Reached";
  }
  return {
    totalWords: progress.current,
    todayWords,
    weeklyWords,
    percentage: progress.percentage,
    streak,
    estimatedCompletion,
  };
}

function renderWritingDashboard() {
  if (!currentAccount) return;
  const projects = allStoryProjects();
  const wordsToday = projects.reduce(
    (sum, project) => sum + writingProgressStats(project).todayWords,
    0,
  );
  const longestStreak = projects.reduce(
    (best, project) => Math.max(best, writingProgressStats(project).streak),
    0,
  );
  const activeProjects = projects.filter((project) =>
    ["planning", "drafting", "editing"].includes(project.status),
  ).length;
  const totalWords = projects.reduce(
    (sum, project) => sum + currentStoryWordCount(project),
    0,
  );
  elements.writingDashboard.innerHTML = [
    { label: "Projects", value: projects.length, note: "Stories, essays, poems, and more." },
    { label: "Active", value: activeProjects, note: "Currently in planning, drafting, or editing." },
    { label: "Words today", value: wordsToday, note: "Tracked from manuscript saves." },
    { label: "Total words", value: totalWords, note: `Best streak: ${longestStreak} day${longestStreak === 1 ? "" : "s"}.` },
  ]
    .map(
      (card) => `
        <article class="writing-dashboard-card">
          <p>${escapeHtml(card.label)}</p>
          <strong>${escapeHtml(String(card.value))}</strong>
          <small>${escapeHtml(card.note)}</small>
        </article>
      `,
    )
    .join("");
}

function filteredStories() {
  const query = normalize(elements.storySearchInput.value);
  const status = elements.storyStatusFilter.value;
  const sortMode = elements.storySortInput.value;
  return allStoryProjects()
    .filter((project) => {
      const matchesQuery = !query || storyTagSearchText(project).includes(query);
      const matchesStatus = status === "all" || project.status === status;
      return matchesQuery && matchesStatus;
    })
    .sort((first, second) => {
      if (sortMode === "title") {
        return first.title.localeCompare(second.title, undefined, {
          sensitivity: "base",
        });
      }
      if (sortMode === "created") {
        return String(second.createdAt).localeCompare(String(first.createdAt));
      }
      if (sortMode === "progress") {
        return storyProgress(second).percentage - storyProgress(first).percentage;
      }
      return String(second.updatedAt).localeCompare(String(first.updatedAt));
    });
}

function renderStories() {
  if (!currentAccount) return;
  renderWritingDashboard();
  renderResearchLibrary();
  const stories = filteredStories();
  const activeId = elements.storyIdInput.value;
  const shouldOpenLatest =
    !activeId && stories.length > 0 && elements.storyEditor.hidden;
  elements.storyCount.textContent = stories.length;
  elements.storyList.innerHTML = stories
    .map((story) => {
      const progress = storyProgress(story);
      return `
        <button
          class="story-list-item ${story.id === activeId ? "active" : ""}"
          type="button"
          data-story-id="${story.id}"
        >
          <strong>${escapeHtml(story.title || "Untitled project")}</strong>
          <span>${escapeHtml(story.type)} / ${escapeHtml(story.genre || "No genre")}</span>
          <small>${progress.current} words / ${escapeHtml(story.status)} / ${escapeHtml(storyDateLabel(story.updatedAt))}</small>
        </button>
      `;
    })
    .join("");
  elements.storyEmpty.hidden = stories.length > 0;
  if (shouldOpenLatest) {
    currentWritingView = "manuscript";
    openStory(stories[0].id, { focusEditor: false });
  }
}

function updateWritingSelectionOptions(project = currentStory()) {
  if (!project) return;
  const chapters = project.chapters
    .slice()
    .sort((first, second) => first.order - second.order);
  const scenes = chapterSceneOptions(project);
  const characters = project.charactersList
    .slice()
    .sort((first, second) => first.name.localeCompare(second.name));
  const chapterOptions = [
    '<option value="">No linked chapter</option>',
    ...chapters.map(
      (chapter) =>
        `<option value="${chapter.id}">Chapter ${chapter.order}: ${escapeHtml(chapter.title)}</option>`,
    ),
  ].join("");
  const requiredChapterOptions = [
    '<option value="">Choose a chapter</option>',
    ...chapters.map(
      (chapter) =>
        `<option value="${chapter.id}">Chapter ${chapter.order}: ${escapeHtml(chapter.title)}</option>`,
    ),
  ].join("");
  const sceneOptions = [
    '<option value="">No linked scene</option>',
    ...scenes.map(
      (scene) =>
        `<option value="${scene.id}" data-chapter-id="${scene.chapterId}">${escapeHtml(scene.label)}</option>`,
    ),
  ].join("");
  const characterOptions = characters
    .map(
      (character) =>
        `<option value="${character.id}">${escapeHtml(character.name)}</option>`,
    )
    .join("");
  elements.sceneChapterInput.innerHTML = requiredChapterOptions;
  elements.researchChapterInput.innerHTML = chapterOptions;
  elements.quoteChapterInput.innerHTML = chapterOptions;
  elements.researchSceneInput.innerHTML = sceneOptions;
  elements.quoteSceneInput.innerHTML = sceneOptions;
  elements.worldbuildingScenesInput.innerHTML = scenes
    .map((scene) => `<option value="${scene.id}">${escapeHtml(scene.label)}</option>`)
    .join("");
  elements.timelineScenesInput.innerHTML = elements.worldbuildingScenesInput.innerHTML;
  elements.sceneCharactersInput.innerHTML = characterOptions;
  elements.worldbuildingCharactersInput.innerHTML = characterOptions;
  elements.timelineCharactersInput.innerHTML = characterOptions;
  const catalogueBooks = ownedByCurrent(books)
    .slice()
    .sort((first, second) =>
      first.title.localeCompare(second.title, undefined, { sensitivity: "base" }),
    );
  elements.researchCatalogueSelect.innerHTML = [
    '<option value="">Choose a book from your collection</option>',
    ...catalogueBooks.map(
      (book) =>
        `<option value="${book.id}">${escapeHtml(book.title)} / ${escapeHtml(book.author)}</option>`,
    ),
  ].join("");
}

function renderWritingProjectMeta(project) {
  const progress = storyProgress(project);
  elements.writingProjectMeta.textContent = [
    project.type,
    project.genre || "No genre yet",
    project.status,
    `${progress.current} words`,
  ]
    .filter(Boolean)
    .join(" / ");
  elements.storyProgressBarFill.style.width = `${progress.percentage}%`;
  elements.storyProgressLabel.textContent =
    progress.target > 0 ? `${progress.percentage}% of goal` : "No word goal";
}

function renderManuscriptInsights(project = currentStory()) {
  if (!project) return;
  const text = richTextToPlain(elements.storyDraftInput.innerHTML);
  const words = storyWordTotal(text);
  const paragraphs = Array.from(
    elements.storyDraftInput.querySelectorAll("p, h1, h2, h3, blockquote, li"),
  ).filter((node) => node.textContent.trim()).length || (text.trim() ? 1 : 0);
  elements.writingParagraphCount.textContent = paragraphs;
  elements.writingReadingTime.textContent = words ? Math.max(1, Math.ceil(words / 225)) : 0;
  elements.writingPageCount.textContent = Math.max(1, Math.ceil(words / 500));
  const query = normalize(elements.storyManuscriptSearchInput.value);
  if (!query) {
    elements.storySearchResults.textContent =
      "Search results will appear here.";
  } else {
    const snippets = [];
    let source = text;
    let index = source.toLocaleLowerCase().indexOf(query);
    while (index !== -1 && snippets.length < 5) {
      const start = Math.max(0, index - 35);
      const end = Math.min(source.length, index + query.length + 45);
      snippets.push(source.slice(start, end).replace(/\s+/g, " ").trim());
      index = source.toLocaleLowerCase().indexOf(query, index + query.length);
    }
    elements.storySearchResults.innerHTML = snippets.length
      ? snippets.map((snippet) => `<p>${escapeHtml(snippet)}</p>`).join("")
      : "No matches inside the manuscript.";
  }
  const stopWords = new Set([
    "the",
    "and",
    "that",
    "with",
    "this",
    "from",
    "your",
    "have",
    "into",
    "they",
    "their",
    "there",
    "were",
    "about",
  ]);
  const counts = new Map();
  (text.match(/\b[a-zA-Z']{4,}\b/g) || []).forEach((word) => {
    const key = word.toLocaleLowerCase();
    if (stopWords.has(key)) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const repeated = Array.from(counts.entries())
    .filter(([, count]) => count > 2)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 12);
  elements.storyRepeatedWords.innerHTML = repeated.length
    ? repeated
        .map(
          ([word, count]) =>
            `<span class="story-repeated-word-chip">${escapeHtml(word)} (${count})</span>`,
        )
        .join("")
    : "No heavily repeated words yet.";
}

function renderChapterList(project = currentStory()) {
  if (!project) return;
  const filter = normalize(elements.writingTagFilterInput.value);
  const charactersById = Object.fromEntries(
    project.charactersList.map((character) => [character.id, character.name]),
  );
  elements.chapterList.innerHTML = project.chapters
    .slice()
    .sort((first, second) => first.order - second.order)
    .filter((chapter) => {
      if (!filter) return true;
      return normalize(
        [
          chapter.title,
          chapter.summary,
          ...chapter.themeTags,
          ...chapter.symbolTags,
          ...chapter.scenes.flatMap((scene) => [
            scene.title,
            scene.summary,
            scene.povCharacter,
            scene.setting,
            scene.conflict,
            scene.goal,
            scene.outcome,
            ...scene.moodTags,
            ...scene.themeTags,
            ...scene.symbolTags,
          ]),
        ].join(" "),
      ).includes(filter);
    })
    .map((chapter) => `
      <article class="chapter-card">
        <p class="chapter-card-meta">Chapter ${chapter.order} / ${escapeHtml(chapter.status)} / ${chapter.wordCount || 0} words</p>
        <h3>${escapeHtml(chapter.title)}</h3>
        <p>${escapeHtml(chapter.summary || "No summary yet.")}</p>
        <div class="writing-tag-cloud">
          ${[...chapter.themeTags, ...chapter.symbolTags].map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="chapter-card-actions">
          <button type="button" data-chapter-action="edit" data-id="${chapter.id}">Edit</button>
          <button type="button" data-chapter-action="up" data-id="${chapter.id}">Move up</button>
          <button type="button" data-chapter-action="down" data-id="${chapter.id}">Move down</button>
          <button type="button" data-chapter-action="delete" data-id="${chapter.id}">Delete</button>
        </div>
        <div class="chapter-scene-list">
          ${chapter.scenes
            .slice()
            .sort((first, second) => first.order - second.order)
            .map(
              (scene) => `
                <article class="scene-card">
                  <p class="chapter-card-meta">Scene ${scene.order} / ${escapeHtml(scene.status)} / ${scene.wordCount || 0} words</p>
                  <h4>${escapeHtml(scene.title)}</h4>
                  <p>${escapeHtml(scene.summary || "No summary yet.")}</p>
                  <p><strong>POV:</strong> ${escapeHtml(scene.povCharacter || "Unassigned")}</p>
                  <p><strong>Setting:</strong> ${escapeHtml(scene.setting || "Unassigned")}</p>
                  <p><strong>Conflict:</strong> ${escapeHtml(scene.conflict || "Unassigned")}</p>
                  <p><strong>Goal / outcome:</strong> ${escapeHtml(scene.goal || "Unknown")} / ${escapeHtml(scene.outcome || "Unknown")}</p>
                  <p><strong>Linked characters:</strong> ${escapeHtml(
                    scene.relatedCharacterIds.map((id) => charactersById[id]).filter(Boolean).join(", ") ||
                      "None",
                  )}</p>
                  <div class="writing-tag-cloud">
                    ${[...scene.moodTags, ...scene.themeTags, ...scene.symbolTags].map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
                  </div>
                  <div class="scene-card-actions">
                    <button type="button" data-scene-action="edit" data-id="${scene.id}">Edit</button>
                    <button type="button" data-scene-action="up" data-chapter-id="${chapter.id}" data-id="${scene.id}">Move up</button>
                    <button type="button" data-scene-action="down" data-chapter-id="${chapter.id}" data-id="${scene.id}">Move down</button>
                    <button type="button" data-scene-action="delete" data-id="${scene.id}">Delete</button>
                  </div>
                </article>
              `,
            )
            .join("") || '<p class="chapter-card-meta">No scenes in this chapter yet.</p>'}
        </div>
      </article>
    `)
    .join("") || '<p class="writing-card-meta">No chapters yet. Add one to begin structuring the project.</p>';
}

function renderCharacterList(project = currentStory()) {
  if (!project) return;
  elements.characterList.innerHTML = project.charactersList
    .slice()
    .sort((first, second) => first.name.localeCompare(second.name))
    .map(
      (character) => `
        <article class="writing-item-card">
          <p class="writing-card-meta">${escapeHtml(character.role || "Character")} / ${escapeHtml(character.age || "Age unspecified")}</p>
          <h3>${escapeHtml(character.name)}</h3>
          <p><strong>Goal:</strong> ${escapeHtml(character.goal || "Unknown")}</p>
          <p><strong>Fear:</strong> ${escapeHtml(character.fear || "Unknown")}</p>
          <p><strong>Arc:</strong> ${escapeHtml(character.arc || "No arc notes yet.")}</p>
          <div class="writing-card-actions">
            <button type="button" data-character-action="edit" data-id="${character.id}">Edit</button>
            <button type="button" data-character-action="delete" data-id="${character.id}">Delete</button>
          </div>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No characters yet. Add a cast member to start shaping the story.</p>';
}

function renderWorldbuilding(project = currentStory()) {
  if (!project) return;
  const sceneLabels = Object.fromEntries(
    chapterSceneOptions(project).map((scene) => [scene.id, scene.label]),
  );
  const characterLabels = Object.fromEntries(
    project.charactersList.map((character) => [character.id, character.name]),
  );
  elements.worldbuildingList.innerHTML = project.worldbuilding
    .slice()
    .sort((first, second) =>
      `${first.category}:${first.title}`.localeCompare(`${second.category}:${second.title}`),
    )
    .map(
      (entry) => `
        <article class="writing-item-card">
          <p class="writing-card-meta">${escapeHtml(entry.category)}</p>
          <h3>${escapeHtml(entry.title)}</h3>
          <p>${escapeHtml(entry.description || "No description yet.")}</p>
          <p><strong>Characters:</strong> ${escapeHtml(
            entry.relatedCharacterIds.map((id) => characterLabels[id]).filter(Boolean).join(", ") ||
              "None",
          )}</p>
          <p><strong>Scenes:</strong> ${escapeHtml(
            entry.relatedSceneIds.map((id) => sceneLabels[id]).filter(Boolean).join(", ") || "None",
          )}</p>
          <div class="writing-card-actions">
            <button type="button" data-worldbuilding-action="edit" data-id="${entry.id}">Edit</button>
            <button type="button" data-worldbuilding-action="delete" data-id="${entry.id}">Delete</button>
          </div>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No worldbuilding notes yet. Add a place, belief, object, or system here.</p>';
}

function renderTimeline(project = currentStory()) {
  if (!project) return;
  elements.timelineList.innerHTML = project.timeline
    .slice()
    .sort((first, second) =>
      String(first.dateOrOrder).localeCompare(String(second.dateOrOrder), undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map(
      (entry) => `
        <article class="timeline-item">
          <p class="timeline-meta">${escapeHtml(entry.type || "Timeline event")} / ${escapeHtml(entry.dateOrOrder)}</p>
          <h3>${escapeHtml(entry.title)}</h3>
          <p>${escapeHtml(entry.description || "No description yet.")}</p>
          <div class="timeline-actions">
            <button type="button" data-timeline-action="edit" data-id="${entry.id}">Edit</button>
            <button type="button" data-timeline-action="delete" data-id="${entry.id}">Delete</button>
          </div>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No timeline events yet. Add one to map the order of what matters.</p>';
}

function renderResearchShelf(project = currentStory()) {
  if (!project) return;
  elements.researchList.innerHTML = project.researchShelf
    .map(
      (entry) => `
        <article class="writing-item-card">
          <p class="writing-card-meta">${escapeHtml(entry.sourceType || "Research shelf")}</p>
          <h3>${escapeHtml(entry.title || "Unlinked title")}</h3>
          <p><strong>Author:</strong> ${escapeHtml(entry.author || "Unknown")}</p>
          ${entry.excerpt ? `<p>${escapeHtml(entry.excerpt)}</p>` : ""}
          <p>${escapeHtml(entry.notes || "No notes yet.")}</p>
          <div class="writing-tag-cloud">
            ${(entry.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="writing-card-actions">
            ${entry.catalogueItemId ? `<button type="button" data-research-action="open-book" data-book-id="${entry.catalogueItemId}">Open book</button>` : ""}
            <button type="button" data-research-action="insert-pinned" data-id="${entry.id}">Insert citation</button>
            <button type="button" data-research-action="edit" data-id="${entry.id}">Edit</button>
            <button type="button" data-research-action="delete" data-id="${entry.id}">Delete</button>
          </div>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No research items yet. Link books from your catalogue to build this shelf.</p>';
}

function researchPreview(value, limit = 230) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

function allWritingResearchSources() {
  if (!currentAccount) return [];
  const sources = [];
  ownedByCurrent(books).forEach((book) => {
    sources.push({
      key: `book:${book.id}`,
      kind: "book",
      id: book.id,
      title: book.title,
      author: book.author,
      meta: [book.genre, book.format, book.status].filter(Boolean).join(" / "),
      excerpt: book.notes || "Book in your collection.",
      citation: `${book.title} by ${book.author}`,
    });
  });
  ownedByCurrent(passages).forEach((passage) => {
    const page = passage.page ? `, p. ${passage.page}` : "";
    sources.push({
      key: `passage:${passage.id}`,
      kind: "passage",
      id: passage.id,
      title: passage.title,
      author: passage.author,
      meta: `Saved passage${page}`,
      excerpt: passage.text || passage.reflection || "Photographed passage",
      citation: `${passage.title} by ${passage.author}${page}`,
    });
  });
  journals.forEach((entry) => {
    const bookNames = (entry.books || []).map((book) => book.title).join(", ");
    sources.push({
      key: `journal:${entry.id}`,
      kind: "journal",
      id: entry.id,
      title: `Journal - ${journalDateLabel(entry.entryDate)}`,
      author: currentAccount.username,
      meta: bookNames || "General reflection",
      excerpt: entry.reflection,
      citation: `Personal journal, ${journalDateLabel(entry.entryDate)}`,
      original: entry,
    });
  });
  ownedByCurrent(readingLog).forEach((entry) => {
    const pageDetail = entry.specificPages || [entry.startPageLabel, entry.endPageLabel].filter(Boolean).join("-");
    sources.push({
      key: `reading:${entry.id}`,
      kind: "reading",
      id: entry.id,
      title: entry.title,
      author: entry.author,
      meta: `${formatDate(entry.date)} / ${entry.pagesRead || 0} pages / ${formatDuration(entry.durationMinutes)}`,
      excerpt: pageDetail ? `Pages recorded: ${pageDetail}` : "Reading session",
      citation: `Reading log: ${entry.title}, ${formatDate(entry.date)}`,
    });
  });
  ownedByCurrent(wordhub).forEach((entry) => {
    sources.push({
      key: `word:${entry.id}`,
      kind: "word",
      id: entry.id,
      title: entry.word,
      author: entry.book || "WordHub Alcove",
      meta: entry.page ? `Found on page ${entry.page}` : "Vocabulary note",
      excerpt: [entry.meaning, entry.sentence].filter(Boolean).join(" Example: "),
      citation: `${entry.word}: ${entry.meaning}`,
    });
  });
  ownedByCurrent(wishlist).forEach((item) => {
    sources.push({
      key: `wishlist:${item.id}`,
      kind: "wishlist",
      id: item.id,
      title: item.title,
      author: item.author || "Unknown author",
      meta: "Wishlist",
      excerpt: item.note || item.notes || "Book saved for future purchase.",
      citation: `${item.title} by ${item.author || "Unknown author"}`,
    });
  });
  allStoryProjects().forEach((project) => {
    sources.push({
      key: `document:${project.id}`,
      kind: "document",
      id: project.id,
      projectId: project.id,
      routeView: "manuscript",
      title: project.title,
      author: currentAccount.username,
      meta: `${project.type} / ${project.status} / ${currentStoryWordCount(project)} words`,
      excerpt:
        project.manuscriptText ||
        richTextToPlain(project.manuscriptHtml) ||
        project.description ||
        project.notes ||
        "Empty Writing Studio document.",
      citation: `${project.title}, Writing Studio document`,
    });
    project.researchShelf.forEach((entry) => {
      sources.push({
        key: `research:${project.id}:${entry.id}`,
        kind: "research",
        id: entry.id,
        projectId: project.id,
        routeView: "research",
        title: entry.title || "Untitled research file",
        author: entry.author || "Personal research",
        meta: `Research Shelf / ${project.title}`,
        excerpt: [entry.excerpt, entry.notes, entry.citation].filter(Boolean).join(" "),
        citation: entry.citation || `${entry.title || "Research file"}, ${project.title}`,
      });
    });
    project.quoteReferences.forEach((entry) => {
      sources.push({
        key: `reference:${project.id}:${entry.id}`,
        kind: "reference",
        id: entry.id,
        projectId: project.id,
        routeView: "quotes",
        title: entry.sourceTitle || "Untitled reference",
        author: entry.author || "Unknown author",
        meta: `Quotes & references / ${project.title}${entry.page ? ` / ${entry.page}` : ""}`,
        excerpt: [entry.text, entry.personalNote].filter(Boolean).join(" "),
        citation: `${entry.sourceTitle || "Reference"}${entry.author ? ` by ${entry.author}` : ""}${entry.page ? `, ${entry.page}` : ""}`,
      });
    });
  });
  return sources;
}

function writingResearchSource(key) {
  return allWritingResearchSources().find((source) => source.key === key);
}

function renderResearchLibrary(project = currentStory()) {
  if (!elements.researchLibraryResults) return;
  const query = normalize(elements.researchLibrarySearch.value);
  const kind = elements.researchLibraryFilter.value;
  const sources = allWritingResearchSources()
    .filter((source) => kind === "all" || source.kind === kind)
    .filter((source) => {
      if (!query) return true;
      return normalize([
        source.title,
        source.author,
        source.meta,
        source.excerpt,
        source.citation,
      ].join(" ")).includes(query);
    })
    .sort((first, second) => first.title.localeCompare(second.title, undefined, { sensitivity: "base" }));
  elements.researchResultCount.textContent = `${sources.length} result${sources.length === 1 ? "" : "s"}`;
  elements.researchLibraryResults.innerHTML = sources.length
    ? sources.map((source) => {
        const pinned = project?.researchShelf.some(
          (entry) => entry.sourceType === source.kind && entry.sourceId === source.id,
        ) || false;
        return `
          <article class="research-source-card">
            <span class="research-source-kind">${escapeHtml(source.kind)}</span>
            <h4>${escapeHtml(source.title || "Untitled source")}</h4>
            <p class="writing-card-meta">${escapeHtml(source.author || "Personal note")} / ${escapeHtml(source.meta || "Saved in the app")}</p>
            <p>${escapeHtml(researchPreview(source.excerpt) || "No preview available.")}</p>
            <div class="research-source-actions">
              ${project ? `<button type="button" data-library-research-action="insert" data-key="${escapeHtml(source.key)}">Insert citation</button>` : ""}
              ${project ? `<button type="button" data-library-research-action="pin" data-key="${escapeHtml(source.key)}" ${pinned ? "disabled" : ""}>${pinned ? "Pinned" : "Pin to project"}</button>` : ""}
              ${source.kind === "journal" ? `<button type="button" data-library-research-action="import-journal" data-key="${escapeHtml(source.key)}">Open as document</button>` : ""}
              ${source.kind !== "journal" ? `<button type="button" data-library-research-action="open-source" data-key="${escapeHtml(source.key)}">Open source</button>` : ""}
            </div>
          </article>`;
      }).join("")
    : '<p class="writing-card-meta">No saved information matches this search.</p>';
}

function revealWritingResearchLibrary() {
  elements.writingResearchLibrary.open = true;
  renderResearchLibrary();
  elements.writingResearchLibrary.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.setTimeout(() => elements.researchLibrarySearch.focus(), 350);
}

function sourceCitationHtml(source) {
  const excerpt = researchPreview(source.excerpt, 700);
  if (source.kind === "passage" || source.kind === "journal") {
    return `<blockquote>${escapeHtml(excerpt)}</blockquote><p><cite>${escapeHtml(source.citation)}</cite></p><p><br></p>`;
  }
  return `<p><cite>${escapeHtml(source.citation)}</cite>${excerpt ? ` - ${escapeHtml(excerpt)}` : ""}</p><p><br></p>`;
}

function insertHtmlIntoWritingDocument(html) {
  setWritingView("manuscript");
  elements.storyDraftInput.focus();
  const selection = window.getSelection();
  if (lastWritingSelectionRange) {
    selection.removeAllRanges();
    selection.addRange(lastWritingSelectionRange);
  } else {
    const range = document.createRange();
    range.selectNodeContents(elements.storyDraftInput);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand("insertHTML", false, html);
  lastWritingSelectionRange = selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
  scheduleStorySave();
}

function insertResearchSource(key) {
  const source = writingResearchSource(key);
  if (!source) return;
  insertHtmlIntoWritingDocument(sourceCitationHtml(source));
  showToast(`Inserted reference to "${source.title}".`);
}

function pinResearchSource(key) {
  const story = currentStory();
  const source = writingResearchSource(key);
  if (!story || !source) return;
  if (story.researchShelf.some((entry) => entry.sourceType === source.kind && entry.sourceId === source.id)) {
    showToast("That source is already pinned to this document.");
    return;
  }
  story.researchShelf.unshift({
    id: crypto.randomUUID(),
    catalogueItemId: source.kind === "book" ? source.id : "",
    sourceType: source.kind,
    sourceId: source.id,
    title: source.title,
    author: source.author,
    excerpt: researchPreview(source.excerpt, 500),
    citation: source.citation,
    notes: "",
    tags: [],
    chapterId: "",
    sceneId: "",
  });
  story.updatedAt = new Date().toISOString();
  saveCreativeWriting();
  renderResearchShelf(story);
  renderResearchLibrary(story);
  showToast(`"${source.title}" pinned to this document.`);
}

function importJournalAsDocument(key) {
  const source = writingResearchSource(key);
  const entry = source?.original;
  if (!entry || !currentAccount) return;
  const existing = allStoryProjects().find((project) => project.sourceJournalId === entry.id);
  if (existing) {
    openStory(existing.id);
    setWritingView("manuscript");
    return;
  }
  const linkedBooks = (entry.books || []).map((book) => ({
    id: crypto.randomUUID(),
    catalogueItemId: book.id || "",
    sourceType: "book",
    sourceId: book.id || "",
    title: book.title || "",
    author: book.author || "",
    excerpt: "",
    citation: `${book.title || "Untitled"} by ${book.author || "Unknown author"}`,
    notes: "Imported from a journal entry.",
    tags: ["journal"],
    chapterId: "",
    sceneId: "",
  }));
  const project = ensureWritingProject({
    id: crypto.randomUUID(),
    title: source.title,
    type: "journal entry",
    genre: "Reflection",
    status: "drafting",
    description: source.meta,
    manuscriptHtml: plainTextToParagraphHtml(entry.reflection || ""),
    manuscriptText: entry.reflection || "",
    researchShelf: linkedBooks,
    sourceJournalId: entry.id,
    publishedJournalId: entry.id,
    createdAt: entry.createdAt || `${String(entry.entryDate).slice(0, 10)}T12:00:00`,
    updatedAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  });
  creativeWriting.unshift(project);
  saveCreativeWriting();
  openStory(project.id);
  setWritingView("manuscript");
  showToast("Journal entry opened as a Writing Studio document.");
}

function openWritingResearchSource(key) {
  const source = writingResearchSource(key);
  if (!source) return;
  if (source.projectId) {
    window.location.hash = "creative-writing";
    openStory(source.projectId);
    setWritingView(source.routeView || "overview");
    elements.storyEditor.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const routes = {
    book: "collection",
    passage: "passages",
    reading: "reading-log",
    word: "wordhub",
    wishlist: "wishlist",
  };
  const route = routes[source.kind];
  if (route) window.location.hash = route;
}

function renderQuotes(project = currentStory()) {
  if (!project) return;
  elements.quoteList.innerHTML = project.quoteReferences
    .map(
      (entry) => `
        <article class="writing-item-card">
          <p class="writing-card-meta">${escapeHtml(entry.sourceTitle || "Reference")} / ${escapeHtml(entry.page || "No page")}</p>
          <h3>${escapeHtml(entry.author || "Unknown author")}</h3>
          <p>${escapeHtml(entry.text || "")}</p>
          ${entry.personalNote ? `<p><strong>Note:</strong> ${escapeHtml(entry.personalNote)}</p>` : ""}
          <div class="writing-tag-cloud">
            ${(entry.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="writing-card-actions">
            <button type="button" data-quote-action="edit" data-id="${entry.id}">Edit</button>
            <button type="button" data-quote-action="delete" data-id="${entry.id}">Delete</button>
          </div>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No quotes or references yet. Save a passage, citation, or note to revisit later.</p>';
}

function renderGoals(project = currentStory()) {
  if (!project) return;
  const stats = writingProgressStats(project);
  const deadlineText = project.deadline
    ? storyDateLabel(project.deadline)
    : "No deadline yet";
  elements.writingGoalSummary.innerHTML = `
    <article class="writing-goal-card">
      <p>Total word count</p>
      <strong>${stats.totalWords}</strong>
    </article>
    <article class="writing-goal-card">
      <p>Words written today</p>
      <strong>${stats.todayWords}</strong>
    </article>
    <article class="writing-goal-card">
      <p>Writing streak</p>
      <strong>${stats.streak}</strong>
    </article>
    <article class="writing-goal-card">
      <p>Weekly progress</p>
      <strong>${stats.weeklyWords}</strong>
    </article>
    <article class="writing-goal-card">
      <p>Estimated completion</p>
      <strong>${escapeHtml(stats.estimatedCompletion)}</strong>
    </article>
    <article class="writing-goal-card">
      <p>Deadline</p>
      <strong>${escapeHtml(deadlineText)}</strong>
    </article>
    <article class="writing-goal-bar">
      <p>Project progress</p>
      <div class="writing-goal-bar-track"><span style="width:${stats.percentage}%"></span></div>
      <small>${stats.percentage}% of your project goal</small>
    </article>
  `;
}

function renderPrompts(project = currentStory()) {
  if (!project) return;
  elements.promptList.innerHTML = project.prompts
    .slice()
    .sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt)))
    .map(
      (prompt) => `
        <article class="writing-item-card">
          <p class="writing-card-meta">${escapeHtml(prompt.type)} / ${prompt.used ? "Used" : "Unused"}</p>
          <p>${escapeHtml(prompt.text)}</p>
          <div class="writing-card-actions">
            <button type="button" data-prompt-action="toggle" data-id="${prompt.id}">
              ${prompt.used ? "Mark unused" : "Mark used"}
            </button>
            <button type="button" data-prompt-action="edit" data-id="${prompt.id}">Edit</button>
            <button type="button" data-prompt-action="delete" data-id="${prompt.id}">Delete</button>
          </div>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No prompts saved yet. Generate one or add your own.</p>';
}

function renderRevision(project = currentStory()) {
  if (!project) return;
  elements.storyVersionList.innerHTML = project.versions
    .slice()
    .sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt)))
    .map(
      (version) => `
        <article class="version-item">
          <p class="writing-card-meta">${escapeHtml(version.label)} / ${escapeHtml(storyDateTimeLabel(version.createdAt))}</p>
          <p>${version.words} words</p>
          <button type="button" data-version-action="restore" data-id="${version.id}">Restore version</button>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No saved versions yet. Manual manuscript saves create them.</p>';
  elements.revisionCommentList.innerHTML = project.comments
    .slice()
    .sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt)))
    .map(
      (comment) => `
        <article class="comment-item">
          <p class="writing-card-meta">${escapeHtml(storyDateTimeLabel(comment.createdAt))}</p>
          <p>${escapeHtml(comment.text)}</p>
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">No comments yet.</p>';
  elements.sceneChecklistList.innerHTML = project.chapters
    .flatMap((chapter) =>
      chapter.scenes.map((scene) => ({
        chapter,
        scene,
      })),
    )
    .map(
      ({ chapter, scene }) => `
        <article class="checklist-item">
          <p class="writing-card-meta">Chapter ${chapter.order} / Scene ${scene.order}</p>
          <p><strong>${escapeHtml(scene.title)}</strong></p>
          ${[
            ["clarity", "Clarity"],
            ["tension", "Tension"],
            ["continuity", "Continuity"],
            ["sensory", "Sensory detail"],
            ["ending", "Strong ending"],
          ]
            .map(
              ([key, label]) => `
                <label>
                  <input
                    type="checkbox"
                    data-scene-check="${key}"
                    data-id="${scene.id}"
                    ${scene.checklist[key] ? "checked" : ""}
                  />
                  <span>${label}</span>
                </label>
              `,
            )
            .join("")}
        </article>
      `,
    )
    .join("") || '<p class="writing-card-meta">Add scenes to build a revision checklist.</p>';
}

function renderExportSelection(project = currentStory()) {
  if (!project) return;
  elements.exportSelectionList.innerHTML = [
    `<label><input type="checkbox" value="__full__" checked /> <span>Full project manuscript and notes</span></label>`,
    ...project.chapters
      .slice()
      .sort((first, second) => first.order - second.order)
      .map(
        (chapter) =>
          `<label><input type="checkbox" value="${chapter.id}" /> <span>Chapter ${chapter.order}: ${escapeHtml(chapter.title)}</span></label>`,
      ),
  ].join("");
}

function renderActiveStoryDetails(project = currentStory()) {
  if (!project) return;
  updateWritingSelectionOptions(project);
  renderWritingProjectMeta(project);
  renderChapterList(project);
  renderCharacterList(project);
  renderWorldbuilding(project);
  renderTimeline(project);
  renderResearchShelf(project);
  renderResearchLibrary(project);
  renderQuotes(project);
  renderGoals(project);
  renderPrompts(project);
  renderRevision(project);
  renderExportSelection(project);
  renderManuscriptInsights(project);
}

function setWritingView(view, { focusEditor = true } = {}) {
  currentWritingView = view;
  const panels = {
    overview: elements.storyPlanView,
    manuscript: elements.storyDraftView,
    chapters: elements.storyChaptersView,
    characters: elements.storyCharactersView,
    worldbuilding: elements.storyWorldbuildingView,
    timeline: elements.storyTimelineView,
    research: elements.storyResearchView,
    quotes: elements.storyQuotesView,
    goals: elements.storyGoalsView,
    prompts: elements.storyPromptsView,
    revision: elements.storyRevisionView,
    export: elements.storyExportView,
  };
  Object.entries(panels).forEach(([key, panel]) => {
    panel.hidden = key !== view;
  });
  document.querySelectorAll("[data-writing-view]").forEach((button) => {
    const selected = button.dataset.writingView === view;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  if (view === "manuscript" && focusEditor) {
    elements.storyDraftInput.focus();
  }
  if (view === "research") renderResearchLibrary();
}

function populateProjectForm(project) {
  elements.storyIdInput.value = project.id;
  elements.storyTitleInput.value = project.title || "";
  elements.storyTypeInput.value = project.type || "other";
  elements.storyGenreInput.value = project.genre || "";
  elements.storyStatusInput.value = project.status || "planning";
  elements.storyPremiseInput.value = project.description || "";
  elements.storyTargetInput.value = toNumber(project.targetWordCount) || "";
  elements.storyCurrentCountInput.value = currentStoryWordCount(project);
  elements.storyCreatedInput.value = storyDateLabel(project.createdAt);
  elements.storyUpdatedInput.value = storyDateTimeLabel(project.updatedAt);
  elements.storyMoodInput.value = formatTagList(project.moodTags);
  elements.storyThemeInput.value = formatTagList(project.themeTags);
  elements.storySymbolInput.value = formatTagList(project.symbolTags);
  elements.storyConflictInput.value = formatTagList(project.conflictTags);
  elements.storyOutlineInput.value = project.notes || "";
  elements.storyDraftInput.innerHTML = project.manuscriptHtml || "";
  elements.wordDocumentTitle.textContent = project.title || "Untitled document";
  applyWritingDocumentLayout(project);
  elements.storyDraftNotesInput.value = project.draftNotes || "";
  elements.storyRevisionNotesInput.value = project.revisionNotes || "";
  elements.storyContinuityNotesInput.value = project.continuityNotes || "";
  elements.storyWordCount.textContent = currentStoryWordCount(project);
  elements.storyCharacterCount.textContent = currentStoryCharacterCount(project);
  elements.storySaveStatus.textContent = "All changes saved";
  elements.storyLastSaved.textContent = storyDateTimeLabel(project.updatedAt);
  elements.writingDailyGoalInput.value = toNumber(project.dailyWordGoal) || "";
  elements.writingWeeklyGoalInput.value = toNumber(project.weeklyWordGoal) || "";
  elements.writingProjectGoalInput.value = toNumber(project.projectWordGoal) || "";
  elements.writingDeadlineInput.value = project.deadline || "";
  elements.publishJournalButton.hidden = project.type !== "journal entry";
}

function openStory(storyId, { focusEditor = true } = {}) {
  const story = creativeWriting.find(
    (item) => item.id === storyId && item.ownerId === currentAccount?.id,
  );
  if (!story) return;
  const project = ensureWritingProject(story);
  elements.storyEditor.hidden = false;
  elements.storyEditorEmpty.hidden = true;
  populateProjectForm(project);
  renderStories();
  renderActiveStoryDetails(project);
  setWritingView(currentWritingView, { focusEditor });
}

function createStory(type = "novel") {
  if (!currentAccount) return;
  const isJournal = type === "journal entry";
  const project = ensureWritingProject({
    id: crypto.randomUUID(),
    title: isJournal
      ? `Journal - ${new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
      : "Untitled document",
    type,
    genre: "",
    description: "",
    targetWordCount: isJournal ? 0 : 50000,
    status: isJournal ? "drafting" : "idea",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: currentAccount.id,
  });
  creativeWriting.unshift(project);
  saveCreativeWriting();
  currentWritingView = "manuscript";
  openStory(project.id);
  setWritingView("manuscript");
  elements.storyTitleInput.select();
}

function createJournalDocument() {
  createStory("journal entry");
  setWritingView("manuscript");
}

function duplicateStoryProject(project) {
  const copy = cloneData(project);
  const characterIdMap = new Map();
  const chapterIdMap = new Map();
  const sceneIdMap = new Map();
  copy.id = crypto.randomUUID();
  copy.title = `${project.title} (Copy)`;
  copy.createdAt = new Date().toISOString();
  copy.updatedAt = copy.createdAt;
  copy.ownerId = currentAccount.id;
  copy.comments = [];
  copy.writingLog = [];
  copy.versions = [];
  copy.prompts = (copy.prompts || []).map((prompt) => ({
    ...prompt,
    id: crypto.randomUUID(),
    used: false,
  }));
  copy.charactersList = (copy.charactersList || []).map((character) => {
    const nextId = crypto.randomUUID();
    characterIdMap.set(character.id, nextId);
    return {
      ...character,
      id: nextId,
    };
  });
  copy.chapters = (copy.chapters || []).map((chapter) => ({
    ...chapter,
    id: (() => {
      const nextId = crypto.randomUUID();
      chapterIdMap.set(chapter.id, nextId);
      return nextId;
    })(),
    scenes: (chapter.scenes || []).map((scene) => {
      const nextId = crypto.randomUUID();
      sceneIdMap.set(scene.id, nextId);
      return {
        ...scene,
        id: nextId,
        relatedCharacterIds: (scene.relatedCharacterIds || [])
          .map((id) => characterIdMap.get(id))
          .filter(Boolean),
        checklist: defaultSceneChecklist(scene.checklist),
      };
    }),
  }));
  copy.worldbuilding = (copy.worldbuilding || []).map((entry) => ({
    ...entry,
    id: crypto.randomUUID(),
    relatedCharacterIds: (entry.relatedCharacterIds || [])
      .map((id) => characterIdMap.get(id))
      .filter(Boolean),
    relatedSceneIds: (entry.relatedSceneIds || [])
      .map((id) => sceneIdMap.get(id))
      .filter(Boolean),
  }));
  copy.timeline = (copy.timeline || []).map((entry) => ({
    ...entry,
    id: crypto.randomUUID(),
    relatedCharacterIds: (entry.relatedCharacterIds || [])
      .map((id) => characterIdMap.get(id))
      .filter(Boolean),
    relatedSceneIds: (entry.relatedSceneIds || [])
      .map((id) => sceneIdMap.get(id))
      .filter(Boolean),
  }));
  copy.researchShelf = (copy.researchShelf || []).map((entry) => ({
    ...entry,
    id: crypto.randomUUID(),
    chapterId: chapterIdMap.get(entry.chapterId) || "",
    sceneId: sceneIdMap.get(entry.sceneId) || "",
  }));
  copy.quoteReferences = (copy.quoteReferences || []).map((entry) => ({
    ...entry,
    id: crypto.randomUUID(),
    chapterId: chapterIdMap.get(entry.chapterId) || "",
    sceneId: sceneIdMap.get(entry.sceneId) || "",
  }));
  return ensureWritingProject(copy);
}

function recordWritingProgress(project, previousWords, nextWords) {
  const delta = Math.max(0, nextWords - previousWords);
  if (!delta) return;
  const today = todayKey();
  const existing = project.writingLog.find((entry) => entry.date === today);
  if (existing) existing.words += delta;
  else project.writingLog.push({ date: today, words: delta });
}

function saveManuscriptVersion(project, label = "Manual save") {
  project.versions.unshift({
    id: crypto.randomUUID(),
    label,
    createdAt: new Date().toISOString(),
    html: elements.storyDraftInput.innerHTML,
    notes: elements.storyDraftNotesInput.value.trim(),
    words: storyWordTotal(richTextToPlain(elements.storyDraftInput.innerHTML)),
  });
  project.versions = project.versions.slice(0, 25);
}

function saveProjectOverview() {
  const story = currentStory();
  if (!story) return;
  story.title = elements.storyTitleInput.value.trim() || "Untitled project";
  story.type = elements.storyTypeInput.value;
  story.genre = elements.storyGenreInput.value.trim();
  story.status = elements.storyStatusInput.value;
  story.description = elements.storyPremiseInput.value.trim();
  story.targetWordCount = toNumber(elements.storyTargetInput.value);
  story.moodTags = parseTagList(elements.storyMoodInput.value);
  story.themeTags = parseTagList(elements.storyThemeInput.value);
  story.symbolTags = parseTagList(elements.storySymbolInput.value);
  story.conflictTags = parseTagList(elements.storyConflictInput.value);
  story.notes = elements.storyOutlineInput.value.trim();
  story.updatedAt = new Date().toISOString();
  elements.wordDocumentTitle.textContent = story.title;
  saveCreativeWriting();
  renderStories();
  renderWritingProjectMeta(story);
  elements.storyCurrentCountInput.value = currentStoryWordCount(story);
  elements.storyUpdatedInput.value = storyDateTimeLabel(story.updatedAt);
  elements.publishJournalButton.hidden = story.type !== "journal entry";
  showToast(`"${story.title}" updated.`);
}

async function publishJournalDocument() {
  const story = currentStory();
  if (!story || story.type !== "journal entry") return;
  saveOpenStory({ manual: true });
  if (!story.manuscriptText.trim()) {
    showToast("Write the journal entry before sharing it.");
    return;
  }
  const linkedBookIds = new Set(
    story.researchShelf
      .filter((entry) => entry.sourceType === "book" || entry.catalogueItemId)
      .map((entry) => entry.catalogueItemId || entry.sourceId),
  );
  const taggedBooks = ownedByCurrent(books)
    .filter((book) => linkedBookIds.has(book.id))
    .map(({ id, title, author }) => ({ id, title, author }));
  try {
    story.publishedJournalId ||= crypto.randomUUID();
    await apiRequest("journal-save", {
      method: "POST",
      body: {
        id: story.publishedJournalId,
        entryDate: String(story.createdAt).slice(0, 10),
        reflection: story.manuscriptText.trim(),
        books: taggedBooks,
        isShared: true,
      },
    });
    saveCreativeWriting();
    await Promise.all([loadJournals(), loadCommunity()]);
    renderJournals();
    renderCommunity();
    renderResearchLibrary(story);
    showToast("Journal entry shared with the community.");
  } catch (error) {
    showToast(error.message);
  }
}

function saveOpenStory(options = {}) {
  const story = currentStory();
  if (!story) return;
  const previousWords = currentStoryWordCount(story);
  story.title = elements.storyTitleInput.value.trim() || "Untitled project";
  elements.wordDocumentTitle.textContent = story.title;
  story.manuscriptHtml = elements.storyDraftInput.innerHTML.trim();
  story.manuscriptText = richTextToPlain(story.manuscriptHtml);
  story.draftNotes = elements.storyDraftNotesInput.value.trim();
  story.updatedAt = new Date().toISOString();
  const nextWords = storyWordTotal(story.manuscriptText);
  if (nextWords > 0 && ["idea", "planning"].includes(story.status)) {
    story.status = "drafting";
    elements.storyStatusInput.value = story.status;
  }
  recordWritingProgress(story, previousWords, nextWords);
  if (options.manual) {
    saveManuscriptVersion(story, "Manual save");
  }
  saveCreativeWriting();
  elements.storyWordCount.textContent = nextWords;
  elements.storyCharacterCount.textContent = storyCharacterTotal(story.manuscriptText);
  elements.storyCurrentCountInput.value = nextWords;
  elements.storyUpdatedInput.value = storyDateTimeLabel(story.updatedAt);
  elements.storySaveStatus.textContent = "All changes saved";
  elements.storyLastSaved.textContent = storyDateTimeLabel(story.updatedAt);
  renderStories();
  renderWritingProjectMeta(story);
  renderGoals(story);
  renderRevision(story);
  renderManuscriptInsights(story);
}

function scheduleStorySave() {
  if (!currentStory()) return;
  window.clearTimeout(storySaveTimer);
  elements.storySaveStatus.textContent = "Saving...";
  elements.storyWordCount.textContent = storyWordTotal(
    richTextToPlain(elements.storyDraftInput.innerHTML),
  );
  elements.storyCharacterCount.textContent = storyCharacterTotal(
    richTextToPlain(elements.storyDraftInput.innerHTML),
  );
  storySaveTimer = window.setTimeout(() => saveOpenStory({ manual: false }), 700);
}

function resetStoryEditor() {
  elements.storyIdInput.value = "";
  elements.storyEditor.hidden = true;
  elements.storyEditorEmpty.hidden = false;
  elements.storyTitleInput.value = "";
}

function deleteOpenStory() {
  const story = currentStory();
  if (!story) return;
  creativeWriting = creativeWriting.filter((item) => item.id !== story.id);
  saveCreativeWriting();
  resetStoryEditor();
  renderStories();
  showToast(`"${story.title || "Untitled project"}" deleted.`);
}

function duplicateOpenStory() {
  const story = currentStory();
  if (!story) return;
  const duplicate = duplicateStoryProject(story);
  creativeWriting.unshift(duplicate);
  saveCreativeWriting();
  openStory(duplicate.id);
  showToast(`Created a copy of "${story.title}".`);
}

function applyWritingFormat(action, value = null) {
  elements.storyDraftInput.focus();
  restoreWritingSelection();
  document.execCommand(action, false, value);
  if (action !== "copy") scheduleStorySave();
}

function setWritingRibbon(tab) {
  activeWritingRibbon = ["file", "home", "insert", "layout", "references", "review", "view"].includes(tab)
    ? tab
    : "home";
  document.querySelectorAll("[data-writing-ribbon]").forEach((button) => {
    const active = button.dataset.writingRibbon === activeWritingRibbon;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-writing-ribbon-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.writingRibbonPanel !== activeWritingRibbon;
  });
  document.querySelectorAll("[data-writing-ribbon-content]").forEach((panel) => {
    panel.hidden = panel.dataset.writingRibbonContent !== activeWritingRibbon;
  });
}

function writingDocumentLayout(project = currentStory()) {
  const layout = project?.documentLayout || {};
  return {
    margins: ["normal", "narrow", "wide"].includes(layout.margins)
      ? layout.margins
      : "normal",
    orientation: ["portrait", "landscape"].includes(layout.orientation)
      ? layout.orientation
      : "portrait",
    lineSpacing: ["1", "1.15", "1.5", "2"].includes(String(layout.lineSpacing))
      ? String(layout.lineSpacing)
      : "1.15",
  };
}

function applyWritingDocumentLayout(project = currentStory(), persist = false) {
  if (!project) return;
  const layout = persist
    ? {
        margins: elements.writingMarginSelect.value,
        orientation: elements.writingOrientationSelect.value,
        lineSpacing: elements.writingLineSpacingSelect.value,
      }
    : writingDocumentLayout(project);
  elements.writingMarginSelect.value = layout.margins;
  elements.writingOrientationSelect.value = layout.orientation;
  elements.writingLineSpacingSelect.value = layout.lineSpacing;
  elements.wordProcessorWindow.dataset.orientation = layout.orientation;
  elements.storyDraftInput.dataset.margins = layout.margins;
  elements.storyDraftInput.dataset.lineSpacing = layout.lineSpacing;
  if (!persist) return;
  project.documentLayout = layout;
  project.updatedAt = new Date().toISOString();
  saveCreativeWriting();
  elements.storyUpdatedInput.value = storyDateTimeLabel(project.updatedAt);
  elements.storyLastSaved.textContent = storyDateTimeLabel(project.updatedAt);
  elements.storySaveStatus.textContent = "Layout saved";
  window.setTimeout(() => {
    if (elements.storySaveStatus.textContent === "Layout saved") {
      elements.storySaveStatus.textContent = "All changes saved";
    }
  }, 1200);
}

function insertWritingDateTime() {
  insertHtmlIntoWritingDocument(
    `<time datetime="${new Date().toISOString()}">${escapeHtml(new Date().toLocaleString())}</time>`,
  );
}

function insertWritingTable() {
  insertHtmlIntoWritingDocument(`
    <table class="writing-document-table">
      <tbody>
        <tr><td><br></td><td><br></td></tr>
        <tr><td><br></td><td><br></td></tr>
      </tbody>
    </table><p><br></p>
  `);
}

function runWritingFileCommand(command) {
  if (command === "save" || command === "snapshot") {
    saveOpenStory({ manual: true });
    showToast(command === "snapshot" ? "A new document version was saved." : "Document saved.");
  }
  if (command === "duplicate") duplicateOpenStory();
  if (command === "print") printCurrentWritingProject();
  if (command === "word") exportWritingProjectForWord();
}

function rememberWritingSelection() {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (elements.storyDraftInput.contains(range.commonAncestorContainer)) {
    lastWritingSelectionRange = range.cloneRange();
  }
}

function restoreWritingSelection() {
  if (!lastWritingSelectionRange) return;
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(lastWritingSelectionRange);
}

function selectWritingTextRange(start, end) {
  const walker = document.createTreeWalker(
    elements.storyDraftInput,
    NodeFilter.SHOW_TEXT,
  );
  const nodes = [];
  let total = 0;
  let node;
  while ((node = walker.nextNode())) {
    nodes.push({ node, start: total, end: total + node.nodeValue.length });
    total += node.nodeValue.length;
  }
  const first = nodes.find((item) => start >= item.start && start <= item.end);
  const last = nodes.find((item) => end >= item.start && end <= item.end) || nodes[nodes.length - 1];
  if (!first || !last) return false;
  const range = document.createRange();
  range.setStart(first.node, Math.max(0, start - first.start));
  range.setEnd(last.node, Math.max(0, Math.min(last.node.nodeValue.length, end - last.start)));
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  lastWritingSelectionRange = range.cloneRange();
  elements.storyDraftInput.focus();
  return true;
}

function findNextInWritingDocument() {
  const query = elements.writingFindInput.value;
  const text = richTextToPlain(elements.storyDraftInput.innerHTML);
  if (!query.trim() || !text) return false;
  const haystack = text.toLocaleLowerCase();
  const needle = query.toLocaleLowerCase();
  let index = haystack.indexOf(needle, writingFindCursor);
  if (index < 0 && writingFindCursor > 0) index = haystack.indexOf(needle);
  if (index < 0) {
    showToast(`No match for "${query}".`);
    writingFindCursor = 0;
    return false;
  }
  writingFindCursor = index + needle.length;
  selectWritingTextRange(index, index + query.length);
  return true;
}

function replaceCurrentWritingMatch() {
  const query = elements.writingFindInput.value;
  const selection = window.getSelection();
  if (!query.trim()) return;
  if (selection?.toString().toLocaleLowerCase() !== query.toLocaleLowerCase()) {
    if (!findNextInWritingDocument()) return;
  }
  document.execCommand("insertText", false, elements.writingReplaceInput.value);
  scheduleStorySave();
  findNextInWritingDocument();
}

function replaceAllWritingMatches() {
  const query = elements.writingFindInput.value;
  if (!query.trim()) return;
  const replacement = elements.writingReplaceInput.value;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(escaped, "gi");
  const walker = document.createTreeWalker(
    elements.storyDraftInput,
    NodeFilter.SHOW_TEXT,
  );
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);
  let count = 0;
  nodes.forEach((textNode) => {
    const matches = textNode.nodeValue.match(matcher);
    if (!matches) return;
    count += matches.length;
    textNode.nodeValue = textNode.nodeValue.replace(matcher, replacement);
  });
  writingFindCursor = 0;
  if (count) scheduleStorySave();
  showToast(count ? `Replaced ${count} occurrence${count === 1 ? "" : "s"}.` : `No match for "${query}".`);
}

function writingLinkKeys(anchor) {
  return String(anchor?.dataset.researchKeys || "")
    .split("|")
    .map((key) => key.trim())
    .filter(Boolean);
}

function writingAnchorForRange(range) {
  if (!range) return null;
  const node = range.commonAncestorContainer;
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  return element?.closest("a") || null;
}

function renderWritingLinkResults() {
  const query = normalize(elements.writingLinkSearch.value);
  const kind = elements.writingLinkFilter.value;
  const sources = allWritingResearchSources()
    .filter((source) => kind === "all" || source.kind === kind)
    .filter((source) => {
      if (!query) return true;
      return normalize([
        source.title,
        source.author,
        source.meta,
        source.excerpt,
        source.citation,
      ].join(" ")).includes(query);
    })
    .sort((first, second) => first.title.localeCompare(second.title, undefined, {
      sensitivity: "base",
    }));
  elements.writingLinkResults.innerHTML = sources.length
    ? sources
        .slice(0, 100)
        .map(
          (source) => `
            <label class="writing-link-source-option">
              <input
                type="checkbox"
                value="${escapeHtml(source.key)}"
                ${writingLinkSelectedKeys.has(source.key) ? "checked" : ""}
              />
              <span class="writing-link-source-icon" aria-hidden="true">${escapeHtml(source.kind.slice(0, 1).toUpperCase())}</span>
              <span>
                <strong>${escapeHtml(source.title || "Untitled source")}</strong>
                <small>${escapeHtml(source.kind)} / ${escapeHtml(source.author || "Personal note")}</small>
                <em>${escapeHtml(researchPreview(source.excerpt, 130) || "No preview available.")}</em>
              </span>
            </label>
          `,
        )
        .join("")
    : '<p class="writing-card-meta">No research files match this search.</p>';
}

function openWritingResearchLinkDialog() {
  restoreWritingSelection();
  const selection = window.getSelection();
  const range = selection?.rangeCount ? selection.getRangeAt(0) : lastWritingSelectionRange;
  const anchor = writingAnchorForRange(range);
  if ((!range || range.collapsed || !range.toString().trim()) && !anchor) {
    showToast("Select words in the manuscript before linking research files.");
    return;
  }
  writingLinkAnchor = anchor;
  if (anchor) {
    const anchorRange = document.createRange();
    anchorRange.selectNodeContents(anchor);
    writingLinkRange = anchorRange;
  } else {
    writingLinkRange = range.cloneRange();
  }
  writingLinkSelectedKeys = new Set(writingLinkKeys(anchor));
  elements.writingLinkSelectionText.textContent =
    researchPreview(anchor?.textContent || writingLinkRange.toString(), 160) || "Selected text";
  elements.writingLinkUrl.value = anchor?.dataset.webUrl ||
    (anchor?.href && !anchor.getAttribute("href")?.startsWith("#") ? anchor.href : "");
  elements.writingLinkSearch.value = "";
  elements.writingLinkFilter.value = "all";
  elements.writingLinkError.textContent = "";
  elements.removeWritingLinkButton.hidden = !anchor;
  renderWritingLinkResults();
  elements.writingLinkDialog.showModal();
}

function normalizedWritingLinkUrl(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function applyWritingResearchLink() {
  const webUrlInput = elements.writingLinkUrl.value.trim();
  const webUrl = normalizedWritingLinkUrl(webUrlInput);
  if (webUrlInput && !webUrl) {
    elements.writingLinkError.textContent = "Enter a complete http:// or https:// web address.";
    return;
  }
  const keys = [...writingLinkSelectedKeys];
  if (!keys.length && !webUrl) {
    elements.writingLinkError.textContent = "Choose at least one research file or add a web address.";
    return;
  }
  let anchor = writingLinkAnchor;
  if (!anchor) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(writingLinkRange);
    const temporaryHref = `#research-link-${crypto.randomUUID()}`;
    document.execCommand("createLink", false, temporaryHref);
    anchor = Array.from(elements.storyDraftInput.querySelectorAll("a")).find(
      (link) => link.getAttribute("href") === temporaryHref,
    );
  }
  if (!anchor) {
    elements.writingLinkError.textContent = "The selected words could not be linked. Select a single phrase and try again.";
    return;
  }
  anchor.classList.toggle("writing-research-link", keys.length > 0);
  if (keys.length) anchor.dataset.researchKeys = keys.join("|");
  else delete anchor.dataset.researchKeys;
  if (webUrl) anchor.dataset.webUrl = webUrl;
  else delete anchor.dataset.webUrl;
  anchor.href = webUrl || "#writing-research-link";
  if (webUrl) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  } else {
    anchor.removeAttribute("target");
    anchor.removeAttribute("rel");
  }
  anchor.setAttribute("aria-haspopup", keys.length ? "dialog" : "false");
  anchor.title = keys.length
    ? `${keys.length} linked research ${keys.length === 1 ? "file" : "files"}`
    : webUrl;
  lastWritingSelectionRange = null;
  elements.writingLinkDialog.close();
  scheduleStorySave();
  showToast(keys.length
    ? `Linked the selected words to ${keys.length} research ${keys.length === 1 ? "file" : "files"}.`
    : "Web link added.");
}

function removeWritingResearchLink() {
  if (!writingLinkAnchor) return;
  const parent = writingLinkAnchor.parentNode;
  while (writingLinkAnchor.firstChild) {
    parent.insertBefore(writingLinkAnchor.firstChild, writingLinkAnchor);
  }
  writingLinkAnchor.remove();
  elements.writingLinkDialog.close();
  scheduleStorySave();
  showToast("Link removed. The words remain in your manuscript.");
}

function closeWritingLinkPopover() {
  window.clearTimeout(writingLinkPopoverTimer);
  elements.writingLinkPopover.hidden = true;
  elements.writingLinkPopover.innerHTML = "";
}

function positionWritingLinkPopover(anchor) {
  const anchorRect = anchor.getBoundingClientRect();
  const popoverRect = elements.writingLinkPopover.getBoundingClientRect();
  const edge = 12;
  const left = Math.max(
    edge,
    Math.min(window.innerWidth - popoverRect.width - edge, anchorRect.left),
  );
  const preferredTop = anchorRect.bottom + 10;
  const top = preferredTop + popoverRect.height <= window.innerHeight - edge
    ? preferredTop
    : Math.max(edge, anchorRect.top - popoverRect.height - 10);
  elements.writingLinkPopover.style.left = `${left}px`;
  elements.writingLinkPopover.style.top = `${top}px`;
}

function showWritingLinkPopover(anchor) {
  const keys = writingLinkKeys(anchor);
  if (!keys.length) return;
  const sources = keys.map(writingResearchSource).filter(Boolean);
  elements.writingLinkPopover.innerHTML = `
    <div class="writing-link-popover-heading">
      <div>
        <span>Linked research</span>
        <strong>${sources.length} ${sources.length === 1 ? "file" : "files"}</strong>
      </div>
      <button type="button" data-writing-link-action="close" aria-label="Close linked research card">X</button>
    </div>
    <div class="writing-link-popover-files">
      ${sources.length
        ? sources.map((source) => `
          <article>
            <span>${escapeHtml(source.kind)}</span>
            <strong>${escapeHtml(source.title || "Untitled source")}</strong>
            <small>${escapeHtml(source.author || "Personal note")}</small>
            <p>${escapeHtml(researchPreview(source.excerpt, 170) || "No preview available.")}</p>
            <div>
              <button type="button" data-writing-link-action="open" data-key="${escapeHtml(source.key)}">Open file</button>
              <button type="button" data-writing-link-action="summarize" data-key="${escapeHtml(source.key)}">Ask Nillion</button>
            </div>
          </article>
        `).join("")
        : '<p class="writing-link-missing">The linked files are no longer available in this account.</p>'}
    </div>
    ${anchor.dataset.webUrl ? `<a class="writing-link-web-button" href="${escapeHtml(anchor.dataset.webUrl)}" target="_blank" rel="noopener noreferrer">Open linked website</a>` : ""}
    <p class="writing-link-summary" data-writing-link-summary hidden></p>
  `;
  elements.writingLinkPopover.hidden = false;
  window.requestAnimationFrame(() => positionWritingLinkPopover(anchor));
}

function summarizeWritingLinkSource(key) {
  const source = writingResearchSource(key);
  if (!source) return;
  const answer = nillionSummarizeResearchSource(source);
  const summary = elements.writingLinkPopover.querySelector("[data-writing-link-summary]");
  if (summary) {
    summary.textContent = answer;
    summary.hidden = false;
  }
  if (elements.nillionResponse) elements.nillionResponse.textContent = answer;
  speakNillionAnswer(answer);
}

function addWritingLink() {
  restoreWritingSelection();
  const selection = window.getSelection();
  if (!selection?.toString()) {
    showToast("Select text in the document before adding a link.");
    return;
  }
  const url = window.prompt("Enter the web address for this link:", "https://");
  if (!url) return;
  applyWritingFormat("createLink", url);
}

function insertWritingPageBreak() {
  insertHtmlIntoWritingDocument('<div class="writing-page-break" contenteditable="false" aria-label="Page break"></div><p><br></p>');
}

function updateWritingZoom(nextZoom) {
  writingZoom = Math.max(70, Math.min(150, nextZoom));
  elements.storyDraftInput.style.zoom = `${writingZoom}%`;
  elements.writingZoomLabel.textContent = `${writingZoom}%`;
}

function toggleWritingFocusMode() {
  writingFocusMode = !writingFocusMode;
  elements.appShell.classList.toggle("writing-focus-mode", writingFocusMode);
  elements.storyFocusButton.textContent = writingFocusMode
    ? "Exit focus mode"
    : "Distraction-free";
}

function saveChapter() {
  const story = currentStory();
  if (!story) return;
  const existing = story.chapters.find((chapter) => chapter.id === elements.chapterIdInput.value);
  const chapter = ensureChapter(
    existing || {
      id: crypto.randomUUID(),
      scenes: [],
    },
    toNumber(elements.chapterOrderInput.value, story.chapters.length + 1),
  );
  chapter.title = elements.chapterTitleInput.value.trim() || "Untitled chapter";
  chapter.order = toNumber(elements.chapterOrderInput.value, 1);
  chapter.status = elements.chapterStatusInput.value;
  chapter.summary = elements.chapterSummaryInput.value.trim();
  chapter.wordCount = toNumber(elements.chapterWordCountInput.value);
  chapter.themeTags = parseTagList(elements.chapterThemeInput.value);
  chapter.symbolTags = parseTagList(elements.chapterSymbolInput.value);
  if (!existing) story.chapters.push(chapter);
  story.updatedAt = new Date().toISOString();
  saveCreativeWriting();
  elements.chapterForm.reset();
  elements.chapterIdInput.value = "";
  elements.chapterFormTitle.textContent = "Add chapter";
  elements.chapterCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function editChapter(id) {
  const chapter = currentStory()?.chapters.find((item) => item.id === id);
  if (!chapter) return;
  elements.chapterIdInput.value = chapter.id;
  elements.chapterTitleInput.value = chapter.title;
  elements.chapterOrderInput.value = chapter.order;
  elements.chapterStatusInput.value = chapter.status;
  elements.chapterSummaryInput.value = chapter.summary;
  elements.chapterWordCountInput.value = chapter.wordCount || "";
  elements.chapterThemeInput.value = formatTagList(chapter.themeTags);
  elements.chapterSymbolInput.value = formatTagList(chapter.symbolTags);
  elements.chapterFormTitle.textContent = "Edit chapter";
  elements.chapterCancelEdit.hidden = false;
}

function moveChapter(id, direction) {
  const story = currentStory();
  if (!story) return;
  const chapters = story.chapters.slice().sort((first, second) => first.order - second.order);
  const index = chapters.findIndex((chapter) => chapter.id === id);
  if (index < 0) return;
  const swapIndex = index + direction;
  if (swapIndex < 0 || swapIndex >= chapters.length) return;
  [chapters[index].order, chapters[swapIndex].order] = [
    chapters[swapIndex].order,
    chapters[index].order,
  ];
  story.chapters = chapters;
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function deleteChapter(id) {
  const story = currentStory();
  if (!story) return;
  story.chapters = story.chapters.filter((chapter) => chapter.id !== id);
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function saveScene() {
  const story = currentStory();
  if (!story) return;
  const chapter = story.chapters.find((item) => item.id === elements.sceneChapterInput.value);
  if (!chapter) return;
  let existingScene = null;
  let existingChapter = null;
  story.chapters.forEach((currentChapter) => {
    const found = currentChapter.scenes.find((scene) => scene.id === elements.sceneIdInput.value);
    if (found) {
      existingScene = found;
      existingChapter = currentChapter;
    }
  });
  const scene = ensureScene(existingScene || { id: crypto.randomUUID() }, toNumber(elements.sceneOrderInput.value, chapter.scenes.length + 1));
  scene.title = elements.sceneTitleInput.value.trim() || "Untitled scene";
  scene.order = toNumber(elements.sceneOrderInput.value, 1);
  scene.summary = elements.sceneSummaryInput.value.trim();
  scene.povCharacter = elements.scenePovInput.value.trim();
  scene.setting = elements.sceneSettingInput.value.trim();
  scene.conflict = elements.sceneConflictInput.value.trim();
  scene.goal = elements.sceneGoalInput.value.trim();
  scene.outcome = elements.sceneOutcomeInput.value.trim();
  scene.wordCount = toNumber(elements.sceneWordCountInput.value);
  scene.status = elements.sceneStatusInput.value;
  scene.relatedCharacterIds = readMultiSelectValues(elements.sceneCharactersInput);
  scene.moodTags = parseTagList(elements.sceneMoodInput.value);
  scene.themeTags = parseTagList(elements.sceneThemeInput.value);
  scene.symbolTags = parseTagList(elements.sceneSymbolInput.value);
  if (existingScene && existingChapter && existingChapter.id !== chapter.id) {
    existingChapter.scenes = existingChapter.scenes.filter((item) => item.id !== scene.id);
    chapter.scenes.push(scene);
  } else if (!existingScene) {
    chapter.scenes.push(scene);
  }
  story.updatedAt = new Date().toISOString();
  saveCreativeWriting();
  elements.sceneForm.reset();
  elements.sceneIdInput.value = "";
  elements.sceneFormTitle.textContent = "Add scene";
  elements.sceneCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function findSceneById(story, id) {
  for (const chapter of story.chapters) {
    const scene = chapter.scenes.find((item) => item.id === id);
    if (scene) return { chapter, scene };
  }
  return null;
}

function editScene(id) {
  const story = currentStory();
  if (!story) return;
  const found = findSceneById(story, id);
  if (!found) return;
  const { chapter, scene } = found;
  elements.sceneIdInput.value = scene.id;
  elements.sceneChapterInput.value = chapter.id;
  elements.sceneTitleInput.value = scene.title;
  elements.sceneOrderInput.value = scene.order;
  elements.sceneSummaryInput.value = scene.summary;
  elements.scenePovInput.value = scene.povCharacter;
  elements.sceneSettingInput.value = scene.setting;
  elements.sceneConflictInput.value = scene.conflict;
  elements.sceneGoalInput.value = scene.goal;
  elements.sceneOutcomeInput.value = scene.outcome;
  elements.sceneWordCountInput.value = scene.wordCount || "";
  elements.sceneStatusInput.value = scene.status;
  setMultiSelectValues(elements.sceneCharactersInput, scene.relatedCharacterIds);
  elements.sceneMoodInput.value = formatTagList(scene.moodTags);
  elements.sceneThemeInput.value = formatTagList(scene.themeTags);
  elements.sceneSymbolInput.value = formatTagList(scene.symbolTags);
  elements.sceneFormTitle.textContent = "Edit scene";
  elements.sceneCancelEdit.hidden = false;
}

function moveScene(chapterId, sceneId, direction) {
  const story = currentStory();
  if (!story) return;
  const chapter = story.chapters.find((item) => item.id === chapterId);
  if (!chapter) return;
  const scenes = chapter.scenes.slice().sort((first, second) => first.order - second.order);
  const index = scenes.findIndex((scene) => scene.id === sceneId);
  if (index < 0) return;
  const swapIndex = index + direction;
  if (swapIndex < 0 || swapIndex >= scenes.length) return;
  [scenes[index].order, scenes[swapIndex].order] = [scenes[swapIndex].order, scenes[index].order];
  chapter.scenes = scenes;
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function deleteScene(id) {
  const story = currentStory();
  if (!story) return;
  story.chapters.forEach((chapter) => {
    chapter.scenes = chapter.scenes.filter((scene) => scene.id !== id);
  });
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function saveCharacter() {
  const story = currentStory();
  if (!story) return;
  const existing = story.charactersList.find((character) => character.id === elements.characterIdInput.value);
  const character = existing || { id: crypto.randomUUID() };
  Object.assign(character, {
    name: elements.characterNameInput.value.trim() || "Unnamed character",
    age: elements.characterAgeInput.value.trim(),
    role: elements.characterRoleInput.value.trim(),
    appearance: elements.characterAppearanceInput.value.trim(),
    personality: elements.characterPersonalityInput.value.trim(),
    strengths: elements.characterStrengthsInput.value.trim(),
    weaknesses: elements.characterWeaknessesInput.value.trim(),
    goal: elements.characterGoalInput.value.trim(),
    fear: elements.characterFearInput.value.trim(),
    backstory: elements.characterBackstoryInput.value.trim(),
    arc: elements.characterArcInput.value.trim(),
    relationships: elements.characterRelationshipsInput.value.trim(),
    notes: elements.characterNotesInput.value.trim(),
  });
  if (!existing) story.charactersList.push(character);
  saveCreativeWriting();
  elements.characterForm.reset();
  elements.characterIdInput.value = "";
  elements.characterFormTitle.textContent = "Add character";
  elements.characterCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function editCharacter(id) {
  const character = currentStory()?.charactersList.find((item) => item.id === id);
  if (!character) return;
  elements.characterIdInput.value = character.id;
  elements.characterNameInput.value = character.name;
  elements.characterAgeInput.value = character.age;
  elements.characterRoleInput.value = character.role;
  elements.characterAppearanceInput.value = character.appearance;
  elements.characterPersonalityInput.value = character.personality;
  elements.characterStrengthsInput.value = character.strengths;
  elements.characterWeaknessesInput.value = character.weaknesses;
  elements.characterGoalInput.value = character.goal;
  elements.characterFearInput.value = character.fear;
  elements.characterBackstoryInput.value = character.backstory;
  elements.characterArcInput.value = character.arc;
  elements.characterRelationshipsInput.value = character.relationships;
  elements.characterNotesInput.value = character.notes;
  elements.characterFormTitle.textContent = "Edit character";
  elements.characterCancelEdit.hidden = false;
}

function deleteCharacter(id) {
  const story = currentStory();
  if (!story) return;
  story.charactersList = story.charactersList.filter((character) => character.id !== id);
  story.chapters.forEach((chapter) => {
    chapter.scenes.forEach((scene) => {
      scene.relatedCharacterIds = scene.relatedCharacterIds.filter((characterId) => characterId !== id);
    });
  });
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function saveWorldbuildingEntry() {
  const story = currentStory();
  if (!story) return;
  const existing = story.worldbuilding.find((entry) => entry.id === elements.worldbuildingIdInput.value);
  const entry = existing || { id: crypto.randomUUID() };
  Object.assign(entry, {
    title: elements.worldbuildingTitleInput.value.trim() || "Untitled entry",
    category: elements.worldbuildingCategoryInput.value,
    description: elements.worldbuildingDescriptionInput.value.trim(),
    relatedCharacterIds: readMultiSelectValues(elements.worldbuildingCharactersInput),
    relatedSceneIds: readMultiSelectValues(elements.worldbuildingScenesInput),
    notes: elements.worldbuildingNotesInput.value.trim(),
  });
  if (!existing) story.worldbuilding.push(entry);
  saveCreativeWriting();
  elements.worldbuildingForm.reset();
  elements.worldbuildingIdInput.value = "";
  elements.worldbuildingFormTitle.textContent = "Add notebook entry";
  elements.worldbuildingCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function editWorldbuildingEntry(id) {
  const entry = currentStory()?.worldbuilding.find((item) => item.id === id);
  if (!entry) return;
  elements.worldbuildingIdInput.value = entry.id;
  elements.worldbuildingTitleInput.value = entry.title;
  elements.worldbuildingCategoryInput.value = entry.category;
  elements.worldbuildingDescriptionInput.value = entry.description;
  setMultiSelectValues(elements.worldbuildingCharactersInput, entry.relatedCharacterIds);
  setMultiSelectValues(elements.worldbuildingScenesInput, entry.relatedSceneIds);
  elements.worldbuildingNotesInput.value = entry.notes;
  elements.worldbuildingFormTitle.textContent = "Edit notebook entry";
  elements.worldbuildingCancelEdit.hidden = false;
}

function deleteWorldbuildingEntry(id) {
  const story = currentStory();
  if (!story) return;
  story.worldbuilding = story.worldbuilding.filter((entry) => entry.id !== id);
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function saveTimelineEvent() {
  const story = currentStory();
  if (!story) return;
  const existing = story.timeline.find((entry) => entry.id === elements.timelineIdInput.value);
  const entry = existing || { id: crypto.randomUUID() };
  Object.assign(entry, {
    title: elements.timelineTitleInput.value.trim() || "Untitled event",
    dateOrOrder: elements.timelineDateInput.value.trim(),
    description: elements.timelineDescriptionInput.value.trim(),
    relatedCharacterIds: readMultiSelectValues(elements.timelineCharactersInput),
    relatedSceneIds: readMultiSelectValues(elements.timelineScenesInput),
    type: elements.timelineTypeInput.value.trim(),
  });
  if (!existing) story.timeline.push(entry);
  saveCreativeWriting();
  elements.timelineForm.reset();
  elements.timelineIdInput.value = "";
  elements.timelineFormTitle.textContent = "Add timeline event";
  elements.timelineCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function editTimelineEvent(id) {
  const entry = currentStory()?.timeline.find((item) => item.id === id);
  if (!entry) return;
  elements.timelineIdInput.value = entry.id;
  elements.timelineTitleInput.value = entry.title;
  elements.timelineDateInput.value = entry.dateOrOrder;
  elements.timelineTypeInput.value = entry.type;
  elements.timelineDescriptionInput.value = entry.description;
  setMultiSelectValues(elements.timelineCharactersInput, entry.relatedCharacterIds);
  setMultiSelectValues(elements.timelineScenesInput, entry.relatedSceneIds);
  elements.timelineFormTitle.textContent = "Edit timeline event";
  elements.timelineCancelEdit.hidden = false;
}

function deleteTimelineEvent(id) {
  const story = currentStory();
  if (!story) return;
  story.timeline = story.timeline.filter((entry) => entry.id !== id);
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function saveResearchItem() {
  const story = currentStory();
  if (!story) return;
  const book = ownedByCurrent(books).find((item) => item.id === elements.researchCatalogueSelect.value);
  if (!book) return;
  const existing = story.researchShelf.find((entry) => entry.id === elements.researchIdInput.value);
  const entry = existing || { id: crypto.randomUUID() };
  Object.assign(entry, {
    catalogueItemId: book.id,
    title: book.title,
    author: book.author,
    notes: elements.researchNotesInput.value.trim(),
    tags: parseTagList(elements.researchTagsInput.value),
    chapterId: elements.researchChapterInput.value,
    sceneId: elements.researchSceneInput.value,
  });
  if (!existing) story.researchShelf.push(entry);
  saveCreativeWriting();
  elements.researchForm.reset();
  elements.researchIdInput.value = "";
  elements.researchFormTitle.textContent = "Add to Research Shelf";
  elements.researchCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function editResearchItem(id) {
  const entry = currentStory()?.researchShelf.find((item) => item.id === id);
  if (!entry) return;
  elements.researchIdInput.value = entry.id;
  elements.researchCatalogueSelect.value = entry.catalogueItemId;
  elements.researchTagsInput.value = formatTagList(entry.tags);
  elements.researchChapterInput.value = entry.chapterId || "";
  elements.researchSceneInput.value = entry.sceneId || "";
  elements.researchNotesInput.value = entry.notes || "";
  elements.researchFormTitle.textContent = "Edit Research Shelf item";
  elements.researchCancelEdit.hidden = false;
}

function deleteResearchItem(id) {
  const story = currentStory();
  if (!story) return;
  story.researchShelf = story.researchShelf.filter((entry) => entry.id !== id);
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function insertPinnedResearchItem(id) {
  const entry = currentStory()?.researchShelf.find((item) => item.id === id);
  if (!entry) return;
  insertHtmlIntoWritingDocument(
    sourceCitationHtml({
      kind: entry.sourceType || "note",
      excerpt: entry.excerpt || entry.notes,
      citation: entry.citation || `${entry.title}${entry.author ? ` by ${entry.author}` : ""}`,
    }),
  );
}

function saveQuoteReference() {
  const story = currentStory();
  if (!story) return;
  const existing = story.quoteReferences.find((entry) => entry.id === elements.quoteIdInput.value);
  const entry = existing || { id: crypto.randomUUID() };
  Object.assign(entry, {
    text: elements.quoteTextInput.value.trim(),
    sourceTitle: elements.quoteSourceTitleInput.value.trim(),
    author: elements.quoteAuthorInput.value.trim(),
    page: elements.quotePageInput.value.trim(),
    tags: parseTagList(elements.quoteTagsInput.value),
    chapterId: elements.quoteChapterInput.value,
    sceneId: elements.quoteSceneInput.value,
    personalNote: elements.quoteNoteInput.value.trim(),
  });
  if (!existing) story.quoteReferences.push(entry);
  saveCreativeWriting();
  elements.quoteForm.reset();
  elements.quoteIdInput.value = "";
  elements.quoteFormTitle.textContent = "Save quote or reference";
  elements.quoteCancelEdit.hidden = true;
  renderActiveStoryDetails(story);
}

function editQuoteReference(id) {
  const entry = currentStory()?.quoteReferences.find((item) => item.id === id);
  if (!entry) return;
  elements.quoteIdInput.value = entry.id;
  elements.quoteTextInput.value = entry.text;
  elements.quoteSourceTitleInput.value = entry.sourceTitle;
  elements.quoteAuthorInput.value = entry.author;
  elements.quotePageInput.value = entry.page;
  elements.quoteTagsInput.value = formatTagList(entry.tags);
  elements.quoteChapterInput.value = entry.chapterId || "";
  elements.quoteSceneInput.value = entry.sceneId || "";
  elements.quoteNoteInput.value = entry.personalNote || "";
  elements.quoteFormTitle.textContent = "Edit quote or reference";
  elements.quoteCancelEdit.hidden = false;
}

function deleteQuoteReference(id) {
  const story = currentStory();
  if (!story) return;
  story.quoteReferences = story.quoteReferences.filter((entry) => entry.id !== id);
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function saveWritingGoals() {
  const story = currentStory();
  if (!story) return;
  story.dailyWordGoal = toNumber(elements.writingDailyGoalInput.value);
  story.weeklyWordGoal = toNumber(elements.writingWeeklyGoalInput.value);
  story.projectWordGoal = toNumber(elements.writingProjectGoalInput.value);
  story.deadline = elements.writingDeadlineInput.value;
  saveCreativeWriting();
  renderActiveStoryDetails(story);
}

function generatePrompt() {
  const type = normalizePromptType(elements.promptTypeInput.value);
  const bank = WRITING_PROMPT_BANK[type] || WRITING_PROMPT_BANK.genre;
  currentGeneratedPrompt = bank[Math.floor(Math.random() * bank.length)];
  elements.promptGeneratedText.value = currentGeneratedPrompt;
}

function saveGeneratedPrompt() {
  const story = currentStory();
  if (!story || !currentGeneratedPrompt) return;
  story.prompts.unshift(
    ensurePrompt({
      type: normalizePromptType(elements.promptTypeInput.value),
      text: currentGeneratedPrompt,
      used: false,
      createdAt: new Date().toISOString(),
    }),
  );
  saveCreativeWriting();
  renderPrompts(story);
}

function savePromptEntry() {
  const story = currentStory();
  if (!story) return;
  const existing = story.prompts.find((prompt) => prompt.id === elements.promptIdInput.value);
  const prompt = ensurePrompt(existing || { id: crypto.randomUUID() });
  prompt.type = normalizePromptType(elements.promptCustomTypeInput.value);
  prompt.text = elements.promptTextInput.value.trim();
  prompt.used = elements.promptUsedInput.value === "true";
  if (!existing) story.prompts.unshift(prompt);
  saveCreativeWriting();
  elements.promptForm.reset();
  elements.promptIdInput.value = "";
  elements.promptFormTitle.textContent = "Add custom prompt";
  elements.promptCancelEdit.hidden = true;
  renderPrompts(story);
}

function editPromptEntry(id) {
  const prompt = currentStory()?.prompts.find((item) => item.id === id);
  if (!prompt) return;
  elements.promptIdInput.value = prompt.id;
  elements.promptCustomTypeInput.value = prompt.type;
  elements.promptUsedInput.value = String(Boolean(prompt.used));
  elements.promptTextInput.value = prompt.text;
  elements.promptFormTitle.textContent = "Edit prompt";
  elements.promptCancelEdit.hidden = false;
}

function togglePromptUsed(id) {
  const story = currentStory();
  if (!story) return;
  const prompt = story.prompts.find((item) => item.id === id);
  if (!prompt) return;
  prompt.used = !prompt.used;
  saveCreativeWriting();
  renderPrompts(story);
}

function deletePromptEntry(id) {
  const story = currentStory();
  if (!story) return;
  story.prompts = story.prompts.filter((prompt) => prompt.id !== id);
  saveCreativeWriting();
  renderPrompts(story);
}

function saveRevisionNotes() {
  const story = currentStory();
  if (!story) return;
  story.revisionNotes = elements.storyRevisionNotesInput.value.trim();
  story.continuityNotes = elements.storyContinuityNotesInput.value.trim();
  saveCreativeWriting();
  renderRevision(story);
}

function addRevisionComment() {
  const story = currentStory();
  if (!story) return;
  story.comments.unshift({
    id: crypto.randomUUID(),
    text: elements.revisionCommentInput.value.trim(),
    createdAt: new Date().toISOString(),
  });
  saveCreativeWriting();
  elements.revisionCommentForm.reset();
  renderRevision(story);
}

function restoreStoryVersion(id) {
  const story = currentStory();
  if (!story) return;
  const version = story.versions.find((item) => item.id === id);
  if (!version) return;
  elements.storyDraftInput.innerHTML = version.html;
  elements.storyDraftNotesInput.value = version.notes || "";
  saveOpenStory({ manual: true });
  showToast("Previous version restored.");
}

function updateSceneChecklist(sceneId, key, checked) {
  const story = currentStory();
  if (!story) return;
  const found = findSceneById(story, sceneId);
  if (!found) return;
  found.scene.checklist[key] = checked;
  saveCreativeWriting();
}

function selectedExportChapterIds() {
  return Array.from(
    elements.exportSelectionList.querySelectorAll('input[type="checkbox"]:checked'),
  ).map((input) => input.value);
}

function buildProjectExport(project, format = "txt") {
  const selected = new Set(selectedExportChapterIds());
  const includeFull = selected.has("__full__") || selected.size === 0;
  const selectedChapters = project.chapters
    .slice()
    .sort((first, second) => first.order - second.order)
    .filter((chapter) => includeFull || selected.has(chapter.id));
  if (format === "markdown") {
    return [
      `# ${project.title}`,
      "",
      `- Type: ${project.type}`,
      `- Genre: ${project.genre || "Unspecified"}`,
      `- Status: ${project.status}`,
      "",
      project.description ? `## Premise\n\n${project.description}\n` : "",
      includeFull && project.manuscriptText ? `## Manuscript\n\n${project.manuscriptText}\n` : "",
      selectedChapters
        .map(
          (chapter) => `## Chapter ${chapter.order}: ${chapter.title}\n\n${chapter.summary || ""}\n` +
            chapter.scenes
              .slice()
              .sort((first, second) => first.order - second.order)
              .map(
                (scene) =>
                  `### Scene ${scene.order}: ${scene.title}\n\n${scene.summary || ""}\n`,
              )
              .join("\n"),
        )
        .join("\n"),
      project.notes ? `## Notes\n\n${project.notes}\n` : "",
      project.revisionNotes ? `## Revision Notes\n\n${project.revisionNotes}\n` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    project.title,
    "",
    `Type: ${project.type}`,
    `Genre: ${project.genre || "Unspecified"}`,
    `Status: ${project.status}`,
    "",
    project.description ? `Premise:\n${project.description}\n` : "",
    includeFull && project.manuscriptText ? `Manuscript:\n${project.manuscriptText}\n` : "",
    selectedChapters
      .map(
        (chapter) =>
          `Chapter ${chapter.order}: ${chapter.title}\n${chapter.summary || ""}\n` +
          chapter.scenes
            .slice()
            .sort((first, second) => first.order - second.order)
            .map(
              (scene) =>
                `  Scene ${scene.order}: ${scene.title}\n  ${scene.summary || ""}\n`,
            )
            .join(""),
      )
      .join("\n"),
    project.notes ? `Notes:\n${project.notes}\n` : "",
    project.revisionNotes ? `Revision Notes:\n${project.revisionNotes}\n` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function downloadWritingExport(extension, content, mimeType) {
  const story = currentStory();
  if (!story) return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${story.title || "writing-project"}.${extension}`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportWritingProjectForWord() {
  const story = currentStory();
  if (!story) return;
  saveOpenStory({ manual: true });
  const research = story.researchShelf.length
    ? `<h2>Research references</h2><ul>${story.researchShelf
        .map((entry) => `<li><strong>${escapeHtml(entry.title)}</strong>${entry.author ? ` by ${escapeHtml(entry.author)}` : ""}${entry.citation ? `<br>${escapeHtml(entry.citation)}` : ""}</li>`)
        .join("")}</ul>`
    : "";
  const documentHtml = `<!doctype html>
    <html><head><meta charset="utf-8"><title>${escapeHtml(story.title)}</title>
    <style>body{font:12pt/1.6 Georgia,serif;margin:1in;color:#172a22}h1,h2,h3{font-family:Georgia,serif}blockquote{border-left:3px solid #c98945;padding-left:1em;color:#435249}.writing-page-break{page-break-after:always}</style>
    </head><body><h1>${escapeHtml(story.title)}</h1>${story.manuscriptHtml || ""}${research}</body></html>`;
  downloadWritingExport(
    "doc",
    documentHtml,
    "application/msword;charset=utf-8",
  );
}

function resetWordhubForm() {
  elements.wordhubForm.reset();
  elements.wordhubIdInput.value = "";
  elements.wordhubWordInput.setCustomValidity("");
  elements.wordhubFormTitle.textContent = "Add a word";
  elements.wordhubCancelEdit.hidden = true;
  elements.wordhubForm.querySelector(".submit-button").textContent = "Save word";
  elements.wordhubLookupStatus.textContent =
    "Uses online dictionary services. Review and adapt the result before saving.";
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
        entry.page,
        entry.sentence,
      ]
        .map((value) => normalize(value))
        .join(" ");
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
  elements.wordhubWordInput.setCustomValidity("");
  elements.wordhubFormTitle.textContent = "Edit word";
  elements.wordhubCancelEdit.hidden = false;
  elements.wordhubForm.querySelector(".submit-button").textContent =
    "Save changes";
  elements.wordhubLookupStatus.textContent =
    "Look up this word again to refresh its definition, or edit it manually.";
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

function normalizedHabitDates(habit) {
  return [...new Set((Array.isArray(habit?.logDates) ? habit.logDates : [])
    .map((value) => String(value || "").slice(0, 10))
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value)))]
    .sort();
}

function habitStreakStats(habit) {
  const dates = normalizedHabitDates(habit);
  if (!dates.length) return { current: 0, best: 0, total: 0 };
  const dateSet = new Set(dates);
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  if (!dateSet.has(localDateString(cursor))) cursor.setDate(cursor.getDate() - 1);
  let current = 0;
  while (dateSet.has(localDateString(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  let best = 0;
  let run = 0;
  let previous = null;
  dates.forEach((dateString) => {
    const date = new Date(`${dateString}T12:00:00`);
    const gap = previous ? Math.round((date - previous) / 86_400_000) : 0;
    run = !previous || gap === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = date;
  });
  return { current, best, total: dates.length };
}

function habitAccent(category) {
  return {
    Wellbeing: "#c15d6d",
    Movement: "#d07a3d",
    Mindfulness: "#7868a9",
    Learning: "#3b7480",
    Creativity: "#ad5f45",
    Home: "#8a7149",
    Connection: "#a95778",
    Other: "#65766a",
  }[category] || "#65766a";
}

function renderLifestyle() {
  if (!currentAccount) return;
  const habits = ownedByCurrent(lifestyleHabits).sort((first, second) =>
    String(first.name).localeCompare(String(second.name), undefined, {
      sensitivity: "base",
    }),
  );
  const days = getLastSevenDays();
  const today = days.at(-1)?.date || localDateString(new Date());
  const weekDates = new Set(days.map((day) => day.date));
  const todayCount = habits.filter((habit) =>
    normalizedHabitDates(habit).includes(today),
  ).length;
  const weekCount = habits.reduce(
    (total, habit) =>
      total + normalizedHabitDates(habit).filter((date) => weekDates.has(date)).length,
    0,
  );
  const possible = habits.reduce((total, habit) => {
    const createdDate = String(habit.createdAt || "").slice(0, 10);
    const eligibleDays = createdDate
      ? days.filter((day) => day.date >= createdDate).length
      : days.length;
    return total + Math.max(1, eligibleDays);
  }, 0);
  elements.lifestyleHabitCount.textContent = habits.length;
  elements.lifestyleTodayCount.textContent = todayCount;
  elements.lifestyleWeekCount.textContent = weekCount;
  elements.lifestyleRate.textContent = `${possible ? Math.round((weekCount / possible) * 100) : 0}%`;
  elements.habitGrid.innerHTML = habits
    .map((habit) => {
      const dates = normalizedHabitDates(habit);
      const dateSet = new Set(dates);
      const stats = habitStreakStats(habit);
      const completedToday = dateSet.has(today);
      return `
        <article class="habit-card${completedToday ? " completed-today" : ""}" style="--habit-accent: ${habitAccent(habit.category)}">
          <div class="habit-card-heading">
            <div>
              <p class="habit-category">${escapeHtml(habit.category || "Other")}</p>
              <h3>${escapeHtml(habit.name)}</h3>
            </div>
            <div class="habit-card-actions">
              <button type="button" data-habit-action="edit" data-id="${habit.id}">Edit</button>
              <button type="button" data-habit-action="delete" data-id="${habit.id}">Remove</button>
            </div>
          </div>
          ${habit.intention ? `<p class="habit-intention">${escapeHtml(habit.intention)}</p>` : ""}
          <div class="habit-metrics">
            <div><strong>${stats.current}</strong><span>Current streak</span></div>
            <div><strong>${stats.best}</strong><span>Best streak</span></div>
            <div><strong>${stats.total}</strong><span>Total check-ins</span></div>
          </div>
          <div class="habit-week" aria-label="Last seven days">
            ${days.map((day) => `
              <div class="habit-day${dateSet.has(day.date) ? " complete" : ""}${day.date === today ? " today" : ""}" title="${escapeHtml(formatDate(day.date))}: ${dateSet.has(day.date) ? "complete" : "not logged"}">
                <span>${escapeHtml(day.label.slice(0, 1))}</span>
                <i aria-hidden="true">${dateSet.has(day.date) ? "&#10003;" : ""}</i>
              </div>
            `).join("")}
          </div>
          <button class="habit-check-button${completedToday ? " logged" : ""}" type="button" data-habit-action="toggle" data-id="${habit.id}" aria-pressed="${completedToday}">
            <span aria-hidden="true">${completedToday ? "&#10003;" : "&hearts;"}</span>
            ${completedToday ? "Logged today - undo" : "Log today"}
          </button>
        </article>
      `;
    })
    .join("");
  elements.habitGrid.hidden = habits.length === 0;
  elements.habitEmpty.hidden = habits.length > 0;
}

function openHabitForm(id = "") {
  elements.habitForm.reset();
  elements.habitIdInput.value = "";
  elements.habitFormTitle.textContent = "Add a habit";
  elements.habitForm.querySelector(".submit-button").textContent = "Save habit";
  if (id) {
    const habit = lifestyleHabits.find(
      (item) => item.id === id && item.ownerId === currentAccount?.id,
    );
    if (!habit) return;
    elements.habitIdInput.value = habit.id;
    elements.habitNameInput.value = habit.name;
    elements.habitCategoryInput.value = habit.category || "Other";
    elements.habitIntentionInput.value = habit.intention || "";
    elements.habitFormTitle.textContent = "Edit habit";
    elements.habitForm.querySelector(".submit-button").textContent = "Save changes";
  }
  updateHabitDialogTheme();
  elements.habitDialog.showModal();
  elements.habitNameInput.focus();
}

function updateHabitDialogTheme() {
  const category = elements.habitCategoryInput.value || "Wellbeing";
  elements.habitDialog.style.setProperty(
    "--habit-dialog-accent",
    habitAccent(category),
  );
  elements.habitDialogCategoryLabel.textContent = category;
}

function saveHabitFromForm() {
  const id = elements.habitIdInput.value;
  const name = elements.habitNameInput.value.trim();
  const duplicate = ownedByCurrent(lifestyleHabits).find(
    (habit) => normalize(habit.name) === normalize(name) && habit.id !== id,
  );
  if (duplicate) {
    elements.habitNameInput.setCustomValidity("You are already tracking a habit with this name.");
    elements.habitNameInput.reportValidity();
    return;
  }
  elements.habitNameInput.setCustomValidity("");
  const previous = lifestyleHabits.find(
    (habit) => habit.id === id && habit.ownerId === currentAccount?.id,
  );
  const habit = {
    id: previous?.id || crypto.randomUUID(),
    ownerId: currentAccount.id,
    name,
    category: elements.habitCategoryInput.value,
    intention: elements.habitIntentionInput.value.trim(),
    logDates: normalizedHabitDates(previous),
    createdAt: previous?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  lifestyleHabits = previous
    ? lifestyleHabits.map((item) => (item.id === habit.id ? habit : item))
    : [habit, ...lifestyleHabits];
  saveLifestyleHabits();
  renderLifestyle();
  elements.habitDialog.close();
  showToast(previous ? `"${habit.name}" updated.` : `"${habit.name}" added to Lifestyle.`);
}

function deleteHabit(id) {
  const habit = lifestyleHabits.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!habit) return;
  lifestyleHabits = lifestyleHabits.filter((item) => item.id !== id);
  saveLifestyleHabits();
  renderLifestyle();
  showToast(`"${habit.name}" removed.`);
}

function animateHabitRewardCount(from, to) {
  window.cancelAnimationFrame(habitRewardCounterAnimation);
  const started = performance.now();
  const tick = (now) => {
    const progress = Math.min(1, (now - started) / 780);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + (to - from) * eased);
    elements.habitRewardCount.textContent = value;
    elements.habitHeartCount.textContent = value;
    if (progress < 1) habitRewardCounterAnimation = requestAnimationFrame(tick);
  };
  habitRewardCounterAnimation = requestAnimationFrame(tick);
}

function showHabitReward(habit, previousStreak) {
  const stats = habitStreakStats(habit);
  elements.habitRewardName.textContent = habit.name;
  elements.habitRewardTotal.textContent = stats.total;
  elements.habitRewardCount.textContent = previousStreak;
  elements.habitHeartCount.textContent = previousStreak;
  elements.habitRewardDialog.classList.remove("celebrating");
  void elements.habitRewardDialog.offsetWidth;
  document.body.classList.add("habit-celebration-open");
  elements.habitRewardDialog.showModal();
  window.requestAnimationFrame(() => {
    elements.habitRewardDialog.classList.add("celebrating");
    animateHabitRewardCount(previousStreak, stats.current);
  });
}

function toggleHabitToday(id) {
  const habit = lifestyleHabits.find(
    (item) => item.id === id && item.ownerId === currentAccount?.id,
  );
  if (!habit) return;
  const today = localDateString(new Date());
  const dates = normalizedHabitDates(habit);
  const wasLogged = dates.includes(today);
  const previousStreak = habitStreakStats(habit).current;
  habit.logDates = wasLogged
    ? dates.filter((date) => date !== today)
    : [...dates, today].sort();
  habit.updatedAt = new Date().toISOString();
  saveLifestyleHabits();
  renderLifestyle();
  if (wasLogged) {
    showToast(`Today's check-in for "${habit.name}" was undone.`);
  } else {
    showHabitReward(habit, previousStreak);
  }
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

function dreamWordCount(dream) {
  return String(dream.dream || "")
    .split(/\s+/)
    .filter(Boolean).length;
}

function dreamEmotionalTone(text) {
  const toneSets = [
    {
      label: "fear, threat, or pressure",
      words: ["afraid", "fear", "panic", "chase", "attack", "danger", "hide", "trapped"],
    },
    {
      label: "loss, grief, or separation",
      words: ["lost", "death", "dead", "missing", "alone", "abandoned", "cry", "grief"],
    },
    {
      label: "wonder, mystery, or sacred charge",
      words: ["light", "temple", "holy", "ancient", "glowing", "magic", "vast", "voice"],
    },
    {
      label: "movement, change, or transition",
      words: ["road", "door", "bridge", "train", "car", "travel", "arrive", "leave"],
    },
    {
      label: "conflict, judgement, or resistance",
      words: ["fight", "argue", "judge", "court", "test", "fail", "angry", "refuse"],
    },
  ];
  return toneSets
    .map((tone) => ({
      label: tone.label,
      score: keywordScore(text, tone.words, 2),
    }))
    .filter((tone) => tone.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 3);
}

function dreamPatternFlags(text, dream) {
  const patterns = [
    {
      title: "Threshold imagery",
      detail: "Doors, bridges, roads, gates, travel, or borders may point to a transition between old and new attitudes.",
      words: ["door", "gate", "bridge", "road", "path", "border", "threshold", "airport", "station"],
    },
    {
      title: "Shadow material",
      detail: "Pursuers, hidden rooms, shame, monsters, or rejected figures may invite careful attention to disowned qualities.",
      words: ["shadow", "monster", "dark", "hide", "secret", "forbidden", "enemy", "chase"],
    },
    {
      title: "Complex activation",
      detail: "Strong family, authority, school, failure, or humiliation imagery can suggest an emotionally charged complex.",
      words: ["mother", "father", "teacher", "boss", "school", "exam", "fail", "humiliation"],
    },
    {
      title: "Self or wholeness motif",
      detail: "Circles, centres, mandalas, trees, stars, sacred buildings, or guiding figures can suggest a regulating image of wholeness.",
      words: ["circle", "centre", "center", "mandala", "tree", "star", "temple", "guide", "wise"],
    },
    {
      title: "Embodied instinct",
      detail: "Animals, hunger, water, weather, injury, or bodily sensation may ask what instinctive life is trying to express.",
      words: ["animal", "water", "blood", "body", "hunger", "storm", "fire", "snake", "wolf"],
    },
  ];
  const suppliedNotes = [dream.archetypes, dream.motifs, dream.symbols].filter(Boolean).length;
  return patterns
    .map((pattern) => ({
      ...pattern,
      score: keywordScore(text, pattern.words, 2) + suppliedNotes,
    }))
    .filter((pattern) => pattern.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 4);
}

function dreamCategoryReason(key, dream, text) {
  const wordCount = dreamWordCount(dream);
  const reasons = {
    compensatory: "The dream may be balancing the conscious attitude by presenting neglected, opposite, hidden, or emotionally uncomfortable material.",
    prospective: "The dream may be sketching a direction of development through travel, thresholds, choices, or images of future movement.",
    big: "The dream carries possible archetypal weight when its images feel numinous, mythic, cosmic, ancient, sacred, or unusually memorable.",
    reductive: "The dream may be drawing attention back to a personal complex, wound, fear, humiliation, or unresolved pattern.",
    prophetic: "This category only marks prophecy-like feeling or later resemblance; it does not verify prediction.",
  };
  if (key === "big" && wordCount > 250) {
    return `${reasons[key]} Its length and detail also suggest the image may deserve slow amplification.`;
  }
  if (key === "compensatory" && text.includes("shadow")) {
    return `${reasons[key]} The explicit shadow language makes this especially worth approaching with patience.`;
  }
  return reasons[key] || "This is a tentative interpretive lens.";
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
      reason: dreamCategoryReason(key, dream, text),
      note:
        key === "prophetic"
          ? "This describes a felt resemblance to events, not evidence that a dream predicts the future."
          : "",
    }))
    .sort((first, second) => second.score - first.score);
  const primary = categories[0];
  const images = uniqueDreamImages(dream);
  const tones = dreamEmotionalTone(text);
  const patterns = dreamPatternFlags(text, dream);
  const wordCount = dreamWordCount(dream);
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
    complexity: {
      wordCount,
      suppliedSymbolCount: uniqueDreamImages(dream).length,
      toneLabels: tones.map((tone) => tone.label),
      patternCount: patterns.length,
    },
    overview: `The strongest available lens is ${primary.label.toLocaleLowerCase()}, but this is a ${primary.likelihood}, not a classification. ${contextNote}`,
    amplification: images.length
      ? `Images worth amplifying through your own memories, cultural associations, stories, and art include ${images.join(", ")}.`
      : "Choose the images with the strongest emotional charge and write your personal associations before consulting general symbol traditions.",
    symbolicClusters: patterns.map((pattern) => ({
      title: pattern.title,
      detail: pattern.detail,
    })),
    emotionalTone: tones.length
      ? tones.map((tone) => tone.label)
      : ["unclear from wording; use your felt memory of the dream as the guide"],
    possibleTensions: [
      "What the conscious self says it wants versus what the dream image seems to demand.",
      "The social role or persona in waking life versus the less acceptable or less developed figure in the dream.",
      "Safety, control, and habit versus movement toward uncertainty, change, or enlargement.",
    ],
    integrationPractices: [
      "Write five personal associations for the most charged image before consulting any guide.",
      "Give the strongest dream figure a short voice in a dialogue, then answer it as yourself.",
      "Choose one small waking action that honours the dream symbolically without treating it as a command.",
    ],
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
      <div class="dream-analysis-metrics">
        <span><strong>${Number(analysis.complexity?.wordCount || 0)}</strong> words recorded</span>
        <span><strong>${Number(analysis.complexity?.suppliedSymbolCount || 0)}</strong> noted images</span>
        <span><strong>${Number(analysis.complexity?.patternCount || 0)}</strong> symbolic clusters</span>
      </div>
      <p><strong>Amplification:</strong> ${escapeHtml(analysis.amplification)}</p>
      <div class="dream-analysis-deep-grid">
        <section>
          <strong>Emotional tone</strong>
          <ul>${(analysis.emotionalTone || [])
            .map((tone) => `<li>${escapeHtml(tone)}</li>`)
            .join("")}</ul>
        </section>
        <section>
          <strong>Symbolic clusters</strong>
          <ul>${(analysis.symbolicClusters || [])
            .map((cluster) => `<li><b>${escapeHtml(cluster.title)}:</b> ${escapeHtml(cluster.detail)}</li>`)
            .join("") || "<li>No strong cluster detected; begin with personal associations.</li>"}</ul>
        </section>
        <section>
          <strong>Possible inner tensions</strong>
          <ul>${(analysis.possibleTensions || [])
            .map((tension) => `<li>${escapeHtml(tension)}</li>`)
            .join("")}</ul>
        </section>
        <section>
          <strong>Integration practices</strong>
          <ul>${(analysis.integrationPractices || [])
            .map((practice) => `<li>${escapeHtml(practice)}</li>`)
            .join("")}</ul>
        </section>
      </div>
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

function printReadingAnalytics() {
  const accountLog = ownedByCurrent(readingLog);
  ensureReadingAnalyticsRange(accountLog);
  const scope = readingAnalyticsScope(accountLog, readingAnalyticsRange);
  const entries = scope.entries;
  const totalPages = entries.reduce(
    (total, entry) => total + (Number(entry.pagesRead) || 0),
    0,
  );
  const totalMinutes = entries.reduce(
    (total, entry) => total + (Number(entry.durationMinutes) || 0),
    0,
  );
  const sessionCount = entries.length;
  const paceValues = entries
    .filter((entry) => Number(entry.durationMinutes) > 0 && Number(entry.pagesRead) > 0)
    .map((entry) => Math.round(((Number(entry.pagesRead) || 0) / Number(entry.durationMinutes)) * 60));
  const averagePace = totalMinutes
    ? Math.round((totalPages / totalMinutes) * 60)
    : 0;
  const medianPace = medianNumber(paceValues);
  const activeDays = new Set(entries.map((entry) => entry.date)).size;
  const byBook = summarizeReadingLogByBook(entries);
  const pagesByBook = Object.values(byBook)
    .sort((first, second) => second.pages - first.pages)
    .slice(0, 8);
  const pagesByGenre = sortedTotals(entries.reduce((totals, entry) => {
    const book = bookForLogEntry(entry);
    const genre = book?.genre || "Unmatched log entries";
    totals[genre] = (totals[genre] || 0) + (Number(entry.pagesRead) || 0);
    return totals;
  }, {})).slice(0, 8);
  const chartSelect = elements.readingChartPanel?.querySelector("#reading-analytics-chart-type");
  const selectedChart = elements.readingChartPanel?.querySelector(
    ".reading-selected-chart .reading-chart-card",
  );
  const chartLabel = chartSelect?.selectedOptions?.[0]?.textContent || "Reading graph";
  const chartHtml = selectedChart?.outerHTML || printEmpty("No graph is available for this period.");
  const previousTitle = document.title;
  elements.printSheet.innerHTML = `
    <header>
      <p>MY LIBRARY</p>
      <h1>Reading Analytics</h1>
      <span>${escapeHtml(currentAccount?.username || "Reader")} / ${escapeHtml(scope.label)} / Printed ${escapeHtml(new Date().toLocaleDateString())}</span>
    </header>
    <main>
      <article>
        <h2>Summary</h2>
        <p class="print-meta">${sessionCount.toLocaleString()} sessions / ${totalPages.toLocaleString()} pages / ${formatDuration(totalMinutes)} total reading time</p>
        <p>Average pace: ${averagePace ? `${averagePace} pages per hour` : "not enough data"}. Median speed: ${medianPace ? `${medianPace} pages per hour` : "not enough data"}. Active reading days: ${activeDays.toLocaleString()}.</p>
      </article>
      <article>
        <h2>${escapeHtml(chartLabel)}</h2>
        <div class="print-reading-chart">${chartHtml}</div>
      </article>
      <article>
        <h2>Top Books</h2>
        ${
          pagesByBook.length
            ? `<ol>${pagesByBook.map((book) => `<li><strong>${escapeHtml(book.title)}</strong><span>${book.pages.toLocaleString()} pages / ${formatDuration(book.minutes)} / ${book.sessions} ${book.sessions === 1 ? "session" : "sessions"}</span></li>`).join("")}</ol>`
            : printEmpty("No book-specific data in this period.")
        }
      </article>
      <article>
        <h2>Genre Pattern</h2>
        ${
          pagesByGenre.length
            ? `<ol>${pagesByGenre.map(([genre, pages]) => `<li><strong>${escapeHtml(genre)}</strong><span>${pages.toLocaleString()} pages</span></li>`).join("")}</ol>`
            : printEmpty("No genre data in this period.")
        }
      </article>
    </main>
  `;
  elements.printSheet.setAttribute("aria-hidden", "false");
  document.title = `${scope.label} Reading Analytics - My Library`;
  const cleanUp = () => {
    document.title = previousTitle;
    elements.printSheet.setAttribute("aria-hidden", "true");
    window.removeEventListener("afterprint", cleanUp);
  };
  window.addEventListener("afterprint", cleanUp);
  window.print();
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
            (storyItem) => {
              const story = ensureWritingProject(storyItem);
              return `
              <article>
                <h2>${escapeHtml(story.title || "Untitled project")}</h2>
                <p class="print-meta">${escapeHtml(story.type || "Project")} / ${escapeHtml(story.genre || "Unspecified genre")} / ${escapeHtml(story.status || "planning")} / ${currentStoryWordCount(story)} words</p>
                ${story.description ? `<p><strong>Premise:</strong> ${escapeHtml(story.description)}</p>` : ""}
                ${story.notes ? `<p><strong>Notes:</strong> ${escapeHtml(story.notes)}</p>` : ""}
              </article>
            `;
            },
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

function printCurrentWritingProject() {
  const story = currentStory();
  if (!story) return;
  const previousTitle = document.title;
  const markdownLike = buildProjectExport(story, "txt")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
  elements.printSheet.innerHTML = `
    <header>
      <p>MY LIBRARY</p>
      <h1>${escapeHtml(story.title)}</h1>
      <span>${escapeHtml(currentAccount?.username || "Reader")} / Printed ${escapeHtml(new Date().toLocaleDateString())}</span>
    </header>
    <main>${markdownLike}</main>
  `;
  elements.printSheet.setAttribute("aria-hidden", "false");
  document.title = `${story.title} - My Library`;
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
              ${renderBookProgress(book)}
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
  .addEventListener("click", () => createStory());
document
  .querySelector("#empty-new-story-button")
  .addEventListener("click", () => createStory());
elements.newJournalDocumentButton.addEventListener("click", createJournalDocument);
elements.openResearchLibraryButton.addEventListener("click", revealWritingResearchLibrary);
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

elements.writingProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProjectOverview();
});

elements.storyEditor.addEventListener("input", (event) => {
  if (!currentStory()) return;
  if (
    event.target === elements.storyDraftInput ||
    event.target === elements.storyDraftNotesInput ||
    event.target.closest("#story-manuscript-view")
  ) {
    scheduleStorySave();
  }
});

elements.storyEditor.addEventListener("change", (event) => {
  if (!currentStory()) return;
  if (event.target.closest("#story-overview-view")) {
    elements.storySaveStatus.textContent = "Overview changed";
  }
  if (event.target.closest("#story-manuscript-view")) {
    scheduleStorySave();
  }
});

elements.storyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-story-id]");
  if (button) {
    saveOpenStory();
    currentWritingView = "manuscript";
    openStory(button.dataset.storyId);
    setWritingView("manuscript");
  }
});

document.querySelectorAll("[data-writing-view]").forEach((button) => {
  button.addEventListener("click", () => {
    setWritingView(button.dataset.writingView);
  });
});
document.querySelectorAll("[data-format-action]").forEach((button) => {
  button.addEventListener("click", () => {
    applyWritingFormat(
      button.dataset.formatAction,
      button.dataset.formatValue || null,
    );
  });
});
document.querySelectorAll("[data-writing-ribbon]").forEach((button) => {
  button.addEventListener("click", () => setWritingRibbon(button.dataset.writingRibbon));
});
document.querySelectorAll("[data-word-window-action]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.wordWindowAction === "focus") toggleWritingFocusMode();
    if (button.dataset.wordWindowAction === "zoom-out") updateWritingZoom(writingZoom - 10);
    if (button.dataset.wordWindowAction === "zoom-in") updateWritingZoom(writingZoom + 10);
  });
});
document.querySelectorAll("[data-word-command]").forEach((button) => {
  button.addEventListener("click", () => runWritingFileCommand(button.dataset.wordCommand));
});
elements.writingStyleSelect.addEventListener("change", () => {
  applyWritingFormat("formatBlock", elements.writingStyleSelect.value);
});
elements.writingFontSelect.addEventListener("change", () => {
  applyWritingFormat("fontName", elements.writingFontSelect.value);
});
elements.writingSizeSelect.addEventListener("change", () => {
  applyWritingFormat("fontSize", elements.writingSizeSelect.value);
});
elements.writingTextColour.addEventListener("input", () => {
  applyWritingFormat("foreColor", elements.writingTextColour.value);
});
elements.writingHighlightColour.addEventListener("input", () => {
  applyWritingFormat("hiliteColor", elements.writingHighlightColour.value);
});
elements.writingLinkButton.addEventListener("click", addWritingLink);
elements.writingResearchLinkButton.addEventListener("click", openWritingResearchLinkDialog);
elements.writingOpenResearchButton.addEventListener("click", revealWritingResearchLibrary);
document
  .querySelector("#close-writing-link-button")
  .addEventListener("click", () => elements.writingLinkDialog.close());
elements.writingLinkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyWritingResearchLink();
});
elements.writingLinkSearch.addEventListener("input", renderWritingLinkResults);
elements.writingLinkFilter.addEventListener("change", renderWritingLinkResults);
elements.writingLinkResults.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');
  if (!checkbox) return;
  if (checkbox.checked) writingLinkSelectedKeys.add(checkbox.value);
  else writingLinkSelectedKeys.delete(checkbox.value);
  elements.writingLinkError.textContent = "";
});
elements.removeWritingLinkButton.addEventListener("click", removeWritingResearchLink);
elements.writingLinkDialog.addEventListener("close", () => {
  writingLinkRange = null;
  writingLinkAnchor = null;
  writingLinkSelectedKeys = new Set();
});
elements.writingRuleButton.addEventListener("click", () =>
  applyWritingFormat("insertHorizontalRule"),
);
elements.writingPageBreakButton.addEventListener("click", insertWritingPageBreak);
elements.writingInsertDateButton.addEventListener("click", insertWritingDateTime);
elements.writingInsertTableButton.addEventListener("click", insertWritingTable);
[elements.writingMarginSelect, elements.writingOrientationSelect, elements.writingLineSpacingSelect]
  .forEach((control) => {
    control.addEventListener("change", () => applyWritingDocumentLayout(currentStory(), true));
  });
elements.writingFindNextButton.addEventListener("click", findNextInWritingDocument);
elements.writingReplaceButton.addEventListener("click", replaceCurrentWritingMatch);
elements.writingReplaceAllButton.addEventListener("click", replaceAllWritingMatches);
elements.writingFindInput.addEventListener("input", () => {
  writingFindCursor = 0;
});
elements.writingZoomOut.addEventListener("click", () => updateWritingZoom(writingZoom - 10));
elements.writingZoomIn.addEventListener("click", () => updateWritingZoom(writingZoom + 10));
elements.publishJournalButton.addEventListener("click", publishJournalDocument);
document.addEventListener("selectionchange", rememberWritingSelection);
elements.storyDraftInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "s") {
    event.preventDefault();
    saveOpenStory({ manual: true });
    showToast("Document saved.");
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "f") {
    event.preventDefault();
    elements.writingFindInput.focus();
    elements.writingFindInput.select();
  }
});

elements.storySearchInput.addEventListener("input", renderStories);
elements.storySortInput.addEventListener("change", renderStories);
elements.storyStatusFilter.addEventListener("change", renderStories);
elements.storyManualSaveButton.addEventListener("click", () =>
  saveOpenStory({ manual: true }),
);
elements.storyFocusButton.addEventListener("click", toggleWritingFocusMode);
elements.storyManuscriptSearchInput.addEventListener("input", () =>
  renderManuscriptInsights(),
);
elements.storyDraftInput.addEventListener("input", () => renderManuscriptInsights());
elements.storyDraftInput.addEventListener("keydown", () => {
  window.clearTimeout(storySaveTimer);
});
elements.storyDraftInput.addEventListener("click", (event) => {
  const link = event.target.closest("a.writing-research-link");
  if (!link) return;
  event.preventDefault();
  showWritingLinkPopover(link);
});
elements.storyDraftInput.addEventListener("mouseover", (event) => {
  const link = event.target.closest("a.writing-research-link");
  if (!link) return;
  window.clearTimeout(writingLinkPopoverTimer);
  writingLinkPopoverTimer = window.setTimeout(() => showWritingLinkPopover(link), 280);
});
elements.storyDraftInput.addEventListener("mouseout", (event) => {
  const link = event.target.closest("a.writing-research-link");
  if (!link || link.contains(event.relatedTarget)) return;
  writingLinkPopoverTimer = window.setTimeout(closeWritingLinkPopover, 320);
});
elements.writingLinkPopover.addEventListener("mouseenter", () => {
  window.clearTimeout(writingLinkPopoverTimer);
});
elements.writingLinkPopover.addEventListener("mouseleave", () => {
  writingLinkPopoverTimer = window.setTimeout(closeWritingLinkPopover, 320);
});
elements.writingLinkPopover.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-writing-link-action]");
  if (!button) return;
  const action = button.dataset.writingLinkAction;
  if (action === "close") closeWritingLinkPopover();
  if (action === "open") {
    closeWritingLinkPopover();
    openWritingResearchSource(button.dataset.key);
  }
  if (action === "summarize") summarizeWritingLinkSource(button.dataset.key);
});
elements.duplicateStoryButton.addEventListener("click", duplicateOpenStory);

elements.chapterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.chapterForm.reportValidity()) saveChapter();
});
elements.chapterCancelEdit.addEventListener("click", () => {
  elements.chapterForm.reset();
  elements.chapterIdInput.value = "";
  elements.chapterFormTitle.textContent = "Add chapter";
  elements.chapterCancelEdit.hidden = true;
});
elements.chapterList.addEventListener("click", (event) => {
  const chapterButton = event.target.closest("button[data-chapter-action]");
  if (chapterButton) {
    const { chapterAction, id } = chapterButton.dataset;
    if (chapterAction === "edit") editChapter(id);
    if (chapterAction === "up") moveChapter(id, -1);
    if (chapterAction === "down") moveChapter(id, 1);
    if (chapterAction === "delete") deleteChapter(id);
    return;
  }
  const sceneButton = event.target.closest("button[data-scene-action]");
  if (!sceneButton) return;
  const { sceneAction, id, chapterId } = sceneButton.dataset;
  if (sceneAction === "edit") editScene(id);
  if (sceneAction === "up") moveScene(chapterId, id, -1);
  if (sceneAction === "down") moveScene(chapterId, id, 1);
  if (sceneAction === "delete") deleteScene(id);
});

elements.sceneForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.sceneForm.reportValidity()) saveScene();
});
elements.sceneCancelEdit.addEventListener("click", () => {
  elements.sceneForm.reset();
  elements.sceneIdInput.value = "";
  elements.sceneFormTitle.textContent = "Add scene";
  elements.sceneCancelEdit.hidden = true;
});
elements.writingTagFilterInput.addEventListener("input", () => renderChapterList());

elements.characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.characterForm.reportValidity()) saveCharacter();
});
elements.characterCancelEdit.addEventListener("click", () => {
  elements.characterForm.reset();
  elements.characterIdInput.value = "";
  elements.characterFormTitle.textContent = "Add character";
  elements.characterCancelEdit.hidden = true;
});
elements.characterList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-character-action]");
  if (!button) return;
  if (button.dataset.characterAction === "edit") editCharacter(button.dataset.id);
  if (button.dataset.characterAction === "delete") deleteCharacter(button.dataset.id);
});

elements.worldbuildingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.worldbuildingForm.reportValidity()) saveWorldbuildingEntry();
});
elements.worldbuildingCancelEdit.addEventListener("click", () => {
  elements.worldbuildingForm.reset();
  elements.worldbuildingIdInput.value = "";
  elements.worldbuildingFormTitle.textContent = "Add notebook entry";
  elements.worldbuildingCancelEdit.hidden = true;
});
elements.worldbuildingList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-worldbuilding-action]");
  if (!button) return;
  if (button.dataset.worldbuildingAction === "edit") {
    editWorldbuildingEntry(button.dataset.id);
  }
  if (button.dataset.worldbuildingAction === "delete") {
    deleteWorldbuildingEntry(button.dataset.id);
  }
});

elements.timelineForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.timelineForm.reportValidity()) saveTimelineEvent();
});
elements.timelineCancelEdit.addEventListener("click", () => {
  elements.timelineForm.reset();
  elements.timelineIdInput.value = "";
  elements.timelineFormTitle.textContent = "Add timeline event";
  elements.timelineCancelEdit.hidden = true;
});
elements.timelineList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-timeline-action]");
  if (!button) return;
  if (button.dataset.timelineAction === "edit") editTimelineEvent(button.dataset.id);
  if (button.dataset.timelineAction === "delete") deleteTimelineEvent(button.dataset.id);
});

elements.researchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.researchForm.reportValidity()) saveResearchItem();
});
elements.researchCancelEdit.addEventListener("click", () => {
  elements.researchForm.reset();
  elements.researchIdInput.value = "";
  elements.researchFormTitle.textContent = "Add to Research Shelf";
  elements.researchCancelEdit.hidden = true;
});
elements.researchList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-research-action]");
  if (!button) return;
  if (button.dataset.researchAction === "edit") editResearchItem(button.dataset.id);
  if (button.dataset.researchAction === "delete") deleteResearchItem(button.dataset.id);
  if (button.dataset.researchAction === "insert-pinned") {
    insertPinnedResearchItem(button.dataset.id);
  }
  if (button.dataset.researchAction === "open-book") {
    focusCollectionBook(button.dataset.bookId);
  }
});
elements.researchLibrarySearch.addEventListener("input", () => renderResearchLibrary());
elements.researchLibraryFilter.addEventListener("change", () => renderResearchLibrary());
elements.researchLibraryResults.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-library-research-action]");
  if (!button) return;
  const action = button.dataset.libraryResearchAction;
  const key = button.dataset.key;
  if (action === "insert") insertResearchSource(key);
  if (action === "pin") pinResearchSource(key);
  if (action === "import-journal") importJournalAsDocument(key);
  if (action === "open-source") openWritingResearchSource(key);
});

elements.quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.quoteForm.reportValidity()) saveQuoteReference();
});
elements.quoteCancelEdit.addEventListener("click", () => {
  elements.quoteForm.reset();
  elements.quoteIdInput.value = "";
  elements.quoteFormTitle.textContent = "Save quote or reference";
  elements.quoteCancelEdit.hidden = true;
});
elements.quoteList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-quote-action]");
  if (!button) return;
  if (button.dataset.quoteAction === "edit") editQuoteReference(button.dataset.id);
  if (button.dataset.quoteAction === "delete") deleteQuoteReference(button.dataset.id);
});

elements.writingGoalsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveWritingGoals();
});

elements.generatePromptButton.addEventListener("click", generatePrompt);
elements.saveGeneratedPromptButton.addEventListener("click", saveGeneratedPrompt);
elements.promptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.promptForm.reportValidity()) savePromptEntry();
});
elements.promptCancelEdit.addEventListener("click", () => {
  elements.promptForm.reset();
  elements.promptIdInput.value = "";
  elements.promptFormTitle.textContent = "Add custom prompt";
  elements.promptCancelEdit.hidden = true;
});
elements.promptList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-prompt-action]");
  if (!button) return;
  if (button.dataset.promptAction === "edit") editPromptEntry(button.dataset.id);
  if (button.dataset.promptAction === "toggle") togglePromptUsed(button.dataset.id);
  if (button.dataset.promptAction === "delete") deletePromptEntry(button.dataset.id);
});

elements.saveRevisionNotesButton.addEventListener("click", saveRevisionNotes);
elements.revisionCommentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.revisionCommentForm.reportValidity()) addRevisionComment();
});
elements.storyVersionList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-version-action='restore']");
  if (button) restoreStoryVersion(button.dataset.id);
});
elements.sceneChecklistList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-scene-check]");
  if (!checkbox) return;
  updateSceneChecklist(checkbox.dataset.id, checkbox.dataset.sceneCheck, checkbox.checked);
});

elements.exportTxtButton.addEventListener("click", () => {
  const story = currentStory();
  if (!story) return;
  downloadWritingExport("txt", buildProjectExport(story, "txt"), "text/plain;charset=utf-8");
});
elements.exportMarkdownButton.addEventListener("click", () => {
  const story = currentStory();
  if (!story) return;
  downloadWritingExport(
    "md",
    buildProjectExport(story, "markdown"),
    "text/markdown;charset=utf-8",
  );
});
elements.exportPdfButton.addEventListener("click", printCurrentWritingProject);
elements.exportWordButton.addEventListener("click", exportWritingProjectForWord);

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

elements.openHabitButton.addEventListener("click", () => openHabitForm());
elements.emptyHabitButton.addEventListener("click", () => openHabitForm());
elements.habitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.habitForm.reportValidity()) saveHabitFromForm();
});
elements.habitNameInput.addEventListener("input", () => {
  elements.habitNameInput.setCustomValidity("");
});
elements.habitCategoryInput.addEventListener("change", updateHabitDialogTheme);
elements.habitGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-habit-action]");
  if (!button) return;
  if (button.dataset.habitAction === "toggle") toggleHabitToday(button.dataset.id);
  if (button.dataset.habitAction === "edit") openHabitForm(button.dataset.id);
  if (button.dataset.habitAction === "delete") deleteHabit(button.dataset.id);
});
document.querySelector("#close-habit-button").addEventListener("click", () => {
  elements.habitDialog.close();
});
document.querySelector("#cancel-habit-button").addEventListener("click", () => {
  elements.habitDialog.close();
});
document.querySelector("#close-habit-reward-button").addEventListener("click", () => {
  elements.habitRewardDialog.close();
});
document.querySelector("#acknowledge-habit-reward").addEventListener("click", () => {
  elements.habitRewardDialog.close();
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
elements.streakRewardDialog.addEventListener("close", () => {
  elements.streakRewardDialog.classList.remove("celebrating");
  document.body.classList.remove("streak-celebration-open");
});

elements.habitDialog.addEventListener("click", (event) => {
  if (event.target === elements.habitDialog) elements.habitDialog.close();
});
elements.habitRewardDialog.addEventListener("click", (event) => {
  if (event.target === elements.habitRewardDialog) {
    elements.habitRewardDialog.close();
  }
});
elements.habitRewardDialog.addEventListener("close", () => {
  window.cancelAnimationFrame(habitRewardCounterAnimation);
  elements.habitRewardDialog.classList.remove("celebrating");
  document.body.classList.remove("habit-celebration-open");
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
  handleCollectionBookAction(button);
});

elements.coverFlowTrack.addEventListener("click", (event) => {
  const cover = event.target.closest("[data-cover-flow-id]");
  if (!cover) return;
  if (coverFlowSuppressClick) {
    coverFlowSuppressClick = false;
    return;
  }
  setActiveCoverFlowBook(cover.dataset.coverFlowId);
});

elements.coverFlowDetails.addEventListener("click", (event) => {
  handleCollectionBookAction(event.target.closest("button[data-action]"));
});

elements.coverFlowPrevious.addEventListener("click", () => moveCoverFlow(-1));
elements.coverFlowNext.addEventListener("click", () => moveCoverFlow(1));

elements.coverFlowTrack.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveCoverFlow(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveCoverFlow(1);
  }
  if (event.key === "Home") {
    event.preventDefault();
    const firstBook = filteredBooks()[0];
    if (firstBook) setActiveCoverFlowBook(firstBook.id, { focus: true });
  }
  if (event.key === "End") {
    event.preventDefault();
    const matchingBooks = filteredBooks();
    const lastBook = matchingBooks[matchingBooks.length - 1];
    if (lastBook) setActiveCoverFlowBook(lastBook.id, { focus: true });
  }
});

elements.coverFlowTrack.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  coverFlowPointerStart = event.clientX;
});

elements.coverFlowTrack.addEventListener("pointerup", (event) => {
  if (coverFlowPointerStart === null) return;
  const distance = event.clientX - coverFlowPointerStart;
  coverFlowPointerStart = null;
  if (Math.abs(distance) < 45) return;
  coverFlowSuppressClick = true;
  moveCoverFlow(distance < 0 ? 1 : -1);
  window.setTimeout(() => {
    coverFlowSuppressClick = false;
  }, 0);
});

elements.coverFlowTrack.addEventListener("pointercancel", () => {
  coverFlowPointerStart = null;
});

elements.nillionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.nillionForm.reportValidity()) return;
  askNillion(elements.nillionInput.value);
});

document.querySelectorAll("[data-nillion-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    elements.nillionInput.value = button.dataset.nillionPrompt;
    askNillion(button.dataset.nillionPrompt);
  });
});

elements.nillionVoiceToggle.addEventListener("click", () => {
  if (elements.nillionVoiceToggle.getAttribute("aria-disabled") === "true") return;
  nillionVoiceEnabled = !nillionVoiceEnabled;
  localStorage.setItem(NILLION_VOICE_KEY, nillionVoiceEnabled ? "1" : "0");
  if (!nillionVoiceEnabled) {
    nillionSpeechSession += 1;
    window.speechSynthesis.cancel();
    elements.nillionAssistant.classList.remove("speaking");
  }
  updateNillionVoiceControl();
  showToast(`Nillion voice ${nillionVoiceEnabled ? "enabled" : "disabled"}.`);
});

elements.nillionStage.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bounds = elements.nillionStage.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  elements.nillionStage.style.setProperty("--nillion-tilt-y", `${x * 8}deg`);
  elements.nillionStage.style.setProperty("--nillion-tilt-x", `${y * -5}deg`);
});

elements.nillionStage.addEventListener("pointerleave", () => {
  elements.nillionStage.style.setProperty("--nillion-tilt-y", "0deg");
  elements.nillionStage.style.setProperty("--nillion-tilt-x", "0deg");
});

updateNillionVoiceControl();

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

document.querySelectorAll("[data-collection-view]").forEach((button) => {
  button.addEventListener("click", () => {
    setCollectionView(button.dataset.collectionView);
  });
});

elements.searchInput.addEventListener("input", () => {
  catalogueExpanded = false;
  activeCoverFlowBookId = "";
  renderBooks();
});
elements.genreFilter.addEventListener("change", () => {
  catalogueExpanded = false;
  activeCoverFlowBookId = "";
  renderBooks();
});
elements.statusFilter.addEventListener("change", () => {
  catalogueExpanded = false;
  activeCoverFlowBookId = "";
  renderBooks();
});
elements.catalogueExpandButton.addEventListener("click", () => {
  catalogueExpanded = !catalogueExpanded;
  renderBooks();
});
elements.logBookFilter.addEventListener("change", renderReadingLog);
elements.logTitleInput.addEventListener("input", fillAuthorFromCollection);
elements.generateReadingChartsButton?.addEventListener("click", () => {
  readingChartsVisible = !readingChartsVisible;
  renderReadingInsights();
});
elements.specificPagesInput?.addEventListener("input", suggestPagesRead);
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
    !elements.writingLinkPopover.hidden &&
    !event.target.closest("#writing-link-popover") &&
    !event.target.closest("a.writing-research-link")
  ) {
    closeWritingLinkPopover();
  }
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

window.addEventListener("resize", closeWritingLinkPopover);
window.addEventListener("scroll", (event) => {
  if (elements.writingLinkPopover.contains(event.target)) return;
  closeWritingLinkPopover();
}, true);

document.addEventListener("keydown", (event) => {
  ensureAudioContext();
  if (event.key === "Escape" && !elements.featureMenu.hidden) {
    closeFeatureMenu();
    elements.menuToggle.focus();
  }
});
window.addEventListener("hashchange", closeFeatureMenu);

setWritingRibbon(activeWritingRibbon);
migrateAccountData();
migrateCreativeWritingProjects();
initializeAuthentication();
