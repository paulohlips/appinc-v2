import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { responsividade } from '../../styles';

class HeaderRedux extends Component {
  state = {
    showAlert: false,
    alertVisible: false,
  }

  openAlert = () => {
    this.setState({ showAlert: true, alertVisible: true })
  }

  closeAlert = () => {
    this.setState({ showAlert: false, alertVisible: false })
  }

  clearAsync = () => {
    AsyncStorage.clear();
  }

  verificaData = async () => {
    const { form, goBack } = this.props;
    const dataInicio = new Date(form.step.data_inicio.value);
    const dataFinal = await new Date(form.step.data_final.value);

    if (dataInicio > dataFinal) {
      console.tron.log("DEEEEEEEEEEEEEEEEEEEEEU RUIM")
      console.tron.log(dataFinal)
      Alert.alert('Data de término não pode ser anterior a data de início.')
    } else {
      console.tron.log("Tudo ok", dataInicio, dataFinal)
      goBack();
    }

  }

  render() {
    const {
      showClear,
      showArrow,
      showMenu,
      goBack,
      openMenu,
      title,
      startUpdateProgress,
      showProgress,
      saveStepState,
      form
    } = this.props;
    const { showAlert } = this.state;
    const { largura_tela } = responsividade;

    return (
      <View style={styles.header}>

        <StatusBar backgroundColor='#344955' barStyle="light-content" />
        <View style={styles.viewIcon}>
          {
            showMenu && (
              <TouchableOpacity onPress={() => openMenu()}>
                <Icon name="md-menu" size={largura_tela < 430 ? 28 : 40} style={styles.iconMenu} />
              </TouchableOpacity>
            )
          }
          {
            showArrow && (
              <TouchableOpacity onPress={() => {
                if (showProgress) {
                  startUpdateProgress();
                  saveStepState();
                }
                this.verificaData();

              }}
              >
                <Icon name="md-arrow-back" size={largura_tela < 430 ? 28 : 40} style={styles.iconMenu} />
              </TouchableOpacity>
            )
          }
        </View>
        <View style={styles.viewTitle}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </View>
        <View>
          {
            showClear && (
              <TouchableOpacity onPress={() => this.clearAsync()}>
                <Icon name="md-trash" size={28} style={styles.iconMenu} />
              </TouchableOpacity>
            )
          }
          {
            showAlert && (
              <Alert
                alertVisible
                goBack={goBack}
                closeModalAlert={this.closeAlert}
              />
            )
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderRedux)
export default withNavigation(Header);
