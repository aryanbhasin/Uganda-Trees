import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import TreeCard from '../../../components/tree_card';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {connect} from 'react-redux';
import {updateSearchResults} from 'UgandaTrees/src/reducers/reducer';

class TreeCardList extends Component {
  
  // renderSearchData() {
  //   searchData = searchData.filter((card) => {
  //     const searchTerm = this.props.searchTerm.toUpperCase();
  //     return card.name.toUpperCase().indexOf(searchTerm) > -1;
  //   })
  //   this.props.updateSearchResults(searchData)
  // }
  
  render() {
    return (
      <ScrollView style={styles.cardListScroll} keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
        {this.props.searchResults.map((tree, index) => {
          return (<TreeCard key={index} name={tree.name} image_src={tree.image_src} navigation={this.props.navigation}/>)
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
  return {
    searchTerm: state.search.searchTerm,
    searchResults: state.search.searchResults,
  }
};

export default connect(mapStateToProps)(TreeCardList);
