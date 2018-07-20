import React, {Component} from 'react';
import {ScrollView, Alert} from 'react-native';
import {Icon, Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {update, remove} from '../www/database';
import styles from '../styles/styles';
import {ProfilePicture} from '../components/avatar';

export default class ProfileScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <Icon
        name={navigation.getParam('title')}
        onPress={navigation.getParam('editHandler')}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {firstname: '', lastname: '', number: null, email: '', notes: '', edit: false, emptyFirstname: false, emptyNumber: false, image: ''};
    this.firstnameInput = null;
    this.numberInput = null;
  }

  componentWillMount() {
    const {navigation} = this.props;
    navigation.setParams({ title: 'create', editHandler: this.editHandler});
    const {Contact} = navigation.state.params;
    this.setState({firstname: Contact.firstname, lastname: Contact.lastname, number: Contact.number, email: Contact.email, notes: Contact.notes});
    this.setState({image: Contact.image});
  }

  editHandler = () => {
    const {navigation} = this.props;
    const {edit, firstname, lastname, number, email, notes, image} = this.state;
    const {id} = navigation.state.params.Contact;
    /* eslint-disable */
    if (edit !== true) {
      this.setState({edit: true});
      navigation.setParams({title: 'check'});
    }
    else {
      if (firstname === '' || number === '') {
        if (firstname === '') {
          this.firstnameInput.shake();
          this.setState({emptyFirstname: true});
        } else {
          this.setState({emptyFirstname: false});
        }
        if(number === '') {
          this.numberInput.shake();
          this.setState({emptyNumber: true});
        } else {
          this.setState({emptyNumber: false});
        }
      } else {
        this.setState({emptyNumber: false, emptyFirstname: false});
        console.log(image);
        update(firstname, lastname, number, email, id, notes, image);
        navigation.goBack();
      }
    }
    /* eslint-enable */
  }

  deleteHandler = ({id}) => {
    const {navigation} = this.props;
    remove(id);
    navigation.goBack();
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
    const {navigation} = this.props;
    const {firstname, lastname, number, email, edit, notes, emptyNumber, emptyFirstname, image} = this.state;
    const {id} = navigation.state.params.Contact;
    return (
      <ScrollView
        style={styles.viewContainer}
      >
        <ProfilePicture
          image={image}
          firstname={firstname}
          lastname={lastname}
          edit={edit}
          onPress={this.addImage}
        />
        <FormLabel>
          {'Firstname'}
        </FormLabel>
        <FormInput
          ref={ref => this.firstnameInput = ref}
          defaultValue={firstname}
          value={firstname}
          onChangeText={firstname => this.setState({firstname})}
          editable={edit}
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
          defaultValue={lastname}
          value={lastname}
          onChangeText={lastname => this.setState({lastname})}
          editable={edit}
          containerStyle={{borderBottomWidth: 0.5}}
          inputStyle={{color: '#000000'}}
        />
        <FormLabel>
          {'Number'}
        </FormLabel>
        <FormInput
          ref={ref => this.numberInput = ref}
          defaultValue={number}
          value={number}
          onChangeText={number => this.setState({number})}
          editable={edit}
          keyboardType="phone-pad"
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
          defaultValue={email}
          value={email}
          onChangeText={email => this.setState({email})}
          editable={edit}
          keyboardType="email-address"
          containerStyle={{borderBottomWidth: 0.5}}
          inputStyle={{color: '#000000'}}
        />
        <FormLabel>
          {'Notes'}
        </FormLabel>
        <FormInput
          defaultValue={notes}
          value={notes}
          onChangeText={notes => this.setState({notes})}
          editable={edit}
          multiline
          containerStyle={{borderBottomWidth: 0.5, paddingTop: 0, paddingBottom: 0}}
          inputStyle={{color: '#000000'}}
        />
        <Button
          onPress={() => this.deleteHandler({id})}
          title="DELETE CONTACT"
          icon={{name: 'delete-forever'}}
          disabled={!edit}
          disabledStyle={{opacity: 0, height: 0, width: 0}}
          disabledTitleStyle={{opacity: 0}}
          buttonStyle={{
            backgroundColor: '#ff0000',
            bottom: 20,
            marginTop: 40,
          }}
        />
      </ScrollView>

    );
  }
}
