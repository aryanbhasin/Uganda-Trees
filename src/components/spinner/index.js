import React, {Component} from 'react';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';

export default class Spinner extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Progress.CircleSnail color={['red', 'black', '#ffd700']} thickness={4} size={50} duration={700} spinDuration={2100} />
      </View>
    );
  }
}

