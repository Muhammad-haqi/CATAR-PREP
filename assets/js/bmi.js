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

  const cat =
    bmi < 18.5
      ? 'Kurus'
      : bmi < 25
      ? 'Normal'
      : bmi < 30
      ? 'Berat badan lebih'
      : 'Obesitas';

  const minHeight = g === 'M' ? 165 : 160;
  const isHeightPass = h >= minHeight;
  const heightStatus = isHeightPass
    ? `<span style="color:var(--ok); font-weight:bold">Memenuhi syarat minimal (≥ ${minHeight} cm)</span>`
    : `<span style="color:var(--bad); font-weight:bold">Di bawah standar minimal (${h} / ${minHeight} cm)</span>`;

  const bbiFactor = g === 'M' ? 0.1 : 0.15;
  const bbiIdeal = Math.round((h - 100) - (h - 100) * bbiFactor);
  
  const bbMinNormal = Math.round(18.5 * (h / 100) ** 2);
  const bbMaxNormal = Math.round(24.9 * (h / 100) ** 2);

  let weightAdvice = '';
  if (w < bbMinNormal) {
    const diff = bbMinNormal - w;
    weightAdvice = `Perlu <b>menaikkan berat minimal ${diff} kg</b> untuk mencapai batas normal. Target ideal: <b>${bbiIdeal} kg</b>.`;
  } else if (w > bbMaxNormal) {
    const diff = w - bbMaxNormal;
    weightAdvice = `Perlu <b>menurunkan berat minimal ${diff} kg</b> untuk mencapai batas normal. Target ideal: <b>${bbiIdeal} kg</b>.`;
  } else {
    const diffToIdeal = Math.abs(w - bbiIdeal);
    weightAdvice = `Berat badanmu sudah dalam rentang normal! Target nilai tengah ideal Rikkes adalah <b>${bbiIdeal} kg</b> (selisih ${diffToIdeal} kg).`;
  }

  const indicatorPos = Math.min(98, Math.max(0, ((bmi - 15) / 25) * 100));

  add('bmi', {
    gender: g,
    h,
    w,
    age,
    bmi,
    cat
  });

  $('#res').innerHTML = `
    <div style="margin-top:20px; padding:16px; background:var(--bg); border-radius:10px; border:1px solid var(--bd)">
      <div class="big" style="font-size:3rem; color:var(--navy2)">${bmi}</div>
      <div style="text-align:center; font-size:1.2rem; margin-bottom:8px">
        Kategori: <b>${cat}</b>
      </div>

      <div class="bar" style="margin:16px auto">
        <i style="left:${indicatorPos}%"></i>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-top:20px; text-align:left">
        <div style="padding:10px; background:var(--card); border-radius:8px; border:1px solid var(--bd)">
          <small style="color:var(--mut)">Standar Tinggi Kedinasan:</small><br>
          ${heightStatus}
        </div>
        <div style="padding:10px; background:var(--card); border-radius:8px; border:1px solid var(--bd)">
          <small style="color:var(--mut)">Berat Badan Ideal (BBI):</small><br>
          <b>${bbiIdeal} kg</b> (Rentang aman: ${bbMinNormal}–${bbMaxNormal} kg)
        </div>
      </div>

      <div style="margin-top:14px; text-align:center; padding:10px; background:rgba(56,189,248,0.12); border-radius:8px; color:var(--navy2)">
        💡 <b>Saran Aksi:</b> ${weightAdvice}
      </div>
    </div>
  `;

  toast('Hasil analisis tubuh tersimpan');
  MODS.bmi();
}