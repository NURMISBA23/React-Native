import React, { ComponentProps } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
// Impor berbagai keluarga ikon dari @expo/vector-icons
import { FontAwesome, Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

// --- Definisi Tipe untuk TypeScript ---

// Tipe untuk objek ikon individual dalam daftar kita.
// Ini memastikan setiap objek memiliki struktur yang benar.
type IkonInfo = {
  nama: string;
  pustaka: keyof typeof ICON_LIBRARIES; // `pustaka` harus salah satu kunci dari ICON_LIBRARIES
  warna: string;
};

// Tipe untuk properti (props) dari komponen KartuIkon.
type KartuIkonProps = {
  ikon: IkonInfo;
};

// --- Konfigurasi Pustaka Ikon ---

// Definisikan tipe untuk setiap keluarga ikon yang akan kita gunakan.
// Menggunakan ComponentProps dari React untuk secara otomatis mendapatkan tipe props yang benar.
const ICON_LIBRARIES = {
  FontAwesome: (props: ComponentProps<typeof FontAwesome>) => <FontAwesome {...props} />,
  Ionicons: (props: ComponentProps<typeof Ionicons>) => <Ionicons {...props} />,
  MaterialCommunityIcons: (props: ComponentProps<typeof MaterialCommunityIcons>) => <MaterialCommunityIcons {...props} />,
  Feather: (props: ComponentProps<typeof Feather>) => <Feather {...props} />,
  AntDesign: (props: ComponentProps<typeof AntDesign>) => <AntDesign {...props} />,
};

// Daftar 10 ikon yang akan ditampilkan.
// Diberi tipe IkonInfo[] untuk memastikan semua datanya konsisten.
const DAFTAR_IKON: IkonInfo[] = [
  { nama: 'rocket', pustaka: 'FontAwesome', warna: '#ff4757' },
  { nama: 'planet', pustaka: 'Ionicons', warna: '#ffa502' },
  { nama: 'space-station', pustaka: 'MaterialCommunityIcons', warna: '#747d8c' },
  { nama: 'git-branch', pustaka: 'Feather', warna: '#2ed573' },
  { nama: 'codesquare', pustaka: 'AntDesign', warna: '#1e90ff' },
  { nama: 'heart', pustaka: 'FontAwesome', warna: '#ff6b81' },
  { nama: 'game-controller', pustaka: 'Ionicons', warna: '#5352ed' },
  { nama: 'coffee', pustaka: 'Feather', warna: '#834d18' },
  { nama: 'android', pustaka: 'MaterialCommunityIcons', warna: '#a0d243' },
  { nama: 'apple1', pustaka: 'AntDesign', warna: '#ced6e0' },
];

/**
 * Komponen untuk menampilkan satu kartu ikon.
 * @param {KartuIkonProps} props - Properti yang berisi detail ikon.
 */
const KartuIkon = ({ ikon }: KartuIkonProps) => {
  // Ambil komponen ikon yang sesuai dari objek ICON_LIBRARIES
  const IkonKomponen = ICON_LIBRARIES[ikon.pustaka];

  return (
    <View style={gaya.wadahKartu}>
      {/* Properti 'name' diberi cast 'as any' karena setiap pustaka ikon memiliki daftar namanya sendiri yang spesifik.
        Membuat tipe yang sangat ketat untuk ini akan sangat rumit.
        Cast ini adalah solusi praktis yang memberi tahu TypeScript untuk mempercayai bahwa nama yang kita berikan sudah benar.
      */}
      <IkonKomponen name={ikon.nama as any} size={48} color={ikon.warna} />
      <Text style={gaya.teksNamaIkon}>{ikon.nama}</Text>
      <Text style={gaya.teksPustakaIkon}>{ikon.pustaka}</Text>
    </View>
  );
};

/**
 * Komponen utama layar yang menampilkan galeri ikon.
 */
export default function LayarGaleriIkon() {
  return (
    <SafeAreaView style={gaya.areaAman}>
      <ScrollView>
        <View style={gaya.wadahJudul}>
          <Text style={gaya.teksJudul}>Galeri Ikon</Text>
          <Text style={gaya.teksSubJudul}>Menampilkan 10 Ikon Berbeda</Text>
        </View>
        <View style={gaya.wadahKisi}>
          {DAFTAR_IKON.map((ikon, indeks) => (
            <KartuIkon key={indeks} ikon={ikon} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const gaya = StyleSheet.create({
  areaAman: {
    flex: 1,
    backgroundColor: '#121212', // Latar belakang gelap
  },
  wadahJudul: {
    padding: 24,
    alignItems: 'center',
  },
  teksJudul: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  teksSubJudul: {
    fontSize: 16,
    color: '#A9A9A9',
    marginTop: 4,
  },
  wadahKisi: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  wadahKartu: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '42%', // Sekitar 2 kolom dengan sedikit spasi
    aspectRatio: 1, // Membuat kartu menjadi persegi
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  teksNamaIkon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EAEAEA',
    marginTop: 12,
  },
  teksPustakaIkon: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
});
