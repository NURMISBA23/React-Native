import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// --- Konfigurasi Sumber Daya Gambar ---
// Array ini menyimpan sumber gambar utama dan alternatif.
// Setiap objek merepresentasikan satu sel di dalam kisi.
const daftarGamba = [
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNRZg2KXTlVxT88X67ig-28tXxCL0PoON4w&s', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89tk8EYmK2Ywyp9-bP8MU1WHuBZO9WBMMgTJFxYtNjiYEBkvAadgxCREN5iuA6mCRDOw&usqp=CAU' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJf7LGe2EupZm5FVDQwcUlv39VCZe5QdAyKg&s', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogQn7rfXiEpepGb_RGu79N62fBujxAQKBMA&s' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSz6ZUat1hXr9YZqxuz979oeP8SyT_vqd2g&s', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeX2oXdPA5BvoWSxndJ6JKKNdL5lVHgaraZLD9SkOKf9c5do7YQIvvprncTHWSfyt1hjA&usqp=CAU' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8P_gpeM5fMS0U_PDTx2oFr3r5PMtrgEt25cv94U8TyZ_oJGgzfsP7NK27h-85RSdLdWg&usqp=CAU', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdWp21TT27Lc9cIhuHnkp3MsNfFfKCBgBPYI4fit6voLJuSKTJaJj4d7cz7znkRboUHJM&usqp=CAU' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE2v4lke4zgAtT7e51Z--iKVbQoKeqmXMwwg&s', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxrajD_kN4X62UE5PwSEBaNtBsOc4XA2UcXw&s' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqW7A5Yyfa3vWYwTJJFjs2vrzh4vpvr9GKQ&s', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WKTn4EjO1Ml0eRrnOr9L3DQlv9BoJam5KA&s' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeU_UOQsI5DnvOXrUnf56S5QjRsdQMXdMV5g&s', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqNw8-dbMB1ejB22UUOFomJX_WLfssv0jyw&s' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSij0bL7wcgOrlUayn2oln-EOMXLFZvgP75cWu4z2MYn1TF7HUgjpR_Y2c7kqlVPUHblvk&usqp=CAU', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCNbaXBiGvlsXWG0oeVffgdiXif55t2U6DA&s' },
  { utama: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL573VvS3yXWD0nFqVhkRlJyQ8HcrEEcFCc9O_SH4MPkBrz-Yzb6RiIikAZKiINOLsULg&usqp=CAU', alternatif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18bwI_004HXNUanY3k--zqR_DkwqBZLPVgceJ7gZcFJYrH873FLsLoTu-WmGqBUNUyno&usqp=CAU' },
];

// --- Fungsi Bantuan ---
// Menginisialisasi status untuk setiap sel gambar.
const awalKondisiGamba = () =>
  daftarGamba.map(item => ({
    ...item,
    urlAktif: item.utama,
    skala: 1.0,
    error: false,
  }));

export default function LayarKisiGamba() {
  const [gambaKisi, setGambaKisi] = useState(awalKondisiGamba);

  const tekanGamba = useCallback((indeks) => {
    setGambaKisi(sekarang =>
      sekarang.map((item, idx) => {
        if (idx === indeks) {
          const urlBaru = item.urlAktif === item.utama ? item.alternatif : item.utama;
          const skalaBaru = item.skala < 2.0 ? item.skala * 1.2 : 2.0;
          return { ...item, urlAktif: urlBaru, skala: skalaBaru };
        }
        return item;
      })
    );
  }, []);

  const tanganiGagal = useCallback((indeks) => {
    setGambaKisi(sekarang =>
      sekarang.map((item, idx) => (idx === indeks ? { ...item, error: true } : item))
    );
  }, []);

  return (
    <SafeAreaView style={gaya.wadahLayar}>
      <Text style={gaya.judul}>Galeri Gamba 3x3</Text>
      <View style={gaya.wadahKisi}>
        {gambaKisi.map((item, indeks) => (
          <TouchableOpacity
            key={indeks}
            style={gaya.kotakGamba}
            onPress={() => tekanGamba(indeks)}
            activeOpacity={0.8}
          >
            {item.error ? (
              <View style={gaya.wadahError}>
                <Text style={gaya.teksError}>Gagal</Text>
              </View>
            ) : (
              <Image
                source={{ uri: item.urlAktif }}
                style={[
                  gaya.gamba,
                  { transform: [{ scale: item.skala }] }
                ]}
                resizeMode="cover"
                onError={() => tanganiGagal(indeks)}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const ukuranSel = 110;
const gaya = StyleSheet.create({
  wadahLayar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  judul: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    fontFamily: 'sans-serif-condensed',
  },
  wadahKisi: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: Dimensions.get('window').width > 360 ? 3 * (ukuranSel + 6) : '95%',
  },
  kotakGamba: {
    width: ukuranSel,
    height: ukuranSel,
    margin: 3,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gamba: {
    width: '100%',
    height: '100%',
  },
  wadahError: {
    width: '100%',
    height: '100%',
    backgroundColor: '#c0392b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teksError: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
