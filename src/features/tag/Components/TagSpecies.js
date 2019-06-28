import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {setSpecies} from 'UgandaTrees/src/actions';

import {TagSpeciesStyles as styles} from '../styles'

class TagSpecies extends Component {
  
  constructor(props) {
    super(props);
    
    // populate list with tree names
    this.dropdownList = [];
    if (!!this.props.initTreeData) {
      this.props.initTreeData.map((tree) => {this.dropdownList.push({value: tree.Names.Primary_Name})})
    }
  }
  
  renderDropdown() {
    return (
      <View style={styles.dropdownContainer}>
        <Dropdown containerStyle={styles.dropdown} label='Select Tree Species' data={this.dropdownList} onChangeText={(value) => this.props.setSpecies(value)} />
      </View>
    );
  }
  
  
  render() {
    return (
      <View>
        {this.renderDropdown()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    species: state.newTagInfo.species,
    initTreeData: state.search.initTreeData
  }
}

const mapDispatchToProps = {
  setSpecies
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSpecies)