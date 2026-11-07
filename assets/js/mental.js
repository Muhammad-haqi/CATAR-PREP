// ==========================================
// MODUL 5 — LATIHAN MENTAL & PSIKOTES KEDINASAAN
// ==========================================

MODS.mental = () => {
  const durationOptions = `
    <option value="60">1 menit</option>
    <option value="120">2 menit</option>
    <option value="180" selected>3 menit</option>
    <option value="300">5 menit</option>
  `;

  const testTiles = [
    {
      fn: 'missingChar()',
      title: 'Tes Karakter Hilang',
      desc: 'Temukan 1 karakter yang hilang dari panduan.'
    },
    {
      fn: 'accuracy()',
      title: 'Tes Ketelitian Kode',
      desc: 'Tentukan pasangan simbol sama atau beda.'
    },
    {
      fn: 'wordMemory()',
      title: 'Tes Hafalan Kata',
      desc: 'Hafalkan 6 kelompok kata lalu tebak kategorinya.'
    },
    {
      fn: 'fastCalc()',
      title: 'Tes Hitung Cepat',
      desc: 'Selesaikan operasi aritmatika dasar sebanyak mungkin.'
    }
  ];

  const gridHTML = testTiles
    .map(
      (t) => `
      <div class="card tile" onclick="${t.fn}">
        <b>${t.title}</b><br>${t.desc}
      </div>`
    )
    .join('');

  const historyCols = [
    ['Tes', (r) => r.test],
    ['Hasil', (r) => r.txt]
  ];

  V().innerHTML = `
    ${hd('Latihan Mental', 'Psikotes kecermatan, hafalan kata, dan hitung cepat bertimer.')}
    
    <div class="card">
      <div class="row">
        <div>
          <label>Pilih Durasi Waktu Tes</label>
          <select id="mDur">
            ${durationOptions}
          </select>
        </div>
      </div>
      ${note('Setiap tes akan berlangsung sesuai durasi yang dipilih. Selesaikan soal sebanyak mungkin secara akurat sebelum waktu habis!')}
    </div>

    <div class="grid">
      ${gridHTML}
    </div>

    <div id="mt"></div>

    <div class="card">
      <h2>Riwayat</h2>
      ${hist('mental', historyCols)}
    </div>
  `;
};

// Helper Selesai Tes Mental
const mdone = (test, txt, score) => {
  add('mental', { test, txt, score });
  $('#mt').innerHTML = `
    <div class="card" style="text-align:center">
      <h2>${test} Selesai</h2>
      <div class="big">${txt}</div>
      <p class="sub">Akurasi Performa: <b>${score}%</b></p>
    </div>
  `;
};

