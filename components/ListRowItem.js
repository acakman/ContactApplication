import React from 'react';
import {ListItem} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native';

const ListRowItem = ({title, avatar, leftIcon, onPress, onLongPress}) => (
  <ListItem
    title={title}
    avatar={avatar}
    component={TouchableNativeFeedback}
    leftIcon={leftIcon}
    onPress={onPress}
    onLongPress={onLongPress}
    wrapperStyle={{height: 50, borderBottomWidth: 0.5}}
  />
);

export default ListRowItem;
