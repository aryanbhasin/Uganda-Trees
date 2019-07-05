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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  frontalName: {
    color: 'white',
    fontSize: 44,
    fontWeight: '700',
    lineHeight: 44,
    // borderWidth: 2
  },
  frontalSciName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 5,
    // borderWidth: 2,
    // borderColor: 'orange'
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
  calloutContainer: {
    width: 110, 
    height: null,
  },
  calloutButton: {
    borderRadius: 10, 
    borderWidth: 1, 
    color: 'cornflowerblue', 
    borderColor: 'cornflowerblue', 
    padding: 5,
  },
  findNearestTreeButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 7,
    borderRadius: 13,
    paddingHorizontal: 3,
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'slategray',
    shadowOpacity: 0.4,
    elevation: 5
    
  },
  noTagsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTagsText: {
    color: 'darkgrey',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
