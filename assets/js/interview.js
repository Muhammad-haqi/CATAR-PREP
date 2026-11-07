// ==========================================
// MODUL 4 — SIMULATOR WAWANCAARA KEDINASAAN (WPFK)
// ==========================================

let qCur = null;
let qT0 = null;
let recognition = null;
let isRecording = false;

MODS.intv = () => {
  const categoryOptions = Object.keys(IQ)
    .map((k) => `<option>${k}</option>`)
    .join('');

  const historyCols = [
    ['Kategori', (r) => r.cat],
    ['Durasi', (r) => `${r.sec}s`],
    ['Jumlah Kata', (r) => `${r.wordCount} kata`],
    ['Metode STAR', (r) => `${r.starScore}/4 Point`]
  ];

  V().innerHTML = `
    ${hd('Interview Simulator (WPFK)', 'Latih respons lisan & ketik menggunakan struktur STAR dan target durasi.')}
    
    <div class="card">
      <div class="row">
        <div>
          <label>Kategori Pertanyaan</label>
          <select id="ic">
            <option>Acak</option>
            ${categoryOptions}
          </select>
        </div>
        <button onclick="newQ()">Acak Pertanyaan Baru</button>
      </div>

      <div style="margin-top:16px; padding:16px; background:var(--bg-sub, #f8fafc); border-radius:8px; border:1px solid #13398a22">
        <h2 id="q" style="margin:0 0 8px 0; color:#13398a">Tekan "Acak Pertanyaan Baru" untuk memulai.</h2>
        <div style="display:flex; justify-content:space-between; align-items:center">
          <b id="qt" style="color:#c9a227; font-size:1.1rem">Timer: 0s</b>
          <span id="wc" style="color:#666; font-size:0.9rem">0 Kata</span>
        </div>
      </div>

      <div style="margin-top:12px">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px">
          <label>Jawabanmu (Bisa diketik atau gunakan rekam suara):</label>
          <button id="btnVoice" class="alt" style="padding:4px 12px; font-size:0.85rem" onclick="toggleVoice()">🎙️ Rekam Suara (Speech-to-Text)</button>
        </div>
        <textarea id="ans" rows="6" placeholder="Bicara atau tulis jawabanmu di sini..." oninput="updateWc()"></textarea>
      </div>
      
      <!-- Checklist Metode STAR -->
      <div style="margin-top:16px; padding:12px; background:#fff; border:1px solid #e2e8f0; border-radius:8px">
        <b style="display:block; margin-bottom:8px; color:#334155">Self-Checklist Struktur Jawaban STAR:</b>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px">
          <label style="font-size:0.9rem"><input type="checkbox" class="star-check"> 1. Latar Situasi (Situation)</label>
          <label style="font-size:0.9rem"><input type="checkbox" class="star-check"> 2. Peran/Tugas (Task)</label>
          <label style="font-size:0.9rem"><input type="checkbox" class="star-check"> 3. Aksi Konkret (Action)</label>
          <label style="font-size:0.9rem"><input type="checkbox" class="star-check"> 4. Hasil & Pelajaran (Result)</label>
        </div>
      </div>

      <button style="margin-top:14px" onclick="saveQ()">Simpan & Evaluasi Jawaban</button>
      ${note('Target durasi ideal jawaban wawancara lisan adalah 45–120 detik (sekitar 50–150 kata). Fokus pada intonasi tegas, struktur STAR, dan posisi tubuh siap.')}
    </div>

    <div class="card">
      <h2>Riwayat Simpanan Jawaban</h2>
      ${hist('interview', historyCols)}
    </div>
  `;

  initSpeech();
};

// ------------------------------------------
// LOGIKA SIMULATOR WAWANCAARA
// ------------------------------------------

function newQ() {
  if (isRecording) stopVoice();

  const c = $('#ic').value;
  const pool = c === 'Acak' ? Object.keys(IQ) : [c];
  const cat = pool[Math.floor(Math.random() * pool.length)];
  const q = IQ[cat][Math.floor(Math.random() * IQ[cat].length)];

  qCur = { cat, q };
  qT0 = Date.now();

  $('#q').textContent = q;
  $('#ans').value = '';
  updateWc();

  // Reset checkboxes STAR
  document.querySelectorAll('.star-check').forEach((cb) => (cb.checked = false));

  stopSw();
  swT = setInterval(() => {
    const elapsedSec = Math.floor((Date.now() - qT0) / 1000);
    const timeElem = $('#qt');
    if (timeElem) {
      let statusColor = '#c9a227';
      if (elapsedSec < 30) statusColor = '#eab308'; // Terlalu singkat
      else if (elapsedSec <= 120) statusColor = '#1f9d63'; // Ideal
      else statusColor = '#b33'; // Terlalu lama

      timeElem.style.color = statusColor;
      timeElem.textContent = `Timer: ${elapsedSec}s ${elapsedSec >= 45 && elapsedSec <= 120 ? '(Ideal)' : ''}`;
    }
  }, 500);

  timers.push(swT);
}

function updateWc() {
  const text = $('#ans').value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  $('#wc').textContent = `${words} Kata`;
}

// ------------------------------------------
// FITUR REKAM SUARA (WEB SPEECH API)
// ------------------------------------------

function initSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  recognition = new SpeechRecognition();
  recognition.lang = 'id-ID';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    const currentText = $('#ans').value;
    if (!currentText.endsWith(transcript)) {
      $('#ans').value = transcript;
      updateWc();
    }
  };

  recognition.onerror = (e) => {
    toast('Gagal merekam suara: ' + e.error, 1);
    stopVoice();
  };

  recognition.onend = () => {
    if (isRecording) stopVoice();
  };
}

function toggleVoice() {
  if (!recognition) {
    return toast('Fitur Rekam Suara tidak didukung di browser ini. Silakan ketik manual.', 1);
  }

  if (isRecording) {
    stopVoice();
  } else {
    try {
      recognition.start();
      isRecording = true;
      const btn = $('#btnVoice');
      if (btn) {
        btn.textContent = '⏹️ Hentikan Perekaman';
        btn.style.background = '#b33';
        btn.style.color = '#fff';
      }
      toast('Mulai bicara sekarang...');
    } catch (e) {
      toast('Gagal memulai mikrofon', 1);
    }
  }
}

function stopVoice() {
  if (recognition && isRecording) {
    recognition.stop();
  }
  isRecording = false;
  const btn = $('#btnVoice');
  if (btn) {
    btn.textContent = '🎙️ Rekam Suara (Speech-to-Text)';
    btn.style.background = '';
    btn.style.color = '';
  }
}

// ------------------------------------------
// LOGIKA SIMPAN & EVALUASI
// ------------------------------------------

function saveQ() {
  if (isRecording) stopVoice();

  if (!qCur || !$('#ans').value.trim()) {
    return toast('Pilih pertanyaan dan tulis/rekam jawaban dulu', 1);
  }

  const durationSec = Math.floor((Date.now() - qT0) / 1000);
  const text = $('#ans').value.trim();
  const wordCount = text.split(/\s+/).length;

  // Hitung jumlah checklist STAR yang dicentang (0-4)
  const starChecks = document.querySelectorAll('.star-check');
  let starScore = 0;
  starChecks.forEach((cb) => {
    if (cb.checked) starScore++;
  });

  add('interview', {
    ...qCur,
    a: text,
    sec: durationSec,
    wordCount,
    starScore
  });

  stopSw();
  toast('Jawaban berhasil tersimpan!');
  MODS.intv();
}