import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {connect} from 'react-redux';

import {setSpecies} from 'UgandaTrees/src/actions';

import {TagSpeciesStyles as styles} from '../styles'

class TagSpecies extends Component {
  render() {
    let dropdownList = [];
    // populate list with objects of tree name
    dummyData.map((tree) => {dropdownList.push({value: tree.name})})
    dropdownList.push({value: 'Not sure'})
    return (
      <View style={styles.dropdownContainer}>
        <Dropdown containerStyle={styles.dropdown} label='Select Tree Species' data={dropdownList} onChangeText={(value) => this.props.setSpecies(value)} />        
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    species: state.tagInfo.species
  }
}

const mapDispatchToProps = {
  setSpecies
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSpecies)