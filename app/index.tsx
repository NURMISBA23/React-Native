import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Konfigurasi Awal ---
// Datanya diubah untuk menampilkan gambar yang Anda minta.
const DATA_GAMBARA = Array.from({ length: 9 }, (_, index) => ({
  pananda: index + 1,
  // Gambar orisinil/utama menggunakan link baru.
  orisinil: `https://ik.imagekit.io/vrqlaqgil/331d50c0493af05f3a9eab1122226788.jpg?updatedAt=1752587838189`,
  // Gambar cadangan/alternatif diperbarui sesuai permintaan Anda.
  cadanganna: `https://ik.imagekit.io/vrqlaqgil/0b59a9a5405a5fd301e4fd0beb0649e5%20(1).jpg?updatedAt=1752587838194`,
}));

// Tipe data untuk memastikan struktur data kita konsisten.
type InfoGambara = {
  pananda: number;
  orisinil: string;
  cadanganna: string;
};

/**
 * Komponen untuk satu gambar interaktif.
 * Sekarang dengan logika skala yang benar dan penanganan error yang lebih baik.
 */
const GambaraInteraktif = ({ sumberra }: { sumberra: InfoGambara }) => {
  const [pakeCadanganna, setPakeCadanganna] = useState(false);
  // State skala sekarang akan meningkat setiap kali gambar dipencet.
  const [skala, setSkala] = useState(1);
  const [gambarUtamaGagal, setGambarUtamaGagal] = useState(false);
  const [gambarCadanganGagal, setGambarCadanganGagal] = useState(false);

  // Fungsi ini jalan kalau gambara' dipencet.
  const pasDipencet = () => {
    // Ganti antara gambar orisinil dan cadangan.
    const targetPakeCadangan = !pakeCadanganna;

    // Cek apakah gambar yang akan ditampilkan sudah gagal dimuat.
    if (targetPakeCadangan && gambarCadanganGagal) return;
    if (!targetPakeCadangan && gambarUtamaGagal) return;

    setPakeCadanganna(targetPakeCadangan);

    // Logika skala baru:
    // Meningkat 20% setiap kali dipencet, dengan batas maksimal 2x (2.0).
    setSkala(skalaSebelumnya => Math.min(skalaSebelumnya * 1.2, 2));
  };

  // Memilih URL gambar yang akan ditampilkan.
  const gambaraDipake = pakeCadanganna ? sumberra.cadanganna : sumberra.orisinil;
  const sedangMemuatGambarUtama = !pakeCadanganna;

  const handleGagalMuat = () => {
      if(sedangMemuatGambarUtama) {
          setGambarUtamaGagal(true);
      } else {
          setGambarCadanganGagal(true);
      }
  }

  const tampilkanError = (sedangMemuatGambarUtama && gambarUtamaGagal) || (!sedangMemuatGambarUtama && gambarCadanganGagal);

  return (
    <TouchableOpacity onPress={pasDipencet} style={modelna.wadahGambara}>
      {tampilkanError ? (
        // Tampilan error jika gambar gagal dimuat.
        <View style={modelna.tampilanKasala}>
          <Text style={modelna.tulisangKasala}>Gagal ji</Text>
        </View>
      ) : (
        <Image
          source={{ uri: gambaraDipake }}
          // Set state gagal jika ada error saat memuat URL gambar.
          onError={handleGagalMuat}
          style={[modelna.gambara, { transform: [{ scale: skala }] }]}
        />
      )}
    </TouchableOpacity>
  );
};

// --- Komponen Utama Aplikasi ---
// Komponen utama yang menyusun semua gambar dalam grid.
export default function AplikasiGambara() {
  const lebaraLayar = Dimensions.get('window').width;
  // Ukuran setiap sel dihitung berdasarkan lebar layar dibagi 3.
  // Ini memastikan "Setiap sel gambar harus memiliki ukuran yang sama".
  const ukuranKotaka = lebaraLayar / 3;

  // Fungsi untuk membagi array jadi beberapa bagian (untuk setiap baris).
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
        {dataPerBaris.map((baris, index) => (
          <View key={`baris-${index}`} style={modelna.baris}>
            {baris.map(item => (
              // Setiap sel pembungkus diatur dengan width dan height yang sama.
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
const modelna = StyleSheet.create({
  latara: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  kontainera: {
    // Kontainer utama untuk scroll view
  },
  baris: {
    flexDirection: 'row',
  },
  pembungkusKotaka: {
    padding: 4, // Memberi sedikit jarak antar gambar
  },
  wadahGambara: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gambara: {
    width: '100%',
    height: '100%',
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