// ------------------------------------------
// 1. TES KARAKTER HILANG (Bertimer)
// ------------------------------------------
function missingChar() {
  const dur = +($('#mDur')?.value || 180);
  let left = dur;
  let testTimer = null;

  const CHAR_SETS = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'J', 'K'],
    ['L', 'M', 'N', 'P', 'Q'],
    ['R', 'S', 'T', 'U', 'V'],
    ['W', 'X', 'Y', 'Z', 'A'],
    ['1', '3', '5', '7', '9'],
    ['2', '4', '6', '8', '0'],
    ['1', '2', '3', '4', '5'],
    ['5', '6', '7', '8', '9'],
    ['▲', '●', '■', '◆', '★'],
    ['✚', '✖', '✱', '⯌', '⯇'],
    ['K', 'L', 'M', 'N', 'P'],
    ['B', 'D', 'F', 'H', 'J'],
    ['C', 'E', 'G', 'I', 'K'],
    ['M', 'O', 'Q', 'S', 'U'],
    ['V', 'W', 'X', 'Y', 'Z'],
    ['3', '4', '5', '6', '7'],
    ['6', '7', '8', '9', '1'],
    ['♠', '♣', '♥', '♦', '★'],
    ['P', 'Q', 'R', 'S', 'T']
  ];

  const setUsage = Array(CHAR_SETS.length).fill(0);
  let n = 0;
  let ok = 0;
  let rt = [];
  let t0;

  const finish = () => {
    if (testTimer) clearInterval(testTimer);
    const score = n ? Math.round((ok / n) * 100) : 0;
    const avgRt = rt.length ? Math.round(avg(rt)) : 0;
    mdone('Tes Karakter Hilang', `${ok}/${n} benar (${avgRt} ms/soal)`, score);
  };

  testTimer = setInterval(() => {
    left--;
    const timerElem = $('#mcTimerTxt');
    if (timerElem) timerElem.textContent = `${left}s`;
    if (left <= 0) finish();
  }, 1000);
  timers.push(testTimer);

  const render = () => {
    if (left <= 0) return finish();

    let setIdx;
    let attempts = 0;
    do {
      setIdx = Math.floor(Math.random() * CHAR_SETS.length);
      attempts++;
    } while (setUsage[setIdx] >= 5 && attempts < 50);

    setUsage[setIdx]++;
    const set = CHAR_SETS[setIdx];

    const missingIdx = Math.floor(Math.random() * set.length);
    const missingItem = set[missingIdx];

    const promptItems = set
      .filter((_, idx) => idx !== missingIdx)
      .sort(() => Math.random() - 0.5);

    t0 = Date.now();

    const guideHTML = set.map((c) => `<b style="padding:0 4px">${c}</b>`).join(' · ');
    const promptHTML = promptItems.map((c) => `<b style="padding:0 6px">${c}</b>`).join(' ');
    const optionBtns = set
      .map((c) => `<button onclick="mcCheck('${c}', '${missingItem}')">${c}</button>`)
      .join('');

    $('#mt').innerHTML = `
      <div class="card" style="text-align:center">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <b>Tes Karakter Hilang</b> (Soal Ke-${n + 1})
          <span style="color:#c9a227; font-weight:bold">Sisa Waktu: <b id="mcTimerTxt">${left}s</b></span>
        </div>
        
        <div style="margin:16px 0; padding:10px; background:var(--bg-sub, #f1f5f9); border-radius:8px">
          <small style="display:block; margin-bottom:4px">PANDUAN:</small>
          <span style="font-size:1.3rem; letter-spacing:2px">${guideHTML}</span>
        </div>

        <div style="margin:16px 0">
          <small style="display:block; margin-bottom:4px">SOAL (Karakter yang muncul):</small>
          <span style="font-size:1.6rem; color:#13398a; letter-spacing:4px">${promptHTML}</span>
        </div>

        <p class="sub">Pilih 1 karakter dari Panduan yang <b>HILANG</b> di Soal:</p>
        
        <div class="cells" style="grid-template-columns:repeat(5,1fr); max-width:400px; margin:0 auto">
          ${optionBtns}
        </div>
      </div>
    `;
  };

  window.mcCheck = (chosen, correct) => {
    rt.push(Date.now() - t0);
    if (chosen === correct) ok++;
    n++;
    render();
  };

  render();
}

// ------------------------------------------
// 2. TES KETELITIAN KODE (Bertimer)
// ------------------------------------------
function accuracy() {
  const dur = +($('#mDur')?.value || 180);
  let left = dur;
  let testTimer = null;

  const SYMBOLS = '▲●■◆★✚';
  const patternUsage = {};

  const makePattern = () => {
    let pat;
    let attempts = 0;
    do {
      pat = Array.from({ length: 5 }, () => SYMBOLS[Math.floor(Math.random() * 6)]).join('');
      attempts++;
    } while ((patternUsage[pat] || 0) >= 5 && attempts < 50);

    patternUsage[pat] = (patternUsage[pat] || 0) + 1;
    return pat;
  };

  let n = 0;
  let ok = 0;

  const finish = () => {
    if (testTimer) clearInterval(testTimer);
    const score = n ? Math.round((ok / n) * 100) : 0;
    mdone('Tes Ketelitian Kode', `${ok}/${n} benar (${dur} detik)`, score);
  };

  testTimer = setInterval(() => {
    left--;
    const timerElem = $('#acTimerTxt');
    if (timerElem) timerElem.textContent = `${left}s`;
    if (left <= 0) finish();
  }, 1000);
  timers.push(testTimer);

  const render = () => {
    if (left <= 0) return finish();

    const a = makePattern();
    let b = a;
    if (Math.random() < 0.5) {
      const pos = Math.floor(Math.random() * 5);
      const char = SYMBOLS[Math.floor(Math.random() * 6)];
      b = a.slice(0, pos) + char + a.slice(pos + 1);
    }

    window._curPair = [a, b];

    $('#mt').innerHTML = `
      <div class="card" style="text-align:center">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <b>Tes Ketelitian Kode</b> (Soal Ke-${n + 1})
          <span style="color:#c9a227; font-weight:bold">Sisa Waktu: <b id="acTimerTxt">${left}s</b></span>
        </div>

        <div class="big" style="letter-spacing:6px; margin:20px 0">
          ${a}<br>${b}
        </div>

        <button onclick="ac(1)">Sama</button>
        <button class="alt" onclick="ac(0)">Beda</button>
      </div>
    `;
  };

  window.ac = (val) => {
    const isSame = window._curPair[0] === window._curPair[1];
    if (isSame === !!val) ok++;
    n++;
    render();
  };

  render();
}

