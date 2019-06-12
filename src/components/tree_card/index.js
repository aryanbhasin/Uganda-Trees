import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux';

import {addFavorite, deleteFavorite} from '../../actions'

import {styles} from './styles'

class TreeCard extends Component {
  
  state = {
    isFavorited: false
  }
  
  handleFavorite(name) {
    const favoriteStatus = (this.props.isForcefullyFavorited) || this.state.isFavorited;
    if (favoriteStatus) {
      this.setState({isFavorited: false});
      this.props.deleteFavorite(name) 
    } else {
      this.setState({isFavorited: true})
      this.props.addFavorite(name);
    }
  }
  
  
  render() {
    
    StatusBar.setBarStyle('dark-content', true);
    
    const {name, image_src, isForcefullyFavorited} = this.props;
    const favoriteStatus = isForcefullyFavorited || this.state.isFavorited;
    
    // replace image url and tree name with props
    return (
 
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('TreeInfo', {'treeName': name})}}>
            <View style={styles.cardImageContainer}>
              <Image source={image_src} style={styles.cardImage} />
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>{name}</Text>
              <TouchableOpacity style={styles.favoriteIcon} onPress={() => {this.handleFavorite(name)}}>
                <Icon name={favoriteStatus ? 'heart' : 'heart-outlined'} color='tomato' size={26}/>
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