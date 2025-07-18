import { useFonts } from 'expo-font';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Interface untuk definisi mahasiswa
interface DataMahasiswa {
  nomorInduk: string;
  namaLengkap: string;
}

// Interface untuk entitas yang akan dirender
interface EntitasRender {
  nomorInduk: string;
  namaLengkap: string;
  familyFont: string;
  tipeFont: 'statis' | 'variabel';
  posisiRelative: 'sebelum' | 'sesudah';
  urutanIndex: number;
}

// Interface untuk konfigurasi font
interface KonfigurasiFont {
  namaFamily: string;
  kategori: 'statis' | 'variabel';
  indexPosisi: number;
}

// Generator data mahasiswa dengan pola yang berbeda
const buatDataMahasiswa = (): DataMahasiswa[] => {
  const daftarNamaKustom: Record<number, string> = {
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

  return Array.from({ length: 40 }, (_, urutan) => {
    const nomorInduk = `10584110${300 + urutan}`;
    const namaLengkap = daftarNamaKustom[urutan] || 
      `Mahasiswa ${urutan + 1}${urutan === 33 ? ' (Target)' : ''}`;
    
    return { nomorInduk, namaLengkap };
  });
};

// Konfigurasi font dengan pembagian yang jelas
const KONFIGURASI_FONT_COLLECTION: KonfigurasiFont[] = [
  // Kelompok font statis (5 item)
  { namaFamily: 'FontGotikModern', kategori: 'statis', indexPosisi: 0 },
  { namaFamily: 'FontPixelArt', kategori: 'statis', indexPosisi: 1 },
  { namaFamily: 'FontMetallic', kategori: 'statis', indexPosisi: 2 },
  { namaFamily: 'FontHorror', kategori: 'statis', indexPosisi: 3 },
  { namaFamily: 'FontBloodStyle', kategori: 'statis', indexPosisi: 4 },
  
  // Kelompok font variabel (5 item)
  { namaFamily: 'FontWaveForm', kategori: 'variabel', indexPosisi: 5 },
  { namaFamily: 'FontPrismEffect', kategori: 'variabel', indexPosisi: 6 },
  { namaFamily: 'FontGeometricShape', kategori: 'variabel', indexPosisi: 7 },
  { namaFamily: 'FontVintageStyle', kategori: 'variabel', indexPosisi: 8 },
  { namaFamily: 'FontBrushStroke', kategori: 'variabel', indexPosisi: 9 },
];

// Algoritma circular selection dengan verifikasi lengkap
const generateEntitasRender = (targetIndex: number): EntitasRender[] => {
  const datasetMahasiswa = buatDataMahasiswa();
  const totalData = datasetMahasiswa.length;
  
  // Fungsi helper untuk circular indexing
  const getCircularIndex = (offset: number): number => 
    (targetIndex + offset + totalData) % totalData;

  // Ambil 5 data sebelum target
  const entitasSebelum = Array.from({ length: 5 }, (_, i) => {
    const index = getCircularIndex(-5 + i);
    const fontConfig = KONFIGURASI_FONT_COLLECTION[i];
    return {
      ...datasetMahasiswa[index],
      familyFont: fontConfig.namaFamily,
      tipeFont: fontConfig.kategori,
      posisiRelative: 'sebelum' as const,
      urutanIndex: index,
    };
  });

  // Ambil 5 data setelah target
  const entitasSesudah = Array.from({ length: 5 }, (_, i) => {
    const index = getCircularIndex(1 + i);
    const fontConfig = KONFIGURASI_FONT_COLLECTION[5 + i];
    return {
      ...datasetMahasiswa[index],
      familyFont: fontConfig.namaFamily,
      tipeFont: fontConfig.kategori,
      posisiRelative: 'sesudah' as const,
      urutanIndex: index,
    };
  });

  return [...entitasSebelum, ...entitasSesudah];
};

// Komponen untuk menampilkan item mahasiswa
const KomponenItemMahasiswa: React.FC<{ data: EntitasRender }> = ({ data }) => {
  const styleFont = useMemo(() => ({
    fontFamily: data.familyFont,
    fontSize: 26,
    color: '#F2F2F7',
    textAlign: 'center' as const,
    marginBottom: 10,
  }), [data.familyFont]);

  return (
    <View style={gayaVisual.kontainerItem}>
      <Text style={styleFont}>
        {data.namaLengkap}
      </Text>
      
      <View style={gayaVisual.kontainerMetadata}>
        <View style={gayaVisual.kontainerBadge}>
          <View style={[
            gayaVisual.badgeIndikator,
            data.tipeFont === 'statis' ? gayaVisual.badgeStatis : gayaVisual.badgeVariabel
          ]}>
            <Text style={gayaVisual.tekstBadge}>
              {data.tipeFont === 'statis' ? 'S' : 'V'}
            </Text>
          </View>
          <Text style={gayaVisual.labelTipeFont}>
            {data.tipeFont === 'statis' ? 'Font Statis' : 'Font Variabel'}
          </Text>
        </View>
        
        <View style={gayaVisual.kontainerPosisi}>
          <Text style={gayaVisual.labelPosisi}>
            Posisi: {data.posisiRelative === 'sebelum' ? 'Sebelum' : 'Sesudah'}
          </Text>
          <Text style={gayaVisual.labelStambuk}>
            Stambuk: {data.nomorInduk}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Komponen verifikasi dan statistik
const KomponenVerifikasiSistem: React.FC<{ dataEntitas: EntitasRender[] }> = ({ dataEntitas }) => {
  const statistik = useMemo(() => {
    const jumlahStatis = dataEntitas.filter(item => item.tipeFont === 'statis').length;
    const jumlahVariabel = dataEntitas.filter(item => item.tipeFont === 'variabel').length;
    const jumlahSebelum = dataEntitas.filter(item => item.posisiRelative === 'sebelum').length;
    const jumlahSesudah = dataEntitas.filter(item => item.posisiRelative === 'sesudah').length;
    const fontUnik = new Set(dataEntitas.map(item => item.familyFont)).size;
    
    return {
      totalStatis: jumlahStatis,
      totalVariabel: jumlahVariabel,
      totalSebelum: jumlahSebelum,
      totalSesudah: jumlahSesudah,
      fontUniqueCount: fontUnik,
    };
  }, [dataEntitas]);

  return (
    <View style={gayaVisual.kontainerVerifikasi}>
      <Text style={gayaVisual.judulVerifikasi}>Verifikasi Sistem Font</Text>
      
      <View style={gayaVisual.gridStatistik}>
        <View style={gayaVisual.itemStatistik}>
          <Text style={gayaVisual.angkaStatistik}>{statistik.totalStatis}</Text>
          <Text style={gayaVisual.labelStatistik}>Font Statis</Text>
        </View>
        
        <View style={gayaVisual.itemStatistik}>
          <Text style={gayaVisual.angkaStatistik}>{statistik.totalVariabel}</Text>
          <Text style={gayaVisual.labelStatistik}>Font Variabel</Text>
        </View>
        
        <View style={gayaVisual.itemStatistik}>
          <Text style={gayaVisual.angkaStatistik}>{statistik.totalSebelum}</Text>
          <Text style={gayaVisual.labelStatistik}>Sebelum Target</Text>
        </View>
        
        <View style={gayaVisual.itemStatistik}>
          <Text style={gayaVisual.angkaStatistik}>{statistik.totalSesudah}</Text>
          <Text style={gayaVisual.labelStatistik}>Sesudah Target</Text>
        </View>
      </View>
      
      <View style={gayaVisual.kontainerFontUnique}>
        <Text style={gayaVisual.labelFontUnique}>
          Total Font Unik: {statistik.fontUniqueCount} / 10
        </Text>
      </View>
    </View>
  );
};

// Komponen utama aplikasi
export default function AplikasiPengelolaFont() {
  const [statusFontReady, errorFont] = useFonts({
    // Grup font statis dengan nama yang berbeda
    'FontGotikModern': require('../assets/fonts/BungeeShade-Regular.ttf'),
    'FontPixelArt': require('../assets/fonts/LovedbytheKing-Regular.ttf'),
    'FontMetallic': require('../assets/fonts/Megrim-Regular.ttf'),
    'FontHorror': require('../assets/fonts/Oi-Regular.ttf'),
    'FontBloodStyle': require('../assets/fonts/Kings-Regular.ttf'),
    
    // Grup font variabel dengan nama yang berbeda
    'FontWaveForm': require('../assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf'),
    'FontPrismEffect': require('../assets/fonts/Foldit-VariableFont_wght.ttf'),
    'FontGeometricShape': require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),
    'FontVintageStyle': require('../assets/fonts/Texturina-VariableFont_opsz,wght.ttf'),
    'FontBrushStroke': require('../assets/fonts/SourceSans3-VariableFont_wght.ttf'),
  });

  // Generate data untuk ditampilkan (index 33 = mahasiswa ke-34)
  const dataEntitasRender = useMemo(() => generateEntitasRender(33), []);

  // Tampilkan loading state
  if (!statusFontReady) {
    return (
      <View style={gayaVisual.kontainerLoading}>
        {errorFont ? (
          <View style={gayaVisual.kontainerError}>
            <Text style={gayaVisual.tekstError}>⚠️ Kesalahan Font Terdeteksi</Text>
            <Text style={gayaVisual.subteksError}>
              Tidak dapat memuat font dari direktori assets/fonts
            </Text>
          </View>
        ) : (
          <View style={gayaVisual.kontainerProgress}>
            <ActivityIndicator size="large" color="#64FFDA" />
            <Text style={gayaVisual.tekstProgress}>Memuat Font Collection...</Text>
            <Text style={gayaVisual.subteksProgress}>
              Sedang mengkonfigurasi 10 font (5 statis + 5 variabel)
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={gayaVisual.kontainerUtama}>
      <ScrollView contentContainerStyle={gayaVisual.kontainerScrollable}>
        <View style={gayaVisual.kontainerHeader}>
          <Text style={gayaVisual.judulUtama}>Font Manager System</Text>
          <Text style={gayaVisual.subjudulUtama}>Circular Selection Demo</Text>
          <View style={gayaVisual.garisPemisah} />
        </View>

        <KomponenVerifikasiSistem dataEntitas={dataEntitasRender} />

        <View style={gayaVisual.kontainerDaftar}>
          <Text style={gayaVisual.judulDaftar}>Daftar Mahasiswa Terpilih</Text>
          {dataEntitasRender.map((entitas, index) => (
            <KomponenItemMahasiswa 
              key={`${entitas.nomorInduk}-${index}`} 
              data={entitas} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Stylesheet dengan struktur yang berbeda
const gayaVisual = StyleSheet.create({
  kontainerUtama: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  kontainerScrollable: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  kontainerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1117',
    paddingHorizontal: 24,
  },
  kontainerError: {
    alignItems: 'center',
  },
  tekstError: {
    fontSize: 22,
    color: '#F85149',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subteksError: {
    fontSize: 16,
    color: '#8B949E',
    textAlign: 'center',
    lineHeight: 24,
  },
  kontainerProgress: {
    alignItems: 'center',
  },
  tekstProgress: {
    fontSize: 18,
    color: '#64FFDA',
    fontWeight: '600',
    marginTop: 16,
  },
  subteksProgress: {
    fontSize: 14,
    color: '#8B949E',
    textAlign: 'center',
    marginTop: 8,
  },
  kontainerHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  judulUtama: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F0F6FC',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  subjudulUtama: {
    fontSize: 16,
    color: '#8B949E',
    marginTop: 8,
    textAlign: 'center',
  },
  garisPemisah: {
    height: 3,
    width: 80,
    backgroundColor: '#64FFDA',
    marginTop: 12,
    borderRadius: 2,
  },
  kontainerVerifikasi: {
    backgroundColor: '#161B22',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#30363D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  judulVerifikasi: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F0F6FC',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridStatistik: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemStatistik: {
    width: '48%',
    backgroundColor: '#0D1117',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  angkaStatistik: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#58A6FF',
  },
  labelStatistik: {
    fontSize: 12,
    color: '#8B949E',
    marginTop: 4,
    textAlign: 'center',
  },
  kontainerFontUnique: {
    backgroundColor: '#0D1117',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#21262D',
  },
  labelFontUnique: {
    fontSize: 14,
    color: '#64FFDA',
    fontWeight: '600',
  },
  kontainerDaftar: {
    marginTop: 8,
  },
  judulDaftar: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F0F6FC',
    textAlign: 'center',
    marginBottom: 20,
  },
  kontainerItem: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#30363D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  kontainerMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  kontainerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIndikator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeStatis: {
    backgroundColor: '#FB8500',
  },
  badgeVariabel: {
    backgroundColor: '#52C41A',
  },
  tekstBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  labelTipeFont: {
    fontSize: 12,
    color: '#8B949E',
    fontWeight: '500',
  },
  kontainerPosisi: {
    alignItems: 'flex-end',
  },
  labelPosisi: {
    fontSize: 11,
    color: '#58A6FF',
    fontWeight: '600',
  },
  labelStambuk: {
    fontSize: 10,
    color: '#8B949E',
    marginTop: 2,
  },
});
