// ==========================================
// MODUL 6 — SITUATIONAL JUDGMENT TEST (SJT)
// ==========================================

MODS.sjt = () => {
  const categories = [...new Set(SJ.map((item) => item[0]))];

  const categoryOptions = categories
    .map((cat) => `<option value="${cat}">Latihan Topikal: ${cat}</option>`)
    .join('');

  const historyCols = [
    ['Mode / Kategori', (r) => r.modeLabel || 'Simulasi Ujian'],
    ['Skor Performa', (r) => `<b style="color:#13398a">${r.score}/${r.max}</b>`],
    ['Persentase', (r) => `${r.pct}%`],
    ['Aspek Terlemah', (r) => r.lowestCat || '-']
  ];

  V().innerHTML = `
    ${hd('Situational Judgment Test', 'Latih penalaran situasional, kepemimpinan, dan integritas kedinasan.')}
    
    <div class="card">
      <div class="row">
        <div>
          <label>Pilih Mode Latihan SJT</label>
          <select id="sjtFilter">
            <option value="ALL" selected>Semua Kategori (Simulasi Ujian Asli - Acak)</option>
            ${categoryOptions}
          </select>
        </div>
        <button onclick="startSjtQuiz()">Mulai Tes</button>
      </div>
      ${note('Latihan penalaran situasional mandiri untuk mengukur kompetensi perilaku kedinasan. ' + DISC)}
    </div>

    <div id="sjtArena"></div>

    <div class="card">
      <h2>Riwayat Tes Situational Judgment</h2>
      ${hist('sjt', historyCols)}
    </div>
  `;
};

