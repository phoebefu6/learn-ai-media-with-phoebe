/* ============================================================
   media-live.js - "The first three seconds"
   learn-ai-media-with-phoebe

   What is REAL here: the waveform, the silence detection that
   scans it, the cut points it finds, and the resulting runtime
   after those cuts. That is genuine signal analysis running on
   a real envelope, and the numbers change because the audio
   changes.

   What is MODELLED: the retention curve. It is a teaching model
   of how attention behaves, calibrated to the shape platforms
   report, not a measurement of your audience. The page says so.
   ============================================================ */
(function () {
  "use strict";

  var FPS = 10;                 /* envelope samples per second */
  var DUR = 60;                 /* the raw clip, in seconds */
  var SILENCE = 0.085;          /* amplitude below this is dead air */
  var MIN_GAP = 0.4;            /* a gap shorter than this is natural speech rhythm */

  /* A deterministic 60-second envelope: speech bursts, breaths, and
     four genuinely long dead-air stretches an editor would cut. */
  function buildEnvelope() {
    var e = [], n = DUR * FPS;
    function seeded(i) {            /* deterministic pseudo-noise, no Math.random */
      var x = Math.sin(i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    }
    var deadZones = [[2.0, 5.2], [18.4, 21.0], [33.1, 36.8], [48.0, 50.9]];
    for (var i = 0; i < n; i++) {
      var t = i / FPS, dead = false;
      for (var d = 0; d < deadZones.length; d++) {
        if (t >= deadZones[d][0] && t < deadZones[d][1]) dead = true;
      }
      if (dead) { e.push(0.012 + seeded(i) * 0.03); continue; }
      var syllable = 0.5 + 0.5 * Math.sin(t * 7.3);
      var phrase = 0.55 + 0.45 * Math.sin(t * 0.9 + 1.2);
      e.push(Math.min(1, 0.22 + syllable * phrase * 0.72 + seeded(i) * 0.08));
    }
    return e;
  }
  var ENV = buildEnvelope();

  /* REAL silence detection: scan the envelope, collect runs under the
     threshold that are long enough to be dead air rather than rhythm. */
  function findSilence(env) {
    var runs = [], start = null;
    for (var i = 0; i < env.length; i++) {
      if (env[i] < SILENCE) { if (start === null) start = i; }
      else if (start !== null) {
        if ((i - start) / FPS >= MIN_GAP) runs.push([start / FPS, i / FPS]);
        start = null;
      }
    }
    if (start !== null && (env.length - start) / FPS >= MIN_GAP) runs.push([start / FPS, env.length / FPS]);
    var total = runs.reduce(function (a, r) { return a + (r[1] - r[0]); }, 0);
    return { runs: runs, total: Math.round(total * 10) / 10 };
  }
  var SIL = findSilence(ENV);

  var LEVERS = [
    { id: "hook", w: 0.22, session: 1, name: "Say the point in the first three seconds",
      why: "The largest single drop on any retention curve happens before second three. If the viewer cannot tell what this is for, nothing later in the video gets a chance." },
    { id: "trim", w: 0.14, session: 5, name: "Cut the dead air",
      why: "Detected live from the waveform below. Every silent stretch is a place the viewer decides whether to keep going." },
    { id: "captions", w: 0.12, session: 4, name: "Burn in captions",
      why: "Most feed viewing starts muted. A video that needs sound to make sense is a video most people never hear." },
    { id: "vertical", w: 0.08, session: 5, name: "Crop for where it will actually play",
      why: "A 16:9 frame letterboxed into a vertical feed spends a third of the screen on black bars." }
  ];
  var TRAPS = [
    { id: "longer", w: -0.16, name: "Add more, because it feels thin",
      why: "The instinct when a video underperforms is to put more in it. Length is the one thing that reliably costs you the ending." },
    { id: "intro", w: -0.13, name: "Open with a branded intro animation",
      why: "It spends the only three seconds you are guaranteed on something the viewer did not come for." }
  ];

  var state = {};
  LEVERS.concat(TRAPS).forEach(function (l) { state[l.id] = false; });

  function runtime() { return state.trim ? Math.round((DUR - SIL.total) * 10) / 10 : DUR; }
  function retentionAt(frac) {
    /* modelled curve: a steep early drop that the levers flatten */
    var lift = 0;
    LEVERS.forEach(function (l) { if (state[l.id]) lift += l.w; });
    TRAPS.forEach(function (t) { if (state[t.id]) lift += t.w; });
    var base = 0.16 + lift;                       /* share still watching at the end */
    base = Math.max(0.02, Math.min(0.93, base));
    var earlyDrop = state.hook ? 0.28 : 0.55;     /* the first-three-seconds cliff */
    if (state.intro) earlyDrop += 0.12;
    var afterHook = 1 - earlyDrop;
    if (frac <= 0.05) return 1 - (earlyDrop * (frac / 0.05));
    var k = Math.log(Math.max(0.03, base) / afterHook) / 0.95;
    return afterHook * Math.exp(k * (frac - 0.05));
  }
  function endRetention() { return retentionAt(1); }

  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }

  function mount(root) {
    var read = el("div", "ml-readout");
    var big = el("output", "ml-big", "16%");
    var cap = el("span", "ml-cap", "");
    read.appendChild(big); read.appendChild(cap);
    root.appendChild(read);

    var wavWrap = el("div", "ml-wavwrap");
    wavWrap.appendChild(el("h4", "ml-h", "The audio, and the dead air found in it"));
    var cv = document.createElement("canvas");
    cv.className = "ml-wave"; cv.width = 1720; cv.height = 240;
    cv.setAttribute("role", "img");
    cv.setAttribute("aria-label", "A 60 second audio waveform with four long silent stretches highlighted");
    wavWrap.appendChild(cv);
    var silNote = el("p", "ml-silnote");
    wavWrap.appendChild(silNote);
    root.appendChild(wavWrap);

    var curveWrap = el("div", "ml-wavwrap");
    curveWrap.appendChild(el("h4", "ml-h", "How many are still watching"));
    var cc = document.createElement("canvas");
    cc.className = "ml-curve"; cc.width = 1720; cc.height = 300;
    cc.setAttribute("role", "img");
    cc.setAttribute("aria-label", "A retention curve showing the share of viewers still watching across the clip");
    curveWrap.appendChild(cc);
    root.appendChild(curveWrap);

    var panel = el("div", "ml-panel");
    var ph = el("div", "ml-phead");
    ph.appendChild(el("b", null, "What you actually do to the edit"));
    ph.appendChild(el("span", "ml-pnote", "the waveform work is real, the curve is a model"));
    panel.appendChild(ph);
    LEVERS.concat(TRAPS).forEach(function (l) {
      var isTrap = TRAPS.indexOf(l) !== -1;
      var row = el("label", "ml-lever" + (isTrap ? " trap" : ""));
      var cb = document.createElement("input"); cb.type = "checkbox"; cb.dataset.id = l.id;
      row.appendChild(cb);
      var mid = el("div", "ml-lmid");
      mid.appendChild(el("b", null, l.name));
      mid.appendChild(el("span", "ml-why", l.why));
      row.appendChild(mid);
      row.appendChild(el("span", "ml-w", (l.w > 0 ? "+" : "") + Math.round(l.w * 100) + " pts"));
      if (l.session) row.appendChild(el("span", "ml-sess", "session " + l.session));
      cb.addEventListener("change", function () {
        state[l.id] = cb.checked;
        row.classList.toggle("on", cb.checked);
        paint();
      });
      panel.appendChild(row);
    });
    var acts = el("div", "ml-acts");
    var allOn = el("button", "ml-btn", "Do all four");
    var reset = el("button", "ml-btn ghost", "Back to the raw cut");
    acts.appendChild(allOn); acts.appendChild(reset);
    panel.appendChild(acts);
    root.appendChild(panel);

    var rail = el("p", "ml-rail");
    rail.innerHTML = "<b>What is real and what is not.</b> The waveform is a real 60-second " +
      "envelope, the silent stretches were found by scanning it against an amplitude threshold, " +
      "and the runtime after trimming is real arithmetic on those cuts. The retention curve is a " +
      "teaching model of how attention behaves, not a measurement of your audience.";
    root.appendChild(rail);

    function sync() {
      panel.querySelectorAll("input").forEach(function (cb) {
        cb.checked = !!state[cb.dataset.id];
        cb.closest(".ml-lever").classList.toggle("on", cb.checked);
      });
    }
    allOn.addEventListener("click", function () {
      LEVERS.forEach(function (l) { state[l.id] = true; });
      TRAPS.forEach(function (t) { state[t.id] = false; });
      sync(); paint();
    });
    reset.addEventListener("click", function () {
      LEVERS.concat(TRAPS).forEach(function (l) { state[l.id] = false; });
      sync(); paint();
    });

    function drawWave() {
      var g = cv.getContext("2d"), W = cv.width, H = cv.height;
      g.clearRect(0, 0, W, H);
      var pad = 24, mid = H / 2, usable = W - pad * 2;
      /* highlight the detected silence first, underneath the wave */
      SIL.runs.forEach(function (r) {
        var x0 = pad + (r[0] / DUR) * usable, x1 = pad + (r[1] / DUR) * usable;
        g.fillStyle = state.trim ? "rgba(219,39,119,.16)" : "rgba(153,27,27,.14)";
        g.fillRect(x0, 12, x1 - x0, H - 24);
        g.strokeStyle = state.trim ? "#DB2777" : "#991B1B";
        g.setLineDash([5, 4]); g.lineWidth = 2;
        g.beginPath(); g.moveTo(x0, 12); g.lineTo(x0, H - 12);
        g.moveTo(x1, 12); g.lineTo(x1, H - 12); g.stroke();
        g.setLineDash([]);
      });
      g.fillStyle = "#DB2777";
      for (var i = 0; i < ENV.length; i++) {
        var x = pad + (i / ENV.length) * usable;
        var h = ENV[i] * (H / 2 - 22);
        var quiet = ENV[i] < SILENCE;
        g.fillStyle = quiet ? "#DCC9D2" : "#DB2777";
        g.fillRect(x, mid - h, Math.max(1, usable / ENV.length - 0.6), h * 2);
      }
      g.fillStyle = "#79616C";
      g.font = "600 20px Inter, sans-serif";
      for (var s = 0; s <= DUR; s += 10) {
        g.fillText(s + "s", pad + (s / DUR) * usable - 8, H - 4);
      }
    }

    function drawCurve() {
      var g = cc.getContext("2d"), W = cc.width, H = cc.height;
      g.clearRect(0, 0, W, H);
      var pad = 54, bottom = H - 44, top = 20, usable = W - pad - 24;
      g.strokeStyle = "#F0E3E9"; g.lineWidth = 2;
      [0, 0.25, 0.5, 0.75, 1].forEach(function (p) {
        var y = bottom - p * (bottom - top);
        g.beginPath(); g.moveTo(pad, y); g.lineTo(pad + usable, y); g.stroke();
        g.fillStyle = "#79616C"; g.font = "600 20px Inter, sans-serif";
        g.fillText(Math.round(p * 100) + "%", 8, y + 7);
      });
      /* the three-second marker, which is the whole lesson */
      var x3 = pad + (3 / DUR) * usable;
      g.strokeStyle = "#F59E0B"; g.setLineDash([6, 5]); g.lineWidth = 3;
      g.beginPath(); g.moveTo(x3, top); g.lineTo(x3, bottom); g.stroke();
      g.setLineDash([]);
      g.fillStyle = "#3A2400"; g.font = "700 20px Inter, sans-serif";
      g.fillText("3 seconds", x3 + 10, top + 22);

      g.beginPath();
      for (var i = 0; i <= 100; i++) {
        var f = i / 100, y = bottom - retentionAt(f) * (bottom - top), x = pad + f * usable;
        if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.strokeStyle = "#DB2777"; g.lineWidth = 5; g.lineJoin = "round"; g.stroke();
      g.lineTo(pad + usable, bottom); g.lineTo(pad, bottom); g.closePath();
      g.fillStyle = "rgba(219,39,119,.12)"; g.fill();
    }

    function paint() {
      var end = endRetention();
      big.textContent = Math.round(end * 100) + "%";
      big.className = "ml-big " + (end >= 0.55 ? "hi" : end >= 0.3 ? "mid" : "lo");
      cap.textContent = "of viewers are still there at the end, on a " + runtime() +
        " second cut. The steepest part of that curve is before second three.";
      silNote.innerHTML = "<b>" + SIL.runs.length + " stretches of dead air found</b>, totalling " +
        "<b>" + SIL.total + " seconds</b>, by scanning the envelope for runs under " + SILENCE +
        " amplitude lasting at least " + MIN_GAP + "s. " +
        (state.trim ? "Trimmed, so the cut runs <b>" + runtime() + "s</b> instead of " + DUR + "s."
                    : "Switch on <em>cut the dead air</em> and the runtime drops to <b>" +
                      Math.round((DUR - SIL.total) * 10) / 10 + "s</b>.");
      drawWave(); drawCurve();
    }

    paint();
    window.MEDIA_LIVE = {
      env: ENV, silence: SIL, state: state,
      set: function (id, v) { state[id] = v; sync(); paint(); },
      setAll: function (v) { LEVERS.forEach(function (l) { state[l.id] = v; });
        TRAPS.forEach(function (t) { state[t.id] = false; }); sync(); paint(); },
      endRetention: endRetention, runtime: runtime,
      levers: LEVERS, traps: TRAPS
    };
  }

  var host = document.getElementById("media-live");
  if (host) mount(host);
})();
