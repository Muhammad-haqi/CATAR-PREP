// ==========================================
// MODUL 3 — SIMULATOR TES KESEMAPTAAN KEDINASAAN
// ==========================================

// ------------------------------------------
// 1. TABEL LOOKUP NORMA RESMI (SESUAI GAMBAR)
// ------------------------------------------

const NORMA_TABLES = {
  // --- LARI 12 MENIT (SAMAPTA A) ---
  run: {
    M: [
      [3444, 100], [3422, 99], [3401, 98], [3380, 97], [3369, 96], [3338, 95], [3317, 94], [3253, 91], [3190, 88], [3169, 87], [3148, 86], [3126, 85], [3105, 84], [3084, 83], [3062, 82], [3041, 81], [3021, 80], [2999, 79], [2978, 78], [2957, 77], [2936, 76], [2914, 75], [2893, 74], [2872, 73], [2851, 72], [2820, 71], [2809, 70], [2788, 69], [2767, 68], [2746, 67], [2725, 66], [2703, 65], [2682, 64], [2661, 63], [2639, 62], [2618, 61], [2597, 60], [2576, 59], [2555, 58], [2534, 57], [2513, 56], [2491, 55], [2470, 54], [2449, 53], [2428, 52], [2407, 51], [2386, 50], [2364, 49], [2343, 48], [2322, 47], [2301, 46], [2280, 45], [2259, 44], [2237, 43], [2216, 42], [2195, 41], [2174, 40], [2153, 39], [2132, 38], [2111, 37], [2090, 36], [2069, 35], [2048, 34], [2026, 33], [2005, 32], [1984, 31], [1962, 30], [1941, 29], [1920, 28], [1899, 27], [1878, 26], [1857, 25], [1836, 24], [1814, 23], [1793, 22], [1772, 21], [1750, 20], [1729, 19], [1708, 18], [1687, 17], [1666, 16], [1645, 15], [1625, 14], [1603, 13], [1582, 12], [1561, 11], [1539, 10], [1518, 9], [1497, 8], [1476, 7], [1455, 6], [1434, 5], [1413, 4], [1392, 3], [1371, 2], [1349, 1]
    ],
    W: [
      [3095, 100], [3084, 99], [3062, 98], [3041, 97], [3020, 96], [2999, 95], [2957, 93], [2936, 92], [2914, 91], [2893, 90], [2872, 89], [2851, 88], [2830, 87], [2809, 86], [2788, 85], [2767, 84], [2746, 83], [2725, 82], [2703, 81], [2682, 80], [2661, 79], [2639, 78], [2618, 77], [2597, 76], [2576, 75], [2555, 74], [2534, 73], [2513, 72], [2491, 71], [2470, 70], [2449, 69], [2428, 68], [2407, 67], [2385, 66], [2364, 65], [2343, 64], [2322, 63], [2301, 62], [2280, 61], [2259, 60], [2237, 59], [2216, 58], [2195, 57], [2174, 56], [2153, 55], [2132, 54], [2111, 53], [2090, 52], [2069, 51], [2048, 50], [2026, 49], [2005, 48], [1984, 47], [1962, 46], [1941, 45], [1920, 44], [1899, 43], [1878, 42], [1857, 41], [1836, 40], [1814, 39], [1793, 38], [1772, 37], [1750, 36], [1729, 35], [1708, 34], [1687, 33], [1666, 32], [1645, 31], [1624, 30], [1603, 29], [1582, 28], [1561, 27], [1539, 26], [1518, 25], [1497, 24], [1476, 23], [1455, 22], [1434, 21], [1412, 20], [1391, 19], [1370, 18], [1349, 17], [1328, 16], [1307, 15], [1286, 14], [1265, 13], [1244, 12], [1223, 11], [1202, 10], [1181, 9], [1160, 8], [1139, 7], [1118, 6], [1097, 5], [1076, 4], [1055, 3], [1034, 2], [1013, 1]
    ]
  },

  // --- PULL UP (PRIA) / CHINNING (WANITA) ---
  pl: {
    M: { 1:4, 2:8, 3:14, 4:20, 5:26, 6:32, 7:39, 8:46, 9:52, 10:58, 11:64, 12:70, 13:76, 14:82, 15:88, 16:94, 17:100 },
    W: { 33:2, 34:5, 35:7, 36:10, 37:12, 38:15, 39:17, 40:20, 41:22, 42:25, 43:27, 44:30, 45:32, 46:35, 47:37, 48:40, 49:42, 50:45, 51:47, 52:50, 53:52, 54:55, 55:57, 56:60, 57:62, 58:65, 59:67, 60:70, 61:72, 62:75, 63:77, 64:80, 65:82, 66:85, 67:87, 68:90, 69:92, 70:95, 71:97, 72:100 }
  },

  // --- SIT UP ---
  su: {
    M: { 6:1, 7:2, 8:4, 9:6, 10:8, 11:10, 12:12, 13:14, 14:16, 15:18, 16:20, 17:22, 18:24, 19:26, 20:28, 21:30, 22:32, 23:35, 24:38, 25:41, 26:44, 27:48, 28:52, 29:56, 30:60, 31:64, 32:68, 33:72, 34:76, 35:80, 36:84, 37:88, 38:92, 39:96, 40:100 },
    W: { 17:1, 18:3, 19:6, 20:10, 21:12, 22:15, 23:19, 24:21, 25:24, 26:26, 27:29, 28:33, 29:37, 30:39, 31:42, 32:46, 33:48, 34:51, 35:55, 36:57, 37:60, 38:64, 39:66, 40:69, 41:73, 42:75, 43:78, 44:82, 45:84, 46:87, 47:91, 48:93, 49:96, 50:100 }
  },

  // --- PUSH UP ---
  pu: {
    M: { 1:3, 2:4, 3:5, 4:6, 5:7, 6:9, 7:11, 8:13, 9:15, 10:17, 11:19, 12:21, 13:23, 14:26, 15:29, 16:32, 17:34, 18:36, 19:38, 20:40, 21:42, 22:44, 23:46, 24:48, 25:50, 26:52, 27:55, 28:58, 29:61, 30:64, 31:67, 32:70, 33:73, 34:76, 35:79, 36:82, 37:85, 38:88, 39:91, 40:94, 41:97, 42:100, 43:100 },
    W: { 1:1, 9:2, 10:6, 11:9, 12:13, 13:16, 14:20, 15:23, 16:27, 17:30, 18:34, 19:37, 20:41, 21:44, 22:48, 23:51, 24:55, 25:58, 26:62, 27:65, 28:69, 29:72, 30:76, 31:79, 32:83, 33:86, 34:90, 35:93, 36:97, 37:100 }
  },

  // --- SHUTTLE RUN ---
  sh: {
    M: [
      [16.2, 100], [16.3, 99], [16.4, 98], [16.5, 97], [16.6, 96], [16.7, 95], [16.8, 94], [16.9, 92], [17.0, 90], [17.1, 88], [17.2, 86], [17.3, 84], [17.4, 82], [17.5, 80], [17.6, 78], [17.7, 76], [17.8, 74], [17.9, 72], [18.0, 70], [18.1, 68], [18.2, 66], [18.3, 64], [18.4, 62], [18.5, 60], [18.6, 58], [18.7, 56], [18.8, 54], [18.9, 52], [19.0, 51], [19.1, 49], [19.2, 47], [19.3, 45], [19.4, 43], [19.5, 41], [19.6, 40], [19.7, 38], [19.8, 36], [19.9, 34], [20.0, 32], [20.1, 30], [20.2, 28], [20.3, 26], [20.4, 24], [20.5, 22], [20.6, 21], [20.7, 19], [20.8, 17], [20.9, 15], [21.0, 13], [21.1, 11], [21.2, 10], [21.3, 8], [21.4, 6], [21.5, 4], [21.6, 2], [21.7, 0]
    ],
    W: [
      [17.6, 100], [17.7, 99], [17.8, 98], [17.9, 97], [18.0, 96], [18.1, 95], [18.2, 94], [18.3, 93], [18.4, 92], [18.5, 91], [18.6, 90], [18.7, 89], [18.8, 88], [18.9, 87], [19.0, 86], [19.1, 85], [19.2, 84], [19.3, 83], [19.4, 82], [19.5, 81], [19.6, 80], [19.7, 79], [19.8, 78], [19.9, 77], [20.0, 76], [20.1, 75], [20.2, 74], [20.3, 73], [20.4, 72], [20.5, 71], [20.6, 70], [20.7, 69], [20.8, 68], [20.9, 67], [21.0, 66], [21.1, 65], [21.2, 64], [21.3, 63], [21.4, 62], [21.5, 61], [21.6, 60], [21.7, 59], [21.8, 58], [21.9, 57], [22.0, 56], [22.1, 55], [22.2, 54], [22.3, 53], [22.4, 52], [22.5, 51], [22.6, 50], [22.7, 49], [22.8, 48], [22.9, 47], [23.0, 46], [23.1, 45], [23.2, 44], [23.3, 43], [23.4, 42], [23.5, 41], [23.6, 40], [23.7, 39], [23.8, 38], [23.9, 37], [24.0, 36], [24.1, 35], [24.2, 34], [24.3, 33], [24.4, 32], [24.5, 31], [24.6, 30], [24.7, 29], [24.8, 28], [24.9, 27], [25.0, 26], [25.1, 25], [25.2, 24], [25.3, 23], [25.4, 22], [25.5, 21], [25.6, 20], [25.7, 19], [25.8, 18], [25.9, 17], [26.0, 16], [26.1, 15], [26.2, 14], [26.3, 13], [26.4, 12], [26.5, 11], [26.6, 10], [26.7, 9], [26.8, 8], [26.9, 7], [27.0, 6], [27.1, 0]
    ]
  }
};

