import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {connect} from 'react-redux';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {TagMapViewStyles as styles} from '../styles'

const LAT_DELTA = 0.0322;
const LON_DELTA = 0.0322; // to render a square MapView

class TagMapView extends Component {
  
  componentDidMount() {
    this.props.getLocation
  }
  
  render() {
    
    var {latitude, longitude, species} = this.props;

    return (
      <MapView region={{
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LON_DELTA,
      }} style={styles.map} >
        <Marker coordinate={{latitude: latitude, longitude: longitude}}>
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
    latitude: state.newTagInfo.coords.latitude,
    longitude: state.newTagInfo.coords.longitude,
    species: state.newTagInfo.species
  }
}

export default connect(mapStateToProps, null)(TagMapView)