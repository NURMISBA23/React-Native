import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

// Daftar gambar yang Anda berikan
const imageList = [
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNRZg2KXTlVxT88X67ig-28tXxCL0PoON4w&s', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89tk8EYmK2Ywyp9-bP8MU1WHuBZO9WBMMgTJFxYtNjiYEBkvAadgxCREN5iuA6mCRDOw&usqp=CAU' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJf7LGe2EupZm5FVDQwcUlv39VCZe5QdAyKg&s', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSogQn7rfXiEpepGb_RGu79N62fBujxAQKBMA&s' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSz6ZUat1hXr9YZqxuz979oeP8SyT_vqd2g&s', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeX2oXdPA5BvoWSxndJ6JKKNdL5lVHgaraZLD9SkOKf9c5do7YQIvvprncTHWSfyt1hjA&usqp=CAU' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8P_gpeM5fMS0U_PDTx2oFr3r5PMtrgEt25cv94U8TyZ_oJGgzfsP7NK27h-85RSdLdWg&usqp=CAU', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdWp21TT27Lc9cIhuHnkp3MsNfFfKCBgBPYI4fit6voLJuSKTJaJj4d7cz7znkRboUHJM&usqp=CAU' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE2v4lke4zgAtT7e51Z--iKVbQoKeqmXMwwg&s', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxrajD_kN4X62UE5PwSEBaNtBsOc4XA2UcXw&s' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqW7A5Yyfa3vWYwTJJFjs2vrzh4vpvr9GKQ&s', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WKTn4EjO1Ml0eRrnOr9L3DQlv9BoJam5KA&s' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeU_UOQsI5DnvOXrUnf56S5QjRsdQMXdMV5g&s', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqNw8-dbMB1ejB22UUOFomJX_WLfssv0jyw&s' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSij0bL7wcgOrlUayn2oln-EOMXLFZvgP75cWu4z2MYn1TF7HUgjpR_Y2c7kqlVPUHblvk&usqp=CAU', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCNbaXBiGvlsXWG0oeVffgdiXif55t2U6DA&s' },
  { main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL573VvS3yXWD0nFqVhkRlJyQ8HcrEEcFCc9O_SH4MPkBrz-Yzb6RiIikAZKiINOLsULg&usqp=CAU', alternative: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18bwI_004HXNUanY3k--zqR_DkwqBZLPVgceJ7gZcFJYrH873FLsLoTu-WmGqBUNUyno&usqp=CAU' },
];

export default function Tugas2() {
  const [images, setImages] = useState(
    imageList.map(img => ({
      ...img,
      currentSrc: img.main,
      scale: 1,
    }))
  );

  const handleImagePress = (index) => {
    setImages(prevImages =>
      prevImages.map((item, i) => {
        if (i === index) {
          // Logic to increase scale by 1.2x, with a maximum of 2x
          const newScale = item.scale < 2 ? item.scale * 1.2 : 2;
          
          return {
            ...item,
            // Switch between main and alternative image source
            currentSrc: item.currentSrc === item.main ? item.alternative : item.main,
            scale: newScale,
          };
        }
        // Return other images without any changes
        return item; 
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Galeri Gambar 3x3</Text>
      <View style={styles.grid}>
        {images.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handleImagePress(index)}
          >
            <Image
              source={{ uri: item.currentSrc }}
              style={[
                styles.image,
                { transform: [{ scale: item.scale }] }
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // Calculated width for 3 cells: (cell_width + margin * 2) * 3
    // (120 + 2 * 2) * 3 = 372
    width: 372, 
  },
  cell: {
    width: 120,
    height: 120,
    margin: 2,
    backgroundColor: '#cccccc', // Placeholder color if image fails to load
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures scaled image doesn't overlap other cells
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
