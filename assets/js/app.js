// ==========================================
// CORE APP ROUTER & UTILITIES (assets/js/app.js)
// ==========================================

window.MODS = window.MODS || {};
window.timers = window.timers || [];
window.DB = window.DB || { profile: {}, bmi: [], pauli: [], phys: [], interview: [], mental: [], sjt: [] };

// Helper Utilities
const $ = (s) => document.querySelector(s);
const V = () => $('#view');
const fmt = (t) => new Date(t).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
const avg = (a) => (a && a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

const DISC = 'Simulasi latihan mandiri, bukan instrumen resmi instansi pemerintah. Aplikasi ini tidak menjamin kelulusan seleksi.';

function toast(msg, err = 0) {
  const container = $('#toast');
  if (!container) return;
  const d = document.createElement('div');
  if (err) d.className = 'e';
  d.textContent = msg;
  container.appendChild(d);
  setTimeout(() => d.remove(), 3000);
}

function chart(id, labels, datasets, type = 'line') {
  const ctx = document.getElementById(id);
  if (!ctx || typeof Chart === 'undefined') return;

  if (ctx._chartInstance) {
    ctx._chartInstance.destroy();
  }

  ctx._chartInstance = new Chart(ctx, {
    type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: datasets.length > 1 } }
    }
  });
}

function hd(title, sub) {
  return `
    <h1>${title}</h1>
    <p class="sub">${sub}</p>
  `;
}

function note(txt) {
  return `<div class="note">${txt}</div>`;
}

