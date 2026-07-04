/* ============================================
   MIDDLE-EARTH EXPLORER — JAVASCRIPT
   ============================================ */

// ─── DOM References ───────────────────────────────────────────────────────────
const el = {
    tabs:          document.querySelectorAll('.tab'),
    tabContents:   document.querySelectorAll('.tab-content'),
    loading:       document.getElementById('loading'),
    booksGrid:     document.getElementById('books-grid'),
    moviesGrid:    document.getElementById('movies-grid'),
    charsGrid:     document.getElementById('characters-grid'),
    charSearch:    document.getElementById('char-search'),
    searchInput:   document.getElementById('character-search-input'),
    clearSearch:   document.getElementById('clear-search'),
    searchCount:   document.getElementById('search-count'),
    pagination:    document.getElementById('char-pagination'),
    firstPage:     document.getElementById('first-page'),
    prevPage:      document.getElementById('prev-page'),
    nextPage:      document.getElementById('next-page'),
    lastPage:      document.getElementById('last-page'),
    pageInfo:      document.getElementById('page-info'),
    statBooks:     document.getElementById('stat-books'),
    statMovies:    document.getElementById('stat-movies'),
    statChars:     document.getElementById('stat-chars'),
    bgParticles:   document.getElementById('bg-particles'),
};

// ─── Application State ────────────────────────────────────────────────────────
const state = {
    currentTab: 'books',
    booksLoaded: false,
    moviesLoaded: false,
    charsLoaded: false,
    allChars: [],
    filteredChars: [],
    page: 1,
    limit: 24,
    totalPages: 1,
    searchTerm: '',
};

// ─── Utility Helpers ──────────────────────────────────────────────────────────

/**
 * Fetch data from a local JSON file.
 * @param {string} filename - the filename within the same directory
 * @returns {Promise<any>}
 */
async function fetchLocal(filename) {
    const res = await fetch(`./${filename}`);
    if (!res.ok) throw new Error(`Failed to load ${filename}`);
    return res.json();
}

function showLoading(on) {
    el.loading.classList.toggle('hidden', !on);
}

/**
 * Sanitize a string to prevent XSS when injecting into innerHTML.
 * @param {string} str
 * @returns {string}
 */
function safe(str) {
    const d = document.createElement('div');
    d.textContent = str ?? '';
    return d.innerHTML;
}

/** Format a number with commas (or return the raw value if already a string). */
function fmt(val, suffix = '') {
    if (val === undefined || val === null || val === '') return '—';
    if (typeof val === 'number') return val.toLocaleString() + suffix;
    return val + suffix;
}

/** Get a CSS-class-safe race tag based on the race string. */
function raceClass(race) {
    if (!race) return 'default';
    const r = race.toLowerCase();
    if (r.includes('hobbit')) return 'hobbit';
    if (r.includes('elf') || r.includes('elves')) return 'elf';
    if (r.includes('human') || r.includes('man') || r.includes('men') || r.includes('númenórean') || r.includes('gondorian')) return 'human';
    if (r.includes('wizard') || r.includes('maiar') || r.includes('maia')) return 'wizard';
    if (r.includes('dwarf') || r.includes('dwarves')) return 'dwarf';
    return 'default';
}

// ─── Particle Background ──────────────────────────────────────────────────────
function createParticles() {
    const colors = ['rgba(102,252,241,0.5)', 'rgba(200,168,75,0.5)', 'rgba(69,162,158,0.4)'];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 20 + 15}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        el.bgParticles.appendChild(p);
    }
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────
function switchTab(target) {
    state.currentTab = target;

    el.tabs.forEach(t => {
        const isActive = t.dataset.target === target;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive);
    });

    el.tabContents.forEach(c => {
        c.classList.toggle('active', c.id === target);
    });

    if (target === 'books'      && !state.booksLoaded)  loadBooks();
    if (target === 'movies'     && !state.moviesLoaded) loadMovies();
    if (target === 'characters' && !state.charsLoaded)  loadChars();
}

// ─── Empty / Error Helpers ────────────────────────────────────────────────────
function emptyState(container, icon, message, isError = false) {
    container.innerHTML = `
        <div class="empty-state${isError ? ' error-state' : ''}" style="grid-column: 1 / -1;">
            <div class="empty-icon">${icon}</div>
            <p>${safe(message)}</p>
        </div>`;
}

