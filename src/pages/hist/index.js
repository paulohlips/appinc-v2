import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
  BackHandler,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Header } from "../../globalComponents";
import {
  NavigationActions,
  withNavigation,
  StackActions
} from "react-navigation";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import Api from '../../services/api';
import axios from "axios";
import { SnackBar } from '../../globalComponents';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FormActions } from "../../store/ducks/form";
import { Creators as NewActions } from "../../store/ducks/new";
import { Creators as HistActions } from '../../store/ducks/hist';

class Historico extends Component {
  state = {
    arrayEnviados: null,
    arrayRef: null,
    modalVisible: false,
    form: null,
    idUser: null,
    loading: true,
    errorview: false,
    callFuction: true,
    refreshing: false,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  async componentWillMount() {
    this.requestFroms();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  loading() {
    this.setState({ loading: false });
  }

  handleBackButton() {
    return true;
  }

  requestFroms = async () => {
    const { login } = this.props;
    const arrayRef = await AsyncStorage.getItem('arrayRef');
    const id = await AsyncStorage.getItem("@AppInc:matricula");
    const array = JSON.parse(arrayRef);
    this.setState({ arrayRef: array, idUser: id, errorview: false });
    const idMatricula = this.state.idUser;
    try {
      const response = await Api.user.getHist({ id: login.userID, token: login.token });
      if (response.status === 206) {
        this.setState({ loading: false, errorview: true });
      } else {
        this.setState({ loading: false, arrayEnviados: response.data });
      }
    } catch (error) {
      this.setState({ loading: false, errorview: true })
    }


    /*api.post('/pericia/formulario/recebidos', {
      matricula: idMatricula
    }).then(resp => {
      const data = JSON.stringify(resp.data);
      if (resp.status === 206) {
        this.setState({ loading: false, errorview: true });
      } else {
        this.setState({ loading: false, arrayEnviados: resp.data });
      }

    }).catch(err => {
      this.setState({ loading: false, errorview: true });
    });*/
  }
  restoreForm = async name => {
    const { navigation, restoreFormState, setForm } = this.props;
    const formAsync = await AsyncStorage.getItem(name);
    const form = JSON.parse(formAsync);

    await setForm(form.form);
    await restoreFormState(form);
    navigation.navigate("StepList");
  };

  renderOffline = item => {
    if (item) {
      return (
        <TouchableOpacity
          style={styles.box}
          onPress={() => this.restoreForm(item)}
        >
          <Text style={styles.status1}>{item}</Text>
          <View style={styles.row}>
            <Text style={styles.status1}> Status :</Text>
            <Text style={styles.status}> Em andamento</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderEnviados = item => {
    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          Linking.openURL(
            "http://35.198.17.69/pericia/links.php?id_pericia=" +
            item.matricula
          );
        }}
      >
        <Text style={styles.status1}>
          {"Perícia nº" + " :" + item.matricula}
        </Text>
        <View style={styles.row}>
          <Text style={styles.status1}> Status :</Text>
          <Text style={styles.statusEnviado}> Enviado </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.requestFroms();
    this.setState({refreshing: false});
  }

  render() {
    const { arrayRef, modalVisible, form, arrayEnviados, callFuction } = this.state;
    const { navigation, hist, resetUpdateHistory } = this.props;
    if (hist.updateHistory && callFuction) {
      this.setState({ callFuction: false });
      resetUpdateHistory();
      this.requestFroms();
    }

    return (
      <View style={styles.container}>
      
        <Header
          showMenu
          showClear
          openMenu={navigation.toggleDrawer}
          title="Minhas Perícias"
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => { }}
        >
          <View style={styles.containerModal}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Icon name="md-close" size={28} style={styles.iconClose} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.box}>
                {form && <Text style={styles.text}>{form}</Text>}
              </View>
            </ScrollView>
          </View>
        </Modal>
        {this.state.errorview && (
             <SnackBar outside content="Sem conexão!" color='#3C3C46' fontcolor="white" />
        )}
        <View style={styles.main}>
          <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>
            {arrayRef ? arrayRef.map(item => this.renderOffline(item)) : null}

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}


            {
              arrayEnviados
                ? arrayEnviados.map(item => this.renderEnviados(item))
                : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
  hist: state.histState,
  login: state.loginState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...FormActions,
    ...NewActions,
    ...HistActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Historico);
