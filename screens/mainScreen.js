import React, {Component} from 'react';
import {FlatList, ActivityIndicator, RefreshControl, View, Text} from 'react-native';
import {SearchBar, Button, CheckBox} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import MainButtons from '../components/MainButtons';
import {listPicture} from '../components/avatar';
import styles from '../styles/styles';
import {getArray, remove, deleteTable} from '../www/database';
import ListRowItem from '../components/ListRowItem';
// TODO add multiselect option
export default class ContactsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <MainButtons
        longPressed={navigation.getParam('longPressed')}
        onDeletePress={navigation.getParam('multiDeleteHandler')}
        onCancelPress={navigation.getParam('cancelHandler')}
        onAddContactPress={() => navigation.navigate('AddContact')}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {Contacts: [], refreshing: false, isSwiping: false, currentlySwiped: false, searchText: '', longPressed: false, checked: []};
  }

  componentWillMount() {
    const {navigation} = this.props;
    const {multiDeleteHandler, cancelHandler} = this;
    navigation.setParams({longPressed: false, multiDeleteHandler, cancelHandler});
    // eslint-disable-next-line
    const Listener = navigation.addListener('willFocus', this.refreshHandler);
  }

  contactSelectHandler = (Contact) => {
    this.swipeReset();
    const {navigation} = this.props;
    navigation.navigate('Profile', {Contact});
  }

  cancelHandler = () => {
    const {navigation} = this.props;
    this.setState({longPressed: false});
    navigation.setParams({longPressed: false});
  }

  swipeReset = () => {
    const {currentlySwiped} = this.state;
    if (currentlySwiped) {
      currentlySwiped.recenter();
    }
    this.setState({currentlySwiped: null});
  }

  refreshHandler = () => {
    this.swipeReset();
    this.cancelHandler();
    this.setState({refreshing: true});
    getArray().then((Contacts) => {
      this.setState({Contacts, refreshing: false});
      const {checked} = this.state;
      for (let i = 0; i < Contacts.length; i++) {
        checked.push(false);
      }
    }).catch((error) => {
    });
  }

  deleteHandler = (id) => {
    this.swipeReset();
    remove(id);
    this.refreshHandler();
  }

  multiDeleteHandler = () => {
    const {checked} = this.state;
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        remove(i);
        checked[i] = false;
      }
    }
    this.refreshHandler();
  }

  render() {
    const {navigation} = this.props;
    const {Contacts, refreshing, isSwiping, currentlySwiped, searchText, longPressed, checked} = this.state;
    if (Contacts.length === 0) {
      return (
        <View style={styles.viewContainer}>
          <ActivityIndicator size="large" color="gray" />
          <Text>
            {'Database is loading or no contact exists in the database'}
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        scrollEnabled={!isSwiping}
        style={styles.viewContainer}
        data={Contacts.filter(item => (
          `${item.firstname} ${item.lastname}`.toLowerCase().includes(searchText.toLowerCase())
        ))}
        onScroll={() => this.swipeReset()}
        ListHeaderComponent={(
          <SearchBar
            onFocus={() => this.swipeReset()}
            lightTheme
            containerStyle={styles.viewContainer}
            placeholder="Search..."
            onChangeText={searchText => this.setState({searchText})}
          />
)}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              this.refreshHandler();
            }}
          />
)}
        renderItem={({item}) => (
          <Swipeable
            onRef={ref => this.swipe = ref}
            onSwipeStart={() => this.setState({isSwiping: true})}
            onSwipeRelease={() => this.setState({isSwiping: false})}
            onRightActionRelease={() => this.setState({currentlySwiped: true})}
            onRightButtonsOpenRelease={(event, gestureState, swipe) => {
              if (currentlySwiped && currentlySwiped !== swipe) {
                currentlySwiped.recenter();
              }
              this.setState({currentlySwiped: swipe});
            }}
            onRightButtonsCloseRelease={() => this.setState({ currentlySwiped: null})}
            rightButtons={[
              <Button
                leftIcon={{name: 'delete-forever'}}
                title="DELETE"
                backgroundColor="#9f0f0f"
                textStyle={{flex: 1, textAlign: 'left' }}
                onPress={() => {
                  this.deleteHandler(item.id);
                }}
              />,
            ]}
            rightButtonWidth={110}
          >
            <ListRowItem
              title={`${item.firstname} ${item.lastname}`}
              onPress={!longPressed ? (() => {
                this.contactSelectHandler(item);
              }) : (() => {
                checked[item.id] = !checked[item.id];
                this.forceUpdate();
              })}
              onLongPress={() => {
                this.setState({longPressed: true});
                navigation.setParams({longPressed: true});
              }}
              leftIcon={longPressed ? (
                <CheckBox
                  checked={checked[item.id]}
                  onPress={() => {
                    checked[item.id] = !checked[item.id];
                    this.forceUpdate();
                  }}
                />
              ) : {}}
              avatar={listPicture(item.image, item.firstname, item.lastname)}
            />
          </Swipeable>
        )
          }
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
