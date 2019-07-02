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
    
    this.state = {
      speciesSelected: false
    }
    
    // populate list with tree names
    this.dropdownList = [];
    if (!!this.props.initTreeData) {
      this.props.initTreeData.map((tree) => {this.dropdownList.push({value: tree.Names.Primary_Name})})
    }
  }
  
  renderInputs() {
    return (
      <View style={styles.inputView}>
        <View style={styles.dropdownContainer}>
          <Dropdown containerStyle={styles.dropdownSize} label='Select Tree Species' data={this.dropdownList} onChangeText={(value) => {this.props.setSpecies(value, true); this.setState({speciesSelected: true})}} />
        </View>
        <Text style={styles.inputOptionText}>or</Text>
        <View>
          <TextField 
            label='Species Name'
            ref={(ref) => this.props.getRef(ref)}
            value={this.props.species}
            onChangeText={(value) => this.props.setSpecies(value, true)}
            containerStyle={styles.textinputPos}
            disabled={this.state.speciesSelected ? true : false}
          />
        </View>
        <Text style={styles.notsureText}>Tag the tree as {(<Text style={{fontWeight: 'bold'}}>Not Sure</Text>)} if you're unsure about its species</Text>
      </View>
    );
  }
  
  
  render() {
    return (
      <View>
        {this.renderInputs()}
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