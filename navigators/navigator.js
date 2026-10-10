import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// Screens
import ContactsScreen from '../screens/mainScreen';
import ProfileScreen from '../screens/profileScreen';
import AddContactScreen from '../screens/addContactScreen';
import styles from '../styles/styles';

const Stack = createNativeStackNavigator();

const Nav = () => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contacts">
          <Stack.Screen name="Contacts" component={ContactsScreen} options={{title: 'Contacts'}} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}} />
          <Stack.Screen name="AddContact" component={AddContactScreen} options={{title: 'Add New Contact'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default Nav;
