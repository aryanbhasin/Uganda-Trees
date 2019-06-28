import React, {Component} from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import MapView from 'react-native-maps'
import {connect} from 'react-redux'
import {setMapRegion, changeMapRegion} from 'UgandaTrees/src/actions'
import {firebaseApp} from 'UgandaTrees/App';
import {getDistance} from 'geolib';
import Spinner from 'UgandaTrees/src/components/spinner'
import {styles} from '../styles'
import TreeMarker from './TreeMarker'


class MapDisplay extends Component {
  
  componentDidMount() {
    this.props.setMapRegion();
  }
  
  state = {
    markers: [],
    markersLoading: false,
  }
  
  tagWithinVicinity(origin, tagCoords) {
    latDiff = Math.abs(origin.latitude - tagCoords.latitude);
    lonDiff = Math.abs(origin.longitude - tagCoords.longitude);
    return ((latDiff < this.props.region.latitudeDelta) && (lonDiff < this.props.region.longitudeDelta))
  }
  
  getNearbyMarkers(originCoords) {
    this.setState({markersLoading: true})
    let markersList = [];
    let tagsRef = firebaseApp.database().ref('tags')
    tagsRef.on('value', (snap) => {
      snap.forEach((tree) => {
        tree.forEach((tag) => {
          if (this.tagWithinVicinity(originCoords, tag.val().coords)) {
            let tagInfo = {...tag.val(), name: tree.key.toString()}
            markersList.push(tagInfo)
          }
        })  
      });
      this.setState({markers: markersList, markersLoading: false})
    })
  }
  
  renderMarker = (marker) => {
    return (
      <TreeMarker marker={marker} navigation={this.props.navigation} key={marker.key} />
    );
  }

  render() {
    
    const tempRegion = {
      latitude: 0.0617283,
      longitude: 32.4755344,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    
    return(
      <View style={{flex: 1}}>
        <MapView style={styles.map} 
          region={tempRegion}
          showsUserLocation={this.state.markersLoading ? false : true}
          zoomControlEnabled
          onRegionChangeComplete={region => {
            coordinate = {
              latitude: region.latitude,
              longitude: region.longitude
            };
            this.props.changeMapRegion(region)
            this.getNearbyMarkers(coordinate)
          }}
        >
          {this.state.markers.map(marker => this.renderMarker(marker))}
        </MapView>
        {this.state.markersLoading && (
          <View style={{...StyleSheet.absoluteFill}}>
            <Spinner />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    region: state.mapDisplay
  }
}

const mapDispatchToProps = {
  setMapRegion,
  changeMapRegion,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay)