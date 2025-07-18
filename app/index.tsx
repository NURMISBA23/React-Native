import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

export default function DemoFinalNurmisba() {
  const [fontsLoaded] = useFonts({
    // Font statis
    'Anton-Regular': require('../assets/fonts/Anton-Regular.ttf'),
    'Merriweather-Regular': require('../assets/fonts/Merriweather-Regular.ttf'),
    'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'SourceCodePro-Regular': require('../assets/fonts/SourceCodePro-Regular.ttf'),
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Recursive-VariableFont': require('../assets/fonts/Recursive-VariableFont_CASL,CRSV,MONO,slnt,wght.ttf'),
    'Epilogue-VariableFont': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'),
    'Lexend-VariableFont': require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
    'Jost-VariableFont': require('../assets/fonts/Jost-VariableFont_wght.ttf'),
    'WorkSans-VariableFont': require('../assets/fonts/WorkSans-VariableFont_wght.ttf'),

    // Font tambahan
    'BungeeShade-Regular': require('../assets/fonts/BungeeShade-Regular.ttf'),
    'Geo-Italic': require('../assets/fonts/Geo-Italic.ttf'),
    'Kings-Regular': require('../assets/fonts/Kings-Regular.ttf'),
    'LovedbytheKing-Regular': require('../assets/fonts/LovedbytheKing-Regular.ttf'),
    'Megrim-Regular': require('../assets/fonts/Megrim-Regular.ttf'),
    'Oi-Regular': require('../assets/fonts/Oi-Regular.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'ZenDots-Regular': require('../assets/fonts/ZenDots-Regular.ttf'),
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
        <Text style={[gaya.judulHalaman, { fontFamily: 'Anton-Regular' }]}>
          Final Showcase - Nurmisba
        </Text>

        <Text style={gaya.subjudulHalaman}>
          Stambuk: 105841103422
        </Text>

        <View style={gaya.pemisah} />

        <Text style={gaya.keterangan}>
          👇 Berikut adalah 10 nama mahasiswa dengan variasi penggunaan font statis & variabel:
        </Text>

        {/* ==== Font Statis ==== */}
        <Text style={[gaya.item, { fontFamily: 'Merriweather-Regular' }]}>
          Ahmad Fathir{'\n'}(105841102922)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'PlayfairDisplay-Regular', fontStyle: 'italic' }]}>
          Arif Rahman{'\n'}(105841100921)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'SourceCodePro-Regular' }]}>
          Alvian Syah Burhani{'\n'}(105841103522)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Anton-Regular' }]}>
          Ali Sulton S Palilati{'\n'}(105841102222)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Nunito-Light', color: '#444' }]}>
          Muhammad Faturrachman Iswan{'\n'}(105841103322)
        </Text>

        <View style={[gaya.pemisah, { backgroundColor: '#AAA' }]} />

        {/* ==== Font Variabel ==== */}
        <Text style={[gaya.item, { fontFamily: 'Recursive-VariableFont', fontWeight: '300' }]}>
          Muliana{'\n'}(105841103822)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Epilogue-VariableFont', fontWeight: '400' }]}>
          Hamdani{'\n'}(105841103722)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Lexend-VariableFont', fontWeight: '900' }]}>
          Yusri Ali{'\n'}(105841117222)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Jost-VariableFont', fontWeight: '500', color: '#2a2a2a' }]}>
          Nur Muhammad Ashman{'\n'}(105841103122)
        </Text>
        <Text style={[
          gaya.item,
          {
            fontFamily: 'WorkSans-VariableFont',
            fontWeight: '700',
            textDecorationLine: 'underline',
            color: '#000',
          },
        ]}>
          Nurmisba{'\n'}(105841103422)
        </Text>

        <View style={gaya.pemisah} />

        {/* ==== Font Tambahan ==== */}
        <Text style={[gaya.item, { fontFamily: 'BungeeShade-Regular', fontSize: 22 }]}>
          Nama A{'\n'}(105841100001)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Geo-Italic', fontSize: 22 }]}>
          Nama B{'\n'}(105841100002)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Megrim-Regular', fontSize: 22 }]}>
          Nama C{'\n'}(105841100003)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'SpaceMono-Regular', fontSize: 22 }]}>
          Nama D{'\n'}(105841100004)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'ZenDots-Regular', fontSize: 22 }]}>
          Nama E{'\n'}(105841100005)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Cabin-Variable', fontSize: 22, fontWeight: '400' }]}>
          Nama F{'\n'}(105841100006)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Foldit-Variable', fontSize: 22, fontWeight: '600' }]}>
          Nama G{'\n'}(105841100007)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'RobotoFlex-Variable', fontSize: 22, fontWeight: '700' }]}>
          Nama H{'\n'}(105841100008)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'SourceSans3-Variable', fontSize: 22, fontWeight: '300' }]}>
          Nama I{'\n'}(105841100009)
        </Text>
        <Text style={[gaya.item, { fontFamily: 'Texturina-Variable', fontSize: 22, fontWeight: '500' }]}>
          Nurmisba{'\n'}(105841103422)
        </Text>
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
