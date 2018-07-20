import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';

export default class AddContactPicture extends Component {
  constructor(props) {
    super(props);
    this.image = '';
  }

  render() {
    const {image, onPress} = this.props;
    if (image === '') {
      return (
        <Avatar
          xlarge
          rounded
          title="Add Image"
          containerStyle={{alignSelf: 'center', marginTop: 20}}
          titleStyle={{fontSize: 25}}
          onPress={onPress}
        />
      );
    }
    return (
      <Avatar
        xlarge
        rounded
        source={{uri: image}}
        containerStyle={{alignSelf: 'center', marginTop: 20}}
        onPress={onPress}
      />
    );
  }
}
