import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export var styles = StyleSheet.create({

  cardContainer: {
    alignSelf: 'center',
    width: width*0.8,
    
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'slategray',
    shadowOpacity: 0.4,
  },
  cardImageContainer: {
    overflow: 'hidden', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
  },
  cardImage: {
    height: 100,
    width: null,
    resizeMode: 'center'
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    padding: 5,
    fontWeight: 'bold',
    padding: 10,
    fontSize: 22,
    color: 'black',
  },
  favoriteIcon: {
    paddingRight: 10,
  }
});