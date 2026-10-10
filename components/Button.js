import React from 'react';
import {Pressable, Text} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import styles from '../styles/styles';

const Button = ({title, icon, onPress, backgroundColor, style}) => (
  <Pressable
    onPress={onPress}
    android_ripple={{color: 'rgba(255,255,255,0.3)'}}
    style={[styles.button, {backgroundColor}, style]}
    accessibilityRole="button"
  >
    {icon ? <MaterialIcons name={icon} size={20} color="#fff" style={styles.buttonIcon} /> : null}
    <Text style={styles.buttonTitle}>{title}</Text>
  </Pressable>
);

export default Button;