// ------------------------------------------
// 3. TES HAFALAN KATA (Bertimer)
// ------------------------------------------
function wordMemory() {
  const dur = +($('#mDur')?.value || 180);

  const KELOMPOK = {
    BUNGA: ['Anggrek', 'Flamboyan', 'Kamboja', 'Mawar', 'Melati', 'Seroja', 'Tulip'],
    BURUNG: ['Cenderawasih', 'Elang', 'Gereja', 'Kakatua', 'Kutilang', 'Merpati', 'Penguin'],
    PERKAKAS: ['Cangkul', 'Gergaji', 'Obeng', 'Palu', 'Pahat', 'Tang', 'Tatah'],
    PAKAIAN: ['Celana', 'Gaun', 'Jaket', 'Kemeja', 'Rompi', 'Sarung', 'Tunik'],
    BUAH: ['Apel', 'Durian', 'Jeruk', 'Melon', 'Nangka', 'Pisang', 'Semangka'],
    HEWAN: ['Beruang', 'Gajah', 'Harimau', 'Kucing', 'Kuda', 'Sapi', 'Serigala']
  };

  const categories = Object.keys(KELOMPOK);
  const allWords = [];
  categories.forEach((cat) => {
    KELOMPOK[cat].forEach((word) => {
      allWords.push({ word, cat });
    });
  });

  let n = 0;
  let ok = 0;
  let memTimeLeft = 60; // Hafalan awal 60s
  let quizLeft = dur;   // Sesi kuis sesuai pilihan durasi
  let memTimer = null;
  let quizTimer = null;

  const tableRows = categories
    .map(
      (cat) =>
        `<tr>
          <td style="font-weight:bold; width:25%">${cat}</td>
          <td>${KELOMPOK[cat].join(', ')}</td>
        </tr>`
    )
    .join('');

  // Fase 1: Hafalan Kata (Countdown 60s)
  $('#mt').innerHTML = `
    <div class="card" style="text-align:center">
      <h2>Hafalkan Kelompok Kata Ini!</h2>
      <p class="sub">Waktu menghafal otomatis: <b id="memTimerTxt" style="color:#c9a227; font-size:1.2rem">60s</b></p>
      
      <table style="margin:16px 0; text-align:left">
        ${tableRows}
      </table>

      <button onclick="startMemQuiz()">Saya Sudah Hafal, Langsung Kuis!</button>
    </div>
  `;

  memTimer = setInterval(() => {
    memTimeLeft--;
    const timerElem = $('#memTimerTxt');
    if (timerElem) timerElem.textContent = `${memTimeLeft}s`;

    if (memTimeLeft <= 0) {
      startMemQuiz();
    }
  }, 1000);
  timers.push(memTimer);

  // Fase 2: Kuis Kata (Sesuai durasi yang dipilih)
  window.startMemQuiz = () => {
    if (memTimer) {
      clearInterval(memTimer);
      memTimer = null;
    }

    const finishQuiz = () => {
      if (quizTimer) clearInterval(quizTimer);
      const score = n ? Math.round((ok / n) * 100) : 0;
      mdone('Tes Hafalan Kata', `${ok}/${n} benar (${dur} detik kuis)`, score);
    };

    quizTimer = setInterval(() => {
      quizLeft--;
      const timerElem = $('#wmTimerTxt');
      if (timerElem) timerElem.textContent = `${quizLeft}s`;
      if (quizLeft <= 0) finishQuiz();
    }, 1000);
    timers.push(quizTimer);

    const renderQuiz = () => {
      if (quizLeft <= 0) return finishQuiz();

      // Pilih kata acak dari 42 kata
      const q = allWords[Math.floor(Math.random() * allWords.length)];
      window._curWord = q;

      const catBtns = categories
        .map(
          (cat) =>
            `<button style="margin:4px" onclick="checkMem('${cat}')">${cat}</button>`
        )
        .join('');

      $('#mt').innerHTML = `
        <div class="card" style="text-align:center">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
            <b>Tes Hafalan Kata</b> (Soal Ke-${n + 1})
            <span style="color:#c9a227; font-weight:bold">Sisa Waktu Kuis: <b id="wmTimerTxt">${quizLeft}s</b></span>
          </div>
          
          <div style="margin:24px 0">
            <small style="display:block; margin-bottom:4px">Kata di bawah ini termasuk kelompok:</small>
            <div class="big" style="color:#13398a">${q.word}</div>
          </div>

          <div style="display:flex; flex-wrap:wrap; justify-content:center; max-width:450px; margin:0 auto">
            ${catBtns}
          </div>
        </div>
      `;
    };

    window.checkMem = (chosenCat) => {
      if (chosenCat === window._curWord.cat) ok++;
      n++;
      renderQuiz();
    };

    renderQuiz();
  };
}

