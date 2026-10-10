import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  includeBase64: true,
  quality: 0.5,
  maxWidth: 500,
  maxHeight: 500,
};

const toDataUri = (response) => {
  if (response.didCancel) {
    return null;
  }
  if (response.errorCode) {
    Alert.alert(`Error on image selection ${response.errorMessage || response.errorCode}`);
    return null;
  }
  const asset = response.assets && response.assets[0];
  return asset && asset.base64 ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}` : null;
};

// CAMERA is declared in the manifest, so it must be granted at runtime before launching the camera.
const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  return result === PermissionsAndroid.RESULTS.GRANTED;
};

const takePhoto = async () => {
  if (!(await requestCameraPermission())) {
    Alert.alert('Camera permission is required to take a photo.');
    return null;
  }
  return toDataUri(await launchCamera({...options, saveToPhotos: false}));
};

// Choosing from the library uses the Android Photo Picker, which needs no storage permission.
const chooseFromLibrary = async () => toDataUri(await launchImageLibrary({...options, selectionLimit: 1}));

// Resolves with a base64 data URI of the selected image, or null if nothing was selected.
const pickImage = () => new Promise((resolve) => {
  Alert.alert('Select Avatar', undefined, [
    {text: 'Cancel', style: 'cancel', onPress: () => resolve(null)},
    {text: 'Take Photo', onPress: () => takePhoto().then(resolve, () => resolve(null))},
    {text: 'Choose from Library', onPress: () => chooseFromLibrary().then(resolve, () => resolve(null))},
  ], {cancelable: true, onDismiss: () => resolve(null)});
});

export default pickImage;
