// ==========================================
// MODUL 2 — SIMULATOR PAULI / KRAEPELIN
// ==========================================

MODS.pauli = () => {
  // Reset keyboard listener saat modul dimuat
  document.onkeydown = null;

  const modeOptions = `
    <option value="single" selected>Mode Fokus (1 Soal per Tampilan - CAT Speed)</option>
    <option value="pauli">Mode Koran (Pauli — tempo bebas, scroll otomatis)</option>
    <option value="krae">Mode Koran (Kraepelin — pindah kolom 30 detik)</option>
  `;

  const durationOptions = `
    <option value="60">1 menit</option>
    <option value="120">2 menit</option>
    <option value="180" selected>3 menit</option>
    <option value="300">5 menit</option>
  `;

  const historyCols = [
    ['Mode', (r) => r.modeLabel || r.mode],
    ['Dikerjakan', (r) => r.done],
    ['Benar', (r) => r.ok],
    ['Akurasi', (r) => `${r.acc}%`],
    ['Kecepatan', (r) => `${r.speed} / mnt`]
  ];

  V().innerHTML = `
    ${hd('Pauli / Kraepelin', 'Jumlahkan dua angka berurutan, ketik digit satuan hasilnya (cth: 7 + 8 = 15 -> ketik 5).')}
    
    <div class="card">
      <div class="row">
        <div>
          <label>Pilih Mode Tampilan</label>
          <select id="m">
            ${modeOptions}
          </select>
        </div>
        <div>
          <label>Durasi Waktu</label>
          <select id="d">
            ${durationOptions}
          </select>
        </div>
        <button onclick="startPauli()">Mulai Tes</button>
      </div>
      ${note(typeof DISC !== 'undefined' ? DISC : 'Simulasi latihan mandiri Pauli/Kraepelin.')}
    </div>

    <div id="arena"></div>

    <div class="card">
      <h2>Riwayat & Grafik Perkembangan Pauli</h2>
      <div style="height:260px; position:relative; margin-bottom:16px">
        <canvas id="pauliChart"></canvas>
      </div>
      ${hist('pauli', historyCols)}
    </div>
  `;

  if (DB.pauli && DB.pauli.length) {
    chart(
      'pauliChart',
      DB.pauli.map((r) => fmt(r.t)),
      [
        { label: 'Kecepatan (soal/mnt)', data: DB.pauli.map((r) => r.speed) },
        { label: 'Akurasi (%)', data: DB.pauli.map((r) => r.acc) }
      ]
    );
  }
};

// ------------------------------------------
// LOGIKA SIMULATOR PAULI / KRAEPELIN
// ------------------------------------------

