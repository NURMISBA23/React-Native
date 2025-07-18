import { useFonts } from 'expo-font';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DemoFinalNurmisba() {
  const [fontsLoaded] = useFonts({
    // Font Statis
    'BungeeShade-Regular': require('../assets/fonts/BungeeShade-Regular.ttf'),
    'Geo-Italic': require('../assets/fonts/Geo-Italic.ttf'),
    'Kings-Regular': require('../assets/fonts/Kings-Regular.ttf'),
    'LovedbytheKing-Regular': require('../assets/fonts/LovedbytheKing-Regular.ttf'),
    'Megrim-Regular': require('../assets/fonts/Megrim-Regular.ttf'),
    'Oi-Regular': require('../assets/fonts/Oi-Regular.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'ZenDots-Regular': require('../assets/fonts/ZenDots-Regular.ttf'),

    // Font Variabel
    'Cabin-Variable': require('../assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf'),
    'Foldit-Variable': require('../assets/fonts/Foldit-VariableFont_wght.ttf'),
    'RobotoFlex-Variable': require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),
    'SourceSans3-Variable': require('../assets/fonts/SourceSans3-VariableFont_wght.ttf'),
    'Texturina-Variable': require('../assets/fonts/Texturina-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={gaya.latarBelakang}>
      <ScrollView contentContainerStyle={gaya.konten}>
        <Text style={[gaya.judulHalaman, { fontFamily: 'BungeeShade-Regular' }]}>
          Final Showcase - Nurmisba
        </Text>

        <Text style={gaya.subjudulHalaman}>Stambuk: 105841103422</Text>
        <View style={gaya.pemisah} />

        <Text style={gaya.keterangan}>
          👇 Berikut adalah 10 nama mahasiswa dengan variasi penggunaan font:
        </Text>

        {/* === Font Statis === */}
        <Text style={[gaya.item, { fontFamily: 'Geo-Italic' }]}>A Ikram Mukarram{'\n'}(105841102622)</Text>
        <Text style={[gaya.item, { fontFamily: 'Kings-Regular' }]}>Ahmad Fathir{'\n'}(105841102722)</Text>
        <Text style={[gaya.item, { fontFamily: 'LovedbytheKing-Regular' }]}>Nur Muhammad Ashman{'\n'}(105841103122)</Text>
        <Text style={[gaya.item, { fontFamily: 'Megrim-Regular' }]}>A Muh Fardhan Saputra{'\n'}(105841103222)</Text>
        <Text style={[gaya.item, { fontFamily: 'Oi-Regular' }]}>Muh. Faturrachman{'\n'}(105841103322)</Text>
        <Text style={[gaya.item, { fontFamily: 'SpaceMono-Regular' }]}>Alviansyah Burhani{'\n'}(105841103522)</Text>
        <Text style={[gaya.item, { fontFamily: 'ZenDots-Regular' }]}>Yusri Majeri{'\n'}(105841103622)</Text>

        <View style={[gaya.pemisah, { backgroundColor: '#AAA' }]} />

        {/* === Font Variabel === */}
        <Text style={[gaya.item, { fontFamily: 'Cabin-Variable', fontWeight: '400' }]}>Hamdani{'\n'}(105841103722)</Text>
        <Text style={[gaya.item, { fontFamily: 'Foldit-Variable', fontWeight: '600' }]}>Muliana{'\n'}(105841103822)</Text>
        <Text style={[gaya.item, { fontFamily: 'RobotoFlex-Variable', fontWeight: '700' }]}>Yusri Ali{'\n'}(105841117222)</Text>
        <Text style={[gaya.item, { fontFamily: 'SourceSans3-Variable', fontWeight: '300' }]}>Siti Marwa{'\n'}(105841117322)</Text>
        <Text style={[gaya.item, { fontFamily: 'Texturina-Variable', fontWeight: '500' }]}>Arif Rahman{'\n'}(105841117422)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const gaya = StyleSheet.create({
  latarBelakang: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
