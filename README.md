# CATAR PREP — Post-SKD Cadet Preparation Platform
*Prepare Yourself. Prove Your Readiness.*

Aplikasi web tanpa backend untuk latihan mandiri calon taruna setelah SKD (universal, tidak khusus satu institusi).

## Cara menjalankan
1. Ekstrak `CATAR-PREP-FINAL.zip`.
2. Buka `index.html` di browser (Chrome/Edge/Firefox). Tidak perlu server, login, atau internet; Chart.js dan jsPDF sudah ada di `libraries/`.

## Modul
BMI, Pauli/Kraepelin, Tes Fisik, Wawancara, Latihan Mental (Concentration, Reaction, Visual Attention, Accuracy), Situational Judgment, Laporan Kesiapan (grafik, PDF, cetak), Pengaturan (mode gelap/terang, backup JSON, reset).

## Data
Disimpan di LocalStorage browser. Cadangkan lewat **Pengaturan > Ekspor JSON**, pulihkan lewat input file di halaman yang sama.

## Struktur
```
index.html
assets/css/style.css
assets/js/storage.js      LocalStorage, backup/restore
assets/js/app.js          router, helper, dashboard, pengaturan
assets/js/{bmi,pauli,physical,interview,mental,situational,report}.js   satu file per modul
assets/js/data/           bank soal (wawancara, 20 skenario SJT)
libraries/                Chart.js, jsPDF (lokal)
```

## Keterbatasan
Simulasi latihan, bukan instrumen atau standar penilaian resmi. Skor kesiapan adalah indikator internal, bukan prediksi kelulusan. Tes fisik tidak memakai standar kelulusan resmi. Tes fisik hanya mencatat hasil (jarak lari diinput manual).

## Pengembangan
Tambah skenario di `assets/js/data/situational-data.js` dan pertanyaan di `assets/js/data/interview-data.js`.
