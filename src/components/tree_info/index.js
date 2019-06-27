import React, {Component} from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Tab from './components/tab/';
import {CachedImage} from 'react-native-cached-image';
import {getLocation} from 'UgandaTrees/src/actions';
import {connect} from 'react-redux'
import {styles} from './styles'
import imgSources from '../tree_card/images'
class TreeInfo extends Component {
  
  constructor(props) {
    super(props);
    this.props.getLocation();
    
    this.treeData = this.props.navigation.getParam('treeData');
    this.treeName = this.treeData.Names.Primary_Name

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Frontal name={this.treeName}/>
        </View>
        <View style={{flex: 1}}>
          <Tab treeData={this.treeData} treeName={this.treeName} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  getLocation,
}

class Frontal extends Component {
  render() {
    const {name} = this.props;
    return (
      <View>
        <View>
          <Image source={imgSources[name.toString().toLowerCase()]} style={styles.frontalImage} />
        </View>
        <View style={styles.frontalContainer}>
          <Text style={styles.frontalName}>{name}</Text>
        </View>
      </View>
      
    );
  }
}

export default connect(null, mapDispatchToProps)(TreeInfo)