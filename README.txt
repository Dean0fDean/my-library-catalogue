MY LIBRARY

Open index.html in a modern web browser to use your personal book catalogue.

For a full local preview inside Codex, use `localhost` rather than
`127.0.0.1`. In this environment the loopback IP may be blocked even when
`localhost` works normally.

If you want the app and its online API to load together in a local preview,
run `npm run preview-local` from this folder and open
`http://localhost:4315/`.

The app opens on a dedicated Home dashboard with live collection statistics
and shortcuts to frequently used areas. A responsive Menu in the sticky header
organizes Collection, Wishlist, Reading Log, Passages, Journal, Creative
Writing, WordHub Alcove, Learning Nook, The Chippings, Community, and Profile
into clear groups. The menu closes after navigation, when clicking outside it,
or when pressing Escape.

The Community area includes dedicated Followers and Following lists with live
counts, profile access, and follow controls. Three gently animated owls appear
on the Home dashboard, with motion disabled when the device requests reduced
motion.

Saved passages can be reopened and edited, including their citation, typed
text, reflection, entry method, and photographed page. The first login that
earns each day's streak reward opens a dedicated popup showing the increased
streak and five awarded Runes. Log out is always available in the header, and
the quandary reporting action is available directly from Home.

Writing Studio provides private synchronized documents with planning tools for
genre, characters, setting, chapters, scenes, research, and revision. Its
manuscript editor uses a familiar Word-style interface with a blue title bar,
quick-access commands, File, Home, Insert, Layout, References, Review, and View
ribbon tabs, a page ruler, a white document canvas, and a status bar. Drafts
autosave, retain manual versions, show live word and character counts, use the
browser's spellchecker, and preserve each document's margins, orientation, and
line spacing. WordHub Alcove stores words encountered while reading, their
meanings, source books and pages, and original practice sentences. WordHub
entries can be searched, edited, and removed, and its writing fields also use
spellcheck.

Nillion can scan every Writing Studio document for an exact word, phrase, or
sentence and report match totals with sentence context for each document. Ask
Nillion to read the matching context or name a document to read its complete
manuscript. With Voice enabled, long documents are spoken in queued sections so
browser speech playback does not truncate them.

Books, wishlist entries, ratings, reading sessions, saved passage text, and
reflections synchronize through the shared online database.

The reading journal supports dated reflections connected to one or more books.
Entries are private by default, but readers can deliberately publish an entry
to the Shared journals area in the community.

On a phone, the photo controls can open the camera. On a computer, they open
the normal image picker.

Accounts, public profiles, follow relationships, recommendations, shared
passages, and summary reading statistics use the shared online database. This
allows the same account to log in on mobile and lets readers find one another.
Signed-in readers can also browse one another's book catalogues and filter
them by title, author, genre, or reading status. Reading logs and reflections
remain private unless a passage is deliberately shared.

Book recommendations support private comments between the sender and
recipient, read/unread receipts, collection checks, and one-click wishlist
saving when the recipient does not already own the book.

Each profile includes persistent notifications, reading insight summaries,
and achievements for milestones such as finishing books, logging reading,
saving passages, sharing recommendations, and inspiring wishlist additions.
Journal milestones and newly shared reflections can also generate achievements
and notifications.

A notification chime in the sticky header displays the unread count and opens
the notifications panel when selected. Readers who send book recommendations
can edit the recommended title, author, and message or delete the
recommendation; these controls are restricted to the original sender.

Book photos are compressed and synchronized separately so they persist across
devices and deployments. Catalogues are alphabetical and initially show eight
books, with a Show all control for longer collections.

Book cards support Read, Busy Reading, and To Be Read statuses. Clicking a card
opens the full uploaded picture of that copy when one is available.
Each card also has an Edit details action for changing the title, author, and
genre while preserving its cover, rating, and reading status.

A small reading fact appears beneath the header and can be dismissed by clicking
it. Administrators can add or remove shared reading facts from the Community
admin panel. While visible, facts rotate every 30 seconds.

The Community marketplace lets readers actively list books from their own
collections with an asking price and condition note. Other readers can leave
comments or make non-binding price offers. The app does not process payments,
complete purchases, arrange couriers, or accept responsibility for collection,
delivery, book condition, or private agreements between users.

The first account created in the online database is the administrator. Only
that account can see the Community admin controls.

Highlighted passage photos remain on the device where they were added. Book
cover photos and all structured reading information synchronize across
devices.

The interface uses a paper-and-ink theme with gently turning page shapes in
the background. Devices that request reduced motion do not play the animation.

