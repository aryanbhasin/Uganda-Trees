import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Spinner from 'UgandaTrees/src/components/spinner';
import {styles} from '../../styles'
import {SCREEN_WIDTH} from 'UgandaTrees/src/styles/globalStyles'

import {BasicInfo, Stats} from './tab-components'

export default class Tab extends Component {

  state = {
    index: 0,
    routes: [
      {
        key: 'basicinfo', 
        title: 'Information',
      },
      {
        key: 'stats', 
        title: 'Statistics',
        
      },
    ],
  };
  
  renderTabBar(props) {
    return (
      <TabBar 
        {...props}
        tabStyle={{flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'center'}}
        renderIcon={({ route, focused, color }) => {
          switch (route.key) {
            case 'basicinfo':
              return (<Ionicon name="ios-information-circle-outline" color="white" size={20}/>)
            case 'stats':
              return (<Ionicon name="ios-stats" color="white" size={20}/>)
            default:
              return null
          }
        }}
      />
    );
  }
  
  render() {
    
    const {data} = this.props;
    
    const InfoRoute = () => (
      <View style={{flex: 1, marginHorizontal: 20}}>
        <BasicInfo text={data.basic_info}/>
      </View>
    );

    const StatsRoute = () => (
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Stats stats={data.stats}/>
      </View>
    );

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          basicinfo: InfoRoute,
          stats: StatsRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: SCREEN_WIDTH}}
        renderTabBar={(props) => this.renderTabBar(props)}
        lazy={true}
        renderLazyPlaceholder={() => (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner />
          </View>
        )}
      />
    );
  }
}