// ─── BOOKS ────────────────────────────────────────────────────────────────────
const BOOK_DESCRIPTIONS = {
    'The Fellowship Of The Ring':
        'Frodo Baggins inherits the One Ring and sets off on a perilous journey with the Fellowship to destroy it in the fires of Mount Doom.',
    'The Two Towers':
        'The Fellowship is broken. Frodo and Sam press on toward Mordor while Aragorn, Legolas, and Gimli pursue the Uruk-hai who took their friends.',
    'The Return Of The King':
        'The final battle for Middle-earth unfolds as Frodo nears Mount Doom and the armies of the West confront the forces of Sauron at Minas Tirith.',
};

async function loadBooks() {
    showLoading(true);
    el.booksGrid.innerHTML = '';
    try {
        const books = await fetchLocal('books.json');
        state.booksLoaded = true;
        el.statBooks.textContent = books.length;

        if (!books.length) {
            emptyState(el.booksGrid, '📚', 'No books found.');
            return;
        }

        books.forEach((book, i) => {
            const desc = BOOK_DESCRIPTIONS[book.name] || 'A tale of Middle-earth.';
            const card = document.createElement('div');
            card.className = 'card item-card book-card';
            card.innerHTML = `
                <span class="card-number">${String(i + 1).padStart(2, '0')}</span>
                <span class="book-badge">J.R.R. Tolkien</span>
                <h3>${safe(book.name)}</h3>
                <p class="book-description">${safe(desc)}</p>
            `;
            el.booksGrid.appendChild(card);
        });
    } catch {
        emptyState(el.booksGrid, '⚠️', 'Could not load books. Make sure you are serving this via a local server.', true);
    } finally {
        showLoading(false);
    }
}

