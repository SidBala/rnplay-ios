/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var AppReloader = require('NativeModules').AppReloader;
var Camera = require('react-native-camera');
var Overlay = require('react-native-overlay');

var Api = require("../Api/Core");

var RECENT_PLAYS_URL = '/builds/0.5.0-rc1/plays/public.json';
var MY_PLAYS_URL = '/plays.json';

var Home = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      isModalOpen: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this.fetchApps();
  },

  fetchApps: function() {
    Api.get(RECENT_PLAYS_URL)
      .then((data) => {
        console.log(data);
        if (data.error) {
          this.navigator.replace({id: "login"});
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true
        });
      })
      .done();
  },

  renderAppList: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>React Native Playground</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderApp}
          style={styles.listView}
        />
        <TouchableOpacity onPress={() => this.setState({isModalOpen: true})}>
          <Image style={styles.cameraButton} resizeMode="contain" source={require("image!photo-camera5")} />
        </TouchableOpacity>
        <Overlay isVisible={this.state.isModalOpen}>
          <Camera
            ref="cam"
            style={styles.container}
            onBarCodeRead={this.onBarCodeRead}>
            <TouchableOpacity onPress={() => this.setState({isModalOpen: false})}>
              <Text style={styles.cancelButton}>X</Text>
            </TouchableOpacity>
          </Camera>
        </Overlay>
      </View>
    );
  },

  renderCreator: function(app) {
    return app.creator ?
    <View style={styles.creator}>
      <Image style={styles.avatar} source={{uri: app.creator.avatar_url || 'https://facebook.github.io/react-native/img/header_logo.png'}} />
      <Text style={styles.username}>{app.creator.username || 'anonymous'}</Text>
    </View> : null
  },

  renderApp: function(app) {
    return (
      <View style={styles.appContainer}>
        <TouchableOpacity onPress={() => this.selectApp(app)}>
          <Text style={styles.app}>{app.name || app.module_name}</Text>
        </TouchableOpacity>
        { this.renderCreator(app) }
      </View>
    );

  },

  selectApp: function(app) {
    AppReloader.reloadAppWithURLString(app.bundle_url, app.module_name);
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS size="large" />
      </View>
    );
  },

  onBarCodeRead(data) {
    if (!this.barCodeRead) {
      this.barCodeRead = true
      var appdata = JSON.parse(data.data)
      AppReloader.reloadAppWithURLString(appdata.url, appdata.module_name);
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoading();
    } else {
      return this.renderAppList();
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  appContainer: {
    marginBottom: 20
  },
  creator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: {
    fontSize: 12,
    opacity: .5
  },
  cameraButton: {
    height: 60,
    width: 20,
    alignSelf: 'center',
    marginLeft: 5
  },
  avatar: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 10,
    opacity: .5,
    marginTop: 3,
    backgroundColor: "#000"
  },
  cancelButton: {
    color: '#fff',
    flex: 1,
    fontSize: 25,
    marginLeft: 20
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    paddingBottom: 20,
    color: '#888'
  },
  app: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#2B608A'
  }
});

module.exports = Home;
