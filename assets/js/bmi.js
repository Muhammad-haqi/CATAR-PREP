// ==========================================
// MODUL 1 — BMI & BODY ASSESSMENT KEDINASAAN
// ==========================================

MODS.bmi = () => {
  const historyCols = [
    ['BMI', (r) => r.bmi],
    ['Kategori', (r) => r.cat],
    ['TB/BB', (r) => `${r.h}/${r.w}`],
    ['Gender', (r) => (r.gender === 'W' ? 'Wanita' : 'Pria')]
  ];

  V().innerHTML = `
    ${hd('BMI & Body Assessment', 'Skrining kondisi tubuh, tinggi minimal, dan target berat ideal Rikkes.')}
    
    <div class="card">
      <div class="row">
        <div>
          <label>Jenis Kelamin</label>
          <select id="g">
            <option value="M">Pria</option>
            <option value="W">Wanita</option>
          </select>
        </div>
        <div>
          <label>Tinggi (cm)</label>
          <input id="h" type="number" min="100" max="230" placeholder="170">
        </div>
        <div>
          <label>Berat (kg)</label>
          <input id="w" type="number" min="25" max="250" placeholder="60">
        </div>
        <div>
          <label>Usia (opsional)</label>
          <input id="a" type="number" min="10" max="80" placeholder="18">
        </div>
        <button onclick="calcBmi()">Hitung Analysis</button>
      </div>
      
      <div id="res"></div>
      ${note('BMI & BBI merupakan indikator skrining mandiri persiapan Rikkes (Pemeriksaan Kesehatan), bukan diagnosis medis resmi.')}
    </div>

    <div class="card">
      <h2>Riwayat Perkembangan Body Assessment</h2>
      <div style="height:260px; position:relative; margin-bottom:16px">
        <canvas id="c"></canvas>
      </div>
      ${hist('bmi', historyCols)}
    </div>
  `;

  if (DB.bmi && DB.bmi.length) {
    chart(
      'c',
      DB.bmi.map((r) => fmt(r.t)),
      [{ label: 'BMI', data: DB.bmi.map((r) => r.bmi) }]
    );
  }
};

