import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux';
import {CachedImage} from 'react-native-cached-image';

import {addFavorite, deleteFavorite} from '../../actions'

import {styles} from './styles'

class TreeCard extends Component {
  
  state = {
    isFavorited: false
  }
  
  handleFavorite(treeName, isFavorited) {
    if (isFavorited) {
      this.props.deleteFavorite(treeName);
    } else {
      this.props.addFavorite(treeName);
    }
  }
  
  
  render() {
    
    StatusBar.setBarStyle('dark-content', true);
    
    const {treeData} = this.props;
    const name = !!treeData.Names.English_Name ? treeData.Names.English_Name : treeData.Names.Ugandan_Name;
    image_src = treeData.ImageUri;
    isFavorited = false;
    
    return (
 
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('TreeInfo', {'treeData': treeData})}}>
            <View style={styles.cardImageContainer}>
              <CachedImage source={{uri: image_src}} style={styles.cardImage} />
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>{name}</Text>
              <TouchableOpacity style={{paddingRight: 5}} onPress={() => {this.handleFavorite(name, isFavorited)}}>
                <Icon style={styles.favoriteIcon} name={isFavorited ? 'heart' : 'heart-outlined'} color='tomato' size={26}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      
    );
  }
}

const mapDispatchToProps = {
  addFavorite,
  deleteFavorite
}

export default connect(null, mapDispatchToProps)(TreeCard);