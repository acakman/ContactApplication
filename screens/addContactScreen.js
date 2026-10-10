import React, {useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {insert} from '../www/database';
import styles from '../styles/styles';
import AddContactPicture from '../components/AddContactAvatar';
import FormField from '../components/FormField';
import Button from '../components/Button';
import pickImage from '../utils/pickImage';
// TODO Either reduce the size of the image or convert it to blob from base64 and decode it everytime
const AddContactScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [emptyFirstname, setEmptyFirstname] = useState(false);
  const [emptyNumber, setEmptyNumber] = useState(false);
  const firstnameInput = useRef(null);
  const numberInput = useRef(null);

  const addContactHandler = async () => {
    setEmptyFirstname(firstname === '');
    setEmptyNumber(number === '');
    if (firstname === '' || number === '') {
      if (firstname === '') {
        firstnameInput.current.shake();
      }
      if (number === '') {
        numberInput.current.shake();
      }
      return;
    }
    try {
      await insert(firstname, lastname, number, email, notes, image);
    } catch (error) {
      console.log(`Insert transaction error: ${error.message}`);
    }
    navigation.navigate('Contacts');
  };

  const addImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImage(uri);
    }
  };

  return (
    <ScrollView
      style={styles.viewContainer}
      contentContainerStyle={{paddingBottom: insets.bottom + 20}}
      keyboardShouldPersistTaps="handled"
    >
      <AddContactPicture image={image} onPress={addImage} />
      <FormField
        ref={firstnameInput}
        label="Firstname"
        onChangeText={setFirstname}
        value={firstname}
        placeholder="Enter firstname"
        error={emptyFirstname && 'This field is required'}
      />
      <FormField
        label="Lastname"
        onChangeText={setLastname}
        value={lastname}
        placeholder="Enter lastname (optional)"
      />
      <FormField
        ref={numberInput}
        label="Number"
        onChangeText={setNumber}
        value={number}
        keyboardType="phone-pad"
        placeholder="Enter number"
        error={emptyNumber && 'This field is required'}
      />
      <FormField
        label="E-mail"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter email (optional)"
      />
      <FormField
        label="Notes"
        onChangeText={setNotes}
        value={notes}
        placeholder="Enter notes (optional)"
        multiline
      />
      <Button
        onPress={addContactHandler}
        title="CONFIRM"
        icon="check"
        backgroundColor="#0bac25"
        style={styles.formButton}
      />
    </ScrollView>
  );
};

export default AddContactScreen;
