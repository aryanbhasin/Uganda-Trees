import React, {Component} from 'react'
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {Marker, Callout, CalloutSubview} from 'react-native-maps'
import {firebaseApp} from 'UgandaTrees/App';
import FastImage from 'react-native-fast-image'
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles'
import {connect} from 'react-redux'
import {SpinnerMini} from 'UgandaTrees/src/components/spinner'

import {getTreeDirections} from 'UgandaTrees/src/components/tree_info/components/tab/tagmap'

class TreeMarker extends Component {
  
  state = {
    markerPressed: false,
    imageLoading: false,
    color: this.randomiseTreeColor(),
    iconNum: Math.floor(Math.random()*3)
  }
  
  openTreeInfo(markerName) {
    let {navigation, initJsonData} = this.props;
    let name = markerName.toLowerCase()
    // indexing into json data of tree with name 'markerName' (only if it exists)
    console.log(initJsonData)
    if (!!initJsonData[name]) {
      var treeData = initJsonData[name];
      navigation.navigate('TreeInfo', {'treeData': treeData})
    }
  }
  
  openTreeDirections(markerPos) {
    currPos = {
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude,
    }
    getTreeDirections(currPos, markerPos)
  }
  
  randomiseTreeColor() {
    let iconColor = Math.floor(Math.random()*3);
    switch (iconColor) {
      case 0:
        return 'darkgreen'
      case 1:
        return 'darkolivegreen'
      default:
        return 'yellowgreen'
    }
  }
  
  randomiseTreeIcon() {
    switch (this.state.iconNum) {
      case 0:
        return (<FAIcon name="tree" color={this.state.color} size={22} />)
      case 1:
        return (<MCIcon name="pine-tree" color={this.state.color} size={22} />)
      default:
        return (<MCIcon name="tree" color={this.state.color} size={22} />)
    }
  }
  
  returnCalloutSubview = (marker) => {
    // CalloutSubview only on iOS
    if (Platform.OS === 'ios') {
      return (
        <View>
          <CalloutSubview onPress={() => this.openTreeInfo(marker.name.toString())} style={{padding: 5}}>
            <Text style={styles.calloutButtonText}>More Info</Text>
          </CalloutSubview>
          <CalloutSubview onPress={() => this.openTreeDirections(marker.coords)} style={{padding: 5}}>
            <Text style={styles.calloutButtonText}>Directions</Text>
          </CalloutSubview>
        </View>
      );
    }
    // else, android
    return (
      <View>
        <TouchableOpacity onPress={() => this.openTreeInfo(marker.name.toString())} style={{padding: 5}}>
          <Text style={styles.calloutButtonText}>More Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.openTreeDirections(marker.coords)} style={{padding: 5}}>
          <Text style={styles.calloutButtonText}>Directions</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  render() {
    
    const {marker} = this.props;
    
    return (
      <Marker coordinate={marker.coords} 
        onSelect = {() => this.setState({markerPressed: true, imageLoading: true})}
        onDeselect = {() => this.setState({markerPressed: false, imageLoading: false})}
        onPress={() => {Platform.OS === 'android' ? this.setState({markerPressed: true, imageLoading: true}) :  null}}>
        <View>
          {this.randomiseTreeIcon()}
        </View>
        <Callout style={{width: 180, height: 138}}>
          <View style={styles.calloutView}>
            <View style={styles.calloutImageView}>
              {this.state.markerPressed && (
                <FastImage resizeMode={FastImage.resizeMode.cover}
                  onLoadEnd={() => this.setState({imageLoading: false})} 
                  style={{borderRadius: 4, flex: 1, width: 70}}
                  source={{uri: marker.imageUri}}/>
              )}
              {this.state.imageLoading && (<View style={{...StyleSheet.absoluteFill}}><SpinnerMini /></View>)}
            </View>
            <View style={styles.calloutInfoView}>
              <Text style={styles.calloutMarkerName}>{marker.name.charAt(0).toUpperCase() + marker.name.slice(1)}</Text>
              {this.returnCalloutSubview(marker)}
            </View>
          </View>
        </Callout>
      </Marker>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initJsonData: state.search.initJsonData,
    region: state.mapDisplay
  }
}

export default connect(mapStateToProps)(TreeMarker)