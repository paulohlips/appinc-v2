import React, { Component } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Animated,
  BackHandler
} from 'react-native';
import styles from './styles';
import StepBox from './components/StepBox';
import { Load } from '../../components';
import { Header } from '../../globalComponents';
import { connect } from 'react-redux';
import axios from 'axios';
import Api from '../../services/api';

import { bindActionCreators } from 'redux';
import { Creators as FormAction } from '../../store/ducks/form';
import { Creators as HistActions } from '../../store/ducks/hist';
import { SnackBar } from '../../globalComponents';


class StepList extends Component {
  state = {
    modalVisible: false,
    load: false,
    form: '',
    teste: 10,
    showAlert: false,
    formRedux: true,
    viewError: false,
    matriculaAsync: '',
    saved: false,
    error: false,
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.saveForm);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.saveForm);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.saveForm);
  }

  cancel() {
    this.props.navigation.goBack();
  }

  saved() {
    this.setState({ saved: true })
    let that = this;
    setTimeout(function () { that.setState({ saved: false }); }, 4000);

  }

  saveForm = () => {
    const { reference, saveForm, setSaveContentForm, form } = this.props;
    saveForm(reference);
    this.saved();
    this.props.navigation.goBack();
    return true;
  }

  saveForm2 = () => {
    const { reference, saveForm, setSaveContentForm, form } = this.props;
    saveForm(reference);
    this.saved();
  }

  resetAsync = () => {
    AsyncStorage.clear();
  }

  errorMessage = () => {
    this.setState({ viewError: true });
    let that = this;
    setTimeout(function () { that.setState({ viewError: false }) }, 4000);
  }

  error = () => {
    this.setState({ error: true });
    let that = this;
    setTimeout(function () { that.setState({ error: false }) }, 4000);
  }


  enviaForm = async () => {
    const { matriculaAsync } = this.state;
    const { reference, formulario, setUpdateHistory, login } = this.props;
    this.setState({ sending: true, original: false });

    const matriculaProv = await AsyncStorage.getItem('@AppInc:matricula');
    const matricula = JSON.stringify(matriculaProv);

    const arrayRef = await AsyncStorage.getItem("arrayRef");
    const array = JSON.parse(arrayRef);

    let count = 0;

    array.map(item => {
      if (item === formulario.ref) {
        array.splice(count, 1);
      }
      count += 1;
    });

    await AsyncStorage.setItem('arrayRef', JSON.stringify(array));

    const data = new FormData();
    const data2 = new FormData();
    data.append('form_name', formulario.form.form_name);
    console.tron.log(['entrei no evia3', data, formulario]);
    data2.append('imagem_frontal', formulario.step[imagem_frontal].value)

  render() {
    const { formRedux } = this.state;
    const form = this.props.form;
    if (formRedux) {
      this.props.setSaveContentForm(form);
      this.setState({ formRedux: false });
    }
    const { navigation } = this.props;
    const { viewError, load, saved } = this.state;
    let i = 0;

    return (
      <View style={styles.container}>
        <Header
          title={form.area}
          showArrow
          showInfo
          info={form.info_form}
          goBack={this.saveForm}
        />
        {
          viewError && (
            <SnackBar outside content="Sem conexão!" color='#3C3C46' fontcolor="white" />
          )
        }

        {
          saved && (
            <SnackBar outside content="Progresso Salvo!" color='#3C3C46' fontcolor="white" />

          )
        }
        <ScrollView>
          <FlatList
            data={form.steps}
            renderItem={item => { i = i + 1; return <StepBox steps={item} form={form} index={i} /> }}
          />
          <View style={styles.container}>

            <TouchableOpacity style={styles.enviarbutton} onPress={() => this.enviaForm()}>
              <Text style={styles.buttonText}>
                ENVIAR
                  </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.salvarbutton} onPress={() => this.saveForm2()}>
              <Text style={styles.buttonTextsalvar}>
                SALVAR
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.newState.data,
  reference: state.newState.reference,
  formulario: state.formState,
  login: state.loginState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...FormAction,
    ...HistActions,
  }, dispatch);

StepList.navigationOptions = {
  title: 'Perícia',
};

export default connect(mapStateToProps, mapDispatchToProps)(StepList);
