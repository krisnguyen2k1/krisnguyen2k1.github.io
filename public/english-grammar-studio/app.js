(function () {
  "use strict";

  const COURSE = window.GRAMMAR_COURSE;
  const STORAGE_KEY = "englishGrammarStudioProgressV1";
  const appView = document.getElementById("app-view");
  const dialog = document.getElementById("course-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogContent = document.getElementById("dialog-content");
  const toast = document.getElementById("toast");

  const defaultState = {
    completedLessons: [],
    answers: {},
    selfChecks: {},
    currentLesson: 1,
    lessonTimers: {},
    mockResults: {},
    lastView: "dashboard",
  };

  let state = loadState();
  let activeView = "dashboard";
  let lessonTimerInterval = null;
  let lessonTimerRunning = false;
  let mockTimerInterval = null;
  let mockSecondsRemaining = 0;
  let activeMockId = null;
  let toastTimeout = null;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? { ...defaultState, ...saved } : { ...defaultState };
    } catch (error) {
      return { ...defaultState };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateGlobalProgress();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalise(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:]+$/g, "")
      .replace(/\s+/g, " ")
      .replaceAll("’", "'");
  }

  function getQuestion(questionId) {
    return COURSE.allQuestions.find((question) => question.id === questionId);
  }

  function getLesson(lessonId) {
    return COURSE.lessons.find((lesson) => lesson.id === Number(lessonId));
  }

  function attemptedCount() {
    return Object.keys(state.answers).length + Object.keys(state.selfChecks).length;
  }

  function accuracy() {
    const results = Object.values(state.answers);
    if (!results.length) return 0;
    return Math.round((results.filter((result) => result.correct).length / results.length) * 100);
  }

  function coursePercent() {
    const lessonPart = (state.completedLessons.length / COURSE.totals.lessons) * 75;
    const practicePart = Math.min(attemptedCount() / COURSE.totals.questions, 1) * 25;
    return Math.round(lessonPart + practicePart);
  }

  function updateGlobalProgress() {
    const percent = coursePercent();
    const label = document.getElementById("header-progress-label");
    const bar = document.getElementById("header-progress-bar");
    if (label) label.textContent = `${percent}% complete`;
    if (bar) bar.style.width = `${percent}%`;
  }

  function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function setDialog(title, html) {
    dialogTitle.textContent = title;
    dialogContent.innerHTML = html;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function stopTimers() {
    clearInterval(lessonTimerInterval);
    clearInterval(mockTimerInterval);
    lessonTimerInterval = null;
    mockTimerInterval = null;
    lessonTimerRunning = false;
  }

  function formatTime(totalSeconds) {
    const safe = Math.max(0, Number(totalSeconds) || 0);
    const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
    const seconds = Math.floor(safe % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function seededShuffle(items, seed) {
    const copy = [...items];
    let value = seed >>> 0;
    const random = () => {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function randomShuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function parseRoute() {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash.startsWith("lesson-")) {
      return { view: "course", lessonId: Number(hash.split("-")[1]) || state.currentLesson };
    }
    const valid = ["dashboard", "course", "practice", "mocks", "teacher"];
    return { view: valid.includes(hash) ? hash : state.lastView || "dashboard" };
  }

  function navigate(view, options = {}) {
    stopTimers();
    activeView = view;
    state.lastView = view;
    if (options.lessonId) {
      state.currentLesson = Number(options.lessonId);
      window.location.hash = `lesson-${state.currentLesson}`;
    } else {
      window.location.hash = view;
    }
    saveState();
    updateNav();
    renderView(options);
    if (!options.keepScroll) {
      document.querySelector(".workspace").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updateNav() {
    document.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === activeView);
      if (button.dataset.view === activeView) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function viewHeading(kicker, title, intro, actionHtml = "") {
    return `
      <header class="view-heading">
        <div>
          <p class="section-kicker">${escapeHtml(kicker)}</p>
          <h2 tabindex="-1">${escapeHtml(title)}</h2>
          <p>${escapeHtml(intro)}</p>
        </div>
        ${actionHtml}
      </header>`;
  }

  function renderView(options = {}) {
    if (activeView === "dashboard") renderDashboard();
    if (activeView === "course") {
      const hasLesson = Object.prototype.hasOwnProperty.call(options, "lessonId") && options.lessonId;
      renderCourse(hasLesson ? options.lessonId : null);
    }
    if (activeView === "practice") renderPractice();
    if (activeView === "mocks") renderMocks();
    if (activeView === "teacher") renderTeacher();
    window.requestAnimationFrame(() => appView.querySelector("h2")?.focus({ preventScroll: true }));
  }

  function renderDashboard() {
    const completed = state.completedLessons.length;
    const nextLesson = COURSE.lessons.find((lesson) => !state.completedLessons.includes(lesson.id)) || COURSE.lessons[0];
    const routeItems = COURSE.lessons.map((lesson) => `
      <li>
        <span class="route-index">${lesson.id.toString().padStart(2, "0")}</span>
        <span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.short)}</small></span>
        <span class="route-time">40 min</span>
      </li>`).join("");

    appView.innerHTML = `
      ${viewHeading("Course dashboard", "A ten-hour route from forms to fluent choices.", "Complete the fifteen 40-minute lessons in order, or open any topic when your class needs focused review.", `<button class="button button-primary" type="button" data-open-lesson="${nextLesson.id}">Continue lesson ${nextLesson.id}</button>`)}
      <div class="dashboard-grid">
        <section class="panel" aria-labelledby="progress-title">
          <h3 id="progress-title">Your progress</h3>
          <p>Lesson completion and practice attempts are stored locally on this device.</p>
          <div class="progress-track large-progress" aria-label="${coursePercent()} percent complete"><span style="width:${coursePercent()}%"></span></div>
          <div class="stat-grid">
            <div class="stat"><span class="stat-value">${completed}/15</span><span class="stat-label">lessons complete</span></div>
            <div class="stat"><span class="stat-value">${attemptedCount()}</span><span class="stat-label">exercises attempted</span></div>
            <div class="stat"><span class="stat-value">${accuracy()}%</span><span class="stat-label">auto-graded accuracy</span></div>
          </div>
          <div class="resume-card">
            <strong>Next: Lesson ${nextLesson.id}, ${escapeHtml(nextLesson.title)}</strong>
            <span>${escapeHtml(nextLesson.objective)}</span>
          </div>
        </section>
        <aside class="panel panel-inverse" aria-labelledby="method-title">
          <h3 id="method-title">The 40-minute lesson rhythm</h3>
          <p>Each session uses the same predictable sequence, so students spend less energy finding their way and more energy noticing grammar.</p>
          <div class="stat-grid">
            <div class="stat"><span class="stat-value">5</span><span class="stat-label">minutes to retrieve</span></div>
            <div class="stat"><span class="stat-value">12</span><span class="stat-label">minutes to learn</span></div>
            <div class="stat"><span class="stat-value">23</span><span class="stat-label">minutes to practise and reflect</span></div>
          </div>
        </aside>
      </div>
      <section class="lesson-section" aria-labelledby="route-title">
        <h3 id="route-title">The complete route</h3>
        <ol class="route-list">${routeItems}</ol>
      </section>`;
  }

  function renderLessonCard(lesson) {
    const complete = state.completedLessons.includes(lesson.id);
    const attempted = lesson.questions.filter((question) => state.answers[question.id] || state.selfChecks[question.id]).length;
    return `
      <article class="lesson-card ${complete ? "is-complete" : ""}">
        <div class="question-topline">
          <span class="lesson-number">Lesson ${lesson.id.toString().padStart(2, "0")}</span>
          <span class="chip ${complete ? "chip-complete" : ""}">${complete ? "Complete" : `${attempted}/20 tried`}</span>
        </div>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p>${escapeHtml(lesson.short)}</p>
        <div class="card-actions">
          <button class="button button-secondary button-small" type="button" data-open-lesson="${lesson.id}">${complete ? "Review lesson" : "Open lesson"}</button>
        </div>
      </article>`;
  }

  function renderCourse(lessonId) {
    if (!lessonId) {
      appView.innerHTML = `
        ${viewHeading("Fifteen focused lessons", "Build the whole grammar system one decision at a time.", "Every lesson contains a simple explanation, examples, common mistakes, a teacher activity, and twenty original practice items.")}
        <div class="lesson-grid">${COURSE.lessons.map(renderLessonCard).join("")}</div>`;
      return;
    }
    renderLesson(lessonId);
  }

  function renderLesson(lessonId) {
    const lesson = getLesson(lessonId) || COURSE.lessons[0];
    state.currentLesson = lesson.id;
    saveState();
    const complete = state.completedLessons.includes(lesson.id);
    const timerSeconds = state.lessonTimers[lesson.id] ?? COURSE.lessonMinutes * 60;
    const nav = COURSE.lessons.map((item) => `
      <li><button class="lesson-link ${item.id === lesson.id ? "is-active" : ""} ${state.completedLessons.includes(item.id) ? "is-complete" : ""}" type="button" data-open-lesson="${item.id}">${item.id}. ${escapeHtml(item.title)}</button></li>`).join("");
    const concepts = lesson.concepts.map((concept) => `
      <article class="concept-card">
        <h3>${escapeHtml(concept.name)}</h3>
        <code class="formula">${escapeHtml(concept.form)}</code>
        <p>${escapeHtml(concept.use)}</p>
      </article>`).join("");
    const examples = lesson.examples.map((example, index) => `
      <div class="example">
        <span class="example-index">${index + 1}</span>
        <p><strong>${escapeHtml(example.sentence)}</strong><small>${escapeHtml(example.note)}</small></p>
      </div>`).join("");
    const mistakes = lesson.mistakes.map((mistake) => `
      <article class="mistake-card">
        <span class="wrong">${escapeHtml(mistake.wrong)}</span>
        <span class="right">${escapeHtml(mistake.right)}</span>
        <p>${escapeHtml(mistake.why)}</p>
      </article>`).join("");

    appView.innerHTML = `
      <div class="course-shell">
        <aside class="lesson-sidebar" aria-label="Lesson navigation">
          <h2>Course contents</h2>
          <ol class="lesson-nav-list">${nav}</ol>
          <div class="action-row" style="margin-top:1rem">
            <button class="text-button" type="button" data-view="course">View all lessons</button>
          </div>
        </aside>
        <article class="lesson-main">
          <header class="lesson-hero">
            <p class="section-kicker">Lesson ${lesson.id} of 15</p>
            <h2 tabindex="-1">${escapeHtml(lesson.title)}</h2>
            <p class="lesson-intro">${escapeHtml(lesson.objective)}</p>
            <div class="lesson-meta">
              <span class="chip">40 minutes</span>
              <span class="chip">20 exercises</span>
              <span class="chip">Form + meaning + use</span>
              ${complete ? `<span class="chip chip-complete">Lesson complete</span>` : ""}
            </div>
            <div class="lesson-tools">
              <div class="lesson-timer">
                <span><span class="timer-label">Lesson timer</span><span class="timer-value" id="lesson-timer-value">${formatTime(timerSeconds)}</span></span>
                <button class="button button-secondary button-small" type="button" data-action="timer-toggle">Start timer</button>
                <button class="text-button" type="button" data-action="timer-reset">Reset</button>
              </div>
              <button class="button ${complete ? "button-secondary" : "button-primary"} button-small" type="button" data-action="toggle-lesson-complete" data-lesson-id="${lesson.id}">${complete ? "Mark incomplete" : "Mark lesson complete"}</button>
            </div>
          </header>

          <section class="lesson-section" aria-labelledby="concepts-${lesson.id}">
            <h3 id="concepts-${lesson.id}">See the system</h3>
            <p>Read the form, then ask what meaning the speaker needs. The same time reference can allow more than one form when the focus changes.</p>
            <div class="concept-grid">${concepts}</div>
          </section>

          <section class="lesson-section" aria-labelledby="examples-${lesson.id}">
            <h3 id="examples-${lesson.id}">Notice it in context</h3>
            <div class="example-list">${examples}</div>
          </section>

          <section class="lesson-section" aria-labelledby="mistakes-${lesson.id}">
            <h3 id="mistakes-${lesson.id}">Avoid the common traps</h3>
            <div class="mistake-grid">${mistakes}</div>
          </section>

          <section class="lesson-section" aria-labelledby="pacing-${lesson.id}">
            <h3 id="pacing-${lesson.id}">Run the 40-minute session</h3>
            <div class="pacing-grid">
              <div class="pace-step"><strong>0-5 min</strong><span>Recall one rule and create one example without notes.</span></div>
              <div class="pace-step"><strong>5-17 min</strong><span>Teach the four concept cards and compare meanings.</span></div>
              <div class="pace-step"><strong>17-25 min</strong><span>Work through examples and correct the two common traps.</span></div>
              <div class="pace-step"><strong>25-37 min</strong><span>Complete eight core questions, then discuss choices.</span></div>
              <div class="pace-step"><strong>37-40 min</strong><span>Use one challenge item as the exit ticket.</span></div>
            </div>
            <div class="teacher-note" style="margin-top:1rem">
              <strong>Teacher move</strong>
              <p>${escapeHtml(lesson.teaching)}</p>
            </div>
          </section>

          <section class="lesson-section" aria-labelledby="practice-${lesson.id}">
            <h3 id="practice-${lesson.id}">Practise until the choice feels natural</h3>
            <p>The first twelve items are auto-graded. The final eight use a model answer and self-check so students also practise editing and sentence building.</p>
            <div class="filter-row" role="group" aria-label="Question filter">
              <button class="filter-button is-active" type="button" data-question-filter="all">All 20</button>
              <button class="filter-button" type="button" data-question-filter="core">Core 12</button>
              <button class="filter-button" type="button" data-question-filter="challenge">Challenge 8</button>
            </div>
            <div class="question-list" id="lesson-question-list">${lesson.questions.map((question, index) => renderQuestion(question, index + 1)).join("")}</div>
          </section>
        </article>
      </div>`;
  }

  function renderQuestion(question, number, options = {}) {
    const saved = state.answers[question.id];
    const selfCheck = state.selfChecks[question.id];
    const statusClass = saved ? (saved.correct ? "is-correct" : "is-incorrect") : "";
    let control = "";
    if (question.type === "mc") {
      control = `<div class="choices" role="group" aria-label="Answer choices">${question.choices.map((choice, index) => {
        const selected = saved && Number(saved.user) === index;
        return `<button class="choice-button ${selected ? "is-selected" : ""}" type="button" data-choice-index="${index}">${String.fromCharCode(65 + index)}. ${escapeHtml(choice)}</button>`;
      }).join("")}</div>`;
    } else if (question.type === "fill") {
      control = `<label><span class="sr-only">Your answer</span><input class="answer-input" type="text" value="${saved ? escapeHtml(saved.user) : ""}" autocomplete="off" placeholder="Type your answer"></label>`;
    } else {
      control = `<label><span class="sr-only">Your sentence</span><textarea class="writing-input" placeholder="Write your sentence before revealing the model answer.">${selfCheck?.draft ? escapeHtml(selfCheck.draft) : ""}</textarea></label>`;
    }

    let feedback = "";
    if (saved) {
      feedback = `<div class="feedback ${saved.correct ? "correct" : "incorrect"}"><strong>${saved.correct ? "Correct" : "Review this choice"}</strong>${escapeHtml(question.explanation)}${saved.correct ? "" : `<br><strong>Answer:</strong> ${escapeHtml(question.type === "mc" ? question.choices[question.answer] : question.model)}`}</div>`;
    }
    if (selfCheck?.revealed) {
      feedback = `<div class="model-answer"><strong>Model answer</strong><p>${escapeHtml(question.model)}</p><p>${escapeHtml(question.explanation)}</p><div class="self-check-row"><button class="self-check-button" type="button" data-self-check="got-it">I got it</button><button class="self-check-button" type="button" data-self-check="review">Review later</button></div></div>`;
    }

    const actions = question.type === "mc" || question.type === "fill"
      ? `<button class="button button-primary button-small" type="button" data-action="check-answer">Check answer</button>`
      : `<button class="button button-primary button-small" type="button" data-action="reveal-model">Reveal model answer</button>`;

    return `
      <article class="question-card ${statusClass}" data-question-id="${question.id}" data-tier="${question.tier}">
        <div class="question-topline">
          <span class="question-number">Question ${number}</span>
          <span class="question-type">${question.tier} · ${question.type === "mc" ? "multiple choice" : question.type === "fill" ? "short answer" : question.type}</span>
        </div>
        <p class="question-prompt">${escapeHtml(question.prompt)}</p>
        ${control}
        <div class="question-actions">
          ${actions}
          <button class="text-button" type="button" data-action="show-hint">Show hint</button>
        </div>
        ${feedback}
      </article>`;
  }

  function checkQuestion(card) {
    const question = getQuestion(card.dataset.questionId);
    if (!question) return;
    let user;
    let correct = false;
    if (question.type === "mc") {
      const selected = card.querySelector(".choice-button.is-selected");
      if (!selected) return showToast("Choose an answer first.");
      user = Number(selected.dataset.choiceIndex);
      correct = user === question.answer;
    } else if (question.type === "fill") {
      user = card.querySelector(".answer-input").value;
      if (!normalise(user)) return showToast("Type an answer first.");
      correct = question.answers.some((answer) => normalise(answer) === normalise(user));
    }
    state.answers[question.id] = { correct, user, checkedAt: Date.now() };
    saveState();
    const number = [...card.parentElement.children].indexOf(card) + 1;
    card.outerHTML = renderQuestion(question, number);
    showToast(correct ? "Correct. Keep going." : "Not yet. Read the explanation and try to explain the rule.");
  }

  function revealModel(card) {
    const question = getQuestion(card.dataset.questionId);
    const draft = card.querySelector(".writing-input")?.value || "";
    state.selfChecks[question.id] = { ...(state.selfChecks[question.id] || {}), draft, revealed: true };
    saveState();
    const number = [...card.parentElement.children].indexOf(card) + 1;
    card.outerHTML = renderQuestion(question, number);
  }

  function setSelfCheck(card, result) {
    const question = getQuestion(card.dataset.questionId);
    const existing = state.selfChecks[question.id] || {};
    state.selfChecks[question.id] = { ...existing, result, checkedAt: Date.now() };
    saveState();
    showToast(result === "got-it" ? "Marked as understood." : "Added to your review list.");
  }

  function renderPractice() {
    const wrong = Object.entries(state.answers).filter(([, result]) => !result.correct).length;
    const review = Object.values(state.selfChecks).filter((result) => result.result === "review").length;
    appView.innerHTML = `
      ${viewHeading("Practice laboratory", "Train the exact decision that gives you trouble.", "Create a fresh mixed set, revisit errors, practise sentence building, or write a short response with a clear grammar target.")}
      <div class="practice-grid">
        <article class="practice-card">
          <span class="chip">20 questions</span>
          <h3 style="margin-top:1rem">Quick mixed review</h3>
          <p>A balanced set drawn from all fifteen lessons. The order changes each time.</p>
          <div class="card-actions"><button class="button button-primary button-small" type="button" data-start-practice="mixed">Create a mixed set</button></div>
        </article>
        <article class="practice-card">
          <span class="chip">${wrong + review} items waiting</span>
          <h3 style="margin-top:1rem">My error clinic</h3>
          <p>Return to incorrect auto-graded answers and sentence tasks marked for review.</p>
          <div class="card-actions"><button class="button button-secondary button-small" type="button" data-start-practice="errors">Review my errors</button><button class="text-button" type="button" data-action="export-errors">Export error log</button></div>
        </article>
        <article class="practice-card">
          <span class="chip">20 challenge items</span>
          <h3 style="margin-top:1rem">Sentence-building challenge</h3>
          <p>Edit mistakes, combine ideas, and transform sentences before comparing your work with a model.</p>
          <div class="card-actions"><button class="button button-secondary button-small" type="button" data-start-practice="challenge">Start the challenge</button></div>
        </article>
        <article class="practice-card">
          <span class="chip">8 writing prompts</span>
          <h3 style="margin-top:1rem">Writing studio</h3>
          <p>Write 120-150 words with required grammar features and use a four-part self-check rubric.</p>
          <div class="card-actions"><button class="button button-secondary button-small" type="button" data-action="open-writing">Choose a prompt</button></div>
        </article>
      </div>
      <section class="lesson-section">
        <h3>Your current error log</h3>
        ${renderErrorLog()}
      </section>`;
  }

  function renderErrorLog() {
    const autoErrors = Object.entries(state.answers)
      .filter(([, result]) => !result.correct)
      .map(([id, result]) => ({ question: getQuestion(id), result: result.user }));
    const selfErrors = Object.entries(state.selfChecks)
      .filter(([, result]) => result.result === "review")
      .map(([id, result]) => ({ question: getQuestion(id), result: result.draft || "Self-check item" }));
    const entries = [...autoErrors, ...selfErrors].filter((entry) => entry.question).slice(0, 30);
    if (!entries.length) return `<div class="empty-state">Your error log is empty. Complete a practice set and difficult items will appear here.</div>`;
    return `
      <div style="overflow-x:auto">
        <table class="error-log">
          <thead><tr><th>Lesson</th><th>Question</th><th>Your response</th><th>Rule to review</th></tr></thead>
          <tbody>${entries.map(({ question, result }) => `<tr><td>${question.lessonId}. ${escapeHtml(question.lessonTitle)}</td><td>${escapeHtml(question.prompt)}</td><td>${escapeHtml(result)}</td><td>${escapeHtml(question.explanation)}</td></tr>`).join("")}</tbody>
        </table>
      </div>`;
  }

  function startPractice(mode) {
    let questions = [];
    let title = "Quick mixed review";
    if (mode === "mixed") questions = randomShuffle(COURSE.allQuestions.filter((question) => question.type === "mc" || question.type === "fill")).slice(0, 20);
    if (mode === "challenge") {
      title = "Sentence-building challenge";
      questions = randomShuffle(COURSE.allQuestions.filter((question) => question.tier === "challenge")).slice(0, 20);
    }
    if (mode === "errors") {
      title = "My error clinic";
      const ids = [
        ...Object.entries(state.answers).filter(([, result]) => !result.correct).map(([id]) => id),
        ...Object.entries(state.selfChecks).filter(([, result]) => result.result === "review").map(([id]) => id),
      ];
      questions = randomShuffle(ids.map(getQuestion).filter(Boolean)).slice(0, 30);
    }
    appView.innerHTML = `
      ${viewHeading("Focused practice", title, questions.length ? "Check each answer immediately, explain the rule aloud, and repeat any item you miss." : "There are no saved errors yet. Try a mixed review first.", `<button class="button button-secondary button-small" type="button" data-view="practice">Back to Practice Lab</button>`)}
      ${questions.length ? `<div class="question-list">${questions.map((question, index) => renderQuestion(question, index + 1)).join("")}</div>` : `<div class="empty-state">No review items are waiting.</div>`}`;
    document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
  }

  function renderMocks() {
    const mocks = [
      { id: "A", seed: 1101, focus: "Balanced core review" },
      { id: "B", seed: 2202, focus: "Accuracy under time pressure" },
      { id: "C", seed: 3303, focus: "Clauses, editing, and tense control" },
      { id: "D", seed: 4404, focus: "Final mixed challenge" },
    ];
    appView.innerHTML = `
      ${viewHeading("Four full practice papers", "Rehearse the sixty-minute test experience.", "Each mock contains 36 auto-graded items and one writing task. Papers C and D are additional original practice sets, not official test blueprints.")}
      <div class="mock-grid">${mocks.map((mock) => {
        const result = state.mockResults[mock.id];
        return `<article class="mock-card">
          <span class="chip">Mock ${mock.id}</span>
          <h3 style="margin-top:1rem">${escapeHtml(mock.focus)}</h3>
          <p>36 objective questions + one 120-150 word writing task.</p>
          <div class="mock-meta"><span>60 minutes</span><span>${result ? `Latest score: ${result.score}/36` : "Not attempted"}</span></div>
          <div class="card-actions"><button class="button ${mock.id === "A" ? "button-primary" : "button-secondary"} button-small" type="button" data-start-mock="${mock.id}" data-seed="${mock.seed}">${result ? "Retake mock" : "Start mock"}</button></div>
        </article>`;
      }).join("")}</div>
      <section class="lesson-section">
        <h3>Suggested time plan</h3>
        <div class="pacing-grid">
          <div class="pace-step"><strong>0-12 min</strong><span>Multiple-choice decisions</span></div>
          <div class="pace-step"><strong>12-22 min</strong><span>Short-answer completion</span></div>
          <div class="pace-step"><strong>22-34 min</strong><span>Error analysis</span></div>
          <div class="pace-step"><strong>34-50 min</strong><span>Sentence transformation</span></div>
          <div class="pace-step"><strong>50-60 min</strong><span>Writing and final check</span></div>
        </div>
      </section>`;
  }

  function mockQuestions(seed) {
    const auto = COURSE.allQuestions.filter((question) => question.type === "mc" || question.type === "fill");
    const byLesson = COURSE.lessons.flatMap((lesson) => seededShuffle(lesson.questions.filter((q) => q.type === "mc" || q.type === "fill"), seed + lesson.id).slice(0, 2));
    const remaining = seededShuffle(auto.filter((question) => !byLesson.some((picked) => picked.id === question.id)), seed + 99).slice(0, 6);
    return seededShuffle([...byLesson, ...remaining], seed + 7);
  }

  function startMock(id, seed) {
    activeMockId = id;
    const questions = mockQuestions(seed);
    const writing = COURSE.writingPrompts[(id.charCodeAt(0) - 65) % COURSE.writingPrompts.length];
    mockSecondsRemaining = 60 * 60;
    appView.innerHTML = `
      <header class="view-heading">
        <div><p class="section-kicker">Timed assessment</p><h2 tabindex="-1">Mock Exam ${id}</h2><p>Answer every objective item, complete the writing task, then submit once. Feedback appears after submission.</p></div>
        <button class="button button-secondary button-small" type="button" data-view="mocks">Exit mock</button>
      </header>
      <div class="mock-exam-head">
        <strong>36 objective questions + writing</strong>
        <span class="mock-clock" id="mock-clock">${formatTime(mockSecondsRemaining)}</span>
        <button class="button button-primary button-small" type="button" data-action="submit-mock">Submit mock</button>
      </div>
      <form id="mock-form" data-mock-id="${id}">
        <div class="question-list">${questions.map((question, index) => renderExamQuestion(question, index + 1)).join("")}</div>
        <article class="writing-card" style="margin-top:1rem;padding:1.5rem">
          <span class="question-type">Writing task</span>
          <h3>${escapeHtml(writing.title)}</h3>
          <p>${escapeHtml(writing.prompt)}</p>
          <label><span class="sr-only">Your writing response</span><textarea class="writing-input" name="mock-writing" placeholder="Write 120-150 words here."></textarea></label>
          <p class="muted">Self-check: target grammar, accurate form, clear organisation, and careful editing.</p>
        </article>
        <div class="action-row" style="margin-top:1.5rem"><button class="button button-primary" type="button" data-action="submit-mock">Submit Mock ${id}</button></div>
      </form>`;
    document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
    startMockTimer();
  }

  function renderExamQuestion(question, number) {
    const control = question.type === "mc"
      ? `<div class="choices">${question.choices.map((choice, index) => `<label class="choice-button"><input type="radio" name="exam-${question.id}" value="${index}"> ${String.fromCharCode(65 + index)}. ${escapeHtml(choice)}</label>`).join("")}</div>`
      : `<label><span class="sr-only">Your answer</span><input class="answer-input" name="exam-${question.id}" type="text" autocomplete="off" placeholder="Type your answer"></label>`;
    return `
      <article class="question-card" data-exam-question="${question.id}">
        <div class="question-topline"><span class="question-number">Question ${number}</span><span class="question-type">${question.lessonTitle}</span></div>
        <p class="question-prompt">${escapeHtml(question.prompt)}</p>
        ${control}
      </article>`;
  }

  function startMockTimer() {
    clearInterval(mockTimerInterval);
    mockTimerInterval = setInterval(() => {
      mockSecondsRemaining -= 1;
      const clock = document.getElementById("mock-clock");
      if (clock) clock.textContent = formatTime(mockSecondsRemaining);
      if (mockSecondsRemaining <= 0) {
        clearInterval(mockTimerInterval);
        showToast("Time is up. Your objective answers are being submitted.");
        submitMock();
      }
    }, 1000);
  }

  function submitMock() {
    const form = document.getElementById("mock-form");
    if (!form) return;
    clearInterval(mockTimerInterval);
    const cards = [...form.querySelectorAll("[data-exam-question]")];
    let score = 0;
    let answered = 0;
    const details = cards.map((card) => {
      const question = getQuestion(card.dataset.examQuestion);
      let user = "";
      let correct = false;
      if (question.type === "mc") {
        const selected = card.querySelector("input:checked");
        if (selected) {
          user = Number(selected.value);
          answered += 1;
          correct = user === question.answer;
        }
      } else {
        user = card.querySelector("input").value;
        if (normalise(user)) answered += 1;
        correct = question.answers.some((answer) => normalise(answer) === normalise(user));
      }
      if (correct) score += 1;
      return { question, user, correct };
    });
    state.mockResults[activeMockId] = { score, answered, completedAt: Date.now() };
    saveState();
    appView.innerHTML = `
      ${viewHeading("Mock exam result", `Mock ${activeMockId}: ${score}/36`, "Use the explanations below to classify each error by form, meaning, or careless execution.", `<button class="button button-secondary button-small" type="button" data-view="mocks">Back to mock exams</button>`)}
      <div class="diagnostic-result">
        <p class="section-kicker">Objective score</p>
        <div class="result-score">${Math.round((score / 36) * 100)}%</div>
        <p>${answered}/36 questions answered. The writing task is not auto-graded; use the four-point rubric below.</p>
        <div class="summary-grid" style="margin-top:1rem">
          <div class="summary-card"><h3>Form</h3><p>Are tense, agreement, articles, and verb patterns accurate?</p></div>
          <div class="summary-card"><h3>Meaning and use</h3><p>Does each grammar choice express the intended time, certainty, or relationship?</p></div>
          <div class="summary-card"><h3>Organisation</h3><p>Is there a clear topic sentence and a logical sequence with suitable connectors?</p></div>
          <div class="summary-card"><h3>Editing</h3><p>Did you leave time to find and correct your own repeated errors?</p></div>
        </div>
      </div>
      <section class="lesson-section"><h3>Answer review</h3><div class="question-list">${details.map((detail, index) => renderExamResult(detail, index + 1)).join("")}</div></section>`;
    document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
  }

  function renderExamResult({ question, user, correct }, number) {
    const userText = question.type === "mc" ? (question.choices[user] || "No answer") : (user || "No answer");
    const answerText = question.type === "mc" ? question.choices[question.answer] : question.model;
    return `
      <article class="question-card ${correct ? "is-correct" : "is-incorrect"}">
        <div class="question-topline"><span class="question-number">Question ${number}</span><span class="question-type">${correct ? "correct" : "review"}</span></div>
        <p class="question-prompt">${escapeHtml(question.prompt)}</p>
        <div class="feedback ${correct ? "correct" : "incorrect"}"><strong>Your answer: ${escapeHtml(userText)}</strong>${correct ? "" : `<p><strong>Answer:</strong> ${escapeHtml(answerText)}</p>`}<p>${escapeHtml(question.explanation)}</p></div>
      </article>`;
  }

  function renderTeacher() {
    const rows = COURSE.lessons.map((lesson) => `<tr><td>${lesson.id}</td><td><strong>${escapeHtml(lesson.title)}</strong></td><td>${escapeHtml(lesson.objective)}</td><td>40 min</td></tr>`).join("");
    appView.innerHTML = `
      ${viewHeading("Teacher toolkit", "A complete ten-hour classroom plan, ready to adapt.", "Use the consistent lesson rhythm, projector questions, answer keys, and printable content to reduce preparation time while keeping each class active.", `<button class="button button-secondary button-small" type="button" data-action="export-teacher-plan">Export course plan</button>`)}
      <div class="teacher-grid">
        <article class="teacher-card">
          <span class="chip">Live classroom tool</span>
          <h3 style="margin-top:1rem">Question projector</h3>
          <p>Display one random question at a time, let pairs decide, then reveal the answer and explanation.</p>
          <div class="card-actions"><button class="button button-primary button-small" type="button" data-action="project-question">Project a random question</button></div>
        </article>
        <article class="teacher-card">
          <span class="chip">300 answers</span>
          <h3 style="margin-top:1rem">Answer key by lesson</h3>
          <p>Select a lesson and open a compact key with answers and teaching explanations.</p>
          <div class="card-actions">
            <label><span class="sr-only">Select lesson</span><select class="select-input" id="answer-key-lesson">${COURSE.lessons.map((lesson) => `<option value="${lesson.id}">${lesson.id}. ${escapeHtml(lesson.title)}</option>`).join("")}</select></label>
            <button class="button button-secondary button-small" type="button" data-action="open-answer-key">Open answer key</button>
          </div>
        </article>
        <article class="teacher-card">
          <span class="chip">Printable</span>
          <h3 style="margin-top:1rem">Lesson handout</h3>
          <p>Open any lesson, then use your browser's print command. Navigation and controls are removed automatically.</p>
          <div class="card-actions"><button class="button button-secondary button-small" type="button" data-open-lesson="${state.currentLesson}">Open current lesson</button></div>
        </article>
        <article class="teacher-card">
          <span class="chip">Assessment</span>
          <h3 style="margin-top:1rem">Diagnostic and exit tickets</h3>
          <p>Use the twenty-question diagnostic before the course and one challenge transformation as each lesson's exit ticket.</p>
          <div class="card-actions"><button class="button button-secondary button-small" type="button" data-action="open-diagnostic">Open diagnostic</button></div>
        </article>
      </div>
      <section class="lesson-section">
        <h3>The complete 600-minute syllabus</h3>
        <div style="overflow-x:auto"><table class="error-log"><thead><tr><th>Session</th><th>Topic</th><th>Outcome</th><th>Time</th></tr></thead><tbody>${rows}</tbody></table></div>
      </section>
      <section class="lesson-section">
        <h3>Reusable lesson routine</h3>
        <div class="pacing-grid">
          <div class="pace-step"><strong>Retrieve</strong><span>Students recall before seeing notes.</span></div>
          <div class="pace-step"><strong>Notice</strong><span>Compare examples and identify meaning.</span></div>
          <div class="pace-step"><strong>Decide</strong><span>Choose a form and justify the choice.</span></div>
          <div class="pace-step"><strong>Produce</strong><span>Edit or create a sentence in context.</span></div>
          <div class="pace-step"><strong>Reflect</strong><span>Record one error and one rule to revisit.</span></div>
        </div>
      </section>`;
  }

  function openDiagnostic() {
    const auto = COURSE.allQuestions.filter((question) => question.type === "mc" || question.type === "fill");
    const questions = seededShuffle(auto, 20260826).slice(0, 20);
    setDialog("Twenty-question diagnostic", `
      <p>Answer without notes. This diagnostic identifies topics to prioritise; it is not an official test.</p>
      <form id="diagnostic-form">
        <div class="question-list">${questions.map((question, index) => renderExamQuestion(question, index + 1)).join("")}</div>
        <div class="action-row" style="margin-top:1rem"><button class="button button-primary" type="button" data-action="submit-diagnostic">Show my result</button></div>
      </form>`);
  }

  function submitDiagnostic() {
    const form = document.getElementById("diagnostic-form");
    if (!form) return;
    const misses = new Map();
    let score = 0;
    const cards = [...form.querySelectorAll("[data-exam-question]")];
    cards.forEach((card) => {
      const question = getQuestion(card.dataset.examQuestion);
      let correct = false;
      if (question.type === "mc") {
        const selected = card.querySelector("input:checked");
        correct = selected && Number(selected.value) === question.answer;
      } else {
        const value = card.querySelector("input").value;
        correct = question.answers.some((answer) => normalise(answer) === normalise(value));
      }
      if (correct) score += 1;
      else misses.set(question.lessonId, (misses.get(question.lessonId) || 0) + 1);
    });
    const priorities = [...misses.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lessonId]) => getLesson(lessonId));
    dialogContent.innerHTML = `
      <div class="diagnostic-result">
        <p class="section-kicker">Diagnostic score</p>
        <div class="result-score">${score}/20</div>
        <p>${score >= 16 ? "Strong foundation. Use the course to sharpen accuracy and complex choices." : score >= 11 ? "Developing foundation. Complete the course in order and repeat missed items after 24 hours." : "Start with the core path and work slowly. Explain each choice before checking the answer."}</p>
        <h3>Priority lessons</h3>
        <ol>${priorities.map((lesson) => `<li><strong>${lesson.id}. ${escapeHtml(lesson.title)}</strong>: ${escapeHtml(lesson.short)}</li>`).join("") || "<li>No clear weak area appeared in this sample.</li>"}</ol>
        <div class="action-row"><button class="button button-primary button-small" type="button" data-action="close-dialog">Close and begin</button></div>
      </div>`;
  }

  function openWriting() {
    const prompt = COURSE.writingPrompts[Math.floor(Math.random() * COURSE.writingPrompts.length)];
    setDialog("Writing studio", `
      <article class="writing-card" style="padding:1.25rem">
        <p class="section-kicker">120-150 words</p>
        <h3>${escapeHtml(prompt.title)}</h3>
        <p>${escapeHtml(prompt.prompt)}</p>
        <textarea class="writing-input" id="writing-studio-input" placeholder="Write your response here."></textarea>
        <div class="summary-grid" style="margin-top:1rem">
          <div class="summary-card"><h3>1. Form</h3><p>Check tense, agreement, articles, and verb patterns.</p></div>
          <div class="summary-card"><h3>2. Meaning</h3><p>Confirm that each form expresses your intended idea.</p></div>
          <div class="summary-card"><h3>3. Organisation</h3><p>Use a topic sentence and logical connectors.</p></div>
          <div class="summary-card"><h3>4. Editing</h3><p>Read once only for grammar and punctuation.</p></div>
        </div>
        <div class="action-row" style="margin-top:1rem"><button class="button button-secondary button-small" type="button" data-action="new-writing-prompt">Choose another prompt</button></div>
      </article>`);
  }

  function projectQuestion() {
    const question = randomShuffle(COURSE.allQuestions.filter((item) => item.type === "mc"))[0];
    setDialog(`Projector: ${question.lessonTitle}`, `
      <div class="diagnostic-result">
        <p class="question-type">Whole-class decision</p>
        <p style="font-family:var(--serif);font-size:clamp(1.6rem,4vw,2.6rem);line-height:1.25">${escapeHtml(question.prompt)}</p>
        <ol class="answer-list">${question.choices.map((choice) => `<li style="padding:.55rem 0">${escapeHtml(choice)}</li>`).join("")}</ol>
        <div class="action-row"><button class="button button-primary" type="button" data-action="reveal-projected-answer" data-question-id="${question.id}">Reveal answer</button><button class="button button-secondary" type="button" data-action="project-question">Next question</button></div>
        <div id="projected-answer"></div>
      </div>`);
  }

  function revealProjectedAnswer(questionId) {
    const question = getQuestion(questionId);
    const target = document.getElementById("projected-answer");
    target.innerHTML = `<div class="feedback correct"><strong>${escapeHtml(question.choices[question.answer])}</strong>${escapeHtml(question.explanation)}</div>`;
  }

  function openAnswerKey(lessonId) {
    const lesson = getLesson(lessonId);
    setDialog(`Answer key: ${lesson.title}`, `
      <ol class="answer-list">${lesson.questions.map((question) => {
        const answer = question.type === "mc" ? question.choices[question.answer] : question.model;
        return `<li style="padding:1rem 0;border-bottom:1px solid var(--line)"><strong>${escapeHtml(question.prompt)}</strong><p><strong>Answer:</strong> ${escapeHtml(answer)}</p><small>${escapeHtml(question.explanation)}</small></li>`;
      }).join("")}</ol>`);
  }

  function exportErrors() {
    const rows = [["Lesson", "Question", "My response", "Rule"]];
    Object.entries(state.answers).filter(([, result]) => !result.correct).forEach(([id, result]) => {
      const question = getQuestion(id);
      if (question) rows.push([`${question.lessonId}. ${question.lessonTitle}`, question.prompt, String(result.user), question.explanation]);
    });
    Object.entries(state.selfChecks).filter(([, result]) => result.result === "review").forEach(([id, result]) => {
      const question = getQuestion(id);
      if (question) rows.push([`${question.lessonId}. ${question.lessonTitle}`, question.prompt, result.draft || "Self-check", question.explanation]);
    });
    downloadCsv("english-grammar-error-log.csv", rows);
  }

  function exportTeacherPlan() {
    const rows = [["Session", "Topic", "Objective", "Duration", "Teacher activity"]];
    COURSE.lessons.forEach((lesson) => rows.push([lesson.id, lesson.title, lesson.objective, "40 minutes", lesson.teaching]));
    downloadCsv("english-grammar-10-hour-teacher-plan.csv", rows);
  }

  function downloadCsv(filename, rows) {
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Download created.");
  }

  function toggleLessonTimer() {
    const lessonId = state.currentLesson;
    if (lessonTimerRunning) {
      clearInterval(lessonTimerInterval);
      lessonTimerRunning = false;
      saveState();
      document.querySelector('[data-action="timer-toggle"]')?.replaceChildren("Resume timer");
      return;
    }
    if (state.lessonTimers[lessonId] === undefined) state.lessonTimers[lessonId] = COURSE.lessonMinutes * 60;
    lessonTimerRunning = true;
    document.querySelector('[data-action="timer-toggle"]')?.replaceChildren("Pause timer");
    lessonTimerInterval = setInterval(() => {
      state.lessonTimers[lessonId] = Math.max(0, state.lessonTimers[lessonId] - 1);
      const value = document.getElementById("lesson-timer-value");
      if (value) value.textContent = formatTime(state.lessonTimers[lessonId]);
      if (state.lessonTimers[lessonId] % 10 === 0) saveState();
      if (state.lessonTimers[lessonId] <= 0) {
        clearInterval(lessonTimerInterval);
        lessonTimerRunning = false;
        saveState();
        showToast("Forty minutes complete. Finish with one exit-ticket sentence.");
      }
    }, 1000);
  }

  function resetLessonTimer() {
    state.lessonTimers[state.currentLesson] = COURSE.lessonMinutes * 60;
    saveState();
    clearInterval(lessonTimerInterval);
    lessonTimerRunning = false;
    const value = document.getElementById("lesson-timer-value");
    if (value) value.textContent = formatTime(COURSE.lessonMinutes * 60);
    document.querySelector('[data-action="timer-toggle"]')?.replaceChildren("Start timer");
  }

  function toggleLessonComplete(lessonId) {
    const id = Number(lessonId);
    if (state.completedLessons.includes(id)) state.completedLessons = state.completedLessons.filter((item) => item !== id);
    else state.completedLessons.push(id);
    state.completedLessons.sort((a, b) => a - b);
    saveState();
    renderLesson(id);
    showToast(state.completedLessons.includes(id) ? "Lesson marked complete." : "Lesson marked incomplete.");
  }

  function confirmReset() {
    setDialog("Reset all progress?", `
      <p>This removes completed lessons, saved answers, timers, mock results, and your error log from this browser. This action cannot be undone.</p>
      <div class="action-row"><button class="button button-danger" type="button" data-action="confirm-reset">Reset everything</button><button class="button button-secondary" type="button" data-action="close-dialog">Cancel</button></div>`);
  }

  function resetAllProgress() {
    state = { ...defaultState, completedLessons: [], answers: {}, selfChecks: {}, lessonTimers: {}, mockResults: {} };
    localStorage.removeItem(STORAGE_KEY);
    closeDialog();
    navigate("dashboard");
    showToast("Progress has been reset.");
  }

  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) return navigate(viewButton.dataset.view, { lessonId: viewButton.dataset.view === "course" ? null : undefined });

    const lessonButton = event.target.closest("[data-open-lesson]");
    if (lessonButton) return navigate("course", { lessonId: Number(lessonButton.dataset.openLesson) });

    const action = event.target.closest("[data-action]");
    if (action) {
      const name = action.dataset.action;
      if (name === "resume-course") {
        const next = COURSE.lessons.find((lesson) => !state.completedLessons.includes(lesson.id)) || COURSE.lessons[0];
        return navigate("course", { lessonId: next.id });
      }
      if (name === "open-diagnostic") return openDiagnostic();
      if (name === "close-dialog") return closeDialog();
      if (name === "reset-progress") return confirmReset();
      if (name === "confirm-reset") return resetAllProgress();
      if (name === "timer-toggle") return toggleLessonTimer();
      if (name === "timer-reset") return resetLessonTimer();
      if (name === "toggle-lesson-complete") return toggleLessonComplete(action.dataset.lessonId);
      if (name === "check-answer") return checkQuestion(action.closest(".question-card"));
      if (name === "reveal-model") return revealModel(action.closest(".question-card"));
      if (name === "show-hint") {
        const card = action.closest(".question-card");
        const question = getQuestion(card.dataset.questionId);
        card.querySelector(".feedback.hint")?.remove();
        action.closest(".question-actions").insertAdjacentHTML("afterend", `<div class="feedback hint"><strong>Hint</strong>${escapeHtml(question.hint)}</div>`);
        return;
      }
      if (name === "export-errors") return exportErrors();
      if (name === "open-writing" || name === "new-writing-prompt") return openWriting();
      if (name === "submit-mock") return submitMock();
      if (name === "submit-diagnostic") return submitDiagnostic();
      if (name === "project-question") return projectQuestion();
      if (name === "reveal-projected-answer") return revealProjectedAnswer(action.dataset.questionId);
      if (name === "open-answer-key") return openAnswerKey(document.getElementById("answer-key-lesson").value);
      if (name === "export-teacher-plan") return exportTeacherPlan();
    }

    const choice = event.target.closest(".choice-button[data-choice-index]");
    if (choice) {
      choice.parentElement.querySelectorAll(".choice-button").forEach((button) => button.classList.remove("is-selected"));
      choice.classList.add("is-selected");
      return;
    }

    const selfCheck = event.target.closest("[data-self-check]");
    if (selfCheck) return setSelfCheck(selfCheck.closest(".question-card"), selfCheck.dataset.selfCheck);

    const filter = event.target.closest("[data-question-filter]");
    if (filter) {
      document.querySelectorAll("[data-question-filter]").forEach((button) => button.classList.remove("is-active"));
      filter.classList.add("is-active");
      const mode = filter.dataset.questionFilter;
      document.querySelectorAll("#lesson-question-list .question-card").forEach((card) => {
        card.hidden = mode !== "all" && card.dataset.tier !== mode;
      });
      return;
    }

    const practice = event.target.closest("[data-start-practice]");
    if (practice) return startPractice(practice.dataset.startPractice);

    const mock = event.target.closest("[data-start-mock]");
    if (mock) return startMock(mock.dataset.startMock, Number(mock.dataset.seed));
  });

  window.addEventListener("hashchange", () => {
    const route = parseRoute();
    activeView = route.view;
    updateNav();
    renderView({ lessonId: route.lessonId, keepScroll: true });
  });

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    document.getElementById("page-progress-bar").style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }, { passive: true });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  const initialRoute = parseRoute();
  activeView = initialRoute.view;
  updateNav();
  updateGlobalProgress();
  renderView({ lessonId: initialRoute.lessonId, keepScroll: true });
})();
