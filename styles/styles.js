import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  notesContainer: {
    width: 200,
    borderWidth: 1,
  },
  searchBar: {
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#e1e8ee',
    color: '#000',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbb',
    backgroundColor: '#fff',
  },
  listRowAvatar: {
    marginRight: 12,
  },
  listRowTitle: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  swipeDelete: {
    width: 110,
    marginHorizontal: 0,
    borderRadius: 0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#9f0f0f',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bdbdbd',
  },
  avatarTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  avatarTitleLarge: {
    fontSize: 25,
  },
  profileAvatar: {
    alignSelf: 'center',
    marginTop: 20,
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  formField: {
    marginHorizontal: 20,
  },
  formLabel: {
    marginTop: 15,
    color: '#86939e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formInput: {
    color: '#000',
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#86939e',
  },
  formInputMultiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  formError: {
    color: '#ff190c',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 2,
  },
  formButton: {
    marginTop: 40,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
  },
});
export default styles;
