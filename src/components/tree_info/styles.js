import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'UgandaTrees/src/styles/globalStyles';

export var styles = StyleSheet.create({
  frontalImage: {
    height: SCREEN_WIDTH * 0.6,
    width: null,
  },
  frontalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    alignItems: 'flex-start',
  },
  frontalName: {
    color: 'white',
    fontSize: 44,
    fontWeight: '700',
  },
  bodyContainer: {
    marginVertical: 15
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: 16,
  },

  rowContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  rowText: {
    fontWeight: '500',
    fontSize: 17,
    paddingVertical: 8,
  }
});