function startSjtQuiz() {
  const selectedCat = $('#sjtFilter')?.value || 'ALL';

  const pool =
    selectedCat === 'ALL'
      ? [...SJ]
      : SJ.filter((item) => item[0] === selectedCat);

  if (!pool.length) {
    return toast('Belum ada skenario untuk kategori ini', 1);
  }

  const queue = [...pool].sort(() => Math.random() - 0.5);

  let idx = 0;
  let totalScore = 0;
  let isLocked = false;
  const catStats = {};

  const renderScenario = () => {
    if (idx >= queue.length) {
      const maxScore = queue.length * 3;
      const pct = Math.round((totalScore / maxScore) * 100);

      let lowestCat = '';
      let lowestPct = 101;

      Object.entries(catStats).forEach(([catName, stats]) => {
        const catPct = Math.round((stats.earned / stats.max) * 100);
        if (catPct < lowestPct) {
          lowestPct = catPct;
          lowestCat = catName;
        }
      });

      const modeLabel =
        selectedCat === 'ALL' ? 'Simulasi Ujian (Semua Aspek)' : selectedCat;

      add('sjt', {
        modeLabel,
        score: totalScore,
        max: maxScore,
        pct,
        lowestCat: lowestCat ? `${lowestCat} (${lowestPct}%)` : '-'
      });

      let evalStatus = 'Sangat Baik (Sangat Siap Seleksi)';
      let statusColor = '#10b981';

      if (pct < 55) {
        evalStatus = 'Kurang (Perlu Banyak Latihan Topikal)';
        statusColor = '#ef4444';
      } else if (pct < 70) {
        evalStatus = 'Cukup (Perbaiki Aspek Terlemah)';
        statusColor = '#f59e0b';
      }

      const breakdownHTML = Object.entries(catStats)
        .map(([catName, stats]) => {
          const cPct = Math.round((stats.earned / stats.max) * 100);
          const cColor = cPct >= 80 ? '#10b981' : cPct >= 60 ? '#f59e0b' : '#ef4444';

          return `
            <div style="margin-bottom:12px">
              <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:4px">
                <b>${catName}</b>
                <span style="color:${cColor}; font-weight:bold">${cPct}% (${stats.earned}/${stats.max} Poin)</span>
              </div>
              <div style="background:var(--bd); border-radius:6px; height:8px; overflow:hidden">
                <div style="width:${cPct}%; background:${cColor}; height:100%; transition:width 0.3s"></div>
              </div>
            </div>
          `;
        })
        .join('');

      $('#sjtArena').innerHTML = `
        <div class="card" style="text-align:center">
          <h2>Hasil ${modeLabel}</h2>
          <div class="big" style="color:${statusColor}">${totalScore}/${maxScore}</div>
          <div style="font-size:1.1rem; font-weight:bold; color:${statusColor}; margin-bottom:16px">${evalStatus} (Akurasi ${pct}%)</div>
          
          <div style="margin:20px 0; text-align:left; background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--bd)">
            <h3 style="margin-top:0; margin-bottom:12px; color:var(--navy2)">Breakdown Analisis Per Aspek Perilaku:</h3>
            ${breakdownHTML}
          </div>

          ${
            lowestCat && lowestPct < 80
              ? `<div style="padding:12px; background:rgba(239,68,68,0.1); border-radius:8px; color:var(--bad); text-align:left; margin-bottom:16px; font-size:0.9rem">
                  💡 <b>Rekomendasi Pembenahan:</b> Fokus perbanyak latihan pada aspek <b>${lowestCat}</b> (Skor saat ini baru ${lowestPct}%).
                </div>`
              : ''
          }

          <button onclick="startSjtQuiz()">Ulangi Tes Ini</button>
        </div>
      `;
      return;
    }

    const s = queue[idx];
    const categoryName = s[0];
    const scenarioText = s[1];

    const options = s
      .slice(2)
      .map((x) => x)
      .sort(() => Math.random() - 0.5);

    const optionBtnsHTML = options
      .map(
        (opt, k) =>
          `<button class="opt" style="display:block; width:100%; margin:8px 0; text-align:left; padding:12px" onclick="pickSjtOption(${k})">${opt[0]}</button>`
      )
      .join('');

    $('#sjtArena').innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <span class="sub">Skenario <b>${idx + 1}/${queue.length}</b></span>
          <span style="background:rgba(56,189,248,0.15); color:var(--navy2); padding:4px 10px; border-radius:12px; font-size:0.85rem; font-weight:bold">${categoryName}</span>
        </div>

        <p style="font-size:1.1rem; line-height:1.5; margin-bottom:16px"><b>${scenarioText}</b></p>
        
        <div>${optionBtnsHTML}</div>
        
        <div id="sjtFb"></div>
      </div>
    `;

    window.pickSjtOption = (k) => {
      if (isLocked) return;
      isLocked = true;

      const bestScore = Math.max(...options.map((x) => x[1]));
      const userScore = options[k][1];
      totalScore += userScore;

      if (!catStats[categoryName]) {
        catStats[categoryName] = { earned: 0, max: 0 };
      }
      catStats[categoryName].earned += userScore;
      catStats[categoryName].max += 3;

      document.querySelectorAll('.opt').forEach((btn, j) => {
        const itemScore = options[j][1];
        if (itemScore === bestScore) {
          btn.classList.add('ok');
        } else if (j === k && itemScore < bestScore) {
          btn.classList.add('no');
        }
      });

      const bestOptionText = options.find((x) => x[1] === bestScore)[0];

      $('#sjtFb').innerHTML = `
        <div style="margin-top:16px; padding:12px; background:var(--bg); border-radius:8px; border-left:4px solid var(--navy2)">
          <p style="margin:0 0 8px 0">
            Nilai Pilihanmu: <b>${userScore}/3 Poin</b>.<br>
            Tindakan Terbaik (3 Poin): <b>${bestOptionText}</b>.
          </p>
          <button style="margin-top:8px" onclick="nextSjtScenario()">Lanjut Skenario Berikutnya</button>
        </div>
      `;
    };

    window.nextSjtScenario = () => {
      isLocked = false;
      idx++;
      renderScenario();
    };
  };

  renderScenario();
}