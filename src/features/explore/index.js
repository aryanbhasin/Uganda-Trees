import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import TreeCardList from './components/TreeCardList';
import Searchbar from './components/Searchbar';
import InfoModal from '../../components/info-modal'
import TreeInfo from '../../components/tree_info';

export default class Explore extends Component {
  
  componentDidMount() {
    this.props.navigation.setParams({openModal: this.openModal})
  }
  
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity onPress={() => params.openModal()} style={{paddingRight: 25}}>
          <Ionicon name='ios-information-circle-outline' color='dimgrey' size={27}/>
        </TouchableOpacity>
      ),
    }
  }
  
  openModal = () => {
    this.setState({isModalVisible: true})
  }
  
  closeModal = () => {
    this.setState({isModalVisible: false})
  }
  
  state = {
    isModalVisible: false
  }
  
  render(){
    return (
      <View style={styles.container}>
        <Searchbar />
        <TreeCardList navigation={this.props.navigation} />
        <InfoModal isModalVisible={this.state.isModalVisible} closeModal={this.closeModal} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  }
});