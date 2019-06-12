import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import TreeCard from '../../components/tree_card';
import {connect} from 'react-redux'

class Favorites extends Component {
  render(){
    
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.props.favoritesList.map((tree, index) => {
          return (<TreeCard key={index} name={tree.name} image_src={tree.image_src} isForcefullyFavorited={true} navigation={this.props.navigation}/>)
        })}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesList: state.favorites,
  }
}

export default connect(mapStateToProps)(Favorites);