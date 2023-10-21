import {StyleSheet, Text, View, Button, Image} from 'react-native';
import React, {useState} from 'react';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import {Colors} from '../../constatns/colors';
import OutlineButton from '../UI/OutlineButton';

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('inssufcient', 'the app needs this permissions');
      return false;
    }
    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
  };

  let imagePerview = <Text>No Image taken yet</Text>;

  if (pickedImage) {
    imagePerview = <Image source={{uri: pickedImage}} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePerview}>{imagePerview}</View>
      <OutlineButton icon='camera' onPress={takeImageHandler}>
        take image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePerview: {
    width: '100%',
    height: '100%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
