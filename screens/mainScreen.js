import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, TextInput, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import MainButtons from '../components/MainButtons';
import Button from '../components/Button';
import {listPicture} from '../components/avatar';
import styles from '../styles/styles';
import {getArray, remove} from '../www/database';
import ListRowItem from '../components/ListRowItem';

const ContactsScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [Contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [longPressed, setLongPressed] = useState(false);
  const [checked, setChecked] = useState(() => new Set());
  const currentlySwiped = useRef(null);
  const swipeables = useRef(new Map());

  const swipeReset = useCallback(() => {
    if (currentlySwiped.current) {
      currentlySwiped.current.close();
    }
    currentlySwiped.current = null;
  }, []);

  const cancelHandler = useCallback(() => {
    setLongPressed(false);
    setChecked(new Set());
  }, []);

  const refreshHandler = useCallback(async () => {
    swipeReset();
    cancelHandler();
    setRefreshing(true);
    try {
      setContacts(await getArray());
    } catch (error) {
      console.log(`GetArray error => ${error}`);
    }
    setLoaded(true);
    setRefreshing(false);
  }, [swipeReset, cancelHandler]);

  useFocusEffect(useCallback(() => {
    refreshHandler();
  }, [refreshHandler]));

  const multiDeleteHandler = useCallback(async () => {
    await Promise.all([...checked].map(id => remove(id)));
    refreshHandler();
  }, [checked, refreshHandler]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MainButtons
          longPressed={longPressed}
          onDeletePress={multiDeleteHandler}
          onCancelPress={cancelHandler}
          onAddContactPress={() => navigation.navigate('AddContact')}
        />
      ),
    });
  }, [navigation, longPressed, multiDeleteHandler, cancelHandler]);

  const contactSelectHandler = (Contact) => {
    swipeReset();
    navigation.navigate('Profile', {Contact});
  };

  const deleteHandler = async (id) => {
    swipeReset();
    await remove(id);
    refreshHandler();
  };

  const toggleChecked = (id) => {
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (Contacts.length === 0) {
    return (
      <View style={[styles.viewContainer, styles.centered]}>
        {loaded ? null : <ActivityIndicator size="large" color="gray" />}
        <Text>
          {loaded ? 'No contacts yet. Tap the add button to create one.' : 'Database is loading...'}
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.viewContainer}
      contentContainerStyle={{paddingBottom: insets.bottom}}
      data={Contacts.filter(item => (
        `${item.firstname} ${item.lastname}`.toLowerCase().includes(searchText.toLowerCase())
      ))}
      onScrollBeginDrag={swipeReset}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={(
        <TextInput
          onFocus={swipeReset}
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#86939e"
          value={searchText}
          onChangeText={setSearchText}
        />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
      renderItem={({item}) => (
        <Swipeable
          enabled={!longPressed}
          rightThreshold={40}
          ref={(ref) => {
            if (ref) {
              swipeables.current.set(item.id, ref);
            } else {
              swipeables.current.delete(item.id);
            }
          }}
          onSwipeableOpen={() => {
            const swiped = swipeables.current.get(item.id);
            if (currentlySwiped.current && currentlySwiped.current !== swiped) {
              currentlySwiped.current.close();
            }
            currentlySwiped.current = swiped;
          }}
          renderRightActions={() => (
            <Button
              icon="delete-forever"
              title="DELETE"
              backgroundColor="#9f0f0f"
              style={styles.swipeDelete}
              onPress={() => deleteHandler(item.id)}
            />
          )}
        >
          <ListRowItem
            title={`${item.firstname} ${item.lastname}`}
            onPress={longPressed ? () => toggleChecked(item.id) : () => contactSelectHandler(item)}
            onLongPress={() => {
              swipeReset();
              setLongPressed(true);
            }}
            leftIcon={longPressed ? (
              <MaterialIcons
                name={checked.has(item.id) ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#0bac25"
                style={styles.checkbox}
                onPress={() => toggleChecked(item.id)}
              />
            ) : null}
            avatar={listPicture(item.image, item.firstname, item.lastname)}
          />
        </Swipeable>
      )}
      keyExtractor={item => String(item.id)}
    />
  );
};

export default ContactsScreen;
