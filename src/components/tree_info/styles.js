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
    paddingBottom: 4
  },
  bodyContainer: {
    marginVertical: 15,
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: 'OpenSans'
  },
  bodyHeader: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 17
  },
  rowContainerStyle: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    paddingVertical: 10
  },
  partHeader: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 3
  },
  partInfo: {
    fontWeight: '300',
    fontSize: 17,
    textAlign: 'justify',
  },
});
