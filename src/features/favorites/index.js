import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import TreeCard from '../../components/tree_card';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo' 

class Favorites extends Component {
  
  addFavoritesText(numFav) {
    return (
      <View style={[styles.favoritesTextContainer]}>
        {numFav === 0 && (<Text style={[styles.addFavoritesText, styles.noFavoritesText]}>No favorites in mind?</Text>)}
        <Text style={styles.addFavoritesText}>Add a tree to your favorites list by pressing the {(<Icon name='heart' size={15}/>)} icon</Text>
      </View>
    );
  }
  
  render(){
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={this.props.numFavorites === 0 && styles.noFavoritesTextContainer}>
        {this.props.favList.map((treeData, index) => {
            return (<TreeCard key={index} treeData={treeData} isFavorited={true} navigation={this.props.navigation}/>) 
        })}
        {this.addFavoritesText(this.props.numFavorites)}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  noFavoritesText: {
    fontWeight: 'bold',
    paddingBottom: 10
  },
  addFavoritesText: {
    color: 'darkgrey',
    textAlign: 'center'
  },
  favoritesTextContainer: {
    alignSelf: 'center', 
    margin: 20, 
    alignItems: 'center'
  },
  noFavoritesTextContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    favList: state.favorites.favList,
    numFavorites: state.favorites.numFavorites,
  }
}

export default connect(mapStateToProps)(Favorites);