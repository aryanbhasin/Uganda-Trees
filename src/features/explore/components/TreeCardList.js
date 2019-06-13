import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import TreeCard from '../../../components/tree_card';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {connect} from 'react-redux';

class TreeCardList extends Component {
  
  render() {
    return (
      <ScrollView style={styles.cardListScroll} keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
        {this.props.searchResults.map((tree, index) => {
          // goes through favorites state to find isFavorited status of
          var currTree = this.props.favoritesState.find((item) => {
            return (item.name === tree.name);
          }); 
          const isTreeFavorited = currTree.isFavorited;
          return (<TreeCard key={index} name={tree.name} image_src={tree.image_src} isFavorited={isTreeFavorited} navigation={this.props.navigation}/>)
        })}
      </ScrollView>
    );
  }
}

var styles= StyleSheet.create({
  cardListScroll: {

  }
});

const mapStateToProps = (state) => {
  console.log(state.favorites)
  return {
    searchResults: state.search.searchResults,
    favoritesState: state.favorites,
  }
};

export default connect(mapStateToProps)(TreeCardList);
