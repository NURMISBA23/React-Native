import { useFonts } from 'expo-font';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// --- BAGIAN 1: TIPE DATA DAN PENGOLAHAN ---

/**
 * @typedef {Object} TemplatPersona
 * @property {string} stambuk - Nomor registrasi unik.
 * @property {string} identitas - Nama lengkap individu.
 */
type TemplatPersona = {
  stambuk: string;
  identitas: string;
};

/**
 * @typedef {Object} EntitasTampil
 * @property {string} stambuk - Nomor registrasi unik.
 * @property {string} identitas - Nama lengkap individu.
 * @property {string} corakAksara - Kunci alias untuk rupa huruf.
 */
type EntitasTampil = {
  stambuk: string;
  identitas: string;
  corakAksara: string;
};

// Bank data mentah yang berisi semua persona.
const BANK_DATA_PERSONA: TemplatPersona[] = [
  { stambuk: '105841102922', identitas: 'A Ikram Mukarram' },
  { stambuk: '105841103022', identitas: 'Ahmad Fathir' },
  { stambuk: '105841103122', identitas: 'Nur Muhammad Ashman' },
  { stambuk: '105841103222', identitas: 'A Muh Fardan Saputra' },
  { stambuk: '105841103322', identitas: 'Muhammad Faturrachman Iswan' },
  { stambuk: '105841103422', identitas: 'Nurmisba (Fokus)' }, // Fokus
  { stambuk: '105841103522', identitas: 'Alviansyah Burhani' },
  { stambuk: '105841103622', identitas: 'Majeri' },
  { stambuk: '105841103722', identitas: 'Hamdani' },
  { stambuk: '105841103822', identitas: 'Muliana' },
  { stambuk: '105841103922', identitas: 'Yusri Ali' },
];

// Koleksi font
const KOLEKSI_CORAK_AKSARA = [
  'AksaraGotik', 'AksaraPiksel', 'AksaraLogam', 'AksaraMenakutkan', 'AksaraDarah',
  'AksaraBergelombang', 'AksaraPrisma', 'AksaraGeometris', 'AksaraAntik', 'AksaraKuas'
];

/**
 * Menyusun daftar persona sekitar stambuk fokus.
 * @param stambukFokus - Nomor stambuk yang menjadi fokus
 * @returns Daftar persona siap ditampilkan
 */
function prosesiPenyusunanPersona(stambukFokus: string): EntitasTampil[] {
  const indeksFokus = BANK_DATA_PERSONA.findIndex(p => p.stambuk === stambukFokus);

  if (indeksFokus === -1) return [];

  const personaSebelum = BANK_DATA_PERSONA.slice(Math.max(0, indeksFokus - 5), indeksFokus);
  const personaSesudah = BANK_DATA_PERSONA.slice(indeksFokus + 1, indeksFokus + 6);
  const personaTerpilih = [...personaSebelum, ...personaSesudah];

  return personaTerpilih.map((persona, indeks) => ({
    ...persona,
    corakAksara: KOLEKSI_CORAK_AKSARA[indeks % KOLEKSI_CORAK_AKSARA.length],
  }));
}

const KUMPULAN_ENTITAS_TAMPIL = prosesiPenyusunanPersona('105841103422');

// --- BAGIAN 2: KOMPONEN UI ---

type FragmenPersonaProps = {
  entitas: EntitasTampil;
};

const FragmenPersona: React.FC<FragmenPersonaProps> = ({ entitas }) => (
  <View style={TataRiasVisual.wadahFragmen}>
    <Text style={[TataRiasVisual.teksIdentitas, { fontFamily: entitas.corakAksara }]}>
      {entitas.identitas}
    </Text>
  </View>
);

export default function ArenaPresentasi() {
  const [koleksiSiap, terjadiAnomali] = useFonts({
    'AksaraGotik': require('../assets/fonts/BungeeShade-Regular.ttf'),
    'AksaraPiksel': require('../assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf'),
    'AksaraLogam': require('../assets/fonts/Foldit-VariableFont_wght.ttf'),
    'AksaraMenakutkan': require('../assets/fonts/Geo-Italic.ttf'),
    'AksaraDarah': require('../assets/fonts/Kings-Regular.ttf'),
    'AksaraBergelombang': require('../assets/fonts/LovedbytheKing-Regular.ttf'),
    'AksaraPrisma': require('../assets/fonts/Megrim-Regular.ttf'),
    'AksaraGeometris': require('../assets/fonts/Oi-Regular.ttf'),
    'AksaraAntik': require('../assets/fonts/Texturina-VariableFont_opsz,wght.ttf'),
    'AksaraKuas': require('../assets/fonts/ZenDots-Regular.ttf'),
  });

  if (!koleksiSiap) {
    return (
      <View style={TataRiasVisual.wadahStatus}>
        {terjadiAnomali ? (
          <>
            <Text style={TataRiasVisual.teksStatusGalat}>Anomali Terdeteksi!</Text>
            <Text style={TataRiasVisual.teksSubStatus}>Gagal memuat font. Periksa direktori 'assets/fonts'.</Text>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#8E8E93" />
            <Text style={TataRiasVisual.teksStatus}>Menginisialisasi Repositori Aksara...</Text>
          </>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={TataRiasVisual.areaAman}>
      <ScrollView contentContainerStyle={TataRiasVisual.wadahKontenGulir}>
        <View style={TataRiasVisual.wadahJudul}>
          <Text style={TataRiasVisual.teksJudul}>Daftar Nama</Text>
          <View style={TataRiasVisual.pemisahJudul} />
        </View>
        {KUMPULAN_ENTITAS_TAMPIL.map((entitas) => (
          <FragmenPersona key={entitas.stambuk} entitas={entitas} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const TataRiasVisual = StyleSheet.create({
  areaAman: { flex: 1, backgroundColor: '#0A0A0A' },
  wadahKontenGulir: { paddingHorizontal: 16, paddingVertical: 24 },
  wadahStatus: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A', padding: 20 },
  teksStatus: { marginTop: 20, fontSize: 16, color: '#8E8E93' },
  teksStatusGalat: { fontSize: 20, color: '#FF453A', fontWeight: 'bold', textAlign: 'center' },
  teksSubStatus: { marginTop: 8, fontSize: 14, color: '#8E8E93', textAlign: 'center' },
  wadahJudul: { alignItems: 'center', marginBottom: 24 },
  teksJudul: { fontSize: 26, fontWeight: '700', color: '#F2F2F7', letterSpacing: 1 },
  pemisahJudul: { height: 2, width: 60, backgroundColor: '#48484A', marginTop: 10 },
  wadahFragmen: {
    backgroundColor: '#1D1D1F',
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  teksIdentitas: { fontSize: 28, color: '#F2F2F7', textAlign: 'center' },
});