// ─── MOVIES ───────────────────────────────────────────────────────────────────
async function loadMovies() {
    showLoading(true);
    el.moviesGrid.innerHTML = '';
    try {
        const allMovies = await fetchLocal('movies.json');
        state.moviesLoaded = true;

        // Sort by box office descending
        const movies = allMovies.sort((a, b) => (b.boxOfficeRevenueInMillions ?? 0) - (a.boxOfficeRevenueInMillions ?? 0));
        const maxRevenue = Math.max(...movies.map(m => m.boxOfficeRevenueInMillions ?? 0));

        el.statMovies.textContent = movies.length;

        if (!movies.length) {
            emptyState(el.moviesGrid, '🎬', 'No movies found.');
            return;
        }

        movies.forEach(m => {
            const isSeries = !m.budgetInMillions;
            const revenuePercent = maxRevenue ? Math.round(((m.boxOfficeRevenueInMillions ?? 0) / maxRevenue) * 100) : 0;
            const card = document.createElement('div');
            card.className = 'card item-card movie-card';
            card.innerHTML = `
                <p class="movie-series">${isSeries ? 'Series / Special' : 'Feature Film'}</p>
                <h3>${safe(m.name)}</h3>

                <div class="awards-bar">
                    <div class="award-item">
                        <span class="award-num">${fmt(m.academyAwardWins)}</span>
                        <span class="award-label">🏆 Wins</span>
                    </div>
                    <div class="award-item">
                        <span class="award-num">${fmt(m.academyAwardNominations)}</span>
                        <span class="award-label">🎖 Nominations</span>
                    </div>
                    <div class="award-item">
                        <span class="award-num">${fmt(m.runtimeInMinutes, ' min')}</span>
                        <span class="award-label">⏱ Runtime</span>
                    </div>
                </div>

                <div class="item-detail">
                    <span class="label">Box Office</span>
                    <span class="value">$${fmt(m.boxOfficeRevenueInMillions)}M</span>
                </div>
                <div class="item-detail">
                    <span class="label">Budget</span>
                    <span class="value">${m.budgetInMillions ? '$' + fmt(m.budgetInMillions) + 'M' : '—'}</span>
                </div>
                <div class="item-detail">
                    <span class="label">Rotten Tomatoes</span>
                    <span class="value">${m.rottenTomatoesScore ? m.rottenTomatoesScore + '%' : '—'}</span>
                </div>

                <div class="stat-bar-wrap">
                    <div class="stat-bar-label">
                        <span>Box Office Share</span>
                        <span>${revenuePercent}%</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: 0%" data-width="${revenuePercent}%"></div>
                    </div>
                </div>
            `;
            el.moviesGrid.appendChild(card);
        });

        // Animate the revenue bars after render
        requestAnimationFrame(() => {
            document.querySelectorAll('.stat-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        });

    } catch {
        emptyState(el.moviesGrid, '⚠️', 'Could not load movies. Ensure local JSON files exist.', true);
    } finally {
        showLoading(false);
    }
}

// ─── CHARACTERS ───────────────────────────────────────────────────────────────
async function loadChars() {
    showLoading(true);
    el.charsGrid.innerHTML = '';
    try {
        const chars = await fetchLocal('characters.json');
        state.allChars = chars;
        state.charsLoaded = true;
        el.statChars.textContent = chars.length.toLocaleString();

        applyFilters();
        renderChars();
    } catch {
        emptyState(el.charsGrid, '⚠️', 'Could not load characters. Ensure local JSON files exist.', true);
    } finally {
        showLoading(false);
    }
}

function applyFilters() {
    const term = state.searchTerm;
    state.filteredChars = term
        ? state.allChars.filter(c => c.name.toLowerCase().includes(term))
        : [...state.allChars];
    state.totalPages = Math.max(1, Math.ceil(state.filteredChars.length / state.limit));

    // Update count display
    if (term) {
        el.searchCount.textContent = `Found ${state.filteredChars.length.toLocaleString()} character${state.filteredChars.length !== 1 ? 's' : ''}`;
        el.searchCount.classList.remove('hidden');
    } else {
        el.searchCount.classList.add('hidden');
    }
}

function renderChars() {
    el.charsGrid.innerHTML = '';

    if (!state.filteredChars.length) {
        emptyState(el.charsGrid, '🔍', `No characters named "${state.searchTerm}" were found.`);
        el.pagination.classList.add('hidden');
        return;
    }

    const start = (state.page - 1) * state.limit;
    const slice = state.filteredChars.slice(start, start + state.limit);

    const fragment = document.createDocumentFragment();
    slice.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card item-card char-card';
        const rc = raceClass(c.race);
        const raceLabel = c.race || 'Unknown';

        card.innerHTML = `
            <h3>
                ${safe(c.name)}
                <span class="race-tag ${rc}">${safe(raceLabel)}</span>
            </h3>
            ${c.realm  ? `<div class="item-detail"><span class="label">Realm</span><span class="value">${safe(c.realm)}</span></div>` : ''}
            ${c.birth  ? `<div class="item-detail"><span class="label">Born</span><span class="value">${safe(c.birth)}</span></div>` : ''}
            ${c.death  ? `<div class="item-detail"><span class="label">Died</span><span class="value">${safe(c.death)}</span></div>` : ''}
            ${c.gender ? `<div class="item-detail"><span class="label">Gender</span><span class="value">${safe(c.gender)}</span></div>` : ''}
            ${c.wikiUrl ? `<div class="wiki-link-wrap"><a class="wiki-link" href="${safe(c.wikiUrl)}" target="_blank" rel="noopener">Wiki ↗</a></div>` : ''}
        `;
        fragment.appendChild(card);
    });
    el.charsGrid.appendChild(fragment);

    // Pagination
    updatePagination();
}

function updatePagination() {
    el.pageInfo.textContent = `Page ${state.page} of ${state.totalPages}`;
    el.firstPage.disabled  = state.page === 1;
    el.prevPage.disabled   = state.page === 1;
    el.nextPage.disabled   = state.page === state.totalPages;
    el.lastPage.disabled   = state.page === state.totalPages;
    el.pagination.classList.toggle('hidden', state.totalPages <= 1);
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
function setupEvents() {
    // Tabs
    el.tabs.forEach(tab => {
        tab.addEventListener('click', e => switchTab(e.currentTarget.dataset.target));
    });

    // Search
    let debounce;
    el.searchInput.addEventListener('input', e => {
        clearTimeout(debounce);
        const val = e.target.value.trim().toLowerCase();
        el.clearSearch.classList.toggle('hidden', !val);
        debounce = setTimeout(() => {
            state.searchTerm = val;
            state.page = 1;
            applyFilters();
            renderChars();
        }, 250);
    });

    el.clearSearch.addEventListener('click', () => {
        el.searchInput.value = '';
        el.clearSearch.classList.add('hidden');
        state.searchTerm = '';
        state.page = 1;
        applyFilters();
        renderChars();
        el.searchInput.focus();
    });

    // Pagination
    el.firstPage.addEventListener('click', () => { state.page = 1; renderChars(); window.scrollTo({ top: 0 }); });
    el.prevPage.addEventListener('click',  () => { state.page--; renderChars(); window.scrollTo({ top: 0 }); });
    el.nextPage.addEventListener('click',  () => { state.page++; renderChars(); window.scrollTo({ top: 0 }); });
    el.lastPage.addEventListener('click',  () => { state.page = state.totalPages; renderChars(); window.scrollTo({ top: 0 }); });

    // Keyboard shortcut: "/" focuses search on Characters tab
    document.addEventListener('keydown', e => {
        if (e.key === '/' && state.currentTab === 'characters' && document.activeElement !== el.searchInput) {
            e.preventDefault();
            el.searchInput.focus();
        }
    });
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
function init() {
    createParticles();
    setupEvents();
    loadBooks(); // Load books immediately on boot
}

init();
