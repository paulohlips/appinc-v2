import React, { Component } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanner-google';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';

import { responsividade } from '../../styles';

class Scanner extends Component {

  state = {
    vetor: [],
    infoScanner: '',
    showScanner: false,
    showButton: true,
    showButton2: false,
    showCode: false,
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { form, data } = this.props;

    for (var key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          this.setState({ infoScanner: form.step[key].value });
        }
      }
    }
  }


  onPress = () => {
    const { vetor } = this.state;
  }

  saveFormScanner = dataScanner => {
    const { infoScanner } = this.state;
    const { form, getSaveStateForm, startControlArray, index, group, saveDataGroup, data } = this.props;

    if (infoScanner) {
      if (data.group === 'true') {
        group.dataGroup.map(item => {
          if (item.index === index) {
            saveDataGroup({ index, name: dataScanner.data_name, data: { key: dataScanner.data_name, value: infoScanner, filled: true }, type: dataScanner.component_type, extra: null })
          }
        });
      } else {
        for (var key in form.step) {
          if (key === dataScanner.data_name) {
            const form = {};
            form[dataScanner.data_name] = { key: dataScanner.data_name, value: infoScanner, filled: true };
            getSaveStateForm(form);
          }
        }
      }
    } else {
      for (var key in form.step) {
        if (key === dataScanner.data_name) {
          const form = {};
          form[dataScanner.data_name] = { key: dataScanner.data_name, value: '', filled: false };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data;
    const { showScanner, showButton, showButton2, infoScanner } = this.state;
    const { saveStep, step } = this.props.form;
    const { largura_tela } = responsividade;

    if (saveStep) {
      this.saveFormScanner({ data_name, default_value });
    }

    return (
      <View style={{ justifyContent: 'center', alignItem: 'center' }}>
        {
          showButton && (
            <TouchableOpacity onPress={() => this.setState({ showScanner: true, showButton: false })} style={styles.button}>
              <View style={styles.square}><Icon name="qrcode" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} /></View>
              <View style={styles.parale}><Text style={styles.button_text}>ESCANEAR CÓDIGO</Text></View>
            </TouchableOpacity>
          )}

        {
          showScanner && (
            <View style={{ alignItems: 'center', height: 250 }}>
              <BarcodeScanner
                style={{ width: 330, height: 250, rigth: 50 }}
                onBarcodeRead={infoScanner => {
                  this.setState({ infoScanner: infoScanner.data }); //Guarda o valor de todos os códigos lidos.
                  this.setState({ showScanner: false, showButton2: true, showCode: true });

                }}
              />
            </View>

          )}
        {
          this.state.showCode && (
            <View style={styles.codecontainer}>
              <Text style={styles.code}> Código: {this.state.infoScanner} </Text>
            </View>
          )
        }

        {
          showButton2 && (
            <TouchableOpacity onPress={() => this.setState({ showScanner: true, showCode: false })} style={styles.button}>
              <Text style={styles.button_text}>Escanear código</Text>
            </TouchableOpacity>
          )}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
  group: state.groupState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...FormActions, ...GroupActions }, dispatch);;

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);