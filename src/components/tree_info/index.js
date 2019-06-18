import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
// import {TabView} from 'react-native-tab-view';

import {styles} from './styles'
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import TreeModal from './components/modal';
import SCREEN_WIDTH from 'UgandaTrees/src/styles/globalStyles'

import {firebaseApp} from 'UgandaTrees/App'

export default class TreeInfo extends Component {
  
  constructor(props) {
    super(props);
    
    const treeName = this.props.navigation.getParam('treeName', 'Coffee');
    this.treeData = dummyData.find((tree) => (tree.name === treeName));

    this.state = {
      modalVisible: false,
      treeName: 'mahogany',
      tabview: {
        index: 0,
        routes: [
          {key: 'basicinfo', title: 'Information'},
          {key: 'stats', title: 'Statistics'}
        ]
      }
    }
  }
  
  
  
  toggleModal() {
    this.setState({modalVisible: !this.state.modalVisible})
  }
  
  // handleRenderScene(route) {
  //   switch (route.key) {
  //     case 'basicinfo':
  //       return <BasicInfo text={this.treeData.basic_info}/>;
  //     case 'stats':
  //       return <Stats stats={this.treeData.stats}/>;
  //     default:
  //       return null;
  //   }
  // }
  // 
  // renderTabBar(props) {
  //   return (
  //     <TabBar {...props} style={{backgroundColor: 'pink'}}/>
  //   );
  // }
  
  
  render() {
    
    return (
      <ScrollView>
        <Frontal name={this.treeData.name} image_src={this.treeData.image_src}/>
        <View style={{paddingHorizontal: 20}}>
          <BasicInfo text={this.treeData.basic_info}/>
          <Stats stats={this.treeData.stats} /> 
        </View>
        <View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button containerStyle={{width: 200, margin: 15}} title="Show nearby trees" raised type="outline" onPress={() => this.toggleModal()}/>
          <TreeModal isVisible={this.state.modalVisible} toggleModal={() => this.toggleModal()}/>
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



