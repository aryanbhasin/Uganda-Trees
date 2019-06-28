import {Text, View, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill
  },
  calloutMarkerName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 5
  },
  calloutView: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  calloutImageView: {
    flex: 0.9, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  calloutInfoView: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  calloutButtonText: {
    borderRadius: 10, 
    borderWidth: 1, 
    fontWeight: '400',
    color: 'cornflowerblue', 
    borderColor: 'cornflowerblue', 
    padding: 5, 
    textAlign: 'center'
  }
});