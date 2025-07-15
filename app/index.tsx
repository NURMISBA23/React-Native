import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Konfigurasi Awal ---
// Ceritanya ini data dari server nah, kukasih statis saja dulu.
// Langsung pakai URL lengkapnya di sini, tidak perlu digabung-gabung lagi.
const URL_GAMBAR_UTAMA = 'https://i.pinimg.com/736x/8a/ea/22/8aea2261be9889f7a937a0d2810d5591.jpg';
const URL_GAMBAR_CADANGAN = 'https://i.pinimg.com/736x/8a/ea/22/8aea2261be9889f7a937a0d2810d5591.jpg';

// Kita buat datanya secara dinamis, supaya keren sedikit.
// Logikanya diubah biar langsung pakai URL yang benar.
const DATA_GAMBARA = Array.from({ length: 9 }, (_, index) => ({
  pananda: index + 1,
  orisinil: URL_GAMBAR_UTAMA,
  cadanganna: URL_GAMBAR_CADANGAN,
}));

// Ini untuk tipe data, biar rapi ji kodenya bosku.
type InfoGambara = {
  pananda: number;
  orisinil: string;
  cadanganna: string;
};

/**
 * Komponen untuk satu gambar yang bisa dipencet-pencet.
 * Kalau dipencet, gambarnya ganti dan membesar sedikit.
 */
const GambaraInteraktif = ({ sumberra }: { sumberra: InfoGambara }) => {
  // State untuk tahu gambar mana yang dipakai, asli atau cadangan.
  const [pakeCadanganna, setPakeCadanganna] = useState(false);
  // State untuk skala pembesaran gambar.
  const [skala, setSkala] = useState(1);
  // State kalau gagal ki memuat gambara'.
  const [gagalKiMemuat, setGagalKiMemuat] = useState(false);

  // Fungsi ini jalan kalau gambara' dipencet.
  const pasDipencet = () => {
    if (gagalKiMemuat) return; // Kalau sudah gagal, tidak usah mi diapa-apai.
    setPakeCadanganna(sebelumnya => !sebelumnya);
    setSkala(1.1); // Langsung set ke 1.1 pas dipencet
    setTimeout(() => setSkala(1), 200); // Kembalikan ke normal setelah 0.2 detik
  };

  const gambaraDipake = pakeCadanganna ? sumberra.cadanganna : sumberra.orisinil;

  return (
    <TouchableOpacity onPress={pasDipencet} style={modelna.wadahGambara}>
      {gagalKiMemuat ? (
        <View style={modelna.tampilanKasala}>
          <Text style={modelna.tulisangKasala}>Gagal ji</Text>
        </View>
      ) : (
        <Image
          source={{ uri: gambaraDipake }}
          onError={() => setGagalKiMemuat(true)}
          style={[modelna.gambara, { transform: [{ scale: skala }] }]}
        />
      )}
    </TouchableOpacity>
  );
};

// --- Komponen Utama Aplikasi ---
// Ini mi komponen utamanya, yang menampilkan semua gambar dalam grid.
export default function AplikasiGambara() {
  const lebaraLayar = Dimensions.get('window').width;
  const ukuranKotaka = lebaraLayar / 3; // Ukuran pas untuk 3 kolom

  // Fungsi untuk membagi array jadi beberapa bagian (untuk baris)
  const potongArrayJadiBagian = (arr: InfoGambara[], ukuranBagian: number): InfoGambara[][] => {
    const hasilPotongan = [];
    for (let i = 0; i < arr.length; i += ukuranBagian) {
      hasilPotongan.push(arr.slice(i, i + ukuranBagian));
    }
    return hasilPotongan;
  };

  const dataPerBaris = potongArrayJadiBagian(DATA_GAMBARA, 3);

  return (
    <SafeAreaView style={modelna.latara}>
      <ScrollView contentContainerStyle={modelna.kontainera}>
        {/* Di sini kita mapping data yang sudah dibagi per baris.
          Jadi lebih dinamis, tidak manual 3 baris seperti kode lama.
        */}
        {dataPerBaris.map((baris, index) => (
          <View key={`baris-${index}`} style={modelna.baris}>
            {baris.map(item => (
              <View key={item.pananda} style={[modelna.pembungkusKotaka, { width: ukuranKotaka, height: ukuranKotaka }]}>
                <GambaraInteraktif sumberra={item} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Kumpulan Model (Styling) ---
// Semua gaya CSS-nya kukumpul di sini, biar tidak berantakan.
const modelna = StyleSheet.create({
  latara: {
    backgroundColor: '#f0f0f0', // Ganti warna latar sedikit
    flex: 1,
  },
  kontainera: {
    paddingVertical: 5,
  },
  baris: {
    flexDirection: 'row',
  },
  pembungkusKotaka: {
    padding: 4, // Kasih padding di pembungkusnya
  },
  wadahGambara: {
    flex: 1,
    borderRadius: 12, // Bikin lebih bulat sudutnya
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    elevation: 3, // Tambah bayangan untuk Android
    shadowColor: '#000', // Bayangan untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gambara: {
    width: '100%',
    height: '100%',
    // transition properti tidak ada di React Native, jadi saya hapus
  },
  tampilanKasala: {
    alignItems: 'center',
    backgroundColor: '#ffdddd',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  tulisangKasala: {
    color: '#b00020',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
