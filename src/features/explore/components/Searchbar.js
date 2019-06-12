import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SCREEN_WIDTH} from 'UgandaTrees/src/styles/globalStyles'
import {connect} from 'react-redux';

import {updateSearch} from 'UgandaTrees/src/reducers/reducer';

class Searchbar extends Component {
  
  render() {
    return (
      <View style={styles.searchBarContainer}>
        <SearchBar 
          placeholder='Search for a tree'
          onChangeText={(text) => {this.props.updateSearch(text)}}
          onClear={(text) => {this.props.updateSearch('')}}
          value={this.props.searchTerm}
          autoCorrect={false}
          lightTheme
          round
          containerStyle={styles.searchBar}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  searchBarContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center'
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm
  }
};

const mapDispatchToProps = {
  updateSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)
