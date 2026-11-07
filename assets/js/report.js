// ==========================================
// MODUL REPORT & PERSONAL READINESS
// ==========================================

// ------------------------------------------
// 1. DATA CALCULATORS & HELPERS
// ------------------------------------------
function modStats() {
  const L = (a) => a[a.length - 1];
  const p = (k, f) => (DB[k].length ? Math.round(f(L(DB[k]))) : null);

  return [
    [
      'BMI',
      DB.bmi.length,
      p('bmi', (r) =>
        r.cat === 'Normal'
          ? 100
          : r.cat === 'Kurus' || r.cat === 'Berat badan lebih'
          ? 60
          : 40
      ),
      DB.bmi.length ? `BMI terakhir ${L(DB.bmi).bmi} (${L(DB.bmi).cat})` : null
    ],
    [
      'Pauli/Kraepelin',
      DB.pauli.length,
      p('pauli', (r) => r.acc),
      DB.pauli.length
        ? `Akurasi ${L(DB.pauli).acc}%, ${L(DB.pauli).speed} soal/menit`
        : null
    ],
    [
      'Tes fisik',
      DB.phys.length,
      null,
      DB.phys.length ? `${DB.phys.length} catatan latihan` : null
    ],
    [
      'Wawancara',
      DB.interview.length,
      p('interview', (r) => (r.score / 5) * 100),
      DB.interview.length ? `Evaluasi diri ${L(DB.interview).score}/5` : null
    ],
    [
      'Latihan mental',
      DB.mental.length,
      p('mental', (r) => r.score),
      DB.mental.length ? `${L(DB.mental).test}: ${L(DB.mental).txt}` : null
    ],
    [
      'Situational judgment',
      DB.sjt.length,
      p('sjt', (r) => r.pct),
      DB.sjt.length ? `Skor ${L(DB.sjt).pct}%` : null
    ]
  ];
}

function readiness() {
  const scores = modStats()
    .map((m) => m[2])
    .filter((x) => x !== null);

  return scores.length ? Math.round(avg(scores)) : null;
}

// ------------------------------------------
// 2. MODUL REPORT PAGE
// ------------------------------------------
MODS.report = () => {
  const m = modStats();
  const r = readiness();
  const low = m
    .filter((x) => x[2] !== null)
    .sort((a, b) => a[2] - b[2])[0];

  const tableRows = m
    .map(
      (x) => `
      <tr>
        <td>${x[0]}</td>
        <td>${x[1]}</td>
        <td>${x[2] === null ? '—' : x[2]}</td>
        <td>${x[3] || 'Belum ada data'}</td>
      </tr>`
    )
    .join('');

  const emptyRecommendations = m
    .filter((x) => !x[1])
    .map((x) => `<div>• ${x[0]}: belum ada data, mulai latihan.</div>`)
    .join('');

  const lowScoreRecommendation = low
    ? `<div>• Aspek yang perlu ditingkatkan: ${low[0]} (skor ${low[2]}).</div>`
    : '';

  V().innerHTML = `
    ${hd('Personal Readiness Report', 'Ringkasan seluruh latihanmu.')}

    <div class="card">
      <div class="row noprint">
        <button onclick="pdfReport()">Unduh PDF</button>
        <button class="alt" onclick="print()">Cetak</button>
      </div>
      <div class="big">${r === null ? 'Belum ada data' : r}</div>
      <p style="text-align:center" class="sub">Indikator latihan internal, bukan prediksi kelulusan resmi.</p>
    </div>

    <div class="card">
      <table>
        <tr>
          <th>Modul</th>
          <th>Sesi</th>
          <th>Skor</th>
          <th>Ringkasan</th>
        </tr>
        ${tableRows}
      </table>
    </div>

    <div class="card">
      <h2>Perkembangan</h2>
      <canvas id="r1"></canvas>
    </div>

    <div class="card">
      <h2>Rekomendasi</h2>
      ${emptyRecommendations}
      ${lowScoreRecommendation}
    </div>
  `;

  chart(
    'r1',
    m.map((x) => x[0]),
    [{ label: 'Skor terakhir', data: m.map((x) => x[2]) }],
    'bar'
  );
};

// ------------------------------------------
// 3. GENERATE & EXPORT PDF REPORT
// ------------------------------------------
function pdfReport() {
  const { jsPDF } = window.jspdf;
  const d = new jsPDF();
  const m = modStats();
  const r = readiness();
  let y = 20;

  // Header Dokumen PDF
  d.setFontSize(18);
  d.text('CATAR PREP - Personal Readiness Report', 14, y);

  y += 8;
  d.setFontSize(10);
  const profileName = DB.profile.name || 'Calon Taruna';
  const profileTarget = DB.profile.target || '-';
  const currentDate = new Date().toLocaleDateString('id-ID');
  d.text(`${profileName} | ${profileTarget} | ${currentDate}`, 14, y);

  y += 10;
  d.setFontSize(12);
  const overallScoreText = r === null ? 'belum ada data' : `${r}/100`;
  d.text(`Indikator latihan internal: ${overallScoreText}`, 14, y);

  // Detail tiap modul
  y += 10;
  d.setFontSize(10);
  m.forEach((x) => {
    const scoreText = x[2] === null ? '-' : x[2];
    const summaryText = x[3] || 'belum ada data';
    const textBlock = `${x[0]}\n${x[1]} sesi - skor ${scoreText}\n${summaryText}`;

    d.text(textBlock, 14, y, { maxWidth: 180 });
    y += 18; // Spasi per baris modul
  });

  y += 4;
  d.text('Bukan prediksi kelulusan atau standar resmi instansi.', 14, y);

  d.save('CATAR-PREP-Laporan.pdf');
  toast('PDF diunduh');
}