const PT_CONFIG = {
  run: { name: 'Lari 12 Menit (Samapta A)', unit: 'meter', defaultLim: 720 },
  pu: { name: 'Push-Up 1 Menit', unit: 'repetisi', defaultLim: 60 },
  su: { name: 'Sit-Up 1 Menit', unit: 'repetisi', defaultLim: 60 },
  pl: { name: 'Pull-Up / Chinning', unit: 'repetisi', defaultLim: 60 },
  sh: { name: 'Shuttle Run', unit: 'detik', defaultLim: 0 }
};

// ------------------------------------------
// 2. FUNGSI KONVERSI SKOR PRESISI
// ------------------------------------------
function getSamaptaScore(key, val, gender = 'M') {
  if (val <= 0) return 0;

  const tableGroup = NORMA_TABLES[key];
  if (!tableGroup) return 0;
  const t = tableGroup[gender] || tableGroup['M'];

  // 1. Lari 12 Menit (Interpolasi / Match Threshold Meter)
  if (key === 'run') {
    if (val >= t[0][0]) return 100;
    if (val < t[t.length - 1][0]) return 0;
    for (let i = 0; i < t.length; i++) {
      if (val >= t[i][0]) return t[i][1];
    }
    return 0;
  }

  // 2. Shuttle Run (Waktu Detik — Lebih Cepat / Kecil = Skor Lebih Tinggi)
  if (key === 'sh') {
    if (val <= t[0][0]) return 100;
    if (val >= t[t.length - 1][0]) return 0;
    for (let i = 0; i < t.length; i++) {
      if (val <= t[i][0]) return t[i][1];
    }
    return 0;
  }

  // 3. Repetisi (Push-Up, Sit-Up, Pull-Up / Chinning)
  const rep = Math.floor(val);
  const keys = Object.keys(t).map(Number).sort((a, b) => a - b);
  const minRep = keys[0];
  const maxRep = keys[keys.length - 1];

  if (rep >= maxRep) return t[maxRep];
  if (rep < minRep) return 0;
  return t[rep] !== undefined ? t[rep] : 0;
}

