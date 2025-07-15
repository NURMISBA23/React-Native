import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Utama</Text>
      <Text style={styles.subtitle}>Klik tombol di bawah untuk melihat tugas.</Text>
      
{/*       {/* Tombol untuk navigasi ke halaman tugas1 */}
      <Link href="/tugas1" style={styles.linkButton}>
        <Text style={styles.linkText}>Buka Tugas 1</Text>
      </Link> */}
      
      {/* 🔗 TAMBAHKAN TOMBOL INI untuk navigasi ke halaman tugas2 */}
      <Link href="/tugas2" style={[styles.linkButton, { marginTop: 15 }]}>
        <Text style={styles.linkText}>Buka Tugas 2</Text>
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  linkButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
