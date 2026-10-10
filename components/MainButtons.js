import React from 'react';
import {View} from 'react-native';
import IconButton from './IconButton';
import styles from '../styles/styles';

const MainButtons = ({longPressed, onCancelPress, onAddContactPress, onDeletePress}) => {
  if (longPressed === true) {
    return (
      <View style={styles.row}>
        <IconButton name="cancel" onPress={onCancelPress} accessibilityLabel="Cancel selection" />
        <IconButton name="delete-forever" onPress={onDeletePress} accessibilityLabel="Delete selected contacts" />
      </View>
    );
  }
  return <IconButton name="person-add" onPress={onAddContactPress} accessibilityLabel="Add contact" />;
};
export default MainButtons;
