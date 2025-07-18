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
const BANK_DATA_PERSONA: TemplatPersona[] = Array.from({ length: 40 }, (_, i) => {
  const customNames: { [key: number]: string } = {
    28: 'Siti Marwah',
    29: 'Nur Milani Hidayah',
    30: 'Andi Citra',
    31: 'Parwati',
    32: 'Nabila',
    34: 'Hamdani',
    35: 'Majeri',
    36: 'Ali',
    37: 'Fathir',
    38: 'Alviansyah',
  };

  const index = i;
  const stambuk = `10584110${300 + i}`;
  const identitas =
    customNames[index] ?? `Nama ke-${i + 1}${i === 33 ? ' (Fokus)' : ''}`;

  return { stambuk, identitas };
});

// --- KOLEKSI FONT (10) ---
const KOLEKSI_CORAK_AKSARA = [
  'AksaraGotik',
  'AksaraPiksel',
  'AksaraLogam',
  'AksaraMenakutkan',
  'AksaraDarah',
  'AksaraBergelombang',
  'AksaraPrisma',
  'AksaraGeometris',
  'AksaraAntik',
  'AksaraKuas',
];

// --- PEMROSESAN CIRCULAR INDEX ---
function prosesiPenyusunanPersona(indexFokus: number): EntitasTampil[] {
  const panjang = BANK_DATA_PERSONA.length;

  const getIndex = (offset: number) => (indexFokus + offset + panjang) % panjang;

  const personaSebelum = Array.from({ length: 5 }, (_, i) => BANK_DATA_PERSONA[getIndex(-5 + i)]);
  const personaSesudah = Array.from({ length: 5 }, (_, i) => BANK_DATA_PERSONA[getIndex(1 + i)]);
  const personaTerpilih = [...personaSebelum, ...personaSesudah];

  return personaTerpilih.map((persona, i) => ({
    ...persona,
    corakAksara: KOLEKSI_CORAK_AKSARA[i % KOLEKSI_CORAK_AKSARA.length],
  }));
}

const KUMPULAN_ENTITAS_TAMPIL = prosesiPenyusunanPersona(33); // index ke-33 = urutan ke-34

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