// ------------------------------------------
// LOGIKA KALKULASI BMI & RIKKES TARGET
// ------------------------------------------
function calcBmi() {
  const g = $('#g').value;
  const h = +$('#h').value;
  const w = +$('#w').value;
  const age = +$('#a').value || null;

  if (!(h >= 100 && h <= 230 && w >= 25 && w <= 250)) {
    return toast('Isi tinggi 100–230 cm dan berat 25–250 kg', 1);
  }

  const bmi = +(w / (h / 100) ** 2).toFixed(1);

  // Kategori, Warna Status & Rekomendasi Terstruktur
  let cat = '';
  let catColor = '';
  let dietAdvice = '';
  let workoutAdvice = '';
  let rikkesAdvice = '';

  if (bmi < 18.5) {
    cat = 'Kurus (Underweight)';
    catColor = '#3b82f6'; // Biru
    dietAdvice = '<b>Pola Makan:</b> Surplus kalori (+300 hingga +500 kcal/hari). Perbanyak asupan protein (dada ayam, telur, susu, tempe) dan karbohidrat kompleks (nasi merah, kentang) untuk menaikkan massa otot murni.';
    workoutAdvice = '<b>Pola Olahraga:</b> Fokus latihan beban (Hypertrophy) dan kalistenik (Push-up, Pull-up, Dip) 3–4x seminggu. Batasi lari maraton/cardio jarak jauh berlebih agar kalori tidak habis terbuang.';
    rikkesAdvice = '<b>Fokus Rikkes:</b> Naikkan berat badan hingga masuk rentang ideal agar skor postur tubuh (Stakes) optimal dan tenaga Samapta B maksimal.';
  } else if (bmi < 25.0) {
    cat = 'Normal (Ideal Rikkes)';
    catColor = '#10b981'; // Hijau
    dietAdvice = '<b>Pola Makan:</b> Pertahankan gizi seimbang (40% karbohidrat, 30% protein, 30% lemak sehat). Pastikan minum air putih minimal 2.5 – 3 Liter per hari untuk menjaga metabolisme.';
    workoutAdvice = '<b>Pola Olahraga:</b> Fokus ke latihan spesifik Samapta! Latihan lari 12 menit (VO2 Max), interval run, serta push-up, sit-up, dan pull-up harian untuk mengejar skor 100.';
    rikkesAdvice = '<b>Fokus Rikkes:</b> Komposisi tubuhmu sudah ideal untuk seleksi kedinasan. Jaga pola tidur (7-8 jam) dan kebersihan kesehatan fisik organ dalam.';
  } else if (bmi < 30.0) {
    cat = 'Berat Badan Lebih (Overweight)';
    catColor = '#f59e0b'; // Oranye
    dietAdvice = '<b>Pola Makan:</b> Defisit kalori moderat (potong 300–500 kcal/hari). Hindari minuman manis/berperisa, gorengan, serta tepung. Utamakan protein tinggi dan sayur serat tinggi.';
    workoutAdvice = '<b>Pola Olahraga:</b> Perbanyak Cardio Zone 2 (Jogging santai 30–45 menit, 4-5x seminggu) untuk membakar lemak secara efektif tanpa mengikis otot, kombinasikan dengan kalistenik.';
    rikkesAdvice = '<b>Fokus Rikkes:</b> Turunkan berat badan secara bertahap menuju batas ideal agar beban sendi saat lari Samapta A jauh lebih ringan dan efisien.';
  } else {
    cat = 'Obesitas';
    catColor = '#ef4444'; // Merah
    dietAdvice = '<b>Pola Makan:</b> Defisit kalori teratur. Catat makanan harian, kurangi porsi karbohidrat sederhana secara bertahap, dan ganti cemilan dengan buah segar serta air putih.';
    workoutAdvice = '<b>Pola Olahraga:</b> Awali dengan olahraga <i>low-impact</i> (Jalan cepat, sepeda statis, atau renang) untuk melindungi sendi lutut & pergelangan kaki. Naikkan intensitas bertahap ke jogging.';
    rikkesAdvice = '<b>Fokus Rikkes:</b> Kategori Obesitas berisiko menurunkan poin kesehatan (Stakes Rikkes). Targetkan penurunan BB secara konsisten setiap minggunya.';
  }

  // Standar Tinggi Kedinasan
  const minHeight = g === 'M' ? 165 : 160;
  const isHeightPass = h >= minHeight;
  const heightStatus = isHeightPass
    ? `<span style="color:var(--ok, #10b981); font-weight:bold">Memenuhi syarat minimal (≥ ${minHeight} cm)</span>`
    : `<span style="color:var(--bad, #ef4444); font-weight:bold">Di bawah standar minimal (${h} / ${minHeight} cm)</span>`;

  // Kalkulasi Berat Badan Ideal (BBI) & Rentang Normal
  const bbiFactor = g === 'M' ? 0.1 : 0.15;
  const bbiIdeal = Math.round((h - 100) - (h - 100) * bbiFactor);
  const bbMinNormal = Math.round(18.5 * (h / 100) ** 2);
  const bbMaxNormal = Math.round(24.9 * (h / 100) ** 2);

  let weightAdvice = '';
  if (w < bbMinNormal) {
    const diff = bbMinNormal - w;
    weightAdvice = `Perlu <b>menaikkan berat minimal ${diff} kg</b> untuk mencapai batas normal. Target ideal Rikkes: <b>${bbiIdeal} kg</b>.`;
  } else if (w > bbMaxNormal) {
    const diff = w - bbMaxNormal;
    weightAdvice = `Perlu <b>menurunkan berat minimal ${diff} kg</b> untuk mencapai batas normal. Target ideal Rikkes: <b>${bbiIdeal} kg</b>.`;
  } else {
    const diffToIdeal = Math.abs(w - bbiIdeal);
    weightAdvice = `Berat badanmu sudah dalam rentang normal! Target nilai tengah ideal Rikkes adalah <b>${bbiIdeal} kg</b> (selisih ${diffToIdeal} kg).`;
  }

  // Posisi Indikator Bar Pin (BMI Rentang 15 sampai 35)
  const indicatorPos = Math.min(98, Math.max(1, ((bmi - 15) / (35 - 15)) * 100));

  add('bmi', {
    gender: g,
    h,
    w,
    age,
    bmi,
    cat
  });

  $('#res').innerHTML = `
    <div style="margin-top:20px; padding:20px; background:var(--bg); border-radius:14px; border:1px solid var(--bd)">
      <div style="text-align:center">
        <div class="big" style="font-size:3.5rem; color:${catColor}; line-height:1">${bmi}</div>
        <div style="font-size:1.25rem; font-weight:bold; color:${catColor}; margin-top:6px">
          Kategori: ${cat}
        </div>
      </div>

      <!-- VISUAL BMI BAR INDIKATOR -->
      <div style="margin:24px 0 12px">
        <div style="position:relative; height:16px; background:#e2e8f0; border-radius:10px; overflow:visible; display:flex">
          <!-- Segment Warna Kategori -->
          <div style="width:17.5%; background:#3b82f6; border-radius:10px 0 0 10px;" title="Kurus (< 18.5)"></div>
          <div style="width:32%; background:#10b981;" title="Normal (18.5 - 24.9)"></div>
          <div style="width:25%; background:#f59e0b;" title="Gemuk (25.0 - 29.9)"></div>
          <div style="width:25.5%; background:#ef4444; border-radius:0 10px 10px 0;" title="Obesitas (≥ 30.0)"></div>

          <!-- Jarum/Pin Indikator BMI -->
          <div style="position:absolute; left:${indicatorPos}%; top:-8px; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; transition:left 0.4s ease">
            <div style="width:4px; height:32px; background:#000; border-radius:2px; box-shadow:0 0 6px rgba(255,255,255,0.9)"></div>
          </div>
        </div>

        <!-- Label Angka Skala di Bawah Bar -->
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--mut); margin-top:10px; font-weight:600">
          <span style="color:#3b82f6">Kurus<br>(&lt;18.5)</span>
          <span style="color:#10b981; text-align:center">Normal<br>(18.5 - 24.9)</span>
          <span style="color:#f59e0b; text-align:center">Berat Lebih<br>(25.0 - 29.9)</span>
          <span style="color:#ef4444; text-align:right">Obesitas<br>(&ge;30.0)</span>
        </div>
      </div>

      <!-- GRID STATISTIK TUBUH & KEDINASAAN -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-top:20px; text-align:left">
        <div style="padding:12px; background:var(--card); border-radius:10px; border:1px solid var(--bd)">
          <small style="color:var(--mut); font-weight:bold; text-transform:uppercase">Standar Tinggi Kedinasan</small><br>
          <div style="margin-top:4px">${heightStatus}</div>
        </div>
        <div style="padding:12px; background:var(--card); border-radius:10px; border:1px solid var(--bd)">
          <small style="color:var(--mut); font-weight:bold; text-transform:uppercase">Berat Badan Ideal (BBI)</small><br>
          <div style="margin-top:4px; font-size:0.95rem"><b>${bbiIdeal} kg</b> <span style="color:var(--mut); font-size:0.85rem">(Rentang aman: ${bbMinNormal}–${bbMaxNormal} kg)</span></div>
        </div>
      </div>

      <div style="margin-top:14px; text-align:center; padding:12px; background:rgba(56,189,248,0.12); border-radius:10px; color:var(--navy2,#13398a); font-size:0.95rem">
        💡 <b>Target Berat Badan:</b> ${weightAdvice}
      </div>

      <!-- SARAN AKSI KONSISTEN (DIET, OLAHRAGA & RIKKES) -->
      <div style="margin-top:18px; display:grid; gap:10px; text-align:left">
        <h3 style="margin:8px 0 4px; font-size:1.05rem; color:var(--navy2,#13398a)">📋 Panduan Program Persiapan & Saran Aksi:</h3>
        
        <div style="padding:12px; background:var(--card); border-radius:10px; border-left:4px solid ${catColor}; border-top:1px solid var(--bd); border-right:1px solid var(--bd); border-bottom:1px solid var(--bd); font-size:0.9rem">
          🥗 ${dietAdvice}
        </div>

        <div style="padding:12px; background:var(--card); border-radius:10px; border-left:4px solid ${catColor}; border-top:1px solid var(--bd); border-right:1px solid var(--bd); border-bottom:1px solid var(--bd); font-size:0.9rem">
          🏃 ${workoutAdvice}
        </div>

        <div style="padding:12px; background:var(--card); border-radius:10px; border-left:4px solid var(--navy2,#13398a); border-top:1px solid var(--bd); border-right:1px solid var(--bd); border-bottom:1px solid var(--bd); font-size:0.9rem">
          🏥 ${rikkesAdvice}
        </div>
      </div>
    </div>
  `;

  if (typeof toast === 'function') toast('Hasil analisis tubuh tersimpan');
  MODS.bmi();
}