import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {styles} from '../../styles';
import MapView, {Marker, Callout} from 'react-native-maps';
import {connect} from 'react-redux';
import {getLocation} from 'UgandaTrees/src/actions';
import {firebaseApp} from 'UgandaTrees/App';
import Image from 'react-native-scalable-image';
import Spinner from 'UgandaTrees/src/components/spinner'

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const LAT_DELTA = 0.0522;
const LON_DELTA = 0.0522; // to render a square MapView

class TagMap extends Component {
  
  componentDidMount() {
    this.props.getLocation();
    
    const {treeName, currPos} = this.props;
    this.fetchTags(treeName, currPos);
  }
  
  state = {
    markers: [],
    markersLoading: true,
  }
  
  fetchTags(treeName, currPos) {
    
    var tagListRef = firebaseApp.database().ref('tags/' + treeName.toLowerCase());
    
    tagListRef.once('value', (snap) => {
      var markers = [];
      snap.forEach((tag) => {
        markers.push(tag.val()) 
       });
     this.setState({markers: markers, markersLoading: false});
    });
  }
  
  getRandomTree(randNum) {
    switch (randNum) {     // random conditional rendering of 3 diff tree icons
      case 1:
        return (<MCIcon name="pine-tree" color="darkgreen" size={22}/>);
      case 2:
        return (<MCIcon name="tree" color="darkgreen" size={22}/>);
      case 3:
        return (<FA5Icon name="tree" color="darkgreen" size={20}/>);
    }
  }
  
  renderMarker(marker) {
    // returns a marker with a callout of the tag image
    
    var randNum = Math.floor(Math.random() * 3) + 1 ;
    
    return (
      <Marker coordinate={marker.coords} key={marker.key}>
        <View>
          {this.getRandomTree(randNum)}
        </View>
        <Callout style={{width: null, height: null}}>
          <Image width={50} source={{uri: marker.imageUri}}/>
        </Callout>
      </Marker>
    );
    // uses marker.coords and marker.tagImageUri
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
      <MapView region={region} style={{...StyleSheet.absoluteFill}}>
        {this.state.markers.map(marker => this.renderMarker(marker))}
      </MapView>
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