// ------------------------------------------
// 3. MAIN VIEW MODUL KESEMAPTAAN
// ------------------------------------------
MODS.phys = () => {
  const genderOptions = `
    <option value="M">Pria</option>
    <option value="W">Wanita</option>
  `;

  const subtestOptions = Object.entries(PT_CONFIG)
    .map(([k, v]) => `<option value="${k}">${v.name}</option>`)
    .join('');

  const historyCols = [
    ['Subtes', (r) => PT_CONFIG[r.k]?.name || r.k],
    ['Hasil Real', (r) => `${r.v} ${PT_CONFIG[r.k]?.unit || ''}`],
    ['Nilai Skor', (r) => `<b style="color:var(--navy2,#13398a)">${r.score}/100</b>`]
  ];

  V().innerHTML = `
    ${hd('Physical Test Simulator', 'Catat hasil latihan mandiri & hitung Nilai Akumulasi Kesemaptaan (A + B) sesuai norma resmi.')}
    
    <div class="card">
      <div style="display:flex; gap:12px; margin-bottom:16px; border-bottom:1px solid var(--bd); padding-bottom:12px">
        <button id="tabSingle" style="flex:1" onclick="switchPhysTab('single')">Catat Subtes Mandiri</button>
        <button id="tabPackage" class="alt" style="flex:1" onclick="switchPhysTab('package')">Simulasi Paket Samapta A + B</button>
      </div>

      <!-- TAB 1: CATAT SUBTES MANDIRI -->
      <div id="viewSingle">
        <div class="row">
          <div>
            <label>Gender</label>
            <select id="pgender" onchange="drawPhys()">
              ${genderOptions}
            </select>
          </div>
          <div>
            <label>Subtes</label>
            <select id="pt" onchange="drawPhys()">
              ${subtestOptions}
            </select>
          </div>
          <div>
            <label id="ul">Hasil</label>
            <input id="pv" type="number" min="0" step="any" placeholder="Masukkan hasil">
          </div>
          <button onclick="savePhys()">Simpan & Hitung Skor</button>
        </div>
        
        <div class="row" style="margin-top:12px">
          <button class="gold" onclick="startSw()">Mulai Timer</button>
          <button class="alt" onclick="stopSw()">Berhenti</button>
          <b id="sw" style="align-self:center; font-size:1.2rem; color:var(--navy2)">00:00.0</b>
        </div>
        
        ${note('Timer otomatis hitung mundur 12 menit untuk lari, dan 1 menit untuk push-up/sit-up/pull-up.')}
      </div>

      <!-- TAB 2: SIMULASI PAKET SAMAPTA A + B -->
      <div id="viewPackage" style="display:none">
        <p class="sub" style="margin-bottom:12px">Masukkan hasil seluruh rangkaian tes Kesemaptaan untuk menghitung Skor Akhir Akumulasi Resmi (Norma Tabel).</p>
        
        <div class="row" style="margin-bottom:12px">
          <div>
            <label>Jenis Kelamin</label>
            <select id="pkgGender">
              ${genderOptions}
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px">
          <div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--bd)">
            <b>1. Lari 12 Menit (Meter)</b>
            <input id="pkgRun" type="number" placeholder="cth: 2407" style="margin-top:6px">
          </div>
          <div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--bd)">
            <b>2. Push-Up (Repetisi)</b>
            <input id="pkgPu" type="number" placeholder="cth: 35" style="margin-top:6px">
          </div>
          <div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--bd)">
            <b>3. Sit-Up (Repetisi)</b>
            <input id="pkgSu" type="number" placeholder="cth: 38" style="margin-top:6px">
          </div>
          <div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--bd)">
            <b>4. Pull-Up / Chinning</b>
            <input id="pkgPl" type="number" placeholder="cth: 12" style="margin-top:6px">
          </div>
          <div style="padding:10px; background:var(--bg); border-radius:8px; border:1px solid var(--bd)">
            <b>5. Shuttle Run (Detik)</b>
            <input id="pkgSh" type="number" step="0.1" placeholder="cth: 17.2" style="margin-top:6px">
          </div>
        </div>

        <button style="margin-top:16px; width:100%" onclick="calcPackageSamapta()">Kalkulasi Skor Paket Samapta</button>
        <div id="pkgResult"></div>
      </div>
    </div>

    <div class="card" id="pd"></div>

    <div class="card">
      <h2>Riwayat Latihan Fisik</h2>
      ${hist('phys', historyCols)}
    </div>
  `;

  drawPhys();
};

