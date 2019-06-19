import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../../styles';
import MapView, {Marker, Callout, CalloutSubview} from 'react-native-maps';
import {connect} from 'react-redux';
import {getLocation} from 'UgandaTrees/src/actions';
import {firebaseApp} from 'UgandaTrees/App';
import Image from 'react-native-scalable-image';
import Spinner from 'UgandaTrees/src/components/spinner'
import {getDistance} from 'geolib'
import getDirections from 'react-native-google-maps-directions';
import {Button} from 'react-native-elements';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const LAT_DELTA = 0.0522;
const LON_DELTA = 0.0522; // to render a square MapView

class TagMap extends Component {
  
  constructor(props) {
    super(props);
    this.props.getLocation();
    
    this.state = {
      markers: [],
      markersLoading: true,
      closestTreeKey: null,
    }
    const {treeName, currPos} = this.props;
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
  
  getTreeDirections(destination) {
    const data = {
      source: this.props.currPos,
      destination: destination,
      params: [
        {key: "travelmode", value: "walking"}
      ]
    }
    getDirections(data);
  }
  
  renderMarker(marker) {

    return (
      <Marker coordinate={marker.coords} key={marker.key} ref={(marker.key === this.state.closestTreeKey) ? this.getTreeRef : null }>
        <View>
          <FA5Icon name="tree" color="darkgreen" size={20}/>
        </View>
        <Callout style={{width: 110, height: null}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image width={50} source={{uri: marker.imageUri}}/>
            <CalloutSubview onPress={() => this.getTreeDirections(marker.coords)} style={{marginTop: 5}}>
              <Text style={{borderRadius: 10, borderWidth: 1, color: 'cornflowerblue', borderColor: 'cornflowerblue', padding: 5}}>Get Directions</Text>
            </CalloutSubview>
          </View>
        </Callout>
      </Marker>
    );
  } 
  
  render() {
    
    const {currPos} = this.props;
    
    let region = {
      latitude: currPos.latitude,
      longitude: currPos.longitude,
      latitudeDelta: LAT_DELTA,
      longitudeDelta: LON_DELTA,
    }
    
    if (this.state.markersLoading) {
      return (<Spinner />);
    }
    
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <MapView region={region} style={{...StyleSheet.absoluteFill}} showsUserLocation={true}>
            {this.state.markers.map(marker => this.renderMarker(marker))}
          </MapView>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Button 
            containerStyle={{width: 200, margin: 5}} 
            title="Find nearest tree" raised type="outline" 
            onPress={ () => (this.state.closestTreeKey !== null ? this.closestTreeRef.showCallout() : this.findNearestTree()) }/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currPos: state.newTagInfo.coords
  }
}

const mapDispatchToProps = {
  getLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(TagMap);