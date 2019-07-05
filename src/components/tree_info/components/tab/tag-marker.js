import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native'
import {Marker, Callout, CalloutSubview} from 'react-native-maps'
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../../styles';
import {getTreeDirections} from './tagmap';
import FastImage from 'react-native-fast-image'

export default class TagMarker extends Component {
  
  returnCalloutSubview = () => {
    // CalloutSubview only on iOS
    if (Platform.OS === 'ios') {
      return(
        <CalloutSubview onPress={() => getTreeDirections(this.props.currPos, this.props.marker.coords)} style={{marginTop: 5}}>
          <Text style={styles.calloutButton}>Get Directions</Text>
        </CalloutSubview>
      );
    }
    // else, Android
    return(
      <TouchableOpacity onPress={() => getTreeDirections(this.props.currPos, this.props.marker.coords)} style={{marginTop: 5}}>
        <Text style={styles.calloutButton}>Get Directions</Text>
      </TouchableOpacity>
    );
  }
  
  render() {
    
    let {marker, currPos, closestTreeKey, getTreeRef} = this.props;
    
    return (
      <Marker coordinate={marker.coords} key={marker.key} ref={((marker.key === closestTreeKey) ? getTreeRef : null)}>
        <View>
          <FA5Icon name="tree" color="darkgreen" size={20}/>
        </View>
        <Callout style={styles.calloutContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>  
              <FastImage resizeMode={FastImage.resizeMode.contain}
                onLoadEnd={() => this.setState({imageLoading: false})} 
                style={{borderRadius: 4, flex: 1, width: 70, height: 100}}
                source={{uri: marker.imageUri}}/>
            {this.returnCalloutSubview()}
          </View>
        </Callout>
      </Marker>
    );
  }
}