import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {firebaseApp} from 'UgandaTrees/App'
import TreeCard from '../../../components/tree_card';
// import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles'
import Spinner from '../../../components/spinner'
import {connect} from 'react-redux';

class TreeCardList extends Component {
  
  constructor() {
    super();
    var dataRef = firebaseApp.database().ref('dummy-tree-data');
    dataRef.on('value', (snapshot) => {
      var dummyData = [];
      snapshot.forEach((child) => {
        dummyData.push(child.val())
      })
      this.setState({dataLoading: false, data: dummyData})
    })
  }
  
  state = {
    dataLoading: true,
    data: []
  }

  
  render() {
                    // UNCOMMENT TO ADD SPINNER WHILE DATA IS BEING RENDERED
    // if (this.state.dataLoading) {
    //   return (
    //     <Spinner />
    //   );
    // }
    
    // the search data is still being taken from dummyData.js
    return (
      <ScrollView style={styles.cardListScroll} keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
        {this.props.searchResults.map((tree, index) => {
          // goes through favorites state to find isFavorited status of
          var currTree = this.props.favStatus.find((item) => {
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
  return {
    searchResults: state.search.searchResults,
    favStatus: state.favorites.favStatus,
  }
};

export default connect(mapStateToProps)(TreeCardList);
