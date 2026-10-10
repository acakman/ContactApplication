import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {update, remove} from '../www/database';
import styles from '../styles/styles';
import {ProfilePicture} from '../components/avatar';
import FormField from '../components/FormField';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import pickImage from '../utils/pickImage';

const ProfileScreen = ({navigation, route}) => {
  const {Contact} = route.params;
  const {id} = Contact;
  const insets = useSafeAreaInsets();
  const [firstname, setFirstname] = useState(Contact.firstname);
  const [lastname, setLastname] = useState(Contact.lastname);
  const [number, setNumber] = useState(Contact.number);
  const [email, setEmail] = useState(Contact.email);
  const [notes, setNotes] = useState(Contact.notes);
  const [image, setImage] = useState(Contact.image);
  const [edit, setEdit] = useState(false);
  const [emptyFirstname, setEmptyFirstname] = useState(false);
  const [emptyNumber, setEmptyNumber] = useState(false);
  const firstnameInput = useRef(null);
  const numberInput = useRef(null);

  const editHandler = useCallback(async () => {
    if (!edit) {
      setEdit(true);
      return;
    }
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
      await update(firstname, lastname, number, email, id, notes, image);
    } catch (error) {
      console.log(`Update transaction error: ${error.message}`);
    }
    navigation.goBack();
  }, [edit, firstname, lastname, number, email, id, notes, image, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name={edit ? 'check' : 'create'}
          onPress={editHandler}
          accessibilityLabel={edit ? 'Save contact' : 'Edit contact'}
        />
      ),
    });
  }, [navigation, edit, editHandler]);

  const deleteHandler = async () => {
    try {
      await remove(id);
    } catch (error) {
      console.log(`Remove from DB error: ${error.message}`);
    }
    navigation.goBack();
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
      <ProfilePicture
        image={image}
        firstname={firstname}
        lastname={lastname}
        edit={edit}
        onPress={addImage}
      />
      <FormField
        ref={firstnameInput}
        label="Firstname"
        value={firstname}
        onChangeText={setFirstname}
        editable={edit}
        error={emptyFirstname && 'This field is required'}
      />
      <FormField
        label="Lastname"
        value={lastname}
        onChangeText={setLastname}
        editable={edit}
      />
      <FormField
        ref={numberInput}
        label="Number"
        value={number}
        onChangeText={setNumber}
        editable={edit}
        keyboardType="phone-pad"
        error={emptyNumber && 'This field is required'}
      />
      <FormField
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        editable={edit}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        editable={edit}
        multiline
      />
      {edit ? (
        <Button
          onPress={deleteHandler}
          title="DELETE CONTACT"
          icon="delete-forever"
          backgroundColor="#ff0000"
          style={styles.formButton}
        />
      ) : null}
    </ScrollView>
  );
};

export default ProfileScreen;
