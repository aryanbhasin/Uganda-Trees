import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../../styles';
import MapView, {Marker, Callout, CalloutSubview} from 'react-native-maps';
import {connect} from 'react-redux';
import {firebaseApp} from 'UgandaTrees/App';
import Image from 'react-native-scalable-image';
import Spinner from 'UgandaTrees/src/components/spinner'
import {getDistance} from 'geolib'
import getDirections from 'react-native-google-maps-directions';
import {Button} from 'react-native-elements';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

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
      snap.forEach((child) => {
        markers.push(child.val()); 
       });
      this.setState({markers: markers, markersLoading: false});
    });
  }
  
  findNearestTree() {
    // finding nearest tree
    var closest;
    var closestDist = Infinity;
    let {currPos} = this.props;
    this.state.markers.map((marker) => {
      const dist = getDistance(currPos, marker.coords);
      if (dist < closestDist) {
        closestDist = dist;
        closest = marker;
      }
    });
    this.setState({closestTreeKey: closest.key})
  }
  
  getTreeRef = (ref) => {
    this.closestTreeRef = ref;
    if (this.closestTreeRef) {
      this.closestTreeRef.showCallout();
    }
  }
  
  renderMarker(marker) {
    return (
      <Marker coordinate={marker.coords} key={marker.key} ref={(marker.key === this.state.closestTreeKey) ? this.getTreeRef : null }>
        <View>
          <FA5Icon name="tree" color="darkgreen" size={20}/>
        </View>
        <Callout style={styles.calloutContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image width={50} source={{uri: marker.imageUri}}/>
            <CalloutSubview onPress={() => getTreeDirections(this.props.currPos, marker.coords)} style={{marginTop: 5}}>
              <Text style={styles.calloutButton}>Get Directions</Text>
            </CalloutSubview>
          </View>
        </Callout>
      </Marker>
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
        </View>
        <View style={styles.findNearestTreeContainer}>
          <Button 
            containerStyle={styles.findNearestTreeButton} 
            title="Find nearest tree" raised type="outline" 
            onPress={ () => (this.state.closestTreeKey !== null ? this.closestTreeRef.showCallout() : this.findNearestTree()) }/>
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