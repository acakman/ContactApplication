import React from 'react';
import {Pressable} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import styles from '../styles/styles';

const IconButton = ({name, onPress, color = '#000', size = 26, accessibilityLabel}) => (
  <Pressable
    onPress={onPress}
    hitSlop={8}
    style={styles.iconButton}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel || name}
  >
    <MaterialIcons name={name} size={size} color={color} />
  </Pressable>
);

export default IconButton;