function startPauli() {
  const mode = $('#m')?.value || 'single';
  const dur = +($('#d')?.value || 180);
  const modeLabel =
    mode === 'single'
      ? 'Mode Fokus (CAT)'
      : mode === 'krae'
      ? 'Kraepelin Koran'
      : 'Pauli Koran';

  let left = dur;
  let ints = [];
  let cnt = 0;
  let done = 0;
  let ok = 0;
  let sinceSw = 0;
  let testTimer = null;

  if (typeof timers !== 'undefined' && Array.isArray(timers)) {
    timers.forEach(clearInterval);
    window.timers = [];
  }

  // ==========================================
  // MODE 1: MODE FOKUS (1 SOAL PER TAMPILAN)
  // ==========================================
  if (mode === 'single') {
    let numA = Math.floor(Math.random() * 10);
    let numB = Math.floor(Math.random() * 10);

    const renderSingle = () => {
      $('#arena').innerHTML = `
        <div class="card" style="text-align:center; max-width:400px; margin:0 auto">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
            <span class="sub">Dijawab: <b>${done}</b></span>
            <span style="color:var(--gold, #c9a227); font-weight:bold">Sisa Waktu: <b id="pTimerTxt">${left}s</b></span>
          </div>

          <div style="background:var(--bg); padding:24px; border-radius:12px; margin:16px 0; border:2px solid var(--bd)">
            <div style="font-size:3.5rem; font-weight:bold; color:var(--navy2, #13398a); line-height:1.1">${numA}</div>
            <div style="font-size:1.5rem; color:var(--mut, #888); margin:4px 0">+</div>
            <div style="font-size:3.5rem; font-weight:bold; color:var(--navy2, #13398a); line-height:1.1">${numB}</div>
          </div>

          <p class="sub">Ketik digit satuan hasil penjumlahan di keyboard (0-9):</p>

          <div class="cells" style="grid-template-columns:repeat(5,1fr); max-width:320px; margin:12px auto">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
              .map(
                (n) =>
                  `<button style="font-size:1.3rem; padding:10px" onclick="handlePauliInput(${n})">${n}</button>`
              )
              .join('')}
          </div>

          <button class="alt" style="margin-top:16px" onclick="finishPauli()">Selesai Lebih Awal</button>
        </div>
      `;
    };

    window.handlePauliInput = (digit) => {
      if (left <= 0) return;
      const target = (numA + numB) % 10;
      done++;
      cnt++;
      if (digit === target) ok++;

      numA = numB;
      numB = Math.floor(Math.random() * 10);
      renderSingle();
    };

    document.onkeydown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handlePauliInput(+e.key);
      }
    };

    window._pf = () => {
      if (testTimer) clearInterval(testTimer);
      document.onkeydown = null;
      ints.push(cnt);

      const wrongCount = done - ok;
      const rec = {
        mode,
        modeLabel,
        dur,
        done,
        ok,
        wrong: wrongCount,
        blank: 0,
        acc: done ? Math.round((ok / done) * 100) : 0,
        speed: +(done / (dur / 60)).toFixed(1),
        ints
      };

      add('pauli', rec);

      $('#arena').innerHTML = `
        <div class="card">
          <h2>Hasil ${modeLabel}</h2>
          <table>
            <tr><td>Total Dikerjakan</td><td><b>${done}</b> soal</td></tr>
            <tr><td>Jawaban Benar</td><td><b>${ok}</b></td></tr>
            <tr><td>Jawaban Salah</td><td><b>${wrongCount}</b></td></tr>
            <tr><td>Akurasi Performa</td><td><b>${rec.acc}%</b></td></tr>
            <tr><td>Kecepatan Kerja</td><td><b>${rec.speed}</b> soal/menit</td></tr>
          </table>
          <div style="height:260px; position:relative; margin-top:20px">
            <canvas id="pc"></canvas>
          </div>
          <button style="margin-top:16px" onclick="MODS.pauli()">Kembali ke Tes</button>
        </div>
      `;

      chart(
        'pc',
        ints.map((_, k) => `Interval ${k + 1}`),
        [{ label: 'Soal per 30 detik', data: ints }],
        'bar'
      );
    };

    renderSingle();

    testTimer = setInterval(() => {
      left--;
      sinceSw++;
      const tElem = $('#pTimerTxt');
      if (tElem) tElem.textContent = `${left}s`;

      if (sinceSw >= 30) {
        ints.push(cnt);
        cnt = 0;
        sinceSw = 0;
      }

      if (left <= 0) _pf();
    }, 1000);
    timers.push(testTimer);
    return;
  }

  // ==========================================
  // MODE 2: MODE KORAN (MULTI-KOLOM VIRTUAL)
  // ==========================================
  const C = 10;
  const N = 40;
  const cols = Array.from({ length: C }, () =>
    Array.from({ length: N }, () => Math.floor(Math.random() * 10))
  );

  let c = 0;
  let i = 0;
  let ans = cols.map(() => []);

  const draw = () => {
    const sheetHTML = cols
      .map((col, x) => {
        const isColActive = x === c;
        const rowsHTML = col
          .map((d, y) => {
            const isCur = isColActive && y === i;
            const a = ans[x][y];
            const targetSum = (d + (col[y + 1] ?? 0)) % 10;
            const isCorrect = a === targetSum;

            const userAnsHTML =
              a !== undefined
                ? `<u class="${isCorrect ? '' : 'x'}">${a}</u>`
                : '';

            return `
              <div class="${isCur ? 'cur' : ''}">
                <span>${d}</span>${userAnsHTML}
              </div>
            `;
          })
          .join('');

        return `<div class="col ${isColActive ? 'on' : ''}">${rowsHTML}</div>`;
      })
      .join('');

    $('#arena').innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <b>Mode Koran — Kolom ${c + 1}/${C}</b>
          <span style="color:var(--gold, #c9a227); font-weight:bold">Sisa Waktu: <b id="kraeTimerTxt">${left}s</b></span>
        </div>
        <div class="sheet">${sheetHTML}</div>
        <button class="alt" style="margin-top:12px" onclick="finishPauli()">Selesai Lebih Awal</button>
      </div>
    `;

    document.querySelector('.col.on')?.scrollIntoView({
      block: 'nearest',
      inline: 'center'
    });
  };

  const next = () => {
    i++;
    if (i >= N - 1) {
      c++;
      i = 0;
    }
  };

  window._pf = () => {
    if (testTimer) clearInterval(testTimer);
    document.onkeydown = null;

    let totalDone = 0;
    let totalOk = 0;

    cols.forEach((col, x) =>
      ans[x].forEach((a, y) => {
        if (a === undefined) return;
        totalDone++;
        if (a === (col[y] + col[y + 1]) % 10) totalOk++;
      })
    );

    ints.push(cnt);

    const wrongCount = totalDone - totalOk;
    const rec = {
      mode,
      modeLabel,
      dur,
      done: totalDone,
      ok: totalOk,
      wrong: wrongCount,
      blank: Math.max(0, (c + 1) * (N - 1) - totalDone - (N - 1 - i)),
      acc: totalDone ? Math.round((totalOk / totalDone) * 100) : 0,
      speed: +(totalDone / (dur / 60)).toFixed(1),
      ints
    };

    add('pauli', rec);

    $('#arena').innerHTML = `
      <div class="card">
        <h2>Hasil ${modeLabel}</h2>
        <table>
          <tr><td>Total Dikerjakan</td><td><b>${totalDone}</b></td></tr>
          <tr><td>Jawaban Benar</td><td><b>${totalOk}</b></td></tr>
          <tr><td>Jawaban Salah</td><td><b>${wrongCount}</b></td></tr>
          <tr><td>Kosong (terlewat)</td><td><b>${rec.blank}</b></td></tr>
          <tr><td>Akurasi Performa</td><td><b>${rec.acc}%</b></td></tr>
          <tr><td>Kecepatan Kerja</td><td><b>${rec.speed}</b> soal/menit</td></tr>
        </table>
        <div style="height:260px; position:relative; margin-top:20px">
          <canvas id="pc"></canvas>
        </div>
        <button style="margin-top:16px" onclick="MODS.pauli()">Kembali ke Tes</button>
      </div>
    `;

    chart(
      'pc',
      ints.map((_, k) => `Interval ${k + 1}`),
      [{ label: 'Soal per 30 detik', data: ints }],
      'bar'
    );
  };

  draw();

  document.onkeydown = (e) => {
    if (!/^[0-9]$/.test(e.key)) return;
    ans[c][i] = +e.key;
    cnt++;
    next();
    if (c >= C) return _pf();
    draw();
  };

  testTimer = setInterval(() => {
    left--;
    sinceSw++;

    const timerElem = $('#kraeTimerTxt');
    if (timerElem) timerElem.textContent = `${left}s`;

    let needRedraw = false;

    if (sinceSw >= 30) {
      ints.push(cnt);
      cnt = 0;
      sinceSw = 0;
      if (mode === 'krae') {
        c++;
        i = 0;
        needRedraw = true;
      }
    }

    if (left <= 0 || c >= C) return _pf();
    if (needRedraw) draw();
  }, 1000);
  timers.push(testTimer);
}

function finishPauli() {
  if (window._pf) window._pf();
}