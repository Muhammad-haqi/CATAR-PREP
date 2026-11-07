// ==========================================
// BANK SKENARIO SITUATIONAL JUDGMENT (SJ) - TOTAL 40 SKENARIO
// ==========================================

const SJ = [
  // ----------------------------------------
  // BATCH 1: SKENARIO UTAMA (1-8)
  // ----------------------------------------
  [
    'Integritas',
    'Kamu melihat rekan satu tim menyalin jawaban saat ujian kelompok.',
    ['Menegur secara pribadi dan meminta ia melapor ke pengajar', 3],
    ['Langsung melapor ke pengajar tanpa menegur', 2],
    ['Diam agar suasana tim aman', 0],
    ['Mengumumkan di grup kelas', 1]
  ],
  [
    'Disiplin',
    'Kamu terlambat 10 menit apel karena membantu teman yang sakit.',
    ['Melapor jujur ke pembina dengan alasan dan menerima konsekuensi', 3],
    ['Mengarang alasan macet', 0],
    ['Menyelinap masuk barisan', 1],
    ['Tidak ikut apel', 0]
  ],
  [
    'Tanggung jawab',
    'Tugasmu belum selesai padahal tenggat besok dan kamu kelelahan.',
    ['Menyusun prioritas, bekerja terfokus, dan meminta bantuan bila perlu', 3],
    ['Meminta perpanjangan tanpa mencoba', 1],
    ['Menyerahkan hasil seadanya', 1],
    ['Menyuruh teman mengerjakan', 0]
  ],
  [
    'Kepemimpinan',
    'Kamu ketua kelompok dan dua anggota berselisih sehingga pekerjaan terhenti.',
    ['Mendengar keduanya lalu menengahi dengan pembagian tugas yang jelas', 3],
    ['Memilih salah satu pihak', 1],
    ['Mengerjakan sendiri semuanya', 1],
    ['Membiarkan mereka selesai sendiri', 0]
  ],
  [
    'Kerja sama',
    'Rekanmu kurang berkontribusi tetapi namanya tetap ingin dicantumkan.',
    ['Membicarakan baik-baik dan memberi tugas yang terukur', 3],
    ['Mencantumkan saja agar aman', 1],
    ['Mencoret tanpa bicara', 1],
    ['Mengadukan tanpa komunikasi', 1]
  ],
  [
    'Konflik',
    'Temanmu tersinggung oleh ucapanmu yang kamu anggap bercanda.',
    ['Meminta maaf dan menjelaskan maksudmu', 3],
    ['Menunggu ia reda', 1],
    ['Membela diri bahwa itu hanya candaan', 0],
    ['Menjauh darinya', 0]
  ],
  [
    'Prosedur',
    'Atasan menyuruh melewati prosedur resmi demi cepat selesai.',
    ['Menyampaikan risikonya dan meminta arahan tertulis atau jalur resmi', 3],
    ['Menurut saja tanpa bertanya', 1],
    ['Menolak keras di depan umum', 0],
    ['Mengerjakan diam-diam dengan caramu', 0]
  ],
  [
    'Tekanan',
    'Dalam situasi darurat kamu harus memutuskan sementara pimpinan tidak bisa dihubungi.',
    ['Menilai risiko, memilih tindakan teraman sesuai aturan, lalu melaporkan segera', 3],
    ['Menunggu sampai pimpinan terhubung', 1],
    ['Menyerahkan keputusan ke orang lain', 0],
    ['Bertindak cepat tanpa melaporkan', 1]
  ],

  // ----------------------------------------
  // BATCH 2: SKENARIO TAMBAHAN (9-20)
  // ----------------------------------------
  [
    'Integritas',
    'Kamu menemukan dompet berisi uang dan kartu identitas di area asrama.',
    ['Menyerahkan ke petugas jaga dan meminta dicatat', 3],
    ['Menghubungi pemiliknya sendiri lewat kartu identitas lalu menyimpannya', 2],
    ['Mengambil uang untuk biaya mencari pemilik', 0],
    ['Menaruhnya kembali di tempat semula', 1]
  ],
  [
    'Disiplin',
    'Teman mengajakmu keluar asrama malam hari tanpa izin, katanya hanya sebentar.',
    ['Menolak dengan sopan dan menyarankan mengurus izin resmi', 3],
    ['Menolak tapi tidak menyebut aturannya', 2],
    ['Ikut asal tidak ketahuan', 0],
    ['Melapor ke pembina tanpa bicara dulu', 1]
  ],
  [
    'Tanggung jawab',
    'Kesalahan data yang kamu input baru kamu sadari setelah laporan dikirim ke atasan.',
    ['Segera memberi tahu atasan dan menyampaikan data yang benar', 3],
    ['Memperbaiki diam-diam sebelum ada yang sadar', 1],
    ['Menunggu apakah ada yang menyadari', 0],
    ['Menyalahkan sistem', 0]
  ],
  [
    'Kepemimpinan',
    'Kamu memimpin regu dan anggota senior menolak arahanmu karena merasa lebih berpengalaman.',
    ['Mendengar masukannya lalu menjelaskan tujuan tugas dan tetap memegang arah', 3],
    ['Menyerahkan kepemimpinan kepadanya', 1],
    ['Menegurnya keras di depan regu', 0],
    ['Melaporkan langsung ke atasan', 1]
  ],
  [
    'Kerja sama',
    'Timmu kalah dalam rapat dan idemu tidak dipilih.',
    ['Menerima keputusan dan mendukung pelaksanaan ide terpilih', 3],
    ['Menerima tetapi bekerja setengah hati', 0],
    ['Terus mengulang idemu di rapat berikutnya', 1],
    ['Mengundurkan diri dari tim', 0]
  ],
  [
    'Konflik',
    'Dua temanmu bertengkar dan masing-masing mengeluh kepadamu tentang yang lain.',
    ['Mendengarkan lalu mendorong mereka berbicara langsung', 3],
    ['Menyampaikan keluhan masing-masing', 0],
    ['Memihak yang lebih dekat denganmu', 0],
    ['Menghindari keduanya', 1]
  ],
  [
    'Prosedur',
    'Alat yang kamu pakai rusak, dan prosedur melarang memakai alat lain tanpa izin.',
    ['Menghentikan pekerjaan, melapor, dan meminta izin alat pengganti', 3],
    ['Memakai alat lain lalu melapor setelah selesai', 1],
    ['Memaksa memakai alat rusak', 0],
    ['Menunggu tanpa melapor', 1]
  ],
  [
    'Tekanan',
    'Beban tugas dan latihan menumpuk sampai kamu merasa kewalahan.',
    ['Menyusun prioritas dan menceritakan kondisimu ke pembina atau senior', 3],
    ['Mengurangi tidur agar semua selesai', 0],
    ['Mengabaikan tugas yang paling sulit', 0],
    ['Memendam sendiri sampai reda', 1]
  ],
  [
    'Integritas',
    'Atasan memintamu mengubah angka laporan agar kelompokmu terlihat berprestasi.',
    ['Menolak dengan sopan dan menjelaskan risiko serta menawarkan data apa adanya', 3],
    ['Mengubah sedikit saja', 0],
    ['Mengikuti karena itu perintah', 0],
    ['Mengeluh ke teman-temanmu', 1]
  ],
  [
    'Disiplin',
    'Kamu piket tetapi ada teman yang menawarkan menggantikan agar kamu bisa istirahat.',
    ['Berterima kasih, tetapi menyelesaikan tugasmu atau mengurus penggantian lewat pembina', 3],
    ['Menerima dan membalas lain waktu', 1],
    ['Menerima tanpa memberi tahu siapa pun', 0],
    ['Menolak dengan kesal', 1]
  ],
  [
    'Kerja sama',
    'Kamu menguasai materi, sementara rekan satu kelompokmu kesulitan memahaminya.',
    ['Meluangkan waktu menjelaskan dan membagi tugas sesuai kemampuan', 3],
    ['Mengerjakan bagiannya agar cepat selesai', 1],
    ['Membiarkan ia belajar sendiri', 0],
    ['Menyarankan ia bertanya ke pengajar saja', 1]
  ],
  [
    'Kepemimpinan',
    'Rencana kegiatanmu gagal karena kesalahan perhitunganmu sendiri.',
    ['Mengakui kesalahan, mencari solusi, dan menyusun perbaikan', 3],
    ['Mencari penyebab di luar dirimu', 0],
    ['Mengakui lalu menyerahkan perbaikan ke orang lain', 1],
    ['Menutupi kegagalan itu', 0]
  ],

  // ----------------------------------------
  // BATCH 3: SKENARIO PSIKOTES KEDINASAAN (21-40)
  // ----------------------------------------
  [
    'Integritas',
    'Kamu tidak sengaja melihat kuis psikotes internal yang belum diuji tercetak di ruang penguji.',
    ['Segera membalikkan kertas tersebut dan meninggalkannya tanpa membaca isi kuis', 3],
    ['Melihat sekilas untuk memastikan kuis apa itu lalu pergi', 1],
    ['Membaca dan mengingat soal-soal di dalamnya untuk persiapan', 0],
    ['Mengambil foto dokumen tersebut untuk dipelajari bersama kelompok', 0]
  ],
  [
    'Disiplin',
    'Jaringan internet mendadak down saat kamu hendak mengunggah tugas pada menit terakhir tenggat waktu.',
    ['Menginformasikan kendala teknis ke pengajar beserta bukti tangkapan layar dan mengunggah sesegera mungkin', 3],
    ['Menunggu jaringan stabil kembali tanpa melapor', 1],
    ['Meminta teman pengajar lain untuk memasukkan namamu secara acak', 0],
    ['Menyerah dan tidak mengumpulkan tugas sama sekali', 0]
  ],
  [
    'Tanggung jawab',
    'Flashdisk yang berisi file presentasi utama kelompokmu hilang beberapa jam sebelum jadwal presentasi.',
    ['Jujur melapor ke tim, menggunakan backup online/draf awal yang ada, dan menyusun kembali materi', 3],
    ['Menyalahkan anggota tim yang meminjam flashdisk terakhir kali', 0],
    ['Meminta pengajar membatalkan jadwal presentasi kelompokmu', 1],
    ['Menghindar dan pura-pura sakit saat jam presentasi', 0]
  ],
  [
    'Kepemimpinan',
    'Kinerja regumu menurun drastis karena salah satu anggota sedang mengalami duka keluarga.',
    ['Memberikan empati, mengambil alih bagian kritisnya sementara, dan membagi sisa tugas ke anggota lain secara proporsional', 3],
    ['Meminta anggota tersebut tetap bekerja sesuai target tanpa alasan', 0],
    ['Mengeluarkan anggota tersebut dari regu agar target tercapai', 0],
    ['Mengerjakan semua tugas sendiri tanpa melibatkan anggota lain', 1]
  ],
  [
    'Kerja sama',
    'Beberapa anggota kelompok mengeluh bahwa pembagian tugas dinilai tidak adil.',
    ['Mengadakan rapat kelompok untuk meninjau kembali bobot tugas dan menyepakati pembagian baru bersama', 3],
    ['Mengabaikan keluhan dan meminta mereka fokus pada bagian masing-masing', 0],
    ['Menyerahkan seluruh keputusan pembagian tugas kepada pengajar', 1],
    ['Mengubah pembagian tugas sendiri tanpa berdiskusi dengan anggota lain', 1]
  ],
  [
    'Konflik',
    'Rekanmu mengkritik cara kepemimpinanmu di depan forum umum dengan nada bicara keras.',
    ['Tetap tenang, tidak mendebat di tempat, dan mengajaknya berdiskusi secara pribadi setelah acara', 3],
    ['Membalas memarahi dan menunjuk kekurangannya di depan umum', 0],
    ['Langsung mengundurkan diri dari posisi pemimpin saat itu juga', 0],
    ['Mendiamkan kritik tersebut dan memusuhinya', 1]
  ],
  [
    'Prosedur',
    'Kamu menemukan shortcut (jalan pintas) yang bisa mempercepat pengerjaan laporan, namun melompati verifikasi standar.',
    ['Mengkaji keamanannya, berkonsultasi dengan penyelia/pengajar sebelum menerapkannya', 3],
    ['Langsung menggunakan cara cepat tersebut asal hasil akhirnya terlihat sama', 1],
    ['Mengabaikan penemuan tersebut dan bekerja secara konvensional tanpa evaluasi', 2],
    ['Mengajarkan jalan pintas ini ke teman-teman tanpa izin atasan', 0]
  ],
  [
    'Tekanan',
    'Kamu mendapatkan dua tugas besar dari dua pengajar berbeda dengan tenggat pengumpulan yang bersamaan besok pagi.',
    ['Membuat linimasa kerja terstruktur, mengerjakan skala prioritas, dan meminimalkan gangguan', 3],
    ['Meminta salah satu pengajar menunda tenggat dengan alasan berbenturan', 1],
    ['Mengerjakan salah satu tugas secara maksimal dan mengabaikan tugas lainnya', 0],
    ['Panik dan mengeluhkan beban tugas di media sosial', 0]
  ],
  [
    'Integritas',
    'Teman dekatmu meminta bantuanmu untuk menandatangani daftar hadir presensi latihan (titip absen).',
    ['Menolak permohonan tersebut secara tegas namun sopan dan mengingatkan aturannya', 3],
    ['Menolak tetapi membantu mengarahkan alasan lain ke pengawas', 1],
    ['Menandatanganinya karena merasa tidak enak hati dengan kawan dekat', 0],
    ['Melaporkan temanmu langsung ke komandan tanpa bicara dahulu kepadanya', 1]
  ],
  [
    'Disiplin',
    'Kondisi tubuhmu merasa sangat lelah dan mengantuk saat jam pelajaran/materi kelas dimulai.',
    ['Izin mencuci muka ke kamar mandi, mengambil posisi duduk tegak, dan fokus mencatat', 3],
    ['Tidur diam-diam di barisan belakang agar tidak terlihat pembina', 0],
    ['Meminta izin ke ruang kesehatan padahal tidak benar-benar sakit', 0],
    ['Mengobrol dengan teman sebelah agar tidak mengantuk', 0]
  ],
  [
    'Tanggung jawab',
    'Secara tidak sengaja kamu merusakkan salah satu fasilitas laboratorium/alat latihan saat praktek.',
    ['Segera melapor ke pengawas laboratorium, mengakui kesalahan, dan siap bersedia mengganti/memperbaiki', 3],
    ['Meninggalkan alat tersebut dan berpura-pura tidak tahu', 0],
    ['Menaruh kembali alat tersebut di tempatnya agar dikira rusak oleh orang lain', 0],
    ['Menyalahkan rakan tim yang mengoperasikannya sebelum kamu', 0]
  ],
  [
    'Kepemimpinan',
    'Timmu mulai kehilangan semangat karena target kinerja yang diberikan lembaga sangat tinggi.',
    ['Memberikan motivasi, memecah target besar menjadi tahapan kecil (milestone), dan mengapresiasi tiap kemajuan', 3],
    ['Menambah jam kerja secara drastis tanpa memperhatikan kondisi fisik anggota', 0],
    ['Ikut mengeluhkan keputusan pimpinan bersama anggota tim', 0],
    ['Membiarkan tim bekerja seadanya', 1]
  ],
  [
    'Kerja sama',
    'Kamu ditempatkan dalam satu tim dengan anggota yang memiliki kepribadian sangat kaku dan sulit diajak berkomunikasi.',
    ['Mencari tahu pola komunikasinya, beradaptasi, dan menggunakan pendekatan tertulis/jelas', 3],
    ['Meminta pindah ke kelompok lain yang anggotanya lebih cocok', 0],
    ['Membatasi interaksi dan hanya bicara saat benar-benar terdesak', 1],
    ['Melaporkan ke pengarah bahwa anggota tersebut tidak kompeten', 0]
  ],
  [
    'Konflik',
    'Terjadi salah paham antar kelompok saat simulasi peragaan tugas di lapangan.',
    ['Menghentikan simulasi sejenak, mengklarifikasi pembagian peran sesuai skenario awal, lalu melanjutkan', 3],
    ['Meneruskan simulasi sambil terus menyalahkan kelompok lain', 0],
    ['Memilih diam dan tidak mau melanjutkan bagian peragaanmu', 0],
    ['Melaporkan seluruh anggota kelompok lain sebagai perusuh simulasi', 1]
  ],
  [
    'Prosedur',
    'Pengawas instruktur memberikan arahan lisan yang bertentangan dengan buku panduan tertulis resmi.',
    ['Mengonfirmasi kembali secara sopan untuk memastikan instruksi mana yang digunakan sebagai acuan', 3],
    ['Mengikuti instruksi lisan tanpa peduli isi buku panduan', 1],
    ['Mengikuti buku panduan dan mengabaikan arahan lisan pengawas', 1],
    ['Protes keras saat itu juga bahwa instruktur salah', 0]
  ],
  [
    'Tekanan',
    'Hasil evaluasi latihanmu dikritik tajam oleh penguji di hadapan seluruh peserta seleksi.',
    ['Menerima masukan dengan sikap siap, mencatat poin evaluasi, dan menjadikannya bahan perbaikan', 3],
    ['Merasa patah semangat dan kehilangan keyakinan untuk melanjutkan seleksi', 0],
    ['Memotong pembicaraan penguji untuk membela diri', 0],
    ['Menunjukkan raut wajah kesal selama sisa acara evaluasi', 0]
  ],
  [
    'Integritas',
    'Kamu mengetahui ada peserta yang membawa barang terlarang/HP saat karantina pendidikan.',
    ['Melapor ke petugas/pembina piket sesuai dengan regulasi penegakan disiplin', 3],
    ['Meminjam barang tersebut untuk keperluan pribadimu', 0],
    ['Mengabaikannya karena bukan urusan pribadi', 1],
    ['Mengancam peserta tersebut agar mau membayarmu agar rahasianya aman', 0]
  ],
  [
    'Disiplin',
    'Teman satu kamar asrama mengajak mengobrol hingga larut malam padahal esok ada ujian penting.',
    ['Mengingatkan dengan sopan bahwa sudah jam istirahat dan mengajak tidur agar esok fit', 3],
    ['Melayani obrolan hingga pagi', 0],
    ['Pindah tidur ke kamar lain tanpa izin', 1],
    ['Memarahi temanmu dengan kata-kata kasar', 0]
  ],
  [
    'Tanggung jawab',
    'Kamu ditunjuk menjadi penanggung jawab kegiatan acara yang materinya belum kamu kuasai sepenuhnya.',
    ['Menerima tantangan, mempelajari materi secara intensif, dan berkonsultasi dengan senior/ahlinya', 3],
    ['Menolak tugas tersebut karena merasa belum mampu', 1],
    ['Menerima tugas tetapi menyerahkan seluruh eksekusinya ke anggota lain', 1],
    ['Mengulur waktu hingga batas acara hampir tiba', 0]
  ],
  [
    'Kepemimpinan',
    'Sebagai ketua kelompok, kamu harus memilih 1 dari 4 anggota untuk dipindahkan ke kelompok lain karena kelebihan kuota.',
    ['Melakukan evaluasi objektif berdasarkan kriteria tugas, berdiskusi pribadi dengan anggota terpilih, lalu memutuskan', 3],
    ['Memilih anggota yang paling jarang mengobrol denganmu', 0],
    ['Menyerahkan keputusan dengan cara mengundi tanpa alasan yang jelas', 1],
    ['Menolak mengurangi anggota dan berdebat dengan panitia', 0]
  ]
];