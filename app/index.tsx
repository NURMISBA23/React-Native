// import { Text, View, StyleSheet } from "react-native";
// import { Link } from 'expo-router';

// export default function Index() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Halaman Utama</Text>
//       <Text style={styles.subtitle}>Klik tombol di bawah untuk melihat tugas.</Text>
      
// {/*       {/* Tombol untuk navigasi ke halaman tugas1 */}
//       <Link href="/tugas1" style={styles.linkButton}>
//         <Text style={styles.linkText}>Buka Tugas 1</Text>
//       </Link> */}
      
//       {/* 🔗 TAMBAHKAN TOMBOL INI untuk navigasi ke halaman tugas2 */}
//       <Link href="/tugas2" style={[styles.linkButton, { marginTop: 15 }]}>
//         <Text style={styles.linkText}>Buka Tugas 2</Text>
//       </Link>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   linkButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 2, // Shadow for Android
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//   },
//   linkText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });

// TUGAS 1---------------------------------------------------------------------------------------
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LayarBentukGeometris() {
  return (
    <View style={gaya.wadahUtama}>
      <View style={gaya.bentukSegitiga} />

      <View style={gaya.kotakPersegi}>
        <Text style={gaya.teksDiDalam}>NURMISBA</Text>
      </View>

      <View style={gaya.kapsulInfo}>
        <Text style={gaya.teksDiDalam}>105841103422</Text>
      </View>
    </View>
  );
}

const gaya = StyleSheet.create({
  wadahUtama: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    flex: 1,
    gap: 32,
    justifyContent: 'center',
  },
  bentukSegitiga: {
    backgroundColor: 'transparent',
    borderBottomColor: '#c13e2c',
    borderBottomWidth: 115,
    borderLeftColor: 'transparent',
    borderLeftWidth: 75,
    borderRightColor: 'transparent',
    borderRightWidth: 75,
    borderStyle: 'solid',
    height: 0,
    width: 0,
  },
  kotakPersegi: {
    alignItems: 'center',
    backgroundColor: '#2a81ba',
    borderRadius: 10,
    height: 68,
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: 290,
  },
  kapsulInfo: {
    alignItems: 'center',
    backgroundColor: '#28b062',
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: 290,
  },
  teksDiDalam: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});


// BATAS TUGAS 1---------------------------------------------------------------------------------

// TUGAS 2
import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

// --- Konfigurasi Sumber Daya Gambar ---
// Array ini menyimpan sumber gambar utama dan alternatif.
// Setiap objek merepresentasikan satu sel di dalam kisi.
const koleksiSumberGambar = [
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
const aturKondisiAwalKisi = () => koleksiSumberGambar.map(dataSumber => ({
  ...dataSumber,
  urlTampil: dataSumber.utama,
  skalaTransformasi: 1.0,
  sedangBermasalah: false,
}));

/**
 * Komponen LayarKisiGambar
 * Menampilkan kisi gambar interaktif berukuran 3x3.
 */
export default function LayarKisiGambar() {
  // State untuk mengelola properti dari setiap item dalam kisi.
  const [itemKisi, setItemKisi] = useState(aturKondisiAwalKisi);

  // --- Penanganan Aksi ---

  /**
   * Mengelola aksi ketika sebuah sel gambar ditekan.
   * Fungsi ini menukar sumber gambar dan memperbesar skalanya.
   * Dibungkus dengan useCallback untuk optimisasi performa.
   */
  const kelolaAksiTekanSel = useCallback((indeksTerpilih) => {
    setItemKisi(itemSaatIni =>
      itemSaatIni.map((item, indeks) => {
        if (indeks === indeksTerpilih) {
          // Tentukan URL gambar berikutnya yang akan ditampilkan.
          const urlTampilBerikutnya = item.urlTampil === item.utama
            ? item.alternatif
            : item.utama;
          
          // Hitung skala baru, dengan batas maksimal 2.
          const skalaBerikutnya = item.skalaTransformasi < 2.0
            ? item.skalaTransformasi * 1.2
            : 2.0;

          return {
            ...item,
            urlTampil: urlTampilBerikutnya,
            skalaTransformasi: skalaBerikutnya,
          };
        }
        // Kembalikan item lain tanpa modifikasi.
        return item;
      })
    );
  }, []); // Dependensi kosong berarti fungsi ini hanya dibuat sekali.

  /**
   * Mengelola error pemuatan gambar untuk sel tertentu.
   * Dibungkus dengan useCallback untuk optimisasi performa.
   */
  const tanganiMasalahGambar = useCallback((indeksError) => {
    setItemKisi(itemSaatIni =>
      itemSaatIni.map((item, indeks) => {
        if (indeks === indeksError) {
          return { ...item, sedangBermasalah: true };
        }
        return item;
      })
    );
  }, []);

  // --- Tampilan Komponen ---
  return (
    <SafeAreaView style={gaya.wadahLayar}>
      <Text style={gaya.judulHalaman}>Galeri Gambar 3x3</Text>
      <View style={gaya.wadahKisi}>
        {itemKisi.map((item, indeks) => (
          <TouchableOpacity
            key={indeks}
            style={gaya.selGambar}
            onPress={() => kelolaAksiTekanSel(indeks)}
            activeOpacity={0.8}
          >
            {item.sedangBermasalah ? (
              <View style={gaya.wadahPesanError}>
                <Text style={gaya.teksPesanError}>X</Text>
              </View>
            ) : (
              <Image
                source={{ uri: item.urlTampil }}
                style={[
                  gaya.elemenGambar,
                  { transform: [{ scale: item.skalaTransformasi }] }
                ]}
                resizeMode="cover"
                onError={() => tanganiMasalahGambar(indeks)}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --- Definisi Gaya ---
const gaya = StyleSheet.create({
  wadahLayar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  judulHalaman: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    fontFamily: 'sans-serif-condensed',
  },
  wadahKisi: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: Dimensions.get('window').width > 380 ? 372 : '95%',
  },
  selGambar: {
    width: 120,
    height: 120,
    margin: 2,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  elemenGambar: {
    width: '100%',
    height: '100%',
  },
  wadahPesanError: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c62828',
  },
  teksPesanError: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
// BATAS TUGAS 2---------------------------------------------------------------------------------
