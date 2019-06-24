import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {firebaseApp} from 'UgandaTrees/App'
import TreeCard from '../../../components/tree_card';
// import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles'
import Spinner from '../../../components/spinner'
import {connect} from 'react-redux';
import {getSearchData} from 'UgandaTrees/src/actions'

class TreeCardList extends Component {
  
  componentDidMount() {
    this.props.getSearchData();
  }
  
  render() {
                    
    if (this.props.dataLoading) {
      return (
        <Spinner />
      );
    }
    
    return (
      <ScrollView style={styles.cardListScroll} keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
        {this.props.searchResults.map((tree, index) => {
          const name = !!tree.Names.English_Name ? tree.Names.English_Name : tree.Names.Ugandan_Name;
          
          // goes through favorites state to find isFavorited status of
          // var currTree = this.props.favStatus.find((item) => {
          //   return (item.name === name);
          // }); 
          // const isTreeFavorited = currTree.isFavorited;
          
          return (<TreeCard key={index} treeData={tree} isFavorited={false} navigation={this.props.navigation}/>)
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
    favStatus: state.favorites.favStatus,
  }
};

const mapDispatchToProps = {
  getSearchData
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeCardList);
