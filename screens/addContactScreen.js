import React, {Component} from 'react';
import {ScrollView, Alert} from 'react-native';
import {FormInput, FormLabel, FormValidationMessage, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import {insert} from '../www/database';
import styles from '../styles/styles';
import AddContactPicture from '../components/AddContactAvatar';
// TODO Either reduce the size of the image or convert it to blob from base64 and decode it everytime
export default class AddContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {image: '', firstname: '', lastname: '', number: '', email: '', notes: '', emptyFirstname: false, emptyNumber: false};
    this.firstnameInput = null;
    this.numberInput = null;
  }

addContactHandler = () => {
  const {firstname, lastname, number, email, notes, image} = _.cloneDeep(this.state);
  const {navigation} = this.props;
  if (firstname === '' || number === '') {
    if (firstname === '') {
      this.firstnameInput.shake();
      this.setState({emptyFirstname: true});
    } else {
      this.setState({emptyFirstname: false});
    }
    if (number === '') {
      this.numberInput.shake();
      this.setState({emptyNumber: true});
    } else {
      this.setState({emptyNumber: false});
    }
  } else {
    this.setState({emptyNumber: false, emptyFirstname: false});
    insert(firstname, lastname, number, email, notes, image);
    navigation.navigate('Contacts');
  }
}

addImage = () => {
  const options = {
    title: 'Select Avatar',
    quality: 0.5,
    maxWidth: 500,
    maxHeight: 500,
  };
  ImagePicker.showImagePicker(options, (response) => {
    if (response.error) {
      Alert.alert(`Error on image selection ${response.error}`);
    } else if (response.didCancel) {} else {
      const source = {uri: `data:image/jpeg;base64,${response.data}`};
      this.setState({image: source.uri});
    }
  });
}

render() {
  const {firstname, lastname, number, email, notes, emptyFirstname, emptyNumber, image} = this.state;
  return (
    <ScrollView style={styles.viewContainer}>
      <AddContactPicture
        image={image}
        onPress={this.addImage}
      />
      <FormLabel>
        {'Firstname'}
      </FormLabel>
      <FormInput
        ref={ref => this.firstnameInput = ref}
        onChangeText={firstname => this.setState({firstname})}
        value={firstname}
        placeholder="Enter firstname"
        placeholderTextColor="#636263"
        containerStyle={{borderBottomWidth: 0.5}}
        inputStyle={{color: '#000000'}}
      />
      <FormValidationMessage
        containerStyle={[!emptyFirstname && styles.invisible, emptyFirstname && styles.visible]}
      >
        {'This field is required'}
      </FormValidationMessage>
      <FormLabel>
        {'Lastname'}
      </FormLabel>
      <FormInput
        onChangeText={lastname => this.setState({lastname})}
        value={lastname}
        placeholder="Enter lastname (optional)"
        placeholderTextColor="#636263"
        containerStyle={{borderBottomWidth: 0.5}}
        inputStyle={{color: '#000000'}}
      />
      <FormLabel>
        {'Number'}
      </FormLabel>
      <FormInput
        ref={ref => this.numberInput = ref}
        onChangeText={number => this.setState({number})}
        value={number}
        keyboardType="phone-pad"
        placeholder="Enter number"
        placeholderTextColor="#636263"
        containerStyle={{borderBottomWidth: 0.5}}
        inputStyle={{color: '#000000'}}
      />
      <FormValidationMessage
        containerStyle={[!emptyNumber && styles.invisible, emptyNumber && styles.visible]}
      >
        {'This field is required'}
      </FormValidationMessage>
      <FormLabel>
        {'E-mail'}
      </FormLabel>
      <FormInput
        onChangeText={email => this.setState({email})}
        value={email}
        keyboardType="email-address"
        placeholder="Enter email (optional)"
        placeholderTextColor="#636263"
        containerStyle={{borderBottomWidth: 0.5}}
        inputStyle={{color: '#000000'}}
      />
      <FormLabel>
        {'Notes'}
      </FormLabel>
      <FormInput
        onChangeText={notes => this.setState({notes})}
        value={notes}
        placeholder="Enter notes (optional)"
        placeholderTextColor="#636263"
        multiline
        containerStyle={{height: 120, paddingTop: 0, paddingBottom: 0, borderBottomWidth: 0.5}}
        inputStyle={{height: 120, color: '#000000', textAlignVertical: 'top'}}
      />
      <Button
        onPress={() => this.addContactHandler({firstname, lastname, number, email, notes})}
        title="CONFIRM"
        buttonStyle={{
          backgroundColor: '#0bac25',
          marginTop: 40,
          marginBottom: 20,
        }}
        icon={{name: 'check'}}
      />
    </ScrollView>
  );
}
}
