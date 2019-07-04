import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import Share from 'react-native-share';
import Modal from 'react-native-modal'
import {Button} from 'react-native-material-ui'
import {SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles'

import {firebaseApp} from 'UgandaTrees/App'

export default class InfoModal extends Component {
  
  render() {
    
    return (
      <Modal isVisible={this.props.isModalVisible}>
        <View style={styles.container}>
          <View style={{position: 'absolute', right: 15, top: 5}}>
            <TouchableOpacity onPress={() => this.props.closeModal()}>
              <Ionicon name='ios-close' color='dimgrey' size={38}/>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <About />
            <Features />
            <ShareApp />
            <Supporters />
            <Acknowledgements />
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

function About() {
  return (
    <View>
      <View style={{flexDirection: 'row', alignSelf: 'center', paddingVertical: 5}}>
        <Image style={styles.appIcon} source={require('UgandaTrees/src/assets/icons/icon-3.png')}/>
        <Text style={styles.appName}> Uganda's Trees</Text>
      </View>
      <Text style={styles.aboutText}>This app has been created to capture the wealth of Uganda's tree biodiversity by cataloguing and geotagging various species in locations such as the Entebbe Botanical Gardens.</Text>
      <Text style={styles.aboutText}>It is aimed at helping tree enthusiasts find and learn more about trees near them</Text>
    </View>
  );
}

function Features() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.header}>Features</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.text}>{(<Text style={{fontWeight: 'bold'}}>Explore:</Text>)} Browse through Uganda's diverse tree ecosystem and open tree cards for info, stats, and tags</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.text}>{(<Text style={{fontWeight: 'bold'}}>Tag:</Text>)} Click a picture of a tree and tag it with its species name and location</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.text}>{(<Text style={{fontWeight: 'bold'}}>Map:</Text>)} View all tagged trees near you on a map, along with their images, species and directions</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.text}>{(<Text style={{fontWeight: 'bold'}}>Favorites:</Text>)} Save your favorite tree cards for quick access</Text>
      </View>
    </View>
  );
}

class ShareApp extends Component {
  
  constructor(props) {
    super(props);
    appURLRef = firebaseApp.database().ref('share-info/app-url');
    appURLRef.once('value', (snapshot) => {
      let appURL = snapshot.val();
      let shareOptions = {
        url: appURL,
        title: 'Share Uganda\'s Trees',
      }
      this.setState({shareOptions: shareOptions})
    })
    this.state = {
      shareOptions: null
    }
  }
  
  toggleShare() {
    if (!!this.shareOptions) {
      Share.open(this.state.shareOptions).then((res) => console.log(res)).catch((err) => {err && console.log(err)})
    } else {
      Share.open({url: 'http://appstore.com/uganda%27s%20trees'}).then((res) => console.log(res)).catch((err) => {err && console.log(err)})
    }
  }
  
  render() {
    return (
      <View style={[styles.sectionContainer, {alignSelf: 'center', marginBottom: 5}]}>
        <Button raised text="Share the app" icon='share' iconSet='MaterialCommunityIcons' style={{text: {fontSize: 15, color: 'cornflowerblue'}}}
          onPress={() => this.toggleShare()}
        />
      </View>
    );
  }
  
}

function Acknowledgements() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.header}>Acknowledgements</Text>
      <Text style={styles.biblio}>
        {(<Text style={{fontWeight: 'bold'}}>Tree information and statistics data legally reproduced from: </Text>)}
        Katende, A. B., et al. Useful Trees and Shrubs for Uganda: Identification, Propagation, and Management for Agricultural and Pastoral Communities. Regional Soil Conservation Unit, 1995
      </Text>
    </View>
  );

}

function Supporters() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.header}>Supported By</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.supporterContainer}>
          <Image source={require('UgandaTrees/src/assets/icons/dsl-logo.png')} style={styles.supporterLogo} />
          <Text style={styles.text}>Digital Solutions</Text>
        </View>
        <View style={styles.supporterContainer}>
          <Image source={require('UgandaTrees/src/assets/icons/arocha-logo.png')} style={styles.supporterLogo} />
          <Text style={styles.text}>A Rocha Uganda</Text>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT * 0.8,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 14
  },
  sectionContainer: {
    marginTop: 10,
  },
  header: {
    color: 'dimgrey',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5
  },
  subheader: {
    color: 'dimgray',
    fontSize: 22,
  },
  text: {
    color: 'dimgrey',
    fontSize: 15,
    textAlign: 'justify'
  },
  aboutText: {
    color: 'dimgrey',
    fontSize: 16,
    textAlign: 'left',
    paddingBottom: 3
  },
  appIcon: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    resizeMode: 'cover',
  },
  appName: {
    color: 'dimgray',
    fontWeight: '600',
    fontSize: 23,
  },
  supporterContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  supporterLogo: {
    flex: 1,
    height: 60,
    resizeMode: 'contain'
  },
  biblio: {
    color: 'dimgrey',
    fontSize: 12,
    paddingBottom: 4
  },
  bulletContainer: {
    paddingVertical: 2,
    paddingLeft: 15
  },
  bullet: {
    padding: 1, 
    borderWidth: 1, 
    borderRadius: 10, 
    color: '#ddd'
  }
})