'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');

var {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBarIOS,
  LinkingIOS,
  TouchableOpacity,
  Image,
} = React;

var {map} = require('lodash');

var Help = React.createClass({
  _sendEmail() {
    LinkingIOS.openURL('mailto:info@rnplay.org');
  },

  _loadURL(url) {
    LinkingIOS.openURL(url);
  },

  renderModules() {
    return map(global.PACKAGE['dependencies'], (version, name) => {
      return <Text style={styles.moduleText}>{name} {version}</Text>
    })
  },
  render() {
    StatusBarIOS.setStyle('light-content');
    return (
      <View style={{flex: 1}}>
        <NavigationBar title={'About'} />
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.heading}>React Native Playground</Text>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('image!rnplay_logo_light_w_sand')} />
          </View>
          <Text style={styles.title}>Run React Native apps from rnplay.org directly on your device.</Text>
          <Text style={styles.text}>Get started by trying apps on the <Text style={styles.emphasis}>Explore</Text> tab, or login to your rnplay.org account in <Text style={styles.emphasis}>My Apps</Text>.</Text>

          <Text style={styles.title}>How do I exit a loaded app?</Text>
          <Text style={styles.text}>Tap and hold the screen with two fingers simultaneously for 1.5 seconds.</Text>

          <Text style={styles.title}>What does target mean?</Text>
          <Text style={styles.text}>The target React Native version for an app. An app might not behave if the target is different than the our bundled React Native version.</Text>

          <Text style={styles.title} numberOfLines={2}>
            What's the current React Native version?
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            The app's current React Native version is
            <Text style={styles.buildVersionText}> {global.RN_VERSION_DISPLAY}</Text>.
          </Text>

          <Text style={styles.title}>Which modules are included?</Text>
          {this.renderModules()}
          <View style={styles.otherQuestions}>
            <Text style={styles.otherQuestionsText}>
              More questions? Please get in touch with us by email: info@rnplay.org
            </Text>
            <View style={{paddingTop: 5}}>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    marginTop: -10,
    paddingBottom: 20,
    flex: 1,
  },
  sendEmailText: {
    color: '#712FA9',
    fontSize: 13,
    marginTop: -2,
  },
  link: {
    color: "#712FA9"
  },
  emphasis: {
    fontStyle: "italic"
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
  heading: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: "#444",
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16
  },
  text: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    color: "#222",
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 14
  },
  moduleText: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    color: "#222",
    paddingLeft: 15,
    fontSize: 14
  },
  otherQuestionsText: {
    opacity: 1,
    fontSize: 13,
  },
  otherQuestions: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 23,
  }
});

module.exports = Help;
