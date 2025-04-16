import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter(); // Handles navigation
  const [scale, setScale] = useState(new Animated.Value(1)); // Set initial scale to 1

  const handlePressIn = () => {
    // Animate the button to shrink when pressed
    Animated.spring(scale, {
      toValue: 0.95,  // Shrinks the button to 95% of its size
      friction: 2,    // Controls the bounce effect
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Animate the button to return to normal size when released
    Animated.spring(scale, {
      toValue: 1,  // Back to normal size
      friction: 2,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BERT ang maniniyot</Text>
      <Text style={styles.subtitle}>A Lip-Reading Interpreter</Text>

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.push('/camera')}
        >
          <Text style={styles.buttonText}>Start Lip Reading</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff4e6',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#625551',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 13,
    shadowColor: '#13fbe2',
    shadowOffset: { width: 9, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
