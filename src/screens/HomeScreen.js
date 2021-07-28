import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>


      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.button}>공방찾기 ></Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => alert('단골공방')}
      >
        <Text style={styles.button}>단골공방 ></Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => alert('가이드')}
      >
        <Text style={styles.button}>가이드 ></Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => alert('내프린터')}
      >
        <Text style={styles.button}>내프린터 ></Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#2ECCFA",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    padding: 10,
    margin: 20
  },
  button: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});

export default HomeScreen;
