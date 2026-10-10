import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from '../styles/styles';

const SIZES = {small: 34, xlarge: 150};

export const Avatar = ({image, title, size = 'small', onPress, style}) => {
  const dimension = SIZES[size];
  const circle = {width: dimension, height: dimension, borderRadius: dimension / 2};
  const content = image ? (
    <Image source={{uri: image}} style={circle} />
  ) : (
    <View style={[styles.avatarPlaceholder, circle]}>
      <Text style={[styles.avatarTitle, size === 'xlarge' && styles.avatarTitleLarge]}>
        {title}
      </Text>
    </View>
  );
  if (!onPress) {
    return <View style={style}>{content}</View>;
  }
  return (
    <Pressable style={style} onPress={onPress} accessibilityRole="imagebutton">
      {content}
    </Pressable>
  );
};

const initials = (firstname, lastname) => (firstname || '').charAt(0) + (lastname || '').charAt(0);

export const listPicture = (image, firstname, lastname) => (
  <Avatar image={image} title={initials(firstname, lastname)} />
);

export const ProfilePicture = ({image, edit, firstname, lastname, onPress}) => (
  <Avatar
    size="xlarge"
    image={image}
    title={edit ? 'Edit Image' : initials(firstname, lastname)}
    onPress={edit ? onPress : undefined}
    style={styles.profileAvatar}
  />
);
