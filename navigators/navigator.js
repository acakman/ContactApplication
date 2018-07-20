import React from 'react';
import { createStackNavigator} from 'react-navigation';
// Screens
import ContactsScreen from '../screens/mainScreen';
import ProfileScreen from '../screens/profileScreen';
import AddContactScreen from '../screens/addContactScreen';
// Stores
// eslint-disable-next-line
import * as store from '../store'

const RootNavigator = createStackNavigator({
  Contacts: {
    screen: ContactsScreen,
    navigationOptions: () => ({
      title: 'Contacts',
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
    }),
  },
  AddContact: {
    screen: AddContactScreen,
    navigationOptions: () => ({
      title: 'Add New Contact',
    }),
  },
  initialRouteName: 'Contacts',
});

const Nav = () => (
  <RootNavigator />
);

export default Nav;