// ------------------------------------------
// LOGIKA TAB & TIMER
// ------------------------------------------
function switchPhysTab(tab) {
  const vSingle = $('#viewSingle');
  const vPkg = $('#viewPackage');
  const btnSingle = $('#tabSingle');
  const btnPkg = $('#tabPackage');

  if (tab === 'single') {
    vSingle.style.display = 'block';
    vPkg.style.display = 'none';
    btnSingle.className = '';
    btnPkg.className = 'alt';
  } else {
    vSingle.style.display = 'none';
    vPkg.style.display = 'block';
    btnSingle.className = 'alt';
    btnPkg.className = '';
  }
}

let swT;
function startSw() {
  stopSw();

  const selectedKey = $('#pt').value;
  const lim = PT_CONFIG[selectedKey]?.defaultLim || 0;
  const t0 = Date.now();

  swT = setInterval(() => {
    let s = (Date.now() - t0) / 1000;

    if (lim) {
      s = Math.max(0, lim - s);
      if (s === 0) {
        stopSw();
        toast('Waktu habis! Segera masukkan hasil latihanmu.');
      }
    }

    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = (s % 60).toFixed(1).padStart(4, '0');

    const swElem = $('#sw');
    if (swElem) swElem.textContent = `${mins}:${secs}`;
  }, 100);

  if (typeof timers !== 'undefined' && Array.isArray(timers)) {
    timers.push(swT);
  }
}

