// ==========================================
// DATA STORAGE & STATE MANAGEMENT (LOCALSTORAGE)
// ==========================================

// 1. Inisialisasi State Global di Baris Paling Atas (Wajib)
window.MODS = window.MODS || {};
window.timers = window.timers || [];

const cl = (o) => JSON.parse(JSON.stringify(o));
const KEY = 'catarprep.v1';

const EMPTY = {
  profile: { name: '', target: '', start: '' },
  theme: 'light',
  bmi: [],
  pauli: [],
  phys: [],
  interview: [],
  mental: [],
  sjt: []
};

let DB = load();

// ------------------------------------------
// 2. LOGIKA LOAD & SAVE (LOCALSTORAGE)
// ------------------------------------------
function load() {
  try {
    const rawData = localStorage.getItem(KEY);
    const parsedData = JSON.parse(rawData || '{}');
    return Object.assign(cl(EMPTY), parsedData);
  } catch (e) {
    return cl(EMPTY);
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(DB));
    return true;
  } catch (e) {
    if (typeof toast === 'function') toast(`Penyimpanan gagal: ${e.message}`, 1);
    return false;
  }
}

function add(k, r) {
  r.t = Date.now();
  if (!DB[k]) DB[k] = [];
  DB[k].push(r);
  return save();
}

// ------------------------------------------
// 3. EKSPOR, IMPOR, & RESET DATA
// ------------------------------------------
function exportJSON() {
  const blobData = JSON.stringify(DB, null, 2);
  const blob = new Blob([blobData], { type: 'application/json' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'catar-prep-backup.json';
  a.click();
}

function importJSON(f) {
  const r = new FileReader();

  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d || typeof d !== 'object' || !Array.isArray(d.bmi)) {
        throw Error('Format tidak valid');
      }

      DB = Object.assign(cl(EMPTY), d);
      save();
      toast('Data dipulihkan');
      if (typeof route === 'function') route();
    } catch (e) {
      toast(`Gagal impor: ${e.message}`, 1);
    }
  };

  r.readAsText(f);
}

function resetAll() {
  const isConfirmed = confirm(
    'Hapus SEMUA data latihan? Tindakan ini tidak bisa dibatalkan.'
  );

  if (isConfirmed) {
    DB = cl(EMPTY);
    save();
    toast('Data direset');
    if (typeof route === 'function') route();
  }
}