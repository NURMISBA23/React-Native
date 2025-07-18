import { useFonts } from 'expo-font';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type TemplatPersona = {
  stambuk: string;
  identitas: string;
};

type EntitasTampil = {
  stambuk: string;
  identitas: string;
  corakAksara: string;
};

// --- DATA UTAMA ---
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

// --- KOLEKSI 10 FONT (5 statis, 5 variabel) ---
const KOLEKSI_CORAK_AKSARA = [
  'AksaraGotik',         // Statis
  'AksaraPiksel',        // Variabel
  'AksaraLogam',         // Variabel
  'AksaraMenakutkan',    // Statis
  'AksaraDarah',         // Statis
  'AksaraBergelombang',  // Statis
  'AksaraPrisma',        // Statis
  'AksaraGeometris',     // Statis
  'AksaraAntik',         // Variabel
  'AksaraKuas',          // Statis
];

// --- PEMROSESAN NAMA DI SEKITAR STAMBUK FOKUS ---
function prosesiPenyusunanPersona(stambukFokus: string): EntitasTampil[] {
  const indeksFokus = BANK_DATA_PERSONA.findIndex(p => p.stambuk === stambukFokus);
  if (indeksFokus === -1) return [];

  const personaSebelum = BANK_DATA_PERSONA.slice(Math.max(0, indeksFokus - 5), indeksFokus);
  const personaSesudah = BANK_DATA_PERSONA.slice(indeksFokus + 1, indeksFokus + 6);
  const personaTerpilih = [...personaSebelum, ...personaSesudah];

  // Aturan tambahan: jika stambuk termasuk indeks rendah (misal, stambuk < '105841103222'), tandai khusus
  return personaTerpilih.map((persona, i) => {
    const corakAksara = KOLEKSI_CORAK_AKSARA[i % KOLEKSI_CORAK_AKSARA.length];
    return {
      ...persona,
      identitas: persona.stambuk < '105841103222' ? `🌟 ${persona.identitas}` : persona.identitas,
      corakAksara,
    };
  });
}

const KUMPULAN_ENTITAS_TAMPIL = prosesiPenyusunanPersona('105841103422');

// --- KOMPONEN INDIVIDU ---
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

// --- UTAMA ---
export default function ArenaPresentasi() {
  const [koleksiSiap, terjadiAnomali] = useFonts({
    // --- FONT STATIS & VARIABEL DIMUAT DI SINI ---
    'AksaraGotik': require('../assets/fonts/BungeeShade-Regular.ttf'), // Statis
    'AksaraPiksel': require('../assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf'), // Variabel
    'AksaraLogam': require('../assets/fonts/Foldit-VariableFont_wght.ttf'), // Variabel
    'AksaraMenakutkan': require('../assets/fonts/Geo-Italic.ttf'), // Statis
    'AksaraDarah': require('../assets/fonts/Kings-Regular.ttf'), // Statis
    'AksaraBergelombang': require('../assets/fonts/LovedbytheKing-Regular.ttf'), // Statis
    'AksaraPrisma': require('../assets/fonts/Megrim-Regular.ttf'), // Statis
    'AksaraGeometris': require('../assets/fonts/Oi-Regular.ttf'), // Statis
    'AksaraAntik': require('../assets/fonts/Texturina-VariableFont_opsz,wght.ttf'), // Variabel
    'AksaraKuas': require('../assets/fonts/ZenDots-Regular.ttf'), // Statis
  });

  if (!koleksiSiap) {
    return (
      <View style={TataRiasVisual.wadahStatus}>
        {terjadiAnomali ? (
          <>
            <Text style={TataRiasVisual.teksStatusGalat}>Anomali Terdeteksi!</Text>
            <Text style={TataRiasVisual.teksSubStatus}>
              Gagal memuat font. Periksa kembali direktori `assets/fonts`.
            </Text>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#8E8E93" />
            <Text style={TataRiasVisual.teksStatus}>Memuat Repositori Aksara...</Text>
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
        {KUMPULAN_ENTITAS_TAMPIL.map(entitas => (
          <FragmenPersona key={entitas.stambuk} entitas={entitas} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- GAYA ---
const TataRiasVisual = StyleSheet.create({
  areaAman: { flex: 1, backgroundColor: '#0A0A0A' },
  wadahKontenGulir: { paddingHorizontal: 16, paddingVertical: 24 },
  wadahStatus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  teksStatus: { marginTop: 20, fontSize: 16, color: '#8E8E93' },
  teksStatusGalat: {
    fontSize: 20,
    color: '#FF453A',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  teksSubStatus: {
    marginTop: 8,
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  wadahJudul: { alignItems: 'center', marginBottom: 24 },
  teksJudul: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F2F2F7',
    letterSpacing: 1,
  },
  pemisahJudul: {
    height: 2,
    width: 60,
    backgroundColor: '#48484A',
    marginTop: 10,
  },
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
  teksIdentitas: {
    fontSize: 28,
    color: '#F2F2F7',
    textAlign: 'center',
  },
});
