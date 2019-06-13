import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import TreeCard from '../../components/tree_card';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo' 

class Favorites extends Component {
  
  addFavoritesText(numFavorites) {
    return (
      <View style={{alignSelf: 'center', margin: 20, alignItems: 'center'}}>
        {numFavorites === 0 && (<Text style={[styles.addFavoritesText, styles.noFavoritesText]}>No favorites in mind?</Text>)}
        <Text style={styles.addFavoritesText}>Add a tree to your favorites list by pressing the {(<Icon name='heart' size={15}/>)} icon</Text>
      </View>
    );
  }
  
  render(){
    let numFavorites = 0;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.props.favoritesState.map((tree, index) => {
          if (tree.isFavorited) {
            numFavorites++;
            return (<TreeCard key={index} name={tree.name} image_src={tree.image_src} isFavorited={true} navigation={this.props.navigation}/>)
          }  
        })}
        {this.addFavoritesText(numFavorites)}
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
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesState: state.favorites,
  }
}

export default connect(mapStateToProps)(Favorites);