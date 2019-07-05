import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {styles} from '../../styles';
import MapView, {Marker, Callout, CalloutSubview} from 'react-native-maps';
import {connect} from 'react-redux';
import {firebaseApp} from 'UgandaTrees/App';
import Spinner from 'UgandaTrees/src/components/spinner'
import {getDistance} from 'geolib'
import getDirections from 'react-native-google-maps-directions';
import {Button} from 'react-native-elements';

import TagMarker from './tag-marker'

const LAT_DELTA = 0.0222;
const LON_DELTA = 0.0222; // to render a square MapView

class TagMap extends Component {
  
  componentWillUnmount() {
    navigator.geolocation.stopObserving();
  }
  
  constructor(props) {
    super(props);
    const {treeName, currPos} = this.props;
    this.mapRef = null;
    this.state = {
      markers: [],
      markersLoading: true,
      closestTreeKey: null,
      closestTreeCoords: null,
      region: {
        latitude: currPos.latitude,
        longitude: currPos.longitude,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LON_DELTA,
      }
    }
    
    this.fetchTags(treeName, currPos);
    
  }
  
  fetchTags(treeName, currPos) {
    var tagListRef = firebaseApp.database().ref('tags/' + treeName.toLowerCase());
    tagListRef.once('value').then((snap) => {
      var markers = [];
      var closest;
      var closestDist = Infinity;
      snap.forEach((child) => {
        let currMarker = child.val();
        // find nearest tree
        const dist = getDistance(currPos, currMarker.coords);
        if (dist < closestDist) {
          closestDist = dist;
          closest = currMarker;
        }
        markers.push(currMarker); 
       });
      this.setState({markers: markers, markersLoading: false, closestTreeKey: closest.key, closestTreeCoords: closest.coords});
    });
  }
  
  getTreeRef = (ref) => {
    this.closestTreeRef = ref;
  }
  
  renderMarker(marker)  {
    return (
      <TagMarker marker={marker} currPos={this.props.currPos} key={marker.key} closestTreeKey={this.state.closestTreeKey} getTreeRef={this.getTreeRef} />
    );
  }
  
  render() {
    
    if (this.state.markersLoading) {
      return (<Spinner />);
    }
    
    if (!this.state.markersLoading && (this.state.markers.length < 1)) {
      return (
        <View style={styles.noTagsContainer}>
          <Text style={styles.noTagsText}>Be the first one to tag this tree!</Text>
        </View>
      );
    }
    
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <MapView 
            region={this.state.region} 
            onRegionChangeComplete={(region) => this.setState({region})} 
            style={{...StyleSheet.absoluteFill}} 
            showsUserLocation={true}
            ref={(ref) => { this.mapRef = ref }}>
            {this.state.markers.map(marker => this.renderMarker(marker))}
          </MapView>
          <Button type='clear' raised title="Find nearest tree" containerStyle={styles.findNearestTreeButton}
            onPress={() => this.closestTreeRef.showCallout()}/>
        </View>
      </View>
    );
  }
}

export function getTreeDirections(currPos, destination) {
  const data = {
    source: currPos,
    destination: destination,
    params: [
      {key: "travelmode", value: "walking"}
    ]
  }
  getDirections(data);
}

const mapStateToProps = (state) => {
  return {
    currPos: state.newTagInfo.coords
  }
}

export default connect(mapStateToProps)(TagMap);