function stopSw() {
  if (swT) clearInterval(swT);
}

// ------------------------------------------
// LOGIKA SIMPAN & RENDER HISTORI SUBTES
// ------------------------------------------
function savePhys() {
  const k = $('#pt').value;
  const v = +$('#pv').value;
  const gender = $('#pgender').value;

  if (!(v > 0)) {
    return toast('Masukkan hasil angka yang valid', 1);
  }

  const score = getSamaptaScore(k, v, gender);

  add('phys', { k, v, gender, score });
  toast(`Latihan tersimpan! Nilai Skor Resmi: ${score}/100`);
  $('#pv').value = '';
  drawPhys();
}

function drawPhys() {
  const k = $('#pt')?.value || 'run';
  const gender = $('#pgender')?.value || 'M';
  const subtestData = (DB.phys || []).filter((r) => r.k === k);
  const unit = PT_CONFIG[k].unit;

  const unitElem = $('#ul');
  if (unitElem) unitElem.textContent = `Hasil (${unit})`;

  const last = subtestData[subtestData.length - 1];
  const prev = subtestData[subtestData.length - 2];

  let progressText = '';
  if (last && prev) {
    const diff = Math.abs(+(last.v - prev.v).toFixed(1));
    const status = last.v > prev.v ? 'naik' : last.v < prev.v ? 'turun' : 'sama';
    const isShuttle = k === 'sh' ? ' (shuttle run: lebih kecil berarti lebih cepat)' : '';

    progressText = `
      <p style="margin-bottom:12px">
        Latihan terakhir: <b>${last.v} ${unit}</b> (Skor Resmi: <b>${last.score}/100</b>), 
        ${status} ${diff} dari sesi sebelumnya${isShuttle}.
      </p>
    `;
  }

  const pdElem = $('#pd');
  if (pdElem) {
    pdElem.innerHTML = `
      <h2>Detail Perkembangan: ${PT_CONFIG[k].name}</h2>
      ${progressText}
      <div style="height:260px; position:relative; margin-top:16px">
        <canvas id="pc"></canvas>
      </div>
    `;
  }

  if (subtestData.length) {
    chart(
      'pc',
      subtestData.map((r) => fmt(r.t)),
      [
        { label: `Hasil (${unit})`, data: subtestData.map((r) => r.v) },
        { label: 'Nilai Skor Resmi (0-100)', data: subtestData.map((r) => r.score) }
      ]
    );
  }
}

