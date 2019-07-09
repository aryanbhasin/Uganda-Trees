import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export var styles = StyleSheet.create({

  cardContainer: {
    alignSelf: 'center',
    width: width*0.87,
    
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
    elevation: 6
  },
  cardImageContainer: {
    overflow: 'hidden', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
  },
  cardImage: {
    height: 100,
    width: null,
    resizeMode: 'cover'
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'slategray',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  favoriteIcon: {
    padding: 4,
  }
});