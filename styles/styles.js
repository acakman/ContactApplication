import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: '#fff',
  },
  notesContainer: {
    width: 200,
    borderWidth: 1,
  },
  invisible: {
    opacity: 0,
    height: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
  },
});
export default styles;
