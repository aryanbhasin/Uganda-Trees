import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';


import {styles} from './styles'
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

export default class TreeInfo extends Component {
  
  render() {
    
    const treeName = this.props.navigation.getParam('treeName', 'Coffee');
    const treeData = dummyData.find((tree) => (tree.name === treeName));
    
    return (
      <ScrollView>
        <Frontal name={treeData.name} image_src={treeData.image_src}/>
        <View style={{paddingHorizontal: 20}}>
          <BasicInfo text={treeData.basic_info}/>
          <Stats stats={treeData.stats} /> 
        </View>
      </ScrollView>
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

class BasicInfo extends Component {
  render() {
    const {text} = this.props;
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>{text}</Text>
      </View>
    );
  }
}

class Stats extends Component {
  
  renderRow(object, key, index) {
    return (
      <View key={index} style={styles.rowContainerStyle}>
        <Text style={styles.rowText}>{key}</Text>
        <Text style={styles.rowText}>{object[key]}</Text>
      </View>
    );
  }
  
  render() {
    const {stats} = this.props;
    return (
      <View>
        {Object.keys(stats).map((key, index) => this.renderRow(stats, key, index))}
      </View>
    );
  }
}



