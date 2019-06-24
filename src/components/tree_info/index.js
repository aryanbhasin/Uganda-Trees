import React, {Component} from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Tab from './components/tab/';
import {CachedImage} from 'react-native-cached-image';

import {styles} from './styles'
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

import SCREEN_WIDTH from 'UgandaTrees/src/styles/globalStyles'

import {firebaseApp} from 'UgandaTrees/App'

export default class TreeInfo extends Component {
  
  constructor(props) {
    super(props);
    
    this.treeData = this.props.navigation.getParam('treeData');
    this.treeName = !!this.treeData.Names.English_Name ? this.treeData.Names.English_Name : this.treeData.Names.Ugandan_Name;

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Frontal name={this.treeName} image_src={this.treeData.ImageUri}/>
        </View>
        <View style={{flex: 1}}>
          <Tab treeData={this.treeData} treeName={this.treeName} />
        </View>
      </View>
    );
  }
}

class Frontal extends Component {
  render() {
    const {name, image_src} = this.props;
    return (
      <View>
        <View>
          <CachedImage source={{uri: image_src}} style={styles.frontalImage} />
        </View>
        <View style={styles.frontalContainer}>
          <Text style={styles.frontalName}>{name}</Text>
        </View>
      </View>
      
    );
  }
}