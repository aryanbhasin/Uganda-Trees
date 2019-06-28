import React, {Component} from 'react'
import MapDisplay from './components/MapDisplay'


export default class Map extends Component {
  render(){
    return (
      <MapDisplay navigation={this.props.navigation}/>
    );
  }
}