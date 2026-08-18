const STORAGE_KEY = "steps-demo-state-v1";

const baseState = {
  currentRole: "student",
  activePage: "unit",
  activeStudentPage: "unit",
  activeAdminPage: "dashboard",
  learningMapOpen: false,
  selectedUnit: "At the Zoo",
  storyStep: 0,
  studentLessonStep: "story",
  stars: 330,
  completedActivities: [],
  unitProgress: 42,
  missionProgress: { story: false, games: 0, speaking: 0 },
  answers: {},
  lessonFlow: [
    "Story",
    "Song",
    "Listen & Play",
    "Let's Say It",
    "Phonics",
    "Game",
    "Speaking",
    "Review",
  ],
  vocabulary: ["giraffe", "zebra", "elephant", "crocodile", "hippo", "snake"],
  aiDrafts: ["Lucy and the Lost Zebra"],
  approvedContent: ["Milo's Crazy Day at the Zoo", "The Zoo Song"],
  reviewStatus: {
    "/z/": "Needs Practice",
    "Do you like ___?": "Learning",
    giraffe: "Strong",
  },
};

const lessonCatalog = {
  "Our Names": {
    order: 1,
    subtitle: "Getting to know names and simple greetings.",
    focus: ["Hello", "My name is ...", "Names"],
    hero: "A friendly start to class life.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  "My Body": {
    order: 2,
    subtitle: "Talk about body parts in simple, playful ways.",
    focus: ["eyes", "ears", "hands"],
    hero: "Touch, point, and say it out loud.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  "My Toys": {
    order: 3,
    subtitle: "Explore toys through stories and actions.",
    focus: ["ball", "car", "doll"],
    hero: "Meaningful input through familiar toys.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  Activities: {
    order: 4,
    subtitle: "Use action words in movement-rich tasks.",
    focus: ["run", "jump", "play"],
    hero: "Learn through doing, not just naming.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  "At the Zoo": {
    order: 5,
    subtitle: "Join Milo and Lucy for a day at the zoo.",
    focus: ["giraffe", "zebra", "elephant", "I like ___."],
    hero: "The main polished demo slice.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  "At the Clothes Shop": {
    order: 6,
    subtitle: "Choose clothes and describe what you want.",
    focus: ["shirt", "dress", "shoes"],
    hero: "Buying, choosing, and describing items.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  "My Favourite Food": {
    order: 7,
    subtitle: "Talk about food preferences and tastes.",
    focus: ["apple", "rice", "noodles"],
    hero: "Taste, choice, and simple opinions.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
  "At Home": {
    order: 8,
    subtitle: "Use language for everyday home routines.",
    focus: ["bed", "door", "table"],
    hero: "A closing unit with daily-life language.",
    cards: ["Story", "Song", "Listen & Play", "Let's Say It", "Phonics", "Game", "Speaking", "Review"],
  },
};

const studentNav = [
  { id: "home", title: "Home", desc: "Overview and next step" },
  { id: "map", title: "Learning Map", desc: "Units and progress" },
  { id: "unit", title: "At the Zoo", desc: "Main demo flow" },
  { id: "journey", title: "Language Journey", desc: "Spiral exposure" },
  { id: "review", title: "Review", desc: "Spaced practice" },
  { id: "progress", title: "My Progress", desc: "Summary stats" },
];

const adminNav = [
  { id: "dashboard", title: "Dashboard", desc: "Overview and insights" },
  { id: "courses", title: "Courses", desc: "Starters / Movers / Flyers" },
  { id: "builder", title: "Unit Builder", desc: "At the Zoo" },
  { id: "content", title: "Content Library", desc: "Teacher + AI drafts" },
  { id: "analytics", title: "Spiral Analytics", desc: "Exposure tracking" },
  { id: "student", title: "Anna", desc: "Teacher view of learner" },
  { id: "ai", title: "AI Studio", desc: "Generate teaching content" },
];

const el = (id) => document.getElementById(id);

const state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(baseState);
  try {
    return { ...structuredClone(baseState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(baseState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setRole(role) {
  state.currentRole = role;
  if (state.activePage === "welcome") {
    state.activePage = role === "student" ? "home" : "dashboard";
  }
  saveState();
  render();
}

function setPage(page) {
  if (state.currentRole === "student") state.activeStudentPage = page;
  else state.activeAdminPage = page;
  state.activePage = page;
  if (page === "map") state.learningMapOpen = true;
  saveState();
  render();
}

function resetDemo() {
  Object.assign(state, structuredClone(baseState));
  saveState();
  render();
}

function addStars(amount) {
  state.stars += amount;
  saveState();
  render();
}

function completeActivity(key, stars = 5) {
  if (!state.completedActivities.includes(key)) {
    state.completedActivities.push(key);
    addStars(stars);
  }
}

function setLessonStep(step) {
  state.studentLessonStep = step;
  saveState();
  render();
}

function advanceStory() {
  state.storyStep = Math.min(4, state.storyStep + 1);
  if (state.storyStep >= 4) {
    state.unitProgress = Math.max(state.unitProgress, 52);
    state.missionProgress.story = true;
    completeActivity("story", 15);
    state.studentLessonStep = "song";
  }
  saveState();
  render();
}

function renderNav() {
  const items = state.currentRole === "student" ? studentNav : adminNav;
  const active = state.currentRole === "student" ? state.activeStudentPage : state.activeAdminPage;
  el("nav").innerHTML = items
    .map(
      (item) => `
        <button class="nav-item ${item.id === active ? "active" : ""}" data-page="${item.id}">
          <div class="nav-title">${item.title}</div>
          <div class="nav-desc">${item.desc}</div>
        </button>
      `
    )
    .join("");
}

function metrics() {
  if (state.currentRole === "student") {
    return [
      ["Stars", state.stars],
      ["Progress", `${state.unitProgress}%`],
      ["Units", "1 / 10"],
    ];
  }
  return [
    ["Students", "32"],
    ["Completion", "82%"],
    ["Drafts", state.aiDrafts.length],
  ];
}

function renderMetrics() {
  el("topbarMetrics").innerHTML = metrics()
    .map(
      ([label, value]) => `
        <div class="metric-card">
          <div class="metric-value">${value}</div>
          <div class="metric-label">${label}</div>
        </div>
      `
    )
    .join("");
}

function renderStudentHome() {
  return `
    <div class="hero">
      <div class="hero-grid">
        <div>
          <div class="pill">Good afternoon, Anna</div>
          <h2>Ready for another English adventure?</h2>
          <p>
            Today the demo shows one full learning loop: story, song, practice, speaking, review,
            and how the same language comes back in new contexts.
          </p>
          <div class="hero-actions">
            <button class="primary-btn" data-page="unit">Continue Adventure</button>
            <button class="secondary-btn" data-page="journey">See Language Journey</button>
          </div>
        </div>
        <div class="card" style="background: rgba(255,255,255,0.14); color: white; border-color: rgba(255,255,255,0.18);">
          <div class="label" style="background: rgba(255,255,255,0.18); color: white;">Today's Mission</div>
          <div style="margin-top: 12px; display: grid; gap: 10px;">
            <div>Watch today's story</div>
            <div>Play 2 activities</div>
            <div>Speak 2 sentences</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="section-title">
          <h3>Current Learning Path</h3>
          <span class="status current">At the Zoo</span>
        </div>
        <div class="progress"><span style="width:${state.unitProgress}%"></span></div>
        <div class="phase-track">
          ${[
            ["Story", "done"],
            ["Song", "done"],
            ["Listen & Play", "current"],
            ["Let's Say It", "locked"],
            ["Phonics", "locked"],
            ["Game", "locked"],
            ["Speaking", "locked"],
            ["Review", "locked"],
          ]
            .map(
              ([name, status]) => `
                <div class="phase-item ${status === "current" ? "current" : ""}">
                  <div>
                    <strong>${name}</strong>
                    <div class="muted">${status === "done" ? "Completed" : status === "current" ? "Continue now" : "Coming next"}</div>
                  </div>
                  <span class="status ${status}">${status}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <div class="section-title">
          <h3>Rewards</h3>
          <span class="pill">5 day streak</span>
        </div>
        <div class="card-grid">
          <div class="mini-card">
            <div class="metric-value">330</div>
            <div class="metric-label">Stars</div>
          </div>
          <div class="mini-card">
            <div class="metric-value">126</div>
            <div class="metric-label">Words encountered</div>
          </div>
          <div class="mini-card">
            <div class="metric-value">32</div>
            <div class="metric-label">Language chunks</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStudentMap() {
  const units = [
    ["Our Names", "done", 100],
    ["My Body", "done", 100],
    ["My Toys", "done", 100],
    ["Activities", "done", 100],
    ["At the Zoo", "current", 42],
    ["At the Clothes Shop", "locked", 0],
    ["My Favourite Food", "locked", 0],
    ["At Home", "locked", 0],
  ];
  return `
    <div class="card">
      <div class="section-title">
        <h3>Starters Learning Map</h3>
        <button class="action-btn" data-action="toggle-map">
          ${state.learningMapOpen ? "Hide lessons" : "Show 8 lessons"}
        </button>
      </div>
      ${state.learningMapOpen ? `
        <div class="dropdown-panel">
          <div class="lesson-list">
            ${units
              .map(
                ([name, status, progress]) => `
                  <button class="lesson-row ${name === state.selectedUnit ? "active" : ""}" data-action="select-unit" data-unit="${name}">
                    <div class="lesson-row-main">
                      <strong>${lessonCatalog[name].order}. ${name}</strong>
                      <span class="status ${status}">${status}</span>
                    </div>
                    <div class="muted" style="margin-bottom:10px;">${lessonCatalog[name].subtitle}</div>
                    <div class="progress"><span style="width:${progress}%"></span></div>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      ` : ""}
      <div class="unit-grid" style="margin-top: 18px;">
        <div class="unit-card current">
          <div class="section-title">
            <strong>${state.selectedUnit}</strong>
            <span class="status current">current</span>
          </div>
          <div class="progress"><span style="width:42%"></span></div>
          <div class="muted">Open the full learning journey</div>
        </div>
      </div>
    </div>
  `;
}

function renderUnitDetail() {
  const lesson = lessonCatalog[state.selectedUnit] || lessonCatalog["At the Zoo"];
  const modules = ["story", "song", "listen", "say", "phonics", "game", "speak", "review"];
  const labels = {
    story: "Story",
    song: "Song",
    listen: "Listen & Play",
    say: "Let's Say It",
    phonics: "Phonics",
    game: "Game",
    speak: "Speaking",
    review: "Review",
  };
  const active = state.studentLessonStep;
  const storyQuestions = [
    {
      prompt: "How many zebras are there?",
      choices: ["Two", "Three", "Four"],
      answer: "Three",
    },
    {
      prompt: "What animal does Lucy like?",
      choices: ["Elephant", "Giraffe", "Tiger"],
      answer: "Giraffe",
    },
    {
      prompt: "Milo likes ______.",
      choices: ["Snake", "Elephant", "Zebra"],
      answer: "Elephant",
    },
  ];
  return `
    <div class="hero">
      <div class="hero-grid">
        <div>
          <div class="pill">Unit ${lesson.order}</div>
          <h2>${state.selectedUnit}</h2>
          <p>${lesson.subtitle} This lesson shows the full flow of meaningful input, practice, speaking, and spiral review.</p>
          <div class="hero-actions">
            <button class="primary-btn" data-action="set-step-story">Start Story</button>
            <button class="secondary-btn" data-action="set-step-speak">Jump to Speaking</button>
          </div>
        </div>
        <div class="badge-row">
          ${lesson.focus.map((item) => `<span class="label">${item}</span>`).join("")}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">
        <h3>Learning Path</h3>
        <span class="pill">${lesson.hero}</span>
      </div>
      <div class="unit-grid">
        ${modules
          .map(
            (module, index) => `
              <div class="unit-card ${active === module ? "current" : ""}">
                <strong>${labels[module]}</strong>
                <div class="muted" style="margin-top:8px;">${index + 1} / ${modules.length}</div>
                <div class="progress"><span style="width:${active === module ? 100 : index < modules.indexOf(active) ? 100 : 18}%"></span></div>
                <button class="action-btn" data-action="step-${module}">${active === module ? "Open" : "Go"}</button>
              </div>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="card">
      ${active === "story" ? `
        <div class="section-title">
          <h3>${state.selectedUnit} Story</h3>
          <span class="pill">${state.storyStep + 1} / 5</span>
        </div>
        <div class="band" style="margin-bottom:14px; background: linear-gradient(135deg, #f0f7ff, #ffffff);">
          <div class="badge-row" style="margin-bottom:12px;">
            <span class="label">Milo</span>
            <span class="label">Lucy</span>
            <span class="label">Zoo scene</span>
          </div>
          <div class="story-scene">
            <div class="story-art">
              <div class="story-sky"></div>
              <div class="story-ground"></div>
              <div class="story-animal giraffe"></div>
              <div class="story-animal zebra"></div>
              <div class="story-animal elephant"></div>
              <div class="story-character milo"></div>
              <div class="story-character lucy"></div>
            </div>
          </div>
        </div>
        <div class="band" style="background:#f8fbff;">
          <strong>Milo's Crazy Day at the Zoo</strong>
          <div class="muted" style="margin:8px 0 14px;">Slide ${state.storyStep + 1}</div>
          <div style="font-size:1.05rem; line-height:1.7;">
            ${[
              "Milo and Lucy are at the zoo.",
              "Lucy: Wow! Look at the zebras!",
              "Lucy: One, two, three! There are three zebras!",
              "Milo: What's your favourite animal?",
              "Lucy: My favourite animal is a giraffe. I like giraffes!",
            ][state.storyStep]}
          </div>
          ${state.storyStep === 1 ? `
            <div style="margin-top:16px;">
              <div><strong>How many zebras are there?</strong></div>
              <div class="hero-actions" style="margin-top:10px;">
                <button class="action-btn" data-action="story-wrong">Two</button>
                <button class="action-btn" data-action="story-correct">Three</button>
                <button class="action-btn" data-action="story-wrong">Four</button>
              </div>
            </div>
          ` : ""}
          ${state.storyStep === 2 ? `
            <div style="margin-top:16px;">
              <div><strong>What animal does Lucy like?</strong></div>
              <div class="hero-actions" style="margin-top:10px;">
                <button class="action-btn" data-action="story-wrong">Elephant</button>
                <button class="action-btn" data-action="story-correct">Giraffe</button>
                <button class="action-btn" data-action="story-wrong">Tiger</button>
              </div>
            </div>
          ` : ""}
          ${state.storyStep === 3 ? `
            <div style="margin-top:16px;">
              <div><strong>Milo likes ______.</strong></div>
              <div class="hero-actions" style="margin-top:10px;">
                <button class="action-btn" data-action="story-wrong">Snake</button>
                <button class="action-btn" data-action="story-correct">Elephant</button>
                <button class="action-btn" data-action="story-wrong">Zebra</button>
              </div>
            </div>
          ` : ""}
        </div>
        <div class="row-actions" style="margin-top:14px;">
          <button class="primary-btn" data-action="story-next">${state.storyStep < 4 ? "Next Slide" : "Complete Story"}</button>
          <button class="ghost-btn" data-action="story-restart">Replay</button>
        </div>
      ` : active === "song" ? `
        <div class="section-title">
          <h3>Interactive Song</h3>
          <span class="pill">Karaoke demo</span>
        </div>
        <div class="band">
          <strong>The Zoo Song</strong>
          <p>I like giraffes, I like zebras, I like elephants too...</p>
          <div class="row-actions">
            <button class="action-btn" data-action="song-play">Play</button>
            <button class="action-btn" data-action="song-complete">Complete Song</button>
          </div>
        </div>
      ` : active === "listen" ? `
        <div class="section-title">
          <h3>Listen & Play</h3>
          <span class="pill">3 mini questions</span>
        </div>
        <div class="list">
          <div class="list-item"><div><strong>Find the zebra.</strong><div class="muted">Audio simulation</div></div><button class="action-btn" data-action="listen-answer">Choose</button></div>
          <div class="list-item"><div><strong>Find the elephant.</strong><div class="muted">Audio simulation</div></div><button class="action-btn" data-action="listen-answer">Choose</button></div>
          <div class="list-item"><div><strong>How many zebras are there?</strong><div class="muted">Image shows 3 zebras</div></div><button class="action-btn" data-action="listen-answer">Choose</button></div>
        </div>
      ` : active === "say" ? `
        <div class="section-title">
          <h3>Let's Say It</h3>
          <span class="pill">Target chunks</span>
        </div>
        <div class="list">
          <div class="list-item"><strong>I like ______.</strong><button class="action-btn" data-action="say-correct">Fill</button></div>
          <div class="list-item"><strong>Do you like snakes?</strong><button class="action-btn" data-action="say-correct">Answer</button></div>
          <div class="list-item"><strong>There are three zebras.</strong><button class="action-btn" data-action="say-correct">Arrange</button></div>
        </div>
      ` : active === "phonics" ? `
        <div class="section-title">
          <h3>Phonics</h3>
          <span class="pill">Sound time /z/</span>
        </div>
        <div class="band">
          <strong>Which word starts with /z/?</strong>
          <div class="hero-actions" style="margin-top:12px;">
            <button class="action-btn" data-action="phonics-wrong">cat</button>
            <button class="action-btn" data-action="phonics-correct">zebra</button>
            <button class="action-btn" data-action="phonics-wrong">elephant</button>
          </div>
        </div>
      ` : active === "game" ? `
        <div class="section-title">
          <h3>Zoo Game</h3>
          <span class="pill">Drag / click demo</span>
        </div>
        <div class="list">
          <div class="list-item"><strong>Put the giraffe next to the tree.</strong><button class="action-btn" data-action="game-correct">Done</button></div>
          <div class="list-item"><strong>Put the elephant near the water.</strong><button class="action-btn" data-action="game-correct">Done</button></div>
          <div class="list-item"><strong>Put the zebra next to the giraffe.</strong><button class="action-btn" data-action="game-correct">Done</button></div>
        </div>
      ` : active === "speak" ? `
        <div class="section-title">
          <h3>Speaking Demo</h3>
          <span class="label">AI Speaking Feedback</span>
        </div>
        <div class="band">
          <div><strong>What's your favourite animal?</strong></div>
          <div class="muted" style="margin:8px 0 14px;">Mock transcription: I like elephants.</div>
          <div class="row-actions">
            <button class="primary-btn" data-action="speak-score">Hold to Speak</button>
            <button class="action-btn" data-action="speak-complete">Submit</button>
          </div>
        </div>
      ` : `
        <div class="section-title">
          <h3>Unit Review</h3>
          <span class="pill">Mixed questions</span>
        </div>
        <div class="band">
          <strong>Zoo Adventure Complete!</strong>
          <p>Story, Listening, Vocabulary, Phonics, and Speaking all feed into the same learning loop.</p>
          <button class="primary-btn" data-action="review-complete">Finish Review</button>
        </div>
      `}
    </div>
  `;
}

function renderStudentJourney() {
  const exposures = [
    ["Story", 3],
    ["Song", 2],
    ["Let's Say It", 3],
    ["Game", 4],
    ["Speaking", 2],
    ["Review", 3],
  ];
  return `
    <div class="card">
      <div class="section-title">
        <h3>Student Language Journey</h3>
        <span class="pill">Spiral learning</span>
      </div>
      <div class="timeline">
        ${exposures
          .map(
            ([label, width]) => `
              <div class="timeline-item">
                <strong>${label}</strong>
                <div class="timeline-track"><span style="width:${width * 20}%"></span></div>
              </div>
            `
          )
          .join("")}
      </div>
      <div style="margin-top:14px; font-weight:700;">You've met this sentence 6 times in different ways.</div>
    </div>
  `;
}

function renderStudentReview() {
  return `
    <div class="card">
      <div class="section-title">
        <h3>Time to Review</h3>
        <span class="pill">5 minute loop</span>
      </div>
      <div class="list">
        ${Object.entries(state.reviewStatus)
          .map(
            ([target, status]) => `
              <div class="list-item">
                <div>
                  <strong>${target}</strong>
                  <div class="muted">${status === "Needs Practice" ? "Last seen 4 days ago" : "Recycled in learning flow"}</div>
                </div>
                <span class="status ${status === "Needs Practice" ? "current" : "done"}">${status}</span>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="row-actions" style="margin-top:14px;">
        <button class="primary-btn" data-action="review-session">Start 5-Minute Review</button>
      </div>
    </div>
  `;
}

function renderStudentProgress() {
  return `
    <div class="split">
      <div class="card">
        <div class="section-title">
          <h3>My Progress</h3>
          <span class="pill">Dynamic demo state</span>
        </div>
        <div class="card-grid">
          <div class="mini-card"><div class="metric-value">${state.stars}</div><div class="metric-label">Stars</div></div>
          <div class="mini-card"><div class="metric-value">${state.completedActivities.length}</div><div class="metric-label">Completed activities</div></div>
          <div class="mini-card"><div class="metric-value">${state.missionProgress.speaking}</div><div class="metric-label">Speaking tasks</div></div>
        </div>
      </div>
      <div class="card">
        <div class="section-title"><h3>Skill Mix</h3></div>
        ${[
          ["Listening", 88],
          ["Vocabulary", 90],
          ["Speaking", 78],
          ["Phonics", 72],
        ]
          .map(
            ([label, value]) => `
              <div style="margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;"><strong>${label}</strong><span>${value}%</span></div>
                <div class="progress"><span style="width:${value}%"></span></div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderAdminDashboard() {
  return `
    <div class="split">
      <div class="card">
        <div class="section-title">
          <h3>Admin Dashboard</h3>
          <span class="pill">Teacher/Admin</span>
        </div>
        <div class="card-grid">
          <div class="mini-card"><div class="metric-value">32</div><div class="metric-label">Active students</div></div>
          <div class="mini-card"><div class="metric-value">145</div><div class="metric-label">Lessons completed</div></div>
          <div class="mini-card"><div class="metric-value">58</div><div class="metric-label">Speaking practices</div></div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">
          <h3>AI Curriculum Insights</h3>
          <span class="label">AI Assisted</span>
        </div>
        <div class="list">
          <div class="list-item"><div><strong>Phonics /z/ has low exposure</strong><div class="muted">Current: 4 meaningful exposures</div></div><button class="action-btn">Review</button></div>
          <div class="list-item"><div><strong>Speaking needs scaffolding</strong><div class="muted">Average: 71%</div></div><button class="action-btn">View</button></div>
        </div>
      </div>
    </div>
  `;
}

function renderCourses() {
  return `
    <div class="card">
      <div class="section-title">
        <h3>Courses</h3>
        <span class="pill">Starters opens Unit Builder</span>
      </div>
      <div class="unit-grid">
        ${["Pre-School English", "Starters", "Movers", "Flyers"]
          .map(
            (name) => `
              <div class="unit-card ${name === "Starters" ? "current" : ""}">
                <strong>${name}</strong>
                <div class="muted" style="margin-top:8px;">Curriculum, targets, and units</div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderBuilder() {
  const units = Object.entries(lessonCatalog).map(([name, lesson]) => ({
    name,
    status: name === state.selectedUnit ? "current" : lesson.order <= 4 ? "done" : "locked",
    progress: name === state.selectedUnit ? 42 : lesson.order <= 4 ? 100 : 0,
  }));
  const lesson = lessonCatalog[state.selectedUnit] || lessonCatalog["At the Zoo"];
  return `
    <div class="card">
      <div class="section-title">
        <h3>Unit Builder - ${state.selectedUnit}</h3>
        <span class="label">Teacher Controlled</span>
      </div>
      <div class="split">
        <div class="mini-card">
          <strong>Overview</strong>
          <div class="muted" style="margin:10px 0;">Editable unit fields in local state only.</div>
          <div class="list">
            <div class="list-item"><span>Unit name</span><strong>${state.selectedUnit}</strong></div>
            <div class="list-item"><span>Description</span><strong>${lesson.subtitle}</strong></div>
            <div class="list-item"><span>Status</span><strong>Published</strong></div>
          </div>
        </div>
        <div class="mini-card">
          <div class="section-title" style="margin-bottom:10px;">
            <strong>Lessons</strong>
            <button class="action-btn" data-action="toggle-map">${state.learningMapOpen ? "Hide list" : "Show list"}</button>
          </div>
          <div class="list" style="margin-top:10px;">
            ${units.map((item) => `
              <button class="lesson-row ${item.name === state.selectedUnit ? "active" : ""}" data-action="select-unit" data-unit="${item.name}">
                <div class="lesson-row-main">
                  <strong>${lessonCatalog[item.name].order}. ${item.name}</strong>
                  <span class="status ${item.status}">${item.status}</span>
                </div>
                <div class="muted" style="margin-bottom:10px;">${lessonCatalog[item.name].subtitle}</div>
                <div class="progress"><span style="width:${item.progress}%"></span></div>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderContent() {
  return `
    <div class="card">
      <div class="section-title">
        <h3>Content Library</h3>
        <span class="pill">${state.approvedContent.length} published</span>
      </div>
      <div class="list">
        ${state.approvedContent.map((item) => `<div class="list-item"><strong>${item}</strong><span class="status done">Published</span></div>`).join("")}
        ${state.aiDrafts.map((item) => `<div class="list-item"><strong>${item}</strong><span class="status current">AI Draft</span></div>`).join("")}
      </div>
    </div>
  `;
}

function renderAnalytics() {
  return `
    <div class="card">
      <div class="section-title">
        <h3>Spiral Learning Analytics</h3>
        <span class="label">Automatically tracked</span>
      </div>
      <div class="timeline">
        <div class="timeline-item"><strong>I like ___.</strong><div class="timeline-track"><span style="width:80%"></span></div></div>
        <div class="timeline-item"><strong>/z/</strong><div class="timeline-track"><span style="width:40%"></span></div></div>
      </div>
    </div>
  `;
}

function renderStudentDetail() {
  return `
    <div class="split">
      <div class="card">
        <div class="section-title">
          <h3>Anna</h3>
          <span class="pill">Age 7</span>
        </div>
        <div class="card-grid">
          <div class="mini-card"><div class="metric-value">92%</div><div class="metric-label">Vocabulary</div></div>
          <div class="mini-card"><div class="metric-value">88%</div><div class="metric-label">Listening</div></div>
          <div class="mini-card"><div class="metric-value">78%</div><div class="metric-label">Speaking</div></div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">
          <h3>AI Teacher Insight</h3>
          <span class="label">AI Assisted</span>
        </div>
        <p class="muted">Anna understands target vocabulary well but has lower confidence when producing complete sentences.</p>
        <button class="secondary-btn">Assign Suggested Activity</button>
      </div>
    </div>
  `;
}

function renderAIStudio() {
  return `
    <div class="card">
      <div class="section-title">
        <h3>AI Teaching Studio</h3>
        <span class="label">Teacher approval required</span>
      </div>
      <div class="split">
        <div class="mini-card">
          <strong>Inputs</strong>
          <div class="muted" style="margin-top:10px;">Course: Starters</div>
          <div class="muted">Unit: At the Zoo</div>
          <div class="muted">Target: giraffe, zebra, elephant</div>
        </div>
        <div class="mini-card">
          <strong>Generated Draft</strong>
          <div class="muted" style="margin-top:10px;">Lucy and the Lost Zebra</div>
          <div class="badge-row" style="margin-top:12px;">
            <span class="label">Draft</span>
            <span class="label">Needs Review</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderWelcome() {
  return `
    <div class="hero">
      <div class="hero-grid">
        <div>
          <div class="pill">Steps English</div>
          <h2>English grows naturally.</h2>
          <p>Stories. Songs. Play. Speak. Repeat. This demo shows the full discovery journey with local mock state only.</p>
          <div class="hero-actions">
            <button class="primary-btn" data-role="student">Start Student Demo</button>
            <button class="secondary-btn" data-role="admin">Open Teacher Portal</button>
          </div>
        </div>
        <div class="card" style="background: rgba(255,255,255,0.14); color: white; border-color: rgba(255,255,255,0.18);">
          <div class="badge-row">
            <span class="label" style="background: rgba(255,255,255,0.18); color: white;">Student View</span>
            <span class="label" style="background: rgba(255,255,255,0.18); color: white;">Teacher/Admin View</span>
          </div>
          <div style="margin-top: 16px; line-height: 1.8;">
            <div>• Full unit journey</div>
            <div>• Spiral learning</div>
            <div>• AI suggests, teacher decides</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBody() {
  const role = state.currentRole;
  const page = role === "student" ? state.activeStudentPage : state.activeAdminPage;
  el("pageEyebrow").textContent = role === "student" ? "Student journey" : "Teacher / Admin";
  el("pageTitle").textContent =
    role === "student" ? "Student Demo" : "Teacher Portal Demo";
  el("pageSubtitle").textContent =
    role === "student"
      ? "A child moves through one complete learning loop across meaningful input, practice, speaking, and review."
      : "The teacher sees curriculum, AI suggestions, and spiral exposure in one place.";

  let body = "";
  if (state.activePage === "welcome") body = renderWelcome();
  else if (role === "student" && page === "home") body = renderStudentHome();
  else if (role === "student" && page === "map") body = renderStudentMap();
  else if (role === "student" && page === "unit") body = renderUnitDetail();
  else if (role === "student" && page === "journey") body = renderStudentJourney();
  else if (role === "student" && page === "review") body = renderStudentReview();
  else if (role === "student" && page === "progress") body = renderStudentProgress();
  else if (role === "admin" && page === "dashboard") body = renderAdminDashboard();
  else if (role === "admin" && page === "courses") body = renderCourses();
  else if (role === "admin" && page === "builder") body = renderBuilder();
  else if (role === "admin" && page === "content") body = renderContent();
  else if (role === "admin" && page === "analytics") body = renderAnalytics();
  else if (role === "admin" && page === "student") body = renderStudentDetail();
  else if (role === "admin" && page === "ai") body = renderAIStudio();
  else body = renderWelcome();

  el("content").innerHTML = body;
  document.querySelectorAll(".chip").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.role === role);
  });
  const roleSelect = el("roleSelect");
  if (roleSelect) roleSelect.value = role;
  renderNav();
  renderMetrics();
}

function render() {
  try {
    renderBody();
  } catch (error) {
    const content = el("content");
    if (content) {
      content.innerHTML = `
        <div class="card">
          <div class="section-title">
            <h3>Render error</h3>
            <span class="status locked">fix needed</span>
          </div>
          <pre style="white-space:pre-wrap;margin:0;color:#b91c1c;">${String(error && error.stack ? error.stack : error)}</pre>
        </div>
      `;
    }
    console.error(error);
  }
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-page], [data-action]");
    if (!target) return;

    const page = target.dataset.page;
    const action = target.dataset.action;

    if (page) {
      setPage(page);
      return;
    }

    if (action === "continue-unit") {
      setPage("unit");
      return;
    }

    if (action === "toggle-map") {
      state.learningMapOpen = !state.learningMapOpen;
      saveState();
      render();
      return;
    }

    if (action === "select-unit") {
      state.selectedUnit = target.dataset.unit;
      state.activeStudentPage = "unit";
      state.learningMapOpen = false;
      saveState();
      render();
      return;
    }

    if (action === "set-step-story") {
      setLessonStep("story");
      return;
    }

    if (action === "step-story") {
      setLessonStep("story");
      state.storyStep = 0;
      state.activeStudentPage = "unit";
      saveState();
      render();
      return;
    }

    if (action === "set-step-speak") {
      setLessonStep("speak");
      return;
    }

    if (action === "step-song") {
      setLessonStep("song");
      return;
    }

    if (action === "step-listen") {
      setLessonStep("listen");
      return;
    }

    if (action === "step-say") {
      setLessonStep("say");
      return;
    }

    if (action === "step-phonics") {
      setLessonStep("phonics");
      return;
    }

    if (action === "step-game") {
      setLessonStep("game");
      return;
    }

    if (action === "step-speak") {
      setLessonStep("speak");
      return;
    }

    if (action === "step-review") {
      setLessonStep("review");
      return;
    }

    if (action === "story-next") {
      advanceStory();
      return;
    }

    if (action === "story-restart") {
      state.storyStep = 0;
      state.studentLessonStep = "story";
      saveState();
      render();
      return;
    }

    if (action === "story-correct") {
      addStars(5);
      return;
    }

    if (action === "song-complete") {
      state.studentLessonStep = "listen";
      state.unitProgress = Math.max(state.unitProgress, 60);
      completeActivity("song", 10);
      saveState();
      render();
      return;
    }

    if (action === "listen-answer") {
      completeActivity("listen", 10);
      state.studentLessonStep = "say";
      state.unitProgress = Math.max(state.unitProgress, 70);
      saveState();
      render();
      return;
    }

    if (action === "say-correct") {
      completeActivity("say", 10);
      state.studentLessonStep = "phonics";
      state.unitProgress = Math.max(state.unitProgress, 78);
      saveState();
      render();
      return;
    }

    if (action === "phonics-correct") {
      completeActivity("phonics", 10);
      state.studentLessonStep = "game";
      state.unitProgress = Math.max(state.unitProgress, 84);
      saveState();
      render();
      return;
    }

    if (action === "game-correct") {
      completeActivity("game", 10);
      state.missionProgress.games += 1;
      if (state.missionProgress.games >= 3) state.studentLessonStep = "speak";
      saveState();
      render();
      return;
    }

    if (action === "speak-complete") {
      completeActivity("speak", 15);
      state.missionProgress.speaking += 1;
      state.studentLessonStep = "review";
      state.unitProgress = Math.max(state.unitProgress, 92);
      saveState();
      render();
      return;
    }

    if (action === "review-complete") {
      completeActivity("review", 20);
      state.unitProgress = 100;
      state.reviewStatus["/z/"] = "Improving";
      state.activeStudentPage = "progress";
      state.activePage = "progress";
      saveState();
      render();
      return;
    }

    if (action === "review-session") {
      state.stars += 20;
      state.reviewStatus["/z/"] = "Improving";
      saveState();
      render();
      return;
    }
  });

  el("resetDemo").addEventListener("click", resetDemo);
  el("roleSelect").addEventListener("change", (event) => {
    setRole(event.target.value);
    setPage(event.target.value === "student" ? "home" : "dashboard");
  });
}

bindEvents();
render();
