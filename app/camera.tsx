import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [faceData, setFaceData] = useState(null);

  if (!permission?.granted) {
    return (
      <View style={styles.centered}>
        <Text>We need permission to access the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      const face = faces[0]; // Take the first face detected
      setFaceData(face.bounds);
    } else {
      setFaceData(null);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
        }}
      />
      {faceData && (
        <View
          style={[
            styles.faceBox,
            {
              top: faceData.origin.y,
              left: faceData.origin.x,
              width: faceData.size.width,
              height: faceData.size.height,
            },
          ]}
        />
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
  faceBox: {
    position: 'absolute',
    borderColor: 'lime',
    borderWidth: 2,
    zIndex: 1000,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
