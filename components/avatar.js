import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';

export const listPicture = (image, firstname, lastname) => {
  if (image === '') {
    return (
      <Avatar
        small
        rounded
        title={firstname.charAt(0) + lastname.charAt(0)}
      />);
  }
  return (
    <Avatar
      small
      rounded
      source={{uri: image}}
    />
  );
};

export class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.image = '';
    this.firstname = '';
    this.lastname = '';
    this.edit = null;
  }

  render() {
    const {image, edit, firstname, lastname, onPress} = this.props;
    if (image === '') {
      if (edit) {
        return (
          <Avatar
            xlarge
            rounded
            title="Edit Image"
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
          title={firstname.charAt(0) + lastname.charAt(0)}
          containerStyle={{alignSelf: 'center', marginTop: 20}}
        />);
    }
    if (edit) {
      return (
        <Avatar
          xlarge
          rounded
          source={{uri: image}}
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
      />
    );
  }
}
