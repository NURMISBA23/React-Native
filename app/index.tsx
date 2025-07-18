import React from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

// Senarai insan (daftar nama) yang akan ditampilkan.
// 5 nama sebelum stambuk Anda dan 5 nama sesudahnya.
const SENARAI_INSAN = [
  { nama: 'A Ikram Mukarram', rupaAksara: 'AksaraBungeeShade' },
  { nama: 'Ahmad Fathir', rupaAksara: 'AksaraOi' },
  { nama: 'Nur Muhammad Ashman', rupaAksara: 'AksaraZenDots' },
  { nama: 'A Muh Fardan Saputra', rupaAksara: 'AksaraMegrim' },
  { nama: 'Muhammad Faturrachman Iswan', rupaAksara: 'AksaraGeo' },
  { nama: 'Alviansyah Burhani', rupaAksara: 'AksaraBlaka' },
  { nama: 'Majeri', rupaAksara: 'AksaraFoldit' },
  { nama: 'Hamdani', rupaAksara: 'AksaraKings' },
  { nama: 'Muliana', rupaAksara: 'AksaraTexturina' },
  { nama: 'Yusri Ali', rupaAksara: 'AksaraRecursive' },
];

export default function LayarSenaraiNamaBeraksara() {
  // Memuat semua rupa aksara (font) ke dalam aplikasi.
  // Kunci objek (misal: 'AksaraBungeeShade') adalah nama yang akan dipakai di `fontFamily`.
  // Nilai objek adalah path ke file font di folder `assets/fonts`.
  const [aksaraTelahDimuat, galatMemuat] = useFonts({
    // ----- 5 FONT STATIS -----
    'AksaraBungeeShade': require('../assets/fonts/BungeeShade-Regular.ttf'),
    'AksaraOi': require('../assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf'),
    'AksaraZenDots': require('../assets/fonts/Foldit-VariableFont_wght.ttf'),
    'AksaraMegrim': require('../assets/fonts/Geo-Italic.ttf'),
    'AksaraGeo': require('../assets/fonts/Kings-Regular.ttf'),

    // ----- 5 FONT VARIABEL -----
    'AksaraBlaka': require('../assets/fonts/LovedbytheKing-Regular.ttf'),
    'AksaraFoldit': require('../assets/fonts/Megrim-Regular.ttf'),
    'AksaraKings': require('../assets/fonts/Oi-Regular.ttf'),
    'AksaraTexturina': require('../assets/fonts/Texturina-VariableFont_opsz,wght.ttf'),
    'AksaraRecursive': require('../assets/fonts/ZenDots-Regular.ttf'),
  });

  // Jika aksara (font) sedang dalam proses memuat, tampilkan indikator pemuatan.
  if (!aksaraTelahDimuat && !galatMemuat) {
    return (
      <View style={gayaRupa.wadahPemuatan}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={gayaRupa.teksPemuatan}>Sedang memuat aksara...</Text>
      </View>
    );
  }

  // Jika terjadi galat (error) saat memuat font, tampilkan pesan galat.
  if (galatMemuat) {
      return (
        <View style={gayaRupa.wadahPemuatan}>
            <Text style={gayaRupa.teksGalat}>Terjadi galat saat memuat aksara!</Text>
            <Text style={gayaRupa.teksGalatKecil}>Pastikan file font ada di 'assets/fonts/'</Text>
        </View>
      )
  }

  // Jika aksara berhasil dimuat, tampilkan daftar nama dengan font yang sesuai.
  return (
    <ScrollView style={gayaRupa.wadahGulir} contentContainerStyle={gayaRupa.kontenGulir}>
      <Text style={gayaRupa.judulLaman}>Daftar Nama</Text>
      {SENARAI_INSAN.map((insan, indeks) => (
        <View key={indeks} style={gayaRupa.wadahTeks}>
          <Text style={[gayaRupa.teksNama, { fontFamily: insan.rupaAksara }]}>
            {insan.nama}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

// `gayaRupa` mendefinisikan seluruh penataan visual komponen di layar.
const gayaRupa = StyleSheet.create({
  wadahGulir: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Latar belakang gelap
  },
  kontenGulir: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  wadahPemuatan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  teksPemuatan: {
    marginTop: 15,
    fontSize: 16,
    color: '#cccccc',
  },
  teksGalat: {
      fontSize: 18,
      color: '#ff4d4d',
      fontWeight: 'bold',
  },
  teksGalatKecil: {
      fontSize: 14,
      color: '#aaaaaa',
      marginTop: 8,
  },
  judulLaman: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  wadahTeks: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 15,
    width: '100%',
    maxWidth: 600,
    minHeight: 80, // memastikan tinggi cukup untuk font besar
    justifyContent: 'center',
    alignItems: 'center',
  },
  teksNama: {
    fontSize: 24, // Ukuran dasar, beberapa font mungkin tampak lebih besar/kecil
    color: '#E5E5EA',
    textAlign: 'center',
  },
});
