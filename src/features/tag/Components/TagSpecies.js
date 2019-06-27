import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';

import {setSpecies} from 'UgandaTrees/src/actions';

import {TagSpeciesStyles as styles} from '../styles'

class TagSpecies extends Component {
  
  /*
  renderDropdown() {
    let dropdownList = [];
    // populate list with objects of tree name
    if (!!this.props.dummyData) {
      this.props.dummyData.map((tree) => {dropdownList.push({value: tree.Names.Primary_Name})})
    }
    dropdownList.push({value: 'Not sure'})
    return (
      <View style={styles.dropdownContainer}>
        <Dropdown containerStyle={styles.dropdown} label='Select Tree Species' data={dropdownList} onChangeText={(value) => this.props.setSpecies(value)} />
      </View>
    );
  }
  */
  
  render() {
    return (
      <View>
        <TextField 
          label='Species Name'
          ref={(ref) => this.props.getRef(ref)}
          value={this.props.species}
          onChangeText={(val) => this.props.setSpecies(val)}
          containerStyle={{width: 180}}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    species: state.newTagInfo.species,
    dummyData: state.search.dummyData
  }
}

const mapDispatchToProps = {
  setSpecies
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSpecies)