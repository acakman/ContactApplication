import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../styles/styles';

const ListRowItem = ({title, avatar, leftIcon, onPress, onLongPress}) => (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    android_ripple={{color: '#ddd'}}
    style={styles.listRow}
  >
    {leftIcon}
    <View style={styles.listRowAvatar}>{avatar}</View>
    <Text style={styles.listRowTitle} numberOfLines={1}>{title}</Text>
  </Pressable>
);

export default ListRowItem;
