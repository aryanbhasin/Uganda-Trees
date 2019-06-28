import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux';
import {CachedImage} from 'react-native-cached-image';
import {firebaseApp} from 'UgandaTrees/App'
import {addFavorite, deleteFavorite} from '../../actions'
import imgSources from './images'
import {styles} from './styles'

class TreeCard extends Component {
  
  state = {
    isFavorited: false
  }
  
  toggleFavorite(treeData, isFavorited) {
    if (isFavorited) {
      this.props.deleteFavorite(treeData);
    } else {
      this.props.addFavorite(treeData);
    }
  }
  
  
  render() {
    
    StatusBar.setBarStyle('dark-content', true);
    
    const {treeData, isFavorited} = this.props;
    const name = treeData.Names.Primary_Name;
    const scientificName = treeData.Names.Scientific_Name;
    
    return (
 
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('TreeInfo', {'treeData': treeData})}}>
            <View style={styles.cardImageContainer}>
              <Image source={imgSources[name.toString().toLowerCase()]} style={styles.cardImage} />
            </View>
            <View style={styles.cardRow}>
              <View style={{flex: 5.5, padding: 10}}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardSubtitle}>{scientificName}</Text>
              </View>
              <TouchableOpacity style={{flex: 1}} onPress={() => {this.toggleFavorite(treeData, isFavorited)}}>
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