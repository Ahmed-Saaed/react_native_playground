import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OutlineButton from '../UI/OutlineButton';
import {Colors} from '../../constatns/colors';
import {getCurrentPositionAsync, useForegroundPermissions} from 'expo-location';

const LocationPicker = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('inssufcient', 'the app needs this permissions');
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
  };
  const pickOnMapHandler = () => {};
  return (
    <View>
      <View style={styles.mapPerview}></View>
      <View style={styles.actions}>
        <OutlineButton icon='location' onPress={getLocationHandler}>
          locate user
        </OutlineButton>
        <OutlineButton icon='map' onPress={pickOnMapHandler}>
          pick on map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPerview: {
    marginVertical: 8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
