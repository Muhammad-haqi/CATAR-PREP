// ==========================================
// BANK PERTANYAAN WAWANCAARA (IQ) - 10 SOAL PER KATEGORI
// ==========================================

const IQ = {
  Motivasi: [
    'Mengapa kamu ingin masuk sekolah kedinasan?',
    'Apa yang kamu ketahui tentang kehidupan di asrama dan pendidikan semi-militer?',
    'Apa yang memotivasimu memilih jalur kedinasan dibandingkan perguruan tinggi umum?',
    'Bagaimana jika kamu tidak lolos di pilihan pertama, apa rencana cadanganmu?',
    'Siapa sosok yang paling menginspirasimu untuk mendaftar ke sekolah kedinasan ini?',
    'Apa pengorbanan terbesar yang pernah kamu lakukan demi mengejar cita-cita ini?',
    'Bagaimana cara kamu meyakinkan orang tuamu mengenai pilihan karir di institusi ini?',
    'Bayangkan 5 hingga 10 tahun ke depan, posisi atau peran seperti apa yang ingin kamu capai?',
    'Apa yang akan kamu lakukan jika di pertengahan masa pendidikan kamu merasa sangat lelah atau jenuh?',
    'Mengapa kami harus memilih kamu dibanding ribuan pendaftar lainnya yang memiliki nilai akademik tinggi?'
  ],

  Integritas: [
    'Ceritakan saat kamu harus jujur padahal merugikanmu.',
    'Apa arti tanggung jawab bagimu? Beri contoh nyata.',
    'Apa yang akan kamu lakukan jika melihat senior atau teman melakukan pelanggaran aturan di asrama?',
    'Pernahkah kamu ditawari jalan pintas atau bantuan tidak resmi untuk lulus seleksi ini? Bagaimana responmu?',
    'Jika kamu menemukan kebocoran kunci jawaban ujian, tindakan apa yang akan kamu ambil?',
    'Bagaimana cara menjaga nilai kejujuran ketika berada di bawah tekanan kelompok (peer pressure)?',
    'Menurutmu, apa perbedaan antara integritas dan sekadar mematuhi aturan?',
    'Pernahkah kamu membuat kesalahan besar yang tidak diketahui orang lain? Apa yang kamu lakukan saat itu?',
    'Bagaimana sikapmu jika diberi tugas oleh atasan/senior yang menurutmu melanggar etika atau aturan?',
    'Ceritakan pengalaman ketika kamu memegang rahasia penting dan digoda oleh teman untuk membocorkannya.'
  ],

  'Diri sendiri': [
    'Sebutkan kelebihan dan kekuranganmu, dan cara kamu memperbaikinya.',
    'Apa kegagalan terbesarmu dan apa yang kamu pelajari?',
    'Bagaimana caramu menerima kritik pedas dari orang lain tanpa terbawa perasaan?',
    'Apa prestasi paling membanggakan dalam hidupmu sejauh ini dan bagaimana proses mencapainya?',
    'Sebutkan 3 kata yang paling menggambarkan kepribadianmu menurut teman dekatmu!',
    'Bagaimana caramu menjaga kesehatan fisik dan mental di tengah jadwal aktivitas yang sangat padat?',
    'Apa kebiasaan buruk yang sedang berusaha kamu ubah saat ini?',
    'Bagaimana kamu menyesuaikan diri saat harus tinggal bersama orang-orang dari latar belakang budaya berbeda?',
    'Kapan terakhir kali kamu keluar dari zona nyamanmu? Ceritakan pengalamannya.',
    'Apa hobi atau kegiatan di luar akademis yang paling mengasah karaktermu?'
  ],

  Organisasi: [
    'Ceritakan pengalaman organisasimu dan perananmu.',
    'Apa kontribusi nyatamu di organisasi tersebut?',
    'Bagaimana caramu membagi waktu antara kegiatan organisasi, akademik, dan persiapan seleksi ini?',
    'Pernahkah kamu menangani acara/proyek organisasi yang hampir gagal? Bagaimana kamu menyelamatkannya?',
    'Apa peran yang paling sering kamu ambil saat berorganisasi (pimpinan, sekretaris, atau eksekutor)? Mengapa?',
    'Ceritakan pengalaman saat kamu harus mengambil keputusan sulit di dalam organisasi!',
    'Bagaimana caramu mengajak anggota organisasi yang pasif agar mau berpartisipasi aktif kembali?',
    'Apa evaluasi terpenting yang kamu dapatkan selama berorganisasi?',
    'Jika kamu dilantik menjadi ketua angkatan/asrama nanti, program kerja utama apa yang ingin kamu bawa?',
    'Pernahkah ada konflik antar-divisi di organisasimu? Bagaimana caramu menjembataninya?'
  ],

  Kerjasama: [
    'Ceritakan pengalaman bekerja dalam tim yang sulit.',
    'Bagaimana kamu menyikapi rekan yang tidak berkontribusi?',
    'Mana yang lebih kamu sukai, bekerja secara mandiri atau dalam tim? Jelaskan alasannya!',
    'Bagaimana sikapmu jika ide atau pendapatmu ditolak oleh mayoritas anggota tim?',
    'Bagaimana caramu membangun kepercayaan (trust) dengan rekan tim baru dalam waktu singkat?',
    'Ceritakan pengalaman saat kamu harus mengalah demi kepentingan dan keberhasilan tim secara keseluruhan!',
    'Apa yang kamu lakukan jika terjadi kemacetan komunikasi (miskomunikasi) dalam kelompokmu?',
    'Bagaimana kamu membagi beban kerja secara adil saat ada anggota tim yang sedang mengalami masalah pribadi?',
    'Menurutmu, faktor utama apa yang menentukan sebuah tim bisa sukses atau gagal?',
    'Ceritakan momen saat kamu berhasil membantu rekan tim yang tertinggal hingga mencapai target bersama!'
  ],

  Kepemimpinan: [
    'Menurutmu pemimpin yang baik itu seperti apa?',
    'Kapan kamu pernah memimpin? Apa hasilnya?',
    'Gaya kepemimpinan seperti apa yang biasanya kamu terapkan saat memimpin sebuah tim?',
    'Bagaimana caramu mengambil keputusan di saat situasi kritis dengan informasi yang terbatas?',
    'Bagaimana cara seorang pemimpin mempertahankan semangat dan moral anggotanya saat menghadapi kegagalan?',
    'Apa perbedaan antara menjadi seorang "bos" dan seorang "pemimpin" bagi dirimu?',
    'Bagaimana caramu memberikan teguran kepada anggota tim yang melakukan kesalahan tanpa menjatuhkan mentalnya?',
    'Ceritakan pengalaman saat kamu harus memimpin orang-orang yang usianya lebih tua atau lebih berpengalaman darimu!',
    'Bagaimana kamu membagi wewenang dan menaruh kepercayaan pada anggota tim (delegasi tugas)?',
    'Jika anggota regumu melakukan pelanggaran disiplin bersama-sama, bagaimana bentuk tanggung jawabmu sebagai ketua?'
  ],

  Konflik: [
    'Bagaimana kamu menyelesaikan perbedaan pendapat dengan temanmu?',
    'Pernahkah kamu mengalami konflik pribadi yang hebat dengan seseorang? Bagaimana cara menyelesaikannya?',
    'Apa yang kamu lakukan jika dikritik atau dipojokkan di depan banyak orang?',
    'Bagaimana sikapmu menghadapi rekan yang memiliki karakter keras kepala atau emosional?',
    'Jika ada rekan yang menyebarkan rumor tidak benar tentangmu, langkah apa yang akan kamu ambil?',
    'Bagaimana caramu memisahkan antara perasaan pribadi dan profesionalitas tugas?',
    'Ceritakan pengalaman ketika kamu menjadi penengah (mediator) dalam perselisihan dua temanmu!',
    'Apa yang akan kamu lakukan jika mendapat perlakuan kurang menyenangkan dari senior di asrama?',
    'Bagaimana caramu mengendalikan emosi saat berada dalam situasi perdebatan yang memanas?',
    'Apa pelajaran paling berharga yang kamu dapatkan dari konflik yang pernah kamu alami sebelumnya?'
  ],

  Tekanan: [
    'Bagaimana caramu bertahan saat tekanan dan beban menumpuk?',
    'Ceritakan situasi paling penuh tekanan yang pernah kamu hadapi dan cara mengatasinya!',
    'Apa yang akan kamu lakukan jika diberikan banyak tugas berat dalam tenggat waktu yang sangat ketat?',
    'Bagaimana reaksimu saat mendapat teguran keras dari pembina padahal kesalahan tersebut bukan murni darimu?',
    'Bagaimana caramu menjaga kestabilan pikiran saat fisik dalam kondisi sangat lelah?',
    'Apa strategi manajemen waktu yang kamu gunakan ketika menghadapi masa ujian dan latihan fisik bersamaan?',
    'Pernahkah kamu mengalami kondisi burnout? Bagaimana caramu bangkit kembali?',
    'Bagaimana kamu menyikapi kegagalan dalam tes atau tryout setelah melakukan persiapan maksimal?',
    'Jika jadwal latihan fisik dan akademik tiba-tiba diubah menjadi jauh lebih ketat, bagaimana adaptasimu?',
    'Apa yang kamu lakukan saat harus membuat keputusan cepat di bawah pengawasan ketat banyak orang?'
  ],

  Pengabdian: [
    'Apa komitmenmu terhadap pengabdian setelah lulus, termasuk bila ditempatkan jauh?',
    'Apakah kamu bersedia ditempatkan di daerah terpencil, terluar, atau perbatasan dengan fasilitas terbatas?',
    'Bagaimana caramu memberikan pengertian kepada keluarga jika kelak tugas mengharuskanmu jarang pulang?',
    'Apa arti "mengabdi kepada negara" menurut pandangan pribadi dan prinsip hidupmu?',
    'Bagaimana sikapmu jika setelah lulus ditempatkan di lingkungan yang kultur budayanya sangat berbeda dari daerah asalmu?',
    'Apa kontribusi nyata yang ingin kamu berikan bagi masyarakat melalui institusi ini dalam 5 tahun pertama dinas?',
    'Bagaimana kamu menyikapi jika fasilitas di awal kedinasan belum sesuai dengan ekspektasimu?',
    'Apakah kamu siap mengutamakan kepentingan tugas dinas di atas kepentingan pribadi saat dibutuhkan?',
    'Apa yang akan kamu lakukan jika ditugaskan dalam penanganan kondisi krisis atau darurat nasional secara mendadak?',
    'Bagaimana kamu menjaga semangat pengabdian dan integritas agar tidak luntur setelah puluhan tahun bertugas?'
  ],

  Institusi: [
    'Apa yang kamu ketahui tentang institusi yang kamu lamar dan mengapa memilihnya?',
    'Sebutkan visi, misi, dan nilai-nilai utama (core values) yang diusung oleh institusi ini!',
    'Apa isu atau tantangan terbesar yang sedang dihadapi oleh institusi ini saat ini dan bagaimana pendapatmu?',
    'Menurutmu, apa perbedaan mendasar antara institusi ini dengan lembaga kedinasan lainnya?',
    'Sebutkan struktur organisasi atau jenjang karir umum di dalam institusi yang kamu tuju!',
    'Apa saja tugas pokok dan fungsi (tupoksi) utama dari alumni lulusan sekolah kedinasan ini?',
    'Bagaimana pandanganmu mengenai penerapan teknologi modern dan digitalisasi pada sistem dinas institusi ini?',
    'Jika kamu diberi kesempatan memberikan saran perbaikan untuk institusi ini, hal apa yang ingin kamu usulkan?',
    'Siapa pimpinan/tokoh utama di institusi ini yang kamu ketahui dan apa jejak kepemimpinannya yang kamu kagumi?',
    'Mengapa kamu yakin karakter dan kualifikasi yang kamu miliki cocok dengan kebutuhan institusi ini?'
  ]
};