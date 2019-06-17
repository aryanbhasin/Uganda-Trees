import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {connect} from 'react-redux';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {TagMapViewStyles as styles} from '../styles'

const LAT_DEFAULT = 37.78825; // for testing on simulator
const LON_DEFAULT = -122.4324;
const LAT_DELTA = 0.0522;
const LON_DELTA = 0.0522; // to render a square MapView

class TagMapView extends Component {
  
  render() {
    
    var {latitude, longitude, species} = this.props;
    
    let region = {
      latitude: LAT_DEFAULT,
      longitude: LON_DEFAULT,
      latitudeDelta: LAT_DELTA,
      longitudeDelta: LON_DELTA,
    }
    
    
    return (
      <MapView initialRegion={region} style={styles.map} >
        <Marker coordinate={{latitude: LAT_DEFAULT, longitude: LON_DEFAULT}}>
          <View>
            <FAIcon name="tree" color='green' size={22} />
          </View>
          <Callout style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 100}}>
            <View > 
              <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>{(species !== '') ? species + ' Tree' : 'Choose Species'}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latitude: state.tagInfo.coords.latitude,
    longitude: state.tagInfo.coords.longitude,
    species: state.tagInfo.species
  }
}

export default connect(mapStateToProps, null)(TagMapView)