Previously used author names are offered when adding another book, while the
author field still accepts new names.

The Learning Nook contains assignments from the Parliament of Owls, including
English-language questions and guided book-review or reflection exercises.
Completing each assignment once earns synchronized in-app Runes. Rune totals
appear on personal profiles and on the profiles other readers can view. Owl
icons represent the Parliament throughout the Learning Nook.

The Learning Nook draws six unanswered assignments at a time from a bank of
30 questions and writing tasks. Completing a task replaces it with another.
Each account also has a synchronized daily streak: the first visit each UTC
day awards 5 Runes, consecutive days extend the streak, and a missed day resets
the current streak.

Readers can flag a quandary for the administrator from the Learning Nook.
Quandaries can concern assignments, accounts, community activity, catalogues,
or technical problems. The administrator can review and resolve them from the
private Admin panel, optionally sending a response to the reporting reader.

The Chippings is an in-app store where readers spend synchronized Runes. Its
initial collection includes four complete interface themes and five profile
picture frames. Purchases remain attached to the account across devices.
Owned cosmetics can be equipped, switched, or reset to the classic appearance
without paying again. Equipped profile frames are visible to other readers.

The Debate Club lets a reader invite another reader to discuss a topic. The
invitation must be accepted or declined before messages can be sent. Accepted
debates are public to read, while only the two invited participants can post.

The Bulletin Board contains announcements for the whole reading community.
Only the administrator can publish or remove these notices.

New notifications are checked periodically and announced with a short musical
chime after the reader has interacted with the page. Existing notifications do
not trigger a sound when an account first signs in.

Collection, saved passage, journal, and creative-writing project lists can be
formatted for printing from their respective sections.

Reader profiles display public collections as full book cards, including cover
photographs, ratings, reading status, genre, and print, e-book, or audiobook
format. Readers can issue one another measurable challenges based on pages,
minutes, or sessions, with progress calculated from the recipient's reading log.

Reading Log insights now include thirty-day consistency, recent pace, average
pages per session, strongest weekday, session range, most-read book, and an
annual page projection. Sessions also store the page from which the reader
plans to continue.

The WordHub Alcove can request definitions from the Free Dictionary API for the
reader to review and adapt. Its saved-word search covers words, definitions,
source books, page references, and example sentences. The Chippings includes
additional celestial, ocean, autumn, and violet interface themes.

Notification read states now remain stable during activity refreshes, including
both individual and Mark All Read actions. Achievement milestones now extend
across collections, completed books, sessions, pages, reading time, passages,
journals, and WordHub vocabulary.

The Collection includes a visual bookshelf diagram. Each spine represents one
book, displays a code such as #1, can be arranged alphabetically or by genre,
and shows the book title and details on hover, focus, or tap. Read books are
highlighted gold, busy-reading books are gray, and unread books remain plain.

The Flag a Quandary dialog now has a clearer, warmer admin-review style with
focused guidance, stronger fields, and a calmer backdrop.

After 25 minutes of sustained use, a dismissible Go Touch Grass popup reminds
the reader to rest their eyes, move, hydrate, or step outside. It appears only
once per signed-in browsing session, carries no reward or streak pressure, and
waits when another dialog is already open.

Reading Log analytics display one reader-selected graph at a time. Available
views cover pages over time, reading-speed trends, top books, genres, formats,
time of day, weekdays, and session length. The selection is remembered on the
device and the chosen graph can be printed with its period summary.

When the daily streak increases, the reward dialog now opens with a brief 3D
book celebration carrying the new streak count on its cover. The animation
fades after a few seconds, plays only for a newly earned daily reward, and is
suppressed when the device requests reduced motion.

The Lifestyle section lets each reader create, edit, and remove personal habits
and record one completion per habit per day. It displays current and best
streaks, lifetime check-ins, and a seven-day rhythm for every habit alongside
weekly summary totals. Habit records synchronize with the signed-in account.
Logging a habit launches a brief spinning-heart celebration with the updated
streak and completion count; reduced-motion devices receive the result card
without the animated heart.

Every authenticated app startup now resets to the Home section and the absolute
top of the page after account data has loaded, even when the browser restores an
old section hash. Writing Studio documents may still be restored quietly in the
background without stealing focus or scrolling the page. Menu navigation works
normally after startup.

The Add Habit dialog uses a dedicated Lifestyle design with a heart-and-orbit
header, live category colour, guided fields, clear Cancel and Save actions, and
a compact daily-check-in note. Its entrance treatment adapts to mobile screens
and is disabled when reduced motion is requested.
