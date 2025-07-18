import { useFonts } from 'expo-font';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DemoFinalNurmisba() {
  const [fontsLoaded] = useFonts({
    // Font Statis (5)
    'BungeeShade-Regular': require('../assets/fonts/BungeeShade-Regular.ttf'),
    'Geo-Italic': require('../assets/fonts/Geo-Italic.ttf'),
    'Kings-Regular': require('../assets/fonts/Kings-Regular.ttf'),
    'LovedbytheKing-Regular': require('../assets/fonts/LovedbytheKing-Regular.ttf'),
    'Oi-Regular': require('../assets/fonts/Oi-Regular.ttf'),

    // Font Variabel (5)
    'Cabin-Variable': require('../assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf'),
    'Foldit-Variable': require('../assets/fonts/Foldit-VariableFont_wght.ttf'),
    'RobotoFlex-Variable': require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),
    'SourceSans3-Variable': require('../assets/fonts/SourceSans3-VariableFont_wght.ttf'),
    'Texturina-Variable': require('../assets/fonts/Texturina-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={gaya.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Data Mahasiswa
  const mahasiswa = [
    { nama: 'Ahmad Fathir', stambuk: '105841102922', font: 'Geo-Italic' },
    { nama: 'Nur Muhammad Ashman', stambuk: '105841103022', font: 'Kings-Regular' },
    { nama: 'A Ikram Mukarram', stambuk: '105841103122', font: 'LovedbytheKing-Regular' },
    { nama: 'A Muh Fardhan Saputra', stambuk: '105841103222', font: 'Oi-Regular' },
    { nama: 'Alviansyah Burhani', stambuk: '105841103322', font: 'BungeeShade-Regular' },

    { nama: 'Hamdani', stambuk: '105841103522', font: 'Cabin-Variable', weight: '400' },
    { nama: 'Muliana', stambuk: '105841103622', font: 'Foldit-Variable', weight: '600' },
    { nama: 'Yusri Ali', stambuk: '105841103722', font: 'RobotoFlex-Variable', weight: '700' },
    { nama: 'Siti Marwa', stambuk: '105841103822', font: 'SourceSans3-Variable', weight: '300' },
    { nama: 'Arif Rahman', stambuk: '105841103922', font: 'Texturina-Variable', weight: '500' },
  ];

  return (
    <SafeAreaView style={gaya.latarBelakang}>
      <ScrollView contentContainerStyle={gaya.konten}>
        <Text style={[gaya.judulHalaman, { fontFamily: 'BungeeShade-Regular' }]}>
          Final Showcase - Nurmisba
        </Text>
        <Text style={gaya.subjudulHalaman}>Stambuk: 105841103422</Text>

        <View style={gaya.pemisah} />
        <Text style={gaya.keterangan}>
          👇 Berikut adalah 10 nama mahasiswa dengan variasi font:
        </Text>

        {/* === 5 Nama Sebelum Stambuk === */}
        {mahasiswa.slice(0, 5).map((mhs, index) => (
          <Text
            key={index}
            style={[
              gaya.item,
              { fontFamily: mhs.font },
            ]}
          >
            {mhs.nama}{'\n'}({mhs.stambuk})
          </Text>
        ))}

        <View style={gaya.pemisah} />

        {/* === 5 Nama Setelah Stambuk === */}
        {mahasiswa.slice(5).map((mhs, index) => (
          <Text
            key={index + 5}
            style={[
              gaya.item,
              {
                fontFamily: 'Anto-Regular',
                fontWeight:'400'
              },
            ]}
          >
            {mhs.nama}{'\n'}({mhs.stambuk})
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const gaya = StyleSheet.create({
  latarBelakang: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  konten: {
    paddingHorizontal: 18,
    paddingVertical: 28,
  },
  judulHalaman: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    marginBottom: 6,
  },
  subjudulHalaman: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginBottom: 12,
  },
  keterangan: {
    fontSize: 15,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  item: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    lineHeight: 30,
  },
  pemisah: {
    height: 1,
    width: '85%',
    backgroundColor: '#BBB',
    alignSelf: 'center',
    marginVertical: 22,
  },
});
