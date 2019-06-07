import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, AsyncStorage, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import axios from 'axios';
import { Header } from '../../globalComponents';
import { Sketch } from '../../components';
import { responsividade } from '../../styles';

import { NavigationActions, withNavigation, StackActions } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LoginActions } from '../../store/ducks/login';
const dias = 23
class Main extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }


  static navigationOptions = {
    header: null,
  }

  state = {
    nome: '',
  }


  openDrawer = () => {
    const { drawerStatus } = this.state;

    if (drawerStatus === true) {
    }
  }

  state = {
    drawerStatus: null,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateToLogin);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  navigateToLogin = async () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Login' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  renderSketch = () => { };


  render() {
    const { navigation, login } = this.props;
    const { nome } = this.state
    const name = navigation.getParam('nome', 'Nome não cadastrado');
    const { largura_tela } = responsividade;

    return (
      <View style={styles.container}>
        <Header
          showMenu
          showExit
          openMenu={navigation.toggleDrawer}
          title='Inicial'
        />

        <View style={styles.bodyS}>
          <View style={styles.tokenView}>
            <Text style={styles.token}>Token válido por </Text>
            <Text style={styles.tokenD}>{dias}</Text>
            <Text style={styles.token}> dias</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.profile}>
              <Image source={require('../../assents/imgs/avatar.png')} style={styles.ImageStyle} />
            </View>
            <View style={styles.name_view}>
              <Text style={styles.name}>{login.userName}</Text>
            </View>
          </View>
          <View style={styles.buttons_view}>
            <TouchableOpacity onPress={this.navigateToScreen('NewMenu')}>
              <View style={styles.button}>
                <Text style={styles.button_text}> NOVA PERÍCIA</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen('Hist')}>
              <View style={styles.button}>
                <Text style={styles.button_text}>MINHAS PERÍCIAS</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);