import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

const SENARAI_WIMBA_PRATAMA = [
  'https://ik.imagekit.io/vrqlaqgil/BTS/RM%20(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/ARMY%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/Jin%20(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/Suga%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/BTS%20(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/J-hope%20(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/JM%2C(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/V%20(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/JK%20(1).png',
];

const SENARAI_WIMBA_DWITIYA = [
  'https://ik.imagekit.io/vrqlaqgil/BTS/RM%20(3).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/ARMY%20(1).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/Jin%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/Suga%20(3).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/BTS%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/J-hope%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/JM%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/V%20(2).png',
  'https://ik.imagekit.io/vrqlaqgil/BTS/JK%20(2).png',
];

const KOLEKSI_WIMBA = SENARAI_WIMBA_PRATAMA.map((pratama, indeks) => ({
  pengenal: indeks,
  pratama: pratama,
  dwitiya: SENARAI_WIMBA_DWITIYA[indeks],
}));

const KomponenWimbaTunggal = ({ butirWimba }) => {
  const [pakaiDwitiya, aturPakaiDwitiya] = React.useState(false);
  const [faktorSkala, aturFaktorSkala] = React.useState(1);
  const [gagalMuat, aturGagalMuat] = React.useState(false);

  const kelolaSentuhan = () => {
    aturPakaiDwitiya(!pakaiDwitiya);
    aturFaktorSkala((skalaSebelumnya) => {
      const skalaBerikutnya = skalaSebelumnya * 1.2;
      return skalaBerikutnya <= 2 ? skalaBerikutnya : 2;
    });
    aturGagalMuat(false); // reset jika sebelumnya error
  };

  const sumberGambar = gagalMuat
    ? { uri: 'https://placehold.co/400x400/dc2626/ffffff?text=Gagal+Muat' }
    : { uri: pakaiDwitiya ? butirWimba.dwitiya : butirWimba.pratama };

  return (
    <TouchableOpacity onPress={kelolaSentuhan} style={gaya.pembungkusWimba}>
      <Image
        source={sumberGambar}
        style={[gaya.wimba, { transform: [{ scale: faktorSkala }] }]}
        resizeMode="cover"
        onError={() => aturGagalMuat(true)}
      />
    </TouchableOpacity>
  );
};

export default function RakitLayarUtama() {
  const [lebarLayar, aturLebarLayar] = React.useState(Dimensions.get('window').width);

  React.useEffect(() => {
    const kelolaPerubahanDimensi = () => {
      aturLebarLayar(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', kelolaPerubahanDimensi);

    return () => {
      subscription?.remove();
    };
  }, []);

  const lebarMaksimalKisi = 960;
  const jumlahKolom = 3;
  const marginButir = 6 * 2;

  const lebarKisiEfektif = Math.min(lebarLayar, lebarMaksimalKisi);
  const besaranButir = lebarKisiEfektif / jumlahKolom - marginButir;

  return (
    <SafeAreaView style={gaya.wadahUlu}>
      <View style={gaya.areaJudul}>
        <Text style={gaya.teksJudul}>Galeri Wimba Interaktif</Text>
        <Text style={gaya.teksSubJudul}>Sentuh gambar untuk melihat versi lainnya</Text>
      </View>
      <ScrollView contentContainerStyle={gaya.areaGulir}>
        <View style={gaya.penataanKisi}>
          {KOLEKSI_WIMBA.map((butir) => (
            <View key={butir.pengenal} style={[gaya.wadahButirKisi, { width: besaranButir, height: besaranButir }]}>
              <KomponenWimbaTunggal butirWimba={butir} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const gaya = StyleSheet.create({
  wadahUlu: {
    flex: 1,
    backgroundColor: '#111',
  },
  areaJudul: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  teksJudul: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  teksSubJudul: {
    fontSize: 16,
    color: '#aaa',
  },
  areaGulir: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 6,
  },
  penataanKisi: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 960,
  },
  wadahButirKisi: {
    margin: 6,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  pembungkusWimba: {
    flex: 1,
  },
  wimba: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
