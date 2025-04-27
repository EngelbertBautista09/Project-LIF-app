import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [faceData, setFaceData] = useState(null);
  const cameraRef = useRef(null);

  const devices = useCameraDevices();
  const frontDevice = devices.find((device) => device.position === 'front'); // Find front camera

  useEffect(() => {
    const getPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      
      // Correct comparison
      setHasPermission(status === 'granted');
    };
    
    getPermissions();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text>We need permission to access the camera</Text>
        <Button title="Grant Permission" onPress={Camera.requestCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {frontDevice ? (
        <Camera
          style={styles.camera}
          device={frontDevice}
          isActive={true}
          ref={cameraRef}
        />
      ) : (
        <Text>Loading camera...</Text>
      )}
      <View style={styles.overlay}>
        <Text style={{ color: 'white' }}>
          {faceData ? 'Face Detected' : 'No Face'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
