import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

const MAIN_IMAGES = [
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

const ALT_IMAGES = [
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

const IMAGE_LIST = MAIN_IMAGES.map((main, index) => ({
  id: index,
  main,
  alt: ALT_IMAGES[index],
}));

const GridImage = ({ item }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    setUseAlt(!useAlt);
    setScale((prev) => {
      const next = prev * 1.2;
      return next <= 2 ? next : 2;
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.imageWrapper}>
      <Image
        source={{ uri: useAlt ? item.alt : item.main }}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3 - 12;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.grid}>
          {IMAGE_LIST.map((item) => (
            <View key={item.id} style={[styles.gridItem, { width: itemSize, height: itemSize }]}>
              <GridImage item={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollArea: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    margin: 6,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
