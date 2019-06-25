import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {firebaseApp} from 'UgandaTrees/App'
import TreeCard from '../../../components/tree_card';
// import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles'
import Spinner from '../../../components/spinner'
import {connect} from 'react-redux';
import {getSearchData, setMapRegion} from 'UgandaTrees/src/actions'

class TreeCardList extends Component {
  
  componentDidMount() {
    this.props.getSearchData();
    // sets initial map region for MapDisplay (Map Screen)
    
    // uncomment to get actual location
    // this.props.setMapRegion();
  }
  
  render() {               
    if (this.props.dataLoading) {
      return (
        <Spinner />
      );
    }
    return (
      <ScrollView style={styles.cardListScroll} keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
        {this.props.searchResults.map((treeData, index) => {
          const currTree_name = treeData.Names.Primary_Name
          
          // checks if tree exists in favList using .some()
          const isTreeFavorited = this.props.favList.some(favTree => (favTree.Names.Primary_Name === currTree_name))
          
          return (<TreeCard key={index} treeData={treeData} isFavorited={isTreeFavorited} navigation={this.props.navigation}/>)
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
    searchResults: state.search.searchResults,
    dataLoading: state.search.isLoading,
    favList: state.favorites.favList,
  }
};

const mapDispatchToProps = {
  getSearchData,
  setMapRegion
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeCardList);