// ------------------------------------------
// 4. TES HITUNG CEPAT (Bertimer)
// ------------------------------------------
function fastCalc() {
  const dur = +($('#mDur')?.value || 180);
  let left = dur;
  let testTimer = null;

  let n = 0;
  let ok = 0;
  let rt = [];
  let t0;

  const generateEq = () => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;

    if (op === '+') {
      a = 12 + Math.floor(Math.random() * 88);
      b = 12 + Math.floor(Math.random() * 88);
      ans = a + b;
    } else if (op === '-') {
      a = 25 + Math.floor(Math.random() * 75);
      b = 10 + Math.floor(Math.random() * (a - 10));
      ans = a - b;
    } else {
      a = 3 + Math.floor(Math.random() * 12);
      b = 3 + Math.floor(Math.random() * 12);
      ans = a * b;
    }

    const choices = new Set([ans]);
    while (choices.size < 4) {
      const offset = (Math.random() < 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 5));
      const fake = ans + offset;
      if (fake >= 0) choices.add(fake);
    }

    return {
      text: `${a} ${op} ${b} = ?`,
      ans,
      options: [...choices].sort(() => Math.random() - 0.5)
    };
  };

  const finish = () => {
    if (testTimer) clearInterval(testTimer);
    const score = n ? Math.round((ok / n) * 100) : 0;
    const avgRt = rt.length ? Math.round(avg(rt)) : 0;
    mdone('Tes Hitung Cepat', `${ok}/${n} benar (${avgRt} ms/soal)`, score);
  };

  testTimer = setInterval(() => {
    left--;
    const timerElem = $('#fcTimerTxt');
    if (timerElem) timerElem.textContent = `${left}s`;
    if (left <= 0) finish();
  }, 1000);
  timers.push(testTimer);

  const render = () => {
    if (left <= 0) return finish();

    const eq = generateEq();
    t0 = Date.now();

    const optionBtns = eq.options
      .map(
        (val) =>
          `<button style="font-size:1.2rem; padding:12px" onclick="checkCalc(${val}, ${eq.ans})">${val}</button>`
      )
      .join('');

    $('#mt').innerHTML = `
      <div class="card" style="text-align:center">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <b>Tes Hitung Cepat</b> (Soal Ke-${n + 1})
          <span style="color:#c9a227; font-weight:bold">Sisa Waktu: <b id="fcTimerTxt">${left}s</b></span>
        </div>
        
        <div style="margin:20px 0">
          <div class="big" style="color:#13398a; font-size:2.5rem">${eq.text}</div>
        </div>

        <div class="cells" style="grid-template-columns:repeat(2,1fr); max-width:320px; margin:0 auto">
          ${optionBtns}
        </div>
      </div>
    `;
  };

  window.checkCalc = (chosen, correct) => {
    rt.push(Date.now() - t0);
    if (chosen === correct) ok++;
    n++;
    render();
  };

  render();
}