// ------------------------------------------
// LOGIKA SIMULASI PAKET KESEMAPTAAN (A + B)
// ------------------------------------------
function calcPackageSamapta() {
  const g = $('#pkgGender').value;
  const rRun = +$('#pkgRun').value || 0;
  const rPu = +$('#pkgPu').value || 0;
  const rSu = +$('#pkgSu').value || 0;
  const rPl = +$('#pkgPl').value || 0;
  const rSh = +$('#pkgSh').value || 0;

  if (!rRun || !rPu || !rSu) {
    return toast('Isi minimal Lari, Push-Up, dan Sit-Up', 1);
  }

  // Hitung Skor Tiap Item dari Tabel Resmi
  const sRun = getSamaptaScore('run', rRun, g);
  const sPu = getSamaptaScore('pu', rPu, g);
  const sSu = getSamaptaScore('su', rSu, g);
  const sPl = getSamaptaScore('pl', rPl, g);
  const sSh = getSamaptaScore('sh', rSh, g);

  const scoreA = sRun;
  const bItems = [sPu, sSu, sPl, sSh].filter((val) => val > 0);
  const scoreB = Math.round(bItems.reduce((a, b) => a + b, 0) / (bItems.length || 1));
  const finalScore = Math.round((scoreA + scoreB) / 2);

  let statusText = '';
  let statusColor = 'var(--ok, #10b981)';

  if (finalScore >= 85) {
    statusText = 'Sangat Baik (Memenuhi Syarat Sangat Tinggi)';
  } else if (finalScore >= 71) {
    statusText = 'Baik (Memenuhi Syarat)';
  } else if (finalScore >= 61) {
    statusText = 'Cukup (Batas Aman Kelulusan)';
    statusColor = 'var(--gold, #f59e0b)';
  } else {
    statusText = 'Kurang / Tidak Memenuhi Syarat (TMS)';
    statusColor = 'var(--bad, #ef4444)';
  }

  $('#pkgResult').innerHTML = `
    <div style="margin-top:20px; padding:16px; background:var(--bg); border-radius:12px; border:2px solid ${statusColor}">
      <div style="text-align:center">
        <small style="color:var(--mut)">NILAI AKHIR AKUMULASI KESEMAPTAAN (A + B):</small>
        <div class="big" style="font-size:3.5rem; color:${statusColor}">${finalScore}</div>
        <div style="font-weight:bold; color:${statusColor}; font-size:1.1rem">${statusText}</div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-top:16px; font-size:0.9rem">
        <div style="padding:10px; background:var(--card); border-radius:8px; border:1px solid var(--bd)">
          <b>Samapta A (Lari 12m):</b> ${sRun}/100 (${rRun} m)
        </div>
        <div style="padding:10px; background:var(--card); border-radius:8px; border:1px solid var(--bd)">
          <b>Samapta B (Rata-rata):</b> ${scoreB}/100
        </div>
      </div>

      <div style="margin-top:10px; padding:10px; background:var(--card); border-radius:8px; border:1px solid var(--bd); font-size:0.85rem">
        <b>Detail Skor B:</b> Push-Up: ${sPu} · Sit-Up: ${sSu} · Pull-Up: ${sPl} · Shuttle Run: ${sSh}
      </div>
    </div>
  `;

  toast('Simulasi Paket Kesemaptaan berhasil dihitung sesuai tabel resmi!');
}