import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';

export default class TreeModal extends Component {
  
  render() {
    return (
      <View>
        <Modal isVisible={this.props.isVisible} swipeDirection='down' swipeThreshold={100} onSwipeComplete={this.props.toggleModal}>
          <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Text h2>Demo</Text>
            <Button containerStyle={{width: 100}} title="Close" raised type="outline" onPress={this.props.toggleModal}/>
          </View>
        </Modal>
      </View>
    );
  }
}