function hist(key, cols) {
  const data = DB[key] || [];
  if (!data.length) return '<div class="empty">Belum ada riwayat. Mulai latihan pertamamu.</div>';

  const headers = cols.map((c) => `<th>${c[0]}</th>`).join('');
  const rows = [...data]
    .reverse()
    .map((r) => {
      const cells = cols.map((c) => `<td>${c[1](r)}</td>`).join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  return `
    <div style="overflow-x:auto">
      <table>
        <thead><tr>${headers}<th>Waktu</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function readiness() {
  const scores = [];
  if (DB.bmi && DB.bmi.length) {
    const b = DB.bmi[DB.bmi.length - 1];
    scores.push(b.cat === 'Normal' ? 100 : b.cat === 'Kurus' ? 70 : 60);
  }
  if (DB.phys && DB.phys.length) {
    const lastP = DB.phys.slice(-5);
    scores.push(Math.round(avg(lastP.map((x) => x.score))));
  }
  if (DB.pauli && DB.pauli.length) {
    scores.push(DB.pauli[DB.pauli.length - 1].acc);
  }
  if (DB.interview && DB.interview.length) {
    scores.push(Math.min(100, Math.round((avg(DB.interview.map((x) => x.starScore)) / 4) * 100)));
  }
  if (DB.mental && DB.mental.length) {
    scores.push(Math.round(avg(DB.mental.slice(-5).map((x) => x.score))));
  }
  if (DB.sjt && DB.sjt.length) {
    scores.push(DB.sjt[DB.sjt.length - 1].pct);
  }

  return scores.length ? Math.round(avg(scores)) : null;
}

function rec() {
  const list = [];
  if (!DB.bmi || !DB.bmi.length) list.push('Lakukan skrining BMI dan tinggi badan minimal pertama di modul BMI.');
  if (!DB.pauli || !DB.pauli.length) list.push('Coba latihan Pauli/Kraepelin Mode Fokus (CAT) untuk menguji konsistensi.');
  if (!DB.phys || !DB.phys.length) list.push('Input hasil Kesemaptaan A & B untuk menghitung nilai akumulasi skor.');
  if (!DB.interview || !DB.interview.length) list.push('Gunakan simulator wawancara dengan suara (Speech-to-Text) dan checklist STAR.');
  if (!DB.mental || !DB.mental.length) list.push('Asah kecepatan kecermatan di modul Latihan Mental (Tes Karakter Hilang).');
  if (!DB.sjt || !DB.sjt.length) list.push('Uji penalaran situasional dan kepemimpinan di modul SJT.');

  if (!list.length) {
    list.push('Pertahankan konsistensi latihan harian untuk menjaga grafik kesiapan!');
  }
  return list;
}

// ------------------------------------------
// ROUTER ENGINE
// ------------------------------------------
const NAV_ITEMS = [
  ['dash', 'Dashboard', '🏠'],
  ['bmi', 'BMI', '⚖️'],
  ['pauli', 'Pauli / Kraepelin', '🔢'],
  ['phys', 'Tes Fisik', '🏃'],
  ['intv', 'Wawancara', '🎤'],
  ['mental', 'Latihan Mental', '🧠'],
  ['sjt', 'Situational Judgment', '🧭'],
  ['report', 'Laporan Kesiapan', '📊'],
  ['settings', 'Pengaturan', '⚙️']
];

function route() {
  if (typeof timers !== 'undefined' && Array.isArray(timers)) {
    timers.forEach(clearInterval);
    window.timers = [];
  }

  const hash = (location.hash.replace('#', '') || 'dash').trim();

  const navElem = $('#nav');
  if (navElem) {
    navElem.innerHTML = `
      <div class="brand">
        <b>CATAR<i>PREP</i></b>
        <small>Prepare Yourself. Prove Your Readiness.</small>
      </div>
      ${NAV_ITEMS.map(
        ([id, name, icon]) => `
        <a class="${hash === id ? 'on' : ''}" onclick="location.hash='${id}'">
          <i>${icon}</i> <span>${name}</span>
        </a>`
      ).join('')}
    `;
  }

  if (MODS[hash]) {
    MODS[hash]();
  } else if (MODS.dash) {
    MODS.dash();
  }
}

// Ekspor Fungsi Router ke Window Global
window.route = route;
window.onhashchange = route;

// Dashboard View
MODS.dash = () => {
  const p = DB.profile || {};
  const modules = [
    { key: 'bmi', name: 'BMI Assessment', icon: '⚖️', route: 'bmi' },
    { key: 'pauli', name: 'Pauli / Kraepelin', icon: '🔢', route: 'pauli' },
    { key: 'phys', name: 'Tes Fisik', icon: '🏃', route: 'phys' },
    { key: 'interview', name: 'Wawancara (WPFK)', icon: '🎤', route: 'intv' },
    { key: 'mental', name: 'Latihan Mental', icon: '🧠', route: 'mental' },
    { key: 'sjt', name: 'Situational Judgment', icon: '🧭', route: 'sjt' }
  ];

  const modLabels = {
    bmi: '⚖️ BMI & Body Assessment',
    pauli: '🔢 Pauli / Kraepelin',
    phys: '🏃 Tes Fisik',
    interview: '🎤 Wawancara (WPFK)',
    mental: '🧠 Latihan Mental',
    sjt: '🧭 Situational Judgment Test'
  };

  const keys = Object.keys(modLabels);
  const totalSessions = keys.reduce((s, k) => s + (DB[k]?.length || 0), 0);

  const lastActivities = keys
    .flatMap((k) => (DB[k] || []).map((r) => ({ k, t: r.t })))
    .sort((a, b) => b.t - a.t)
    .slice(0, 5);

  const scoreReadiness = readiness();

  let daysText = '';
  if (p.start) {
    const diffTime = Math.abs(new Date() - new Date(p.start));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysText = ` · Persiapan Hari Ke-${diffDays}`;
  }

  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const subTitle = `${dateStr}${p.target ? ' · Target: ' + p.target : ''}${daysText}`;

  const moduleCardsHTML = modules
    .map((m) => {
      const count = DB[m.key]?.length || 0;
      const statusBadge =
        count > 0
          ? `<span style="font-size:0.8rem; color:#10b981; background:#ecfdf5; padding:2px 8px; border-radius:10px; font-weight:bold">${count} sesi</span>`
          : `<span style="font-size:0.8rem; color:#ef4444; background:#fef2f2; padding:2px 8px; border-radius:10px">Belum coba</span>`;

      return `
        <div class="card tile" onclick="location.hash='${m.route}'" style="display:flex; flex-direction:column; justify-content:space-between">
          <div>
            <div style="font-size:1.6rem; margin-bottom:4px">${m.icon}</div>
            <b>${m.name}</b>
          </div>
          <div style="margin-top:12px">${statusBadge}</div>
        </div>
      `;
    })
    .join('');

  const activityListHTML = lastActivities.length
    ? lastActivities
        .map(
          (r) => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--bd)">
            <span>${modLabels[r.k] || r.k}</span>
            <small style="color:var(--mut)">${fmt(r.t)}</small>
          </div>`
        )
        .join('')
    : '<div class="empty">Belum ada aktivitas tersimpan. Pilih salah satu modul untuk memulai latihan!</div>';

  const recListHTML = rec()
    .map((x) => `<div style="padding:4px 0; color:var(--ink)">• ${x}</div>`)
    .join('');

  V().innerHTML = `
    <h1>Halo, ${p.name || 'Calon Taruna'} 👋</h1>
    <p class="sub">${subTitle}</p>
    
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:20px">
      <div class="card" style="background:linear-gradient(135deg, var(--navy2) 0%, var(--navy-light) 100%); color:#fff; text-align:center">
        <small style="opacity:0.85; text-transform:uppercase; letter-spacing:0.5px">Indikator Kesiapan Seleksi</small>
        <div class="stat" style="font-size:2.8rem; color:#fff; margin:4px 0">${scoreReadiness === null ? '—' : scoreReadiness + '<span style="font-size:1.2rem">/100</span>'}</div>
        <small style="opacity:0.85">${scoreReadiness >= 75 ? 'Sangat Baik' : scoreReadiness >= 60 ? 'Cukup' : 'Tingkatkan Latihan'}</small>
      </div>

      <div class="card" style="text-align:center">
        <small style="color:var(--mut); text-transform:uppercase; letter-spacing:0.5px">Total Sesi Terformat</small>
        <div class="stat" style="font-size:2.8rem; margin:4px 0">${totalSessions}</div>
        <small style="color:var(--mut)">Sesi latihan tersimpan</small>
      </div>
    </div>

    <h2>Modul Latihan Persiapan</h2>
    <div class="grid" style="margin-bottom:24px">
      ${moduleCardsHTML}
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-bottom:20px">
      <div class="card">
        <h2>Profil Calon Taruna</h2>
        <div class="row" style="flex-direction:column; gap:12px">
          <div>
            <label>Nama Lengkap</label>
            <input id="pn" value="${p.name || ''}" placeholder="Masukkan namamu">
          </div>
          <div>
            <label>Target Sekolah Kedinasan</label>
            <input id="pt" value="${p.target || ''}" placeholder="cth: Poltekim / Poltekip / IPDN">
          </div>
          <div>
            <label>Mulai Tanggal Persiapan</label>
            <input type="date" id="ps" value="${p.start || ''}">
          </div>
          <button style="margin-top:8px" onclick="DB.profile={name:pn.value,target:pt.value,start:ps.value};save()&&(toast('Profil berhasil disimpan'),route())">Simpan Profil</button>
        </div>
      </div>

      <div class="card">
        <h2>Aktivitas Terakhir</h2>
        ${activityListHTML}
      </div>
    </div>

    <div class="card">
      <h2>💡 Rekomendasi Latihan Hari Ini</h2>
      ${recListHTML}
    </div>
  `;
};

// Settings View
MODS.settings = () => {
  V().innerHTML = `
    ${hd('Pengaturan & Manajemen Data', 'Backup, pulihkan data, dan kelola preferensi aplikasi.')}
    
    <div class="card">
      <h2>Backup & Pemulihan Data</h2>
      <p class="sub">Simpan cadangan data latihanmu ke file JSON atau unggah file backup sebelumnya.</p>
      
      <div class="row" style="margin-bottom:16px">
        <button onclick="exportJSON()">📥 Ekspor Backup (.json)</button>
        <button class="alt" onclick="$('#fileInput').click()">📤 Impor Backup (.json)</button>
        <input type="file" id="fileInput" accept=".json" style="display:none" onchange="importJSON(this.files[0])">
      </div>
    </div>

    <div class="card">
      <h2>Reset Data</h2>
      <p class="sub">Hapus seluruh riwayat latihan dan profil secara permanen.</p>
      <button class="del" onclick="resetAll()">⚠️ Reset Seluruh Data</button>
    </div>
  `;
};