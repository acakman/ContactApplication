import React from 'react';
import {Avatar} from './avatar';
import styles from '../styles/styles';

const AddContactPicture = ({image, onPress}) => (
  <Avatar size="xlarge" image={image} title="Add Image" onPress={onPress} style={styles.profileAvatar} />
);

export default AddContactPicture;
