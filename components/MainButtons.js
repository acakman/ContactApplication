import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

const MainButtons = ({longPressed, onCancelPress, onAddContactPress, onDeletePress}) => {
  if (longPressed === true) {
    return (
      <View
        style={{flex: 1, flexDirection: 'row'}}
      >
        <Icon
          name="cancel"
          onPress={onCancelPress}
        />
        <Icon
          name="delete-forever"
          onPress={onDeletePress}
        />
      </View>
    );
  }
  return (
    <Icon
      name="person-add"
      onPress={onAddContactPress}
    />
  );
};
export default MainButtons;
