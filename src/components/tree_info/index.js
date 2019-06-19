import React, {Component} from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Tab from './components/tab/';

import {styles} from './styles'
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

import SCREEN_WIDTH from 'UgandaTrees/src/styles/globalStyles'

import {firebaseApp} from 'UgandaTrees/App'

export default class TreeInfo extends Component {
  
  constructor(props) {
    super(props);
    
    const treeName = this.props.navigation.getParam('treeName', 'Coffee');
    this.treeData = dummyData.find((tree) => (tree.name === treeName));

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Frontal name={this.treeData.name} image_src={this.treeData.image_src}/>
        </View>
        <View style={{flex: 1}}>
          <Tab treeData={this.treeData} />
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
          <Image style={styles.frontalImage} source={image_src}/>
        </View>
        <View style={styles.frontalContainer}>
          <Text style={styles.frontalName}>{name}</Text>
        </View>
      </View>
      
    );
  }
}





