/* =====================================================================
   D2L Quest — motor do jogo
   SPA em JavaScript puro. Rotas por hash:
     #/                mapa dos mundos
     #/mundo/:id       um mundo (briefing, cartas, chefão, charada, V/F, missão)
     #/revisao         arena de revisão espaçada (Leitner)
     #/foco            pomodoro
     #/glossario       glossário pesquisável
     #/conquistas      conquistas
     #/roteiro         plano de estudos
     #/perfil          perfil, estatísticas, backup
   ===================================================================== */
(() => {
  "use strict";

  const WORLDS = window.D2L_WORLDS;
  const REGIONS = window.D2L_REGIONS;
  const KEY = "d2lquest-v1";
  const app = document.getElementById("app");

  /* ------------------------------------------------------------------ util */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const dateStr = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (s, n) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return dateStr(d); };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const worldById = (id) => WORLDS.find((w) => w.id === id);

  /* ----------------------------------------------------------------- state */
  const defaults = () => ({
    name: "Aprendiz", avatar: "🧙", xp: 0,
    worlds: {},        // id -> {read, cards, quizBest, perfect, riddle, vf, vfBest, mission}
    solved: {},        // "id-q3" -> true (questões já acertadas no chefão)
    review: {},        // "id-q3" -> {box, due}
    achievements: {},  // id -> data
    streak: { count: 0, best: 0, last: null },
    daily: { date: dateStr(), xp: 0, correct: 0, pomos: 0, bonus: false },
    stats: { correct: 0, wrong: 0, pomos: 0, focusMin: 0, riddles: 0, reviews: 0, bestCombo: 0, missions: 0 },
    settings: { sound: true, free: false, focusMin: 25, breakMin: 5 }
  });

  let state = load();
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return merge(defaults(), JSON.parse(raw));
    } catch (e) { /* sem storage: segue com padrão */ }
    return defaults();
  }
  function merge(base, data) {
    for (const k in data) {
      if (data[k] && typeof data[k] === "object" && !Array.isArray(data[k]) && base[k] && typeof base[k] === "object") base[k] = merge(base[k], data[k]);
      else base[k] = data[k];
    }
    return base;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignora */ } }
  function ws(id) { return (state.worlds[id] = state.worlds[id] || { read: false, cards: false, quizBest: 0, perfect: false, riddle: false, vf: false, vfBest: 0, mission: false }); }
  function daily() {
    if (state.daily.date !== dateStr()) state.daily = { date: dateStr(), xp: 0, correct: 0, pomos: 0, bonus: false };
    return state.daily;
  }

  /* -------------------------------------------------------- níveis e títulos */
  const TITLES = ["Neurônio Novato", "Perceptron Aprendiz", "Caçador de Tensores", "Explorador de Gradientes", "Domador de Perdas",
    "Mestre das Ativações", "Guerreiro Convolucional", "Arquiteto Residual", "Navegador Recorrente", "Senhor da Atenção",
    "Cavaleiro Transformer", "Alquimista dos Otimizadores", "Mago dos Embeddings", "Sábio Bayesiano", "Lenda do Deep Learning"];
  function levelInfo(xp) {
    let lvl = 1, need = 100, acc = 0;
    while (xp >= acc + need) { acc += need; lvl++; need = 100 + 50 * (lvl - 1); }
    return { lvl, cur: xp - acc, need, title: TITLES[Math.min(lvl - 1, TITLES.length - 1)] };
  }

  /* ------------------------------------------------------------------ som */
  let actx = null;
  function beep(freqs, dur = 0.08, type = "square") {
    if (!state.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      freqs.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0.05, t + i * dur);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (i + 1) * dur);
        o.connect(g).connect(actx.destination);
        o.start(t + i * dur); o.stop(t + (i + 1) * dur + 0.02);
      });
    } catch (e) { /* sem áudio */ }
  }
  const sfx = {
    good: () => beep([660, 880], 0.07),
    bad: () => beep([220, 160], 0.12, "sawtooth"),
    level: () => beep([523, 659, 784, 1047], 0.1),
    win: () => beep([784, 988, 1175, 1568], 0.09),
    click: () => beep([440], 0.03)
  };

  /* --------------------------------------------------------- efeitos visuais */
  function toast(msg, kind = "") {
    const el = document.createElement("div");
    el.className = "toast " + kind; el.textContent = msg;
    $("#toasts").appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  function confetti(n = 70) {
    const fx = $("#fx"); const colors = ["#7c5cff", "#22d3ee", "#f472b6", "#fbbf24", "#34d399"];
    for (let i = 0; i < n; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
      c.style.animationDelay = Math.random() * 0.4 + "s";
      fx.appendChild(c);
      setTimeout(() => c.remove(), 3800);
    }
  }
  let lastClick = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  document.addEventListener("click", (e) => { lastClick = { x: e.clientX, y: e.clientY }; }, true);
  function xpPop(n) {
    const el = document.createElement("div");
    el.className = "xp-pop"; el.textContent = `+${n} XP`;
    el.style.left = Math.min(lastClick.x, window.innerWidth - 90) + "px";
    el.style.top = lastClick.y - 20 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  /* ----------------------------------------------------------- XP e streak */
  function touchStreak() {
    const t = dateStr(), s = state.streak;
    if (s.last === t) return;
    s.count = s.last === addDays(t, -1) ? s.count + 1 : 1;
    s.last = t; s.best = Math.max(s.best, s.count);
    if (s.count > 1) toast(`🔥 Sequência de ${s.count} dias!`, "gold");
  }
  function addXP(n, silent) {
    if (n <= 0) return;
    const before = levelInfo(state.xp).lvl;
    state.xp += n; daily().xp += n;
    touchStreak();
    if (!silent) xpPop(n);
    const after = levelInfo(state.xp);
    if (after.lvl > before) {
      sfx.level(); confetti();
      toast(`🎉 LEVEL UP! Nível ${after.lvl} — ${after.title}`, "gold");
    }
    checkDaily(); checkAchievements(); save(); renderHUD();
  }

  /* ----------------------------------------------------- missões diárias */
  function dailyMissions() {
    const d = daily();
    return [
      { label: "Ganhe 100 XP hoje", val: d.xp, target: 100 },
      { label: "Acerte 10 questões", val: d.correct, target: 10 },
      { label: "Complete 1 sessão de foco", val: d.pomos, target: 1 }
    ];
  }
  function checkDaily() {
    const d = daily();
    if (!d.bonus && dailyMissions().every((m) => m.val >= m.target)) {
      d.bonus = true;
      toast("🎁 Missões diárias completas! +50 XP", "green");
      setTimeout(() => addXP(50, true), 300);
    }
  }

  /* -------------------------------------------------------------- estrelas */
  function stars(w) {
    const s = ws(w.id); let n = 0;
    if (s.read && s.cards) n++;
    if (s.quizBest >= 70) n++;
    if (s.perfect && s.riddle && s.vf) n++;
    return n;
  }
  const isUnlocked = (i) => state.settings.free || i === 0 || ws(WORLDS[i - 1].id).quizBest >= 70;
  const nextWorldIndex = () => { const i = WORLDS.findIndex((w, k) => isUnlocked(k) && stars(w) < 3); return i < 0 ? 0 : i; };
  const starStr = (n) => [0, 1, 2].map((i) => `<span class="${i < n ? "" : "star-off"}">⭐</span>`).join("");

  /* ------------------------------------------------------------ conquistas */
  const regionDone = (ids) => ids.every((id) => ws(id).quizBest >= 70);
  const ACH = [
    { id: "start", ico: "🚪", name: "Primeiro Passo", desc: "Leia o briefing de um mundo.", ok: () => Object.values(state.worlds).some((w) => w.read) },
    { id: "blood", ico: "🗡️", name: "Primeiro Sangue", desc: "Acerte sua primeira questão.", ok: () => state.stats.correct >= 1 },
    { id: "combo5", ico: "🔥", name: "Combo x5", desc: "Acerte 5 questões seguidas.", ok: () => state.stats.bestCombo >= 5 },
    { id: "perfect", ico: "💯", name: "Gabaritou", desc: "Derrote um chefão sem errar.", ok: () => Object.values(state.worlds).some((w) => w.perfect) },
    { id: "riddle5", ico: "🧩", name: "Charadista", desc: "Resolva 5 charadas.", ok: () => state.stats.riddles >= 5 },
    { id: "riddleAll", ico: "🦉", name: "Esfinge Humana", desc: "Resolva todas as 22 charadas.", ok: () => state.stats.riddles >= WORLDS.length },
    { id: "mission5", ico: "💻", name: "Mão na Massa", desc: "Complete 5 missões de código.", ok: () => state.stats.missions >= 5 },
    { id: "fund", ico: "🌱", name: "Fundação Sólida", desc: "Vença os chefões dos mundos 1 a 6.", ok: () => regionDone(["intro", "prelim", "linreg", "linclass", "mlp", "builders"]) },
    { id: "vision", ico: "👁️", name: "Visão de Águia", desc: "Vença CNN, CNNs Modernas e Visão Computacional.", ok: () => regionDone(["cnn", "moderncnn", "cv"]) },
    { id: "seq", ico: "🌊", name: "Surfista de Sequências", desc: "Vença RNN, RNNs Modernas e Atenção.", ok: () => regionDone(["rnn", "modernrnn", "attention"]) },
    { id: "transformer", ico: "🐉", name: "Domador de Dragões", desc: "Gabarite o chefão dos Transformers.", ok: () => ws("attention").perfect },
    { id: "focus1", ico: "⏱️", name: "Concentrado", desc: "Complete 1 sessão de foco.", ok: () => state.stats.pomos >= 1 },
    { id: "focus10", ico: "🧘", name: "Monge do Foco", desc: "Complete 10 sessões de foco.", ok: () => state.stats.pomos >= 10 },
    { id: "streak3", ico: "📅", name: "Constância", desc: "Estude 3 dias seguidos.", ok: () => state.streak.best >= 3 },
    { id: "streak7", ico: "🗓️", name: "Semana Perfeita", desc: "Estude 7 dias seguidos.", ok: () => state.streak.best >= 7 },
    { id: "streak30", ico: "🏅", name: "Hábito de Ferro", desc: "Estude 30 dias seguidos.", ok: () => state.streak.best >= 30 },
    { id: "review50", ico: "🔁", name: "Memória de Elefante", desc: "Responda 50 questões na Arena de Revisão.", ok: () => state.stats.reviews >= 50 },
    { id: "lvl5", ico: "⚡", name: "Nível 5", desc: "Alcance o nível 5.", ok: () => levelInfo(state.xp).lvl >= 5 },
    { id: "lvl10", ico: "🌟", name: "Nível 10", desc: "Alcance o nível 10.", ok: () => levelInfo(state.xp).lvl >= 10 },
    { id: "half", ico: "🗺️", name: "Meio Caminho", desc: "Vença 11 chefões.", ok: () => WORLDS.filter((w) => ws(w.id).quizBest >= 70).length >= 11 },
    { id: "all", ico: "👑", name: "Lenda do D2L", desc: "Conquiste 3 estrelas em todos os 22 mundos.", ok: () => WORLDS.every((w) => stars(w) === 3) }
  ];
  function checkAchievements() {
    for (const a of ACH) {
      if (!state.achievements[a.id] && a.ok()) {
        state.achievements[a.id] = dateStr();
        setTimeout(() => { toast(`🏆 Conquista: ${a.ico} ${a.name}`, "gold"); sfx.win(); }, 400);
      }
    }
  }

  /* ------------------------------------------------- revisão espaçada (Leitner) */
  const BOX_DAYS = [0, 1, 3, 7, 14, 30];
  function scheduleReview(key, correct) {
    const r = state.review[key] || { box: 0 };
    r.box = correct ? Math.min(r.box + 1, BOX_DAYS.length - 1) : 1;
    r.due = addDays(dateStr(), correct ? BOX_DAYS[r.box] : 0);
    state.review[key] = r;
  }
  function dueItems() {
    const t = dateStr();
    return Object.entries(state.review).filter(([, r]) => r.due <= t).map(([k]) => k);
  }
  function parseKey(k) { const i = k.lastIndexOf("-q"); return { w: worldById(k.slice(0, i)), idx: +k.slice(i + 2) }; }

  /* ------------------------------------------------------------------- HUD */
  function renderHUD() {
    const L = levelInfo(state.xp);
    $("#hud-avatar").textContent = state.avatar;
    $("#hud-name").textContent = state.name;
    $("#hud-lvl").textContent = L.lvl;
    $("#hud-xpfill").style.width = (100 * L.cur / L.need).toFixed(1) + "%";
    $("#hud-xptext").textContent = `${L.cur} / ${L.need} XP · ${L.title}`;
    $("#hud-streak").textContent = state.streak.last && state.streak.last >= addDays(dateStr(), -1) ? state.streak.count : 0;
    $("#hud-xp").textContent = state.xp;
  }

  /* ================================================================ VIEWS */
  let ui = {};           // estado efêmero da tela atual
  let timers = [];       // intervals a limpar na troca de rota
  const clearTimers = () => { timers.forEach(clearInterval); timers = []; };

  /* ---------------------------------------------------------------- MAPA */
  function viewMap() {
    const L = levelInfo(state.xp);
    const nxt = nextWorldIndex();
    const total = WORLDS.reduce((a, w) => a + stars(w), 0);
    const due = dueItems().length;
    let html = `
    <section class="hero">
      <div class="panel">
        <span class="tag">Dive into Deep Learning · d2l.ai</span>
        <h1 style="margin-top:12px">Olá, ${esc(state.name)}!<br><span>${L.title}</span></h1>
        <p>22 mundos, 22 chefões. Cada mundo é um capítulo do livro <b>Dive into Deep Learning</b>:
        leia o briefing, vire as cartas, derrote o chefão, decifre a charada e complete a missão de código.</p>
        <div class="row" style="margin:10px 0 14px">
          <span class="tag gold">⭐ ${total} / ${WORLDS.length * 3} estrelas</span>
          <span class="tag pink">🏆 ${Object.keys(state.achievements).length} / ${ACH.length} conquistas</span>
          ${due ? `<span class="tag">🔁 ${due} para revisar</span>` : ""}
        </div>
        <div class="progress" style="margin-bottom:16px"><div style="width:${(100 * total / (WORLDS.length * 3)).toFixed(1)}%"></div></div>
        <div class="row">
          <a class="btn" href="#/mundo/${WORLDS[nxt].id}">▶ Continuar: Mundo ${WORLDS[nxt].num}</a>
          ${due ? `<a class="btn secondary" href="#/revisao">🔁 Revisar (${due})</a>` : ""}
        </div>
      </div>
      <div class="panel daily">
        <h3>📜 Missões diárias</h3>
        <ul>${dailyMissions().map((m) => `
          <li><div class="lbl"><span>${m.label}</span><span class="${m.val >= m.target ? "done-mark" : "muted"}">${m.val >= m.target ? "✔ feito" : `${Math.min(m.val, m.target)}/${m.target}`}</span></div>
          <div class="progress"><div style="width:${Math.min(100, 100 * m.val / m.target)}%"></div></div></li>`).join("")}
        </ul>
        <p class="muted" style="font-size:13px;margin:12px 0 0">Complete as três para ganhar <b>+50 XP</b> de bônus. 🔥 Sequência atual: <b>${state.streak.count}</b> dia(s).</p>
      </div>
    </section>`;
    for (const r of REGIONS) {
      const list = WORLDS.map((w, i) => ({ w, i })).filter((x) => x.w.region === r.id);
      html += `<section class="region"><h2>${r.emoji} ${r.name}</h2><p>${r.desc}</p><div class="worlds">`;
      for (const { w, i } of list) {
        const unlocked = isUnlocked(i), st = stars(w);
        const cls = !unlocked ? "locked" : st === 3 ? "done" : i === nxt ? "next" : "";
        html += `<a class="world ${cls}" ${unlocked ? `href="#/mundo/${w.id}"` : `data-locked="${i}"`}>
          <span class="num">MUNDO ${pad(w.num)}</span>
          <span class="emoji">${w.emoji}</span>
          <h3>${w.title}</h3>
          <div class="boss">👾 ${w.boss}</div>
          <div class="stars">${starStr(st)}</div>
        </a>`;
      }
      html += `</div></section>`;
    }
    app.innerHTML = html;
  }

  /* --------------------------------------------------------------- MUNDO */
  const TABS = [
    { id: "briefing", label: "📖 Briefing" },
    { id: "cartas", label: "🃏 Cartas" },
    { id: "chefao", label: "⚔️ Chefão" },
    { id: "charada", label: "🧩 Charada" },
    { id: "vf", label: "⚡ V ou F" },
    { id: "missao", label: "💻 Missão" }
  ];
  function tabDone(w, t) {
    const s = ws(w.id);
    return { briefing: s.read, cartas: s.cards, chefao: s.quizBest >= 70, charada: s.riddle, vf: s.vf, missao: s.mission }[t];
  }

  function viewWorld(id, tab) {
    const i = WORLDS.findIndex((w) => w.id === id);
    if (i < 0) return go("#/");
    if (!isUnlocked(i)) { toast("🔒 Vença o chefão do mundo anterior (≥70%) para desbloquear."); return go("#/"); }
    const w = WORLDS[i];
    if (ui.world !== id) ui = { world: id };
    tab = tab || ui.tab || "briefing";
    ui.tab = tab;
    const nextW = WORLDS[i + 1];
    app.innerHTML = `
      <div class="world-head">
        <span class="big">${w.emoji}</span>
        <div style="flex:1;min-width:220px">
          <span class="tag">MUNDO ${pad(w.num)} · Capítulo ${w.num}</span>
          <h1>${w.title}</h1>
          <div class="muted">👾 Chefão: <b style="color:var(--pink)">${w.boss}</b> · ${starStr(stars(w))}</div>
        </div>
        <div class="row">
          <a class="btn secondary small" href="${w.url}" target="_blank" rel="noopener">📘 Ler no d2l.ai</a>
          ${nextW && isUnlocked(i + 1) ? `<a class="btn small" href="#/mundo/${nextW.id}">Próximo ▶</a>` : ""}
        </div>
      </div>
      <div class="tabs" role="tablist">${TABS.map((t) => `<button class="tab ${t.id === tab ? "active" : ""}" data-tab="${t.id}" role="tab">${t.label} ${tabDone(w, t.id) ? '<span class="ok">✔</span>' : ""}</button>`).join("")}</div>
      <div id="stage"></div>`;
    renderStage(w);
  }

  function renderStage(w) {
    clearTimers();
    const st = $("#stage"); if (!st) return;
    const fn = { briefing: stBriefing, cartas: stCards, chefao: stBoss, charada: stRiddle, vf: stVF, missao: stMission }[ui.tab];
    st.innerHTML = fn(w);
    if (ui.tab === "vf" && ui.vfRun && !ui.vfRun.done && ui.vfRun.answered === null) startVFTimer(w);
  }

  // ---- Briefing
  function stBriefing(w) {
    const s = ws(w.id);
    return `<div class="panel lesson">
      <h2>📖 O que você vai aprender</h2>
      <div>${w.resumo}</div>
      <div class="analogy">💡 <b>Analogia:</b> ${w.analogia}</div>
      <h3>🧮 Fórmulas-chave</h3>
      ${w.formulas.map((f) => `<div class="formula">${esc(f)}</div>`).join("")}
      <div class="row" style="margin-top:18px">
        ${s.read ? `<span class="tag">✔ Briefing concluído</span>` : `<button class="btn success" data-act="read">✅ Li e entendi (+20 XP)</button>`}
        <button class="btn secondary" data-tab="cartas">Ir para as cartas 🃏</button>
        <a class="btn secondary" href="${w.url}" target="_blank" rel="noopener">📘 Capítulo completo</a>
      </div>
      <p class="muted" style="font-size:14px;margin-top:14px">Dica de estudo: depois de ler, feche a tela e tente explicar o capítulo em voz alta em 1 minuto (técnica Feynman). Se travar, volte ao livro.</p>
    </div>`;
  }

  // ---- Cartas
  function stCards(w) {
    ui.flipped = ui.flipped || new Set();
    const s = ws(w.id);
    return `<div class="panel">
      <div class="row"><h2 style="margin:0">🃏 Cartas de conhecimento</h2><span class="spacer"></span>
      <span class="tag">${ui.flipped.size}/${w.conceitos.length} viradas</span></div>
      <p class="muted">Leia o termo, tente lembrar a definição <b>antes</b> de virar (recordação ativa). Vire todas para ganhar XP.</p>
      <div class="cards">${w.conceitos.map((c, k) => `
        <div class="card ${ui.flipped.has(k) ? "flipped" : ""}" data-card="${k}" tabindex="0">
          <div class="card-inner">
            <div class="card-face card-front">${esc(c.t)}</div>
            <div class="card-face card-back">${esc(c.d)}</div>
          </div>
        </div>`).join("")}
      </div>
      <div class="row" style="margin-top:16px">
        ${s.cards ? `<span class="tag">✔ Cartas dominadas</span>` : ""}
        <button class="btn" data-tab="chefao">⚔️ Enfrentar o chefão</button>
      </div>
    </div>`;
  }

  // ---- Chefão (quiz)
  function newRun(items, mode, wid) {
    return { mode, wid, items, i: 0, hearts: 3, combo: 0, correct: 0, answered: null, opts: null, done: false, lost: false };
  }
  function prepOpts(run) {
    const { w, idx } = run.items[run.i];
    run.opts = shuffle(w.quiz[idx].o.map((t, k) => ({ t, ok: k === w.quiz[idx].a })));
  }
  function stBoss(w) {
    const s = ws(w.id);
    if (!ui.run || ui.run.mode !== "boss") {
      return `<div class="panel result">
        <div class="big">👾</div>
        <h2>${w.boss}</h2>
        <p class="muted">${w.quiz.length} perguntas · 3 vidas ❤️ · acertos seguidos geram <b>combo</b>.<br>
        Acerte ≥ 70% para vencer e desbloquear o próximo mundo. 100% = estrela de ouro.</p>
        <p>Melhor resultado: <b>${s.quizBest}%</b> ${s.perfect ? "💯" : ""}</p>
        <button class="btn gold" data-act="boss-start">⚔️ Iniciar batalha</button>
      </div>`;
    }
    return runHTML(ui.run);
  }
  function runHTML(run) {
    if (run.done) return resultHTML(run);
    const { w, idx } = run.items[run.i];
    const q = w.quiz[idx];
    if (!run.opts) prepOpts(run);
    const ans = run.answered;
    const hearts = run.mode === "boss" ? `<span class="hearts">${"❤️".repeat(run.hearts)}${"🖤".repeat(3 - run.hearts)}</span>` : `<span class="tag">${w.emoji} Mundo ${w.num}</span>`;
    return `<div class="panel">
      <div class="battle-top">
        ${hearts}
        <span class="combo">${run.combo >= 2 ? `COMBO x${run.combo} 🔥` : ""}</span>
        <span class="muted">Questão ${run.i + 1}/${run.items.length}</span>
      </div>
      <div class="progress"><div style="width:${100 * run.i / run.items.length}%"></div></div>
      <div class="question">${esc(q.q)}</div>
      <div class="options">${run.opts.map((o, k) => {
        let cls = "";
        if (ans !== null) { if (o.ok) cls = "correct"; else if (k === ans) cls = "wrong"; }
        return `<button class="opt ${cls}" data-ans="${k}" ${ans !== null ? "disabled" : ""}><span class="key">${"ABCD"[k]}</span>${esc(o.t)}</button>`;
      }).join("")}</div>
      ${ans !== null ? `
        <div class="feedback ${run.opts[ans].ok ? "good" : "bad"}">
          <b>${run.opts[ans].ok ? "✔ Acertou!" : "✘ Errou!"}</b> ${esc(q.e)}
        </div>
        <div class="row" style="margin-top:14px"><span class="spacer"></span>
          <button class="btn" data-act="next" autofocus>${run.i + 1 < run.items.length && !(run.mode === "boss" && run.hearts === 0) ? "Próxima ▶" : "Ver resultado 🏁"}</button>
        </div>` : `<p class="muted" style="font-size:13px;margin-top:12px">Atalho: teclas 1–4 ou A–D.</p>`}
    </div>`;
  }
  function answer(k) {
    const run = ui.run; if (!run || run.answered !== null || run.done) return;
    run.answered = k;
    const { w, idx } = run.items[run.i];
    const key = `${w.id}-q${idx}`;
    const ok = run.opts[k].ok;
    if (ok) {
      run.correct++; run.combo++; state.stats.correct++; daily().correct++;
      state.stats.bestCombo = Math.max(state.stats.bestCombo, run.combo);
      sfx.good();
      let xp;
      if (run.mode === "boss") { xp = state.solved[key] ? 2 : 10 + Math.min(run.combo - 1, 5) * 2; state.solved[key] = true; }
      else { xp = 5; state.stats.reviews++; }
      scheduleReview(key, true);
      addXP(xp);
    } else {
      run.combo = 0; state.stats.wrong++;
      if (run.mode === "boss") run.hearts--; else state.stats.reviews++;
      sfx.bad();
      scheduleReview(key, false);
      save();
    }
    rerun();
  }
  function nextQ() {
    const run = ui.run; if (!run || run.done || run.answered === null) return;
    if (run.mode === "boss" && run.hearts === 0) { run.lost = true; return finishRun(); }
    run.i++; run.answered = null; run.opts = null;
    if (run.i >= run.items.length) return finishRun();
    rerun();
  }
  function finishRun() {
    const run = ui.run; run.done = true;
    const pct = Math.round(100 * run.correct / run.items.length);
    run.pct = pct;
    if (run.mode === "boss") {
      const s = ws(run.wid), wasWon = s.quizBest >= 70;
      s.quizBest = Math.max(s.quizBest, pct);
      if (pct === 100 && !s.perfect) { s.perfect = true; addXP(50, true); toast("💯 Chefão gabaritado! +50 XP", "gold"); }
      if (pct >= 70 && !wasWon) {
        addXP(30, true); confetti(); sfx.win();
        const i = WORLDS.findIndex((w) => w.id === run.wid);
        toast(WORLDS[i + 1] ? `🔓 Mundo ${WORLDS[i + 1].num} desbloqueado!` : "🏁 Você venceu o último chefão!", "green");
      }
    }
    save(); checkAchievements(); renderHUD();
    rerun();
  }
  function resultHTML(run) {
    const pct = run.pct;
    const win = pct >= 70;
    if (run.mode === "review") {
      return `<div class="panel result"><div class="big">🔁</div>
        <h2>Revisão concluída!</h2>
        <p>Você acertou <b>${run.correct}/${run.items.length}</b> (${pct}%).</p>
        <p class="muted">As questões erradas voltam amanhã; as certas vão para caixas com intervalos maiores (1, 3, 7, 14, 30 dias).</p>
        <div class="row" style="justify-content:center"><button class="btn" data-act="review-start">Nova rodada</button><a class="btn secondary" href="#/">Mapa</a></div></div>`;
    }
    return `<div class="panel result">
      <div class="big">${run.lost ? "💀" : win ? (pct === 100 ? "👑" : "🏆") : "😵"}</div>
      <h2>${run.lost ? "O chefão venceu desta vez!" : win ? "VITÓRIA!" : "Quase lá!"}</h2>
      <p>Acertos: <b>${run.correct}/${run.items.length}</b> (${pct}%)</p>
      <p class="muted">${win ? "Você dominou este capítulo. Agora resolva a charada e o V ou F para a 3ª estrela." : "Releia o briefing e as cartas, depois tente de novo. Errar faz parte — as questões erradas foram para a Arena de Revisão."}</p>
      <div class="row" style="justify-content:center">
        <button class="btn gold" data-act="boss-start">🔄 Lutar de novo</button>
        <button class="btn secondary" data-tab="${win ? "charada" : "briefing"}">${win ? "🧩 Charada" : "📖 Revisar briefing"}</button>
      </div>
    </div>`;
  }
  function rerun() {
    if (ui.run && ui.run.mode === "review") { app.querySelector("#review-stage").innerHTML = runHTML(ui.run); return; }
    const w = worldById(ui.world); if (w) renderStage(w);
    const t = app.querySelector(".tabs"); if (t && ui.run && ui.run.done) viewWorld(ui.world, ui.tab);
  }

  // ---- Charada
  function stRiddle(w) {
    const s = ws(w.id);
    const solved = s.riddle || ui.riddleRevealed;
    return `<div class="panel">
      <h2>🧩 Charada do Mundo ${w.num}</h2>
      <p class="lesson" style="font-size:19px"><i>“${esc(w.charada.q)}”</i></p>
      ${solved ? `
        <div class="feedback good"><b>Resposta: ${esc(w.charada.r[0])}</b><br>${esc(w.charada.e)}</div>
        <div class="row" style="margin-top:14px"><button class="btn" data-tab="vf">⚡ Rodada V ou F</button></div>` : `
        <form class="row" data-form="riddle" style="margin-top:12px">
          <input type="text" name="ans" placeholder="Sua resposta…" autocomplete="off" style="flex:1;min-width:200px">
          <button class="btn" type="submit">Responder</button>
        </form>
        ${ui.riddleWrong ? `<div class="feedback bad">✘ Não é isso… tente de novo! (${ui.riddleWrong} tentativa${ui.riddleWrong > 1 ? "s" : ""})</div>` : ""}
        ${ui.hint ? `<div class="analogy">💡 <b>Dica:</b> ${esc(w.charada.dica)}</div>` : ""}
        <div class="row" style="margin-top:14px">
          ${ui.hint ? "" : `<button class="btn secondary small" data-act="hint">💡 Pedir dica (recompensa cai para 15 XP)</button>`}
          <button class="btn secondary small" data-act="reveal">🏳️ Revelar (sem XP)</button>
        </div>`}
    </div>`;
  }
  function submitRiddle(w, val) {
    const v = norm(val); if (!v) return;
    const ok = w.charada.r.some((r) => { const n = norm(r); return v === n || (n.length >= 3 && v.includes(n)); });
    if (ok) {
      const s = ws(w.id);
      if (!s.riddle) { s.riddle = true; state.stats.riddles++; addXP(ui.hint ? 15 : 30); }
      sfx.win(); confetti(40); toast("🧩 Charada resolvida!", "green");
      viewWorld(w.id, "charada");
    } else {
      ui.riddleWrong = (ui.riddleWrong || 0) + 1; sfx.bad();
      renderStage(w);
      const inp = app.querySelector('input[name="ans"]'); if (inp) inp.focus();
    }
  }

  // ---- V ou F
  const VF_TIME = 15;
  function stVF(w) {
    const s = ws(w.id);
    const r = ui.vfRun;
    if (!r) {
      return `<div class="panel result"><div class="big">⚡</div><h2>Rodada Relâmpago</h2>
        <p class="muted">${w.vf.length} afirmações · ${VF_TIME} segundos cada. Verdadeiro ou falso?</p>
        <p>Melhor resultado: <b>${s.vfBest}/${w.vf.length}</b></p>
        <button class="btn gold" data-act="vf-start">⚡ Começar</button></div>`;
    }
    if (r.done) {
      return `<div class="panel result"><div class="big">${r.correct === w.vf.length ? "⚡" : "🌩️"}</div>
        <h2>${r.correct}/${w.vf.length} corretas</h2>
        <p class="muted">${r.correct === w.vf.length ? "Reflexos de mestre!" : "Para a estrela, acerte todas."}</p>
        <div class="row" style="justify-content:center"><button class="btn gold" data-act="vf-start">🔄 De novo</button><button class="btn secondary" data-tab="missao">💻 Missão</button></div></div>`;
    }
    const it = w.vf[r.i];
    return `<div class="panel">
      <div class="battle-top"><span class="tag">Afirmação ${r.i + 1}/${w.vf.length}</span><span class="muted" id="vf-left">${r.left}s</span></div>
      <div class="timer"><div id="vf-bar" style="width:${100 * r.left / VF_TIME}%"></div></div>
      <div class="question">${esc(it.s)}</div>
      ${r.answered === null ? `<div class="vf-btns"><button class="btn success" data-vf="1">✔ Verdadeiro</button><button class="btn danger" data-vf="0">✘ Falso</button></div>
        <p class="muted" style="font-size:13px">Atalho: V ou F no teclado.</p>` : `
        <div class="feedback ${r.answered === it.v ? "good" : "bad"}"><b>${r.answered === "timeout" ? "⏰ Tempo esgotado!" : r.answered === it.v ? "✔ Correto!" : "✘ Errado!"}</b>
        É <b>${it.v ? "VERDADEIRO" : "FALSO"}</b>. ${esc(it.e)}</div>
        <div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn" data-act="vf-next">Continuar ▶</button></div>`}
    </div>`;
  }
  function startVFTimer(w) {
    const r = ui.vfRun;
    const t = setInterval(() => {
      r.left = Math.max(0, +(r.left - 0.1).toFixed(1));
      const bar = $("#vf-bar"), lbl = $("#vf-left");
      if (bar) bar.style.width = (100 * r.left / VF_TIME) + "%";
      if (lbl) lbl.textContent = Math.ceil(r.left) + "s";
      if (r.left <= 0) { clearTimers(); answerVF(w, "timeout"); }
    }, 100);
    timers.push(t);
  }
  function answerVF(w, v) {
    const r = ui.vfRun; if (!r || r.answered !== null) return;
    clearTimers();
    r.answered = v;
    if (v === w.vf[r.i].v) { r.correct++; state.stats.correct++; daily().correct++; sfx.good(); addXP(5); }
    else { state.stats.wrong++; sfx.bad(); save(); }
    renderStage(w);
  }
  function nextVF(w) {
    const r = ui.vfRun; if (!r || r.done || r.answered === null) return;
    r.i++; r.answered = null; r.left = VF_TIME;
    if (r.i >= w.vf.length) {
      r.done = true;
      const s = ws(w.id); s.vfBest = Math.max(s.vfBest, r.correct);
      if (r.correct === w.vf.length && !s.vf) { s.vf = true; addXP(15); toast("⚡ Rodada perfeita!", "green"); }
      save(); checkAchievements();
      return viewWorld(w.id, "vf");
    }
    renderStage(w);
  }

  // ---- Missão
  function stMission(w) {
    const s = ws(w.id);
    return `<div class="panel">
      <h2>💻 Missão: ${esc(w.missao.t)}</h2>
      <p>${esc(w.missao.d)}</p>
      <pre class="code"><button class="btn secondary small copy" data-act="copy">📋 Copiar</button><code>${esc(w.missao.code)}</code></pre>
      <p class="muted" style="font-size:14px">Rode no Jupyter, VS Code ou <a href="https://colab.research.google.com" target="_blank" rel="noopener">Google Colab</a>.
      Depois, <b>mude algo</b> (um hiperparâmetro, uma camada) e observe o efeito — é assim que se aprende de verdade.</p>
      <div class="row">
        ${s.mission ? `<span class="tag">✔ Missão cumprida</span>` : `<button class="btn success" data-act="mission">🚀 Executei o código! (+25 XP)</button>`}
        <a class="btn secondary" href="${w.url}" target="_blank" rel="noopener">📘 Notebooks do capítulo</a>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------- REVISÃO */
  function viewReview() {
    const due = dueItems();
    const pool = WORLDS.filter((w, i) => isUnlocked(i));
    app.innerHTML = `
      <div class="world-head"><span class="big">🔁</span><div><h1>Arena de Revisão</h1>
      <div class="muted">Repetição espaçada (sistema Leitner): o que você erra volta logo; o que acerta volta cada vez mais tarde.</div></div></div>
      <div id="review-stage">${ui.run && ui.run.mode === "review" ? runHTML(ui.run) : `
        <div class="panel result"><div class="big">🧠</div>
        <h2>${due.length ? `${due.length} questão(ões) para hoje` : "Nada pendente hoje!"}</h2>
        <p class="muted">${due.length ? "Comece pelas pendentes — revisar no tempo certo é o que fixa na memória de longo prazo." : `Você pode fazer um treino livre com questões aleatórias dos ${pool.length} mundo(s) desbloqueado(s).`}</p>
        <button class="btn gold" data-act="review-start">${due.length ? "▶ Revisar agora" : "🎲 Treino livre"}</button></div>`}</div>
      <div class="panel" style="margin-top:16px"><h3>📦 Suas caixas</h3>
        <div class="grid grid-3">${BOX_DAYS.map((d, b) => {
          const n = Object.values(state.review).filter((r) => r.box === b).length;
          return b === 0 ? "" : `<div class="stat"><span class="v">${n}</span><span class="l">Caixa ${b} · a cada ${d} dia(s)</span></div>`;
        }).join("")}</div></div>`;
  }
  function startReview() {
    let keys = dueItems();
    if (!keys.length) {
      const pool = [];
      WORLDS.forEach((w, i) => { if (isUnlocked(i)) w.quiz.forEach((_, k) => pool.push(`${w.id}-q${k}`)); });
      keys = shuffle(pool);
    }
    const items = shuffle(keys).slice(0, 10).map(parseKey).filter((x) => x.w);
    ui = { run: newRun(items, "review") };
    viewReview();
  }

  /* --------------------------------------------------------------- FOCO */
  let focus = { mode: "focus", left: null, running: false, t: null };
  function viewFocus() {
    const S = state.settings;
    if (focus.left === null) focus.left = S.focusMin * 60;
    const m = Math.floor(focus.left / 60), s = focus.left % 60;
    app.innerHTML = `
      <div class="world-head"><span class="big">⏱️</span><div><h1>Modo Foco</h1>
      <div class="muted">Pomodoro gamificado: ${S.focusMin} min de estudo profundo + ${S.breakMin} min de pausa. Cada sessão completa vale <b>+15 XP</b>.</div></div></div>
      <div class="grid grid-2">
        <div class="panel ring">
          <span class="tag ${focus.mode === "focus" ? "" : "gold"}">${focus.mode === "focus" ? "🎯 FOCO" : "☕ PAUSA"}</span>
          <div class="clock" id="clock">${pad(m)}:${pad(s)}</div>
          <div class="row" style="justify-content:center">
            <button class="btn ${focus.running ? "secondary" : "success"}" data-act="focus-toggle">${focus.running ? "⏸ Pausar" : "▶ Iniciar"}</button>
            <button class="btn secondary" data-act="focus-reset">↺ Reiniciar</button>
            <button class="btn secondary" data-act="focus-skip">⏭ Pular</button>
          </div>
          <p class="muted" style="margin-top:16px">Sessões hoje: <b>${daily().pomos}</b> · Total: <b>${state.stats.pomos}</b> · Minutos focados: <b>${state.stats.focusMin}</b></p>
        </div>
        <div class="panel">
          <h3>🎯 Como usar uma sessão</h3>
          <ol>
            <li>Escolha <b>um</b> objetivo: “ler a seção 7.2 e fazer a missão”.</li>
            <li>Celular longe, abas fechadas.</li>
            <li>Leia o capítulo no <a href="https://d2l.ai" target="_blank" rel="noopener">d2l.ai</a> e rode o código.</li>
            <li>Na pausa, levante, beba água, não abra redes sociais.</li>
            <li>A cada 4 sessões, faça uma pausa longa (15–30 min).</li>
          </ol>
          <h3>⚙️ Ajustes</h3>
          <div class="row">
            <label>Foco (min) <input type="number" min="5" max="90" value="${S.focusMin}" data-set="focusMin" style="width:90px"></label>
            <label>Pausa (min) <input type="number" min="1" max="30" value="${S.breakMin}" data-set="breakMin" style="width:90px"></label>
          </div>
        </div>
      </div>`;
  }
  function tickFocus() {
    focus.left--;
    const el = $("#clock");
    if (el) el.textContent = `${pad(Math.floor(focus.left / 60))}:${pad(focus.left % 60)}`;
    document.title = `${pad(Math.floor(focus.left / 60))}:${pad(focus.left % 60)} · ${focus.mode === "focus" ? "Foco" : "Pausa"} — D2L Quest`;
    if (focus.left <= 0) endFocusPhase(true);
  }
  function endFocusPhase(completed) {
    clearInterval(focus.t); focus.running = false;
    if (focus.mode === "focus") {
      if (completed) {
        state.stats.pomos++; state.stats.focusMin += state.settings.focusMin; daily().pomos++;
        sfx.win(); confetti(50); toast("⏱️ Sessão de foco completa! +15 XP", "green");
        addXP(15, true);
      }
      focus.mode = "break"; focus.left = state.settings.breakMin * 60;
    } else {
      if (completed) { sfx.level(); toast("☕ Pausa encerrada. Bora!"); }
      focus.mode = "focus"; focus.left = state.settings.focusMin * 60;
    }
    document.title = "D2L Quest — Aprenda Deep Learning Jogando";
    if (location.hash === "#/foco") viewFocus();
  }

  /* ----------------------------------------------------------- GLOSSÁRIO */
  function viewGlossary() {
    app.innerHTML = `
      <div class="world-head"><span class="big">📖</span><div><h1>Glossário</h1>
      <div class="muted">Todos os conceitos dos 22 mundos em um só lugar.</div></div></div>
      <div class="panel"><input type="search" id="gloss-q" placeholder="🔎 Buscar termo (ex.: softmax, atenção, dropout…)" value="${esc(ui.gq || "")}">
      <div id="gloss-list" style="margin-top:12px"></div></div>`;
    renderGlossList();
  }
  function renderGlossList() {
    const q = norm(ui.gq || "");
    const items = [];
    WORLDS.forEach((w) => w.conceitos.forEach((c) => items.push({ ...c, w })));
    items.sort((a, b) => a.t.localeCompare(b.t, "pt"));
    const f = items.filter((it) => !q || norm(it.t + it.d).includes(q));
    $("#gloss-list").innerHTML = f.length ? f.map((it) => `
      <div class="gloss-item"><b>${esc(it.t)}</b> <a class="tag" href="#/mundo/${it.w.id}" style="text-decoration:none">${it.w.emoji} M${it.w.num}</a><br>
      <span>${esc(it.d)}</span></div>`).join("") : `<p class="muted">Nenhum termo encontrado.</p>`;
  }

  /* ---------------------------------------------------------- CONQUISTAS */
  function viewAch() {
    const n = Object.keys(state.achievements).length;
    app.innerHTML = `
      <div class="world-head"><span class="big">🏆</span><div><h1>Conquistas</h1>
      <div class="muted">${n} de ${ACH.length} desbloqueadas</div></div></div>
      <div class="progress" style="margin-bottom:16px"><div style="width:${100 * n / ACH.length}%"></div></div>
      <div class="grid grid-2">${ACH.map((a) => {
        const got = state.achievements[a.id];
        return `<div class="ach ${got ? "unlocked" : "locked"}"><span class="ico">${a.ico}</span>
          <div><h4>${a.name}</h4><p>${a.desc}</p>${got ? `<p style="color:var(--gold)">✔ ${got}</p>` : ""}</div></div>`;
      }).join("")}</div>`;
  }

  /* -------------------------------------------------------------- ROTEIRO */
  const PLAN = [
    ["Semana 1", "Mundos 1–2", "Introdução e Preliminares. Configure o ambiente (Colab ou local) e domine tensores, broadcasting e autograd."],
    ["Semana 2", "Mundo 3", "Regressão linear do zero e com nn.Linear. Entenda SGD, generalização e weight decay."],
    ["Semana 3", "Mundo 4", "Softmax, entropia cruzada e Fashion-MNIST. Mudança de distribuição."],
    ["Semana 4", "Mundos 5–6", "MLP, backprop, dropout, inicialização; projeto Kaggle de casas. Guia do Construtor (nn.Module, GPU)."],
    ["Semana 5", "Mundo 7", "Convoluções, padding, stride, canais, pooling e LeNet. Faça as contas de shapes à mão!"],
    ["Semana 6", "Mundo 8", "AlexNet → VGG → NiN → GoogLeNet → BatchNorm → ResNet → DenseNet. Implemente um bloco residual."],
    ["Semana 7", "Mundos 9–10", "Modelos de linguagem, RNN, BPTT; LSTM, GRU, seq2seq e beam search."],
    ["Semana 8", "Mundo 11", "Atenção e Transformers — o capítulo mais importante para LLMs. Implemente a atenção do zero."],
    ["Semana 9", "Mundos 12–13", "Otimizadores (SGD, momentum, Adam, schedulers) e performance (compilação, multi-GPU)."],
    ["Semana 10", "Mundo 14", "Visão computacional: augmentation, fine-tuning, detecção, segmentação, style transfer."],
    ["Semana 11", "Mundos 15–16", "Embeddings, word2vec, GloVe, BERT; sentimentos, NLI e fine-tuning do BERT."],
    ["Semana 12", "Mundos 17–22", "Tópicos avançados à escolha: RL, GPs, HPO, GANs, recomendação e o apêndice de matemática."]
  ];
  function viewRoadmap() {
    app.innerHTML = `
      <div class="world-head"><span class="big">🧭</span><div><h1>Roteiro de Estudos</h1>
      <div class="muted">Um plano de 12 semanas (≈ 1 hora por dia) para percorrer o d2l.ai inteiro.</div></div></div>
      <div class="grid grid-2">
        <div class="panel"><h3>🗓️ Plano de 12 semanas</h3>
          ${PLAN.map(([w, m, d]) => `<div class="week"><div class="w">${w}</div><div><b>${m}</b><br><span class="muted">${d}</span></div></div>`).join("")}
        </div>
        <div>
          <div class="panel"><h3>🔁 O ciclo de cada mundo</h3>
            <ol>
              <li><b>Briefing</b> (10 min): visão geral e analogia — monte o mapa mental.</li>
              <li><b>Livro</b> (30–60 min): leia o capítulo no d2l.ai com o notebook aberto.</li>
              <li><b>Cartas</b> (5 min): recordação ativa dos conceitos.</li>
              <li><b>Chefão</b> (5 min): teste — se não passar, volte ao livro.</li>
              <li><b>Charada + V ou F</b>: consolidação divertida.</li>
              <li><b>Missão</b>: rode e <i>modifique</i> o código.</li>
              <li><b>Revisão</b>: amanhã, abra a Arena de Revisão.</li>
            </ol>
          </div>
          <div class="panel"><h3>🧠 Técnicas que funcionam</h3>
            <ul>
              <li><b>Recordação ativa</b>: tente lembrar antes de olhar a resposta.</li>
              <li><b>Repetição espaçada</b>: revise em intervalos crescentes (a Arena faz isso).</li>
              <li><b>Técnica Feynman</b>: explique como se fosse para uma criança.</li>
              <li><b>Pomodoro</b>: blocos de foco curtos e intensos.</li>
              <li><b>Intercalação</b>: alterne entre teoria, código e matemática.</li>
              <li><b>Aprenda fazendo</b>: cada fórmula deve virar uma linha de código.</li>
            </ul>
          </div>
          <div class="panel"><h3>🔗 Recursos oficiais</h3>
            <ul>
              <li><a href="https://d2l.ai" target="_blank" rel="noopener">Livro online (d2l.ai)</a></li>
              <li><a href="https://github.com/d2l-ai/d2l-en" target="_blank" rel="noopener">Repositório oficial no GitHub</a></li>
              <li><a href="https://discuss.d2l.ai" target="_blank" rel="noopener">Fórum de discussão</a></li>
              <li><a href="https://pytorch.org/tutorials/" target="_blank" rel="noopener">Tutoriais do PyTorch</a></li>
            </ul>
          </div>
        </div>
      </div>`;
  }

  /* -------------------------------------------------------------- PERFIL */
  const AVATARS = ["🧙", "🦸", "🥷", "🧑‍🚀", "🤖", "🐉", "🦊", "🐱", "🦉", "👾", "🧠", "🚀"];
  function viewProfile() {
    const L = levelInfo(state.xp), S = state.stats;
    const acc = S.correct + S.wrong ? Math.round(100 * S.correct / (S.correct + S.wrong)) : 0;
    const won = WORLDS.filter((w) => ws(w.id).quizBest >= 70).length;
    app.innerHTML = `
      <div class="world-head"><span class="big">${state.avatar}</span><div><h1>${esc(state.name)}</h1>
      <div class="muted">Nível ${L.lvl} · ${L.title} · ${state.xp} XP</div></div></div>
      <div class="grid grid-3" style="margin-bottom:16px">
        <div class="stat"><span class="v">${won}/22</span><span class="l">Chefões vencidos</span></div>
        <div class="stat"><span class="v">${acc}%</span><span class="l">Taxa de acerto</span></div>
        <div class="stat"><span class="v">${S.bestCombo}</span><span class="l">Maior combo</span></div>
        <div class="stat"><span class="v">${state.streak.best}</span><span class="l">Maior sequência (dias)</span></div>
        <div class="stat"><span class="v">${S.riddles}</span><span class="l">Charadas resolvidas</span></div>
        <div class="stat"><span class="v">${S.focusMin}</span><span class="l">Minutos de foco</span></div>
      </div>
      <div class="grid grid-2">
        <div class="panel"><h3>🎭 Personagem</h3>
          <label>Nome<input type="text" maxlength="24" value="${esc(state.name)}" data-set="name"></label>
          <p style="margin-bottom:6px">Avatar</p>
          <div class="avatars">${AVATARS.map((a) => `<button class="${a === state.avatar ? "sel" : ""}" data-avatar="${a}">${a}</button>`).join("")}</div>
        </div>
        <div class="panel"><h3>⚙️ Configurações</h3>
          <label class="switch"><input type="checkbox" data-toggle="sound" ${state.settings.sound ? "checked" : ""}> 🔊 Efeitos sonoros</label>
          <label class="switch" style="margin-top:10px"><input type="checkbox" data-toggle="free" ${state.settings.free ? "checked" : ""}> 🔓 Modo livre (desbloqueia todos os mundos)</label>
          <h3 style="margin-top:18px">💾 Backup do progresso</h3>
          <p class="muted" style="font-size:14px">Seu progresso fica salvo neste navegador. Exporte para levar a outro dispositivo.</p>
          <div class="row">
            <button class="btn secondary small" data-act="export">⬇ Exportar</button>
            <label class="btn secondary small">⬆ Importar<input type="file" accept="application/json" data-act="import" hidden></label>
            <button class="btn danger small" data-act="reset">🗑 Zerar tudo</button>
          </div>
        </div>
      </div>
      <div class="panel"><h3>📊 Progresso por mundo</h3>
        ${WORLDS.map((w) => { const s = ws(w.id); return `<div class="row" style="padding:6px 0;border-bottom:1px solid var(--line)">
          <span>${w.emoji} <b>${w.num}.</b> ${w.title}</span><span class="spacer"></span>
          <span class="muted" style="font-size:13px">chefão ${s.quizBest}% · V/F ${s.vfBest}/${w.vf.length}</span><span>${starStr(stars(w))}</span></div>`; }).join("")}
      </div>`;
  }

  /* ---------------------------------------------------------------- ROUTER */
  function go(h) { if (location.hash !== h) location.hash = h; else route(); }
  function route() {
    clearTimers();
    const h = location.hash.replace(/^#/, "") || "/";
    const parts = h.split("/").filter(Boolean);
    const page = parts[0] || "map";
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === (page === "mundo" ? "map" : page)));
    if (page !== "mundo" && page !== "revisao") ui = {};
    if (page === "revisao" && ui.run && ui.run.mode !== "review") ui = {};
    switch (page) {
      case "map": viewMap(); break;
      case "mundo": viewWorld(parts[1]); break;
      case "revisao": viewReview(); break;
      case "foco": viewFocus(); break;
      case "glossario": viewGlossary(); break;
      case "conquistas": viewAch(); break;
      case "roteiro": viewRoadmap(); break;
      case "perfil": viewProfile(); break;
      default: viewMap();
    }
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- EVENTOS */
  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab],[data-act],[data-ans],[data-card],[data-vf],[data-avatar],[data-locked]");
    if (!t) return;
    const w = ui.world ? worldById(ui.world) : null;

    if (t.dataset.locked !== undefined) { toast("🔒 Vença o chefão anterior (≥70%) para desbloquear este mundo."); sfx.bad(); return; }
    if (t.dataset.tab) {
      ui.tab = t.dataset.tab;
      if (ui.tab !== "chefao" && ui.run && ui.run.mode === "boss" && ui.run.done) ui.run = null;
      sfx.click(); return viewWorld(ui.world, ui.tab);
    }
    if (t.dataset.ans !== undefined) return answer(+t.dataset.ans);
    if (t.dataset.card !== undefined) {
      const k = +t.dataset.card;
      t.classList.toggle("flipped"); ui.flipped.add(k); sfx.click();
      const tag = app.querySelector(".panel .tag"); if (tag) tag.textContent = `${ui.flipped.size}/${w.conceitos.length} viradas`;
      if (ui.flipped.size === w.conceitos.length && !ws(w.id).cards) {
        ws(w.id).cards = true; addXP(10); toast("🃏 Todas as cartas viradas!", "green");
        setTimeout(() => viewWorld(w.id, "cartas"), 700);
      }
      return;
    }
    if (t.dataset.vf !== undefined) return answerVF(w, t.dataset.vf === "1");
    if (t.dataset.avatar) { state.avatar = t.dataset.avatar; save(); renderHUD(); return viewProfile(); }

    switch (t.dataset.act) {
      case "read": ws(w.id).read = true; addXP(20); viewWorld(w.id, "briefing"); break;
      case "boss-start": {
        const items = shuffle(w.quiz.map((_, k) => ({ w, idx: k })));
        ui.run = newRun(items, "boss", w.id); ui.tab = "chefao"; viewWorld(w.id, "chefao"); break;
      }
      case "next": nextQ(); break;
      case "hint": ui.hint = true; renderStage(w); break;
      case "reveal": ui.riddleRevealed = true; renderStage(w); break;
      case "vf-start": ui.vfRun = { i: 0, correct: 0, answered: null, left: VF_TIME, done: false }; renderStage(w); break;
      case "vf-next": nextVF(w); break;
      case "mission": ws(w.id).mission = true; state.stats.missions++; addXP(25); confetti(30); viewWorld(w.id, "missao"); break;
      case "copy": navigator.clipboard && navigator.clipboard.writeText(w.missao.code).then(() => toast("📋 Código copiado!")); break;
      case "review-start": startReview(); break;
      case "focus-toggle":
        if (focus.running) { clearInterval(focus.t); focus.running = false; }
        else { focus.running = true; clearInterval(focus.t); focus.t = setInterval(tickFocus, 1000); }
        viewFocus(); break;
      case "focus-reset": clearInterval(focus.t); focus.running = false; focus.left = (focus.mode === "focus" ? state.settings.focusMin : state.settings.breakMin) * 60; viewFocus(); break;
      case "focus-skip": endFocusPhase(false); break;
      case "export": {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `d2lquest-${dateStr()}.json`; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000); break;
      }
      case "reset":
        if (confirm("Tem certeza? Todo o progresso será apagado.")) { state = defaults(); save(); renderHUD(); go("#/"); toast("Progresso zerado."); }
        break;
    }
  });

  app.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-form=riddle]"); if (!f) return;
    e.preventDefault(); submitRiddle(worldById(ui.world), f.ans.value);
  });

  app.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "gloss-q") { ui.gq = t.value; return renderGlossList(); }
    if (t.dataset.set === "name") { state.name = t.value.trim() || "Aprendiz"; save(); renderHUD(); }
  });

  app.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.toggle) { state.settings[t.dataset.toggle] = t.checked; save(); toast(t.checked ? "Ativado" : "Desativado"); }
    if (t.dataset.set === "focusMin" || t.dataset.set === "breakMin") {
      const v = Math.max(1, Math.min(90, parseInt(t.value, 10) || 1));
      state.settings[t.dataset.set] = v; save();
      if (!focus.running) { focus.left = (focus.mode === "focus" ? state.settings.focusMin : state.settings.breakMin) * 60; viewFocus(); }
    }
    if (t.dataset.act === "import" && t.files[0]) {
      const r = new FileReader();
      r.onload = () => {
        try { state = merge(defaults(), JSON.parse(r.result)); save(); renderHUD(); toast("✔ Progresso importado!", "green"); viewProfile(); }
        catch (err) { toast("✘ Arquivo inválido."); }
      };
      r.readAsText(t.files[0]);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    const k = e.key.toLowerCase();
    if (ui.run && !ui.run.done && (location.hash.startsWith("#/mundo") ? ui.tab === "chefao" : location.hash === "#/revisao")) {
      if (ui.run.answered === null) {
        const idx = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k);
        if (idx >= 0 && ui.run.opts && idx < ui.run.opts.length) { e.preventDefault(); answer(idx); }
      } else if (k === "enter" || k === " ") { e.preventDefault(); nextQ(); }
      return;
    }
    if (ui.tab === "vf" && ui.vfRun && !ui.vfRun.done && location.hash.startsWith("#/mundo")) {
      const w = worldById(ui.world);
      if (ui.vfRun.answered === null && (k === "v" || k === "f")) answerVF(w, k === "v");
      else if (ui.vfRun.answered !== null && (k === "enter" || k === " ")) { e.preventDefault(); nextVF(w); }
    }
  });

  window.addEventListener("hashchange", route);

  /* ------------------------------------------------------------------ boot */
  daily(); renderHUD(); route();
})();
