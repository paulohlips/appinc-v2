import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Header } from '../../globalComponents';

// styles
import { View, FlatList, ScrollView, TouchableOpacity, Text, ProgressBarAndroid, BackHandler, Animated } from 'react-native';
import styles from './styles';
import ComponentList from './components/ComponentsList';

const COMPONENT_EXAMPLE = [

   
    {
        "hint": "OCR do local",
        "group": "false",
        "label": "OCR",
        "required": "true",
        "data_name": "ocr_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "ocr",
        "required_message": ""
    },
    {
        "hint": "Croqui do local",
        "group": "false",
        "label": "Croqui",
        "required": "true",
        "data_name": "croqui_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "croqui",
        "required_message": ""
    },
    {
        "hint": "Leitor QR/Bar code",
        "group": "false",
        "label": "Leitor de QR ou Bar code",
        "required": "true",
        "data_name": "scanner_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "scanner",
        "required_message": ""
    },
    {
        "hint": "Tire uma foto ou selecione da galeria",
        "group": "false",
        "label": "Tire uma foto",
        "required": "",
        "data_name": "camera_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "camera",
        "required_message": ""
    },
    {
        "hint": "Insira um texto",
        "group": "false",
        "label": "Digite um texto",
        "required": "true",
        "data_name": "texto_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "text",
        "required_message": ""
    },
    {
        "hint": "Grave um áudio",
        "group": "false",
        "label": "Gravador de áudio",
        "required": "true",
        "data_name": "audiorec_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "audiorec",
        "required_message": ""
    },
    {
        "hint": "Use o GPS",
        "group": "false",
        "label": "Onde você está?",
        "required": "true",
        "data_name": "geoloc_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "geoloc",
        "required_message": ""
    },
    {
        "hint": "Pesquise um veículo",
        "group": "false",
        "label": "Acesso a APIs e BDs externos",
        "required": "true",
        "data_name": "veiculo_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "veiculo",
        "required_message": ""
    },
    {
        "hint": "Lista de atividades",
        "group": "false",
        "label": "Lista de ToDos - Checkbox",
        "required": "true",
        "data_name": "checkbox_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "checkbox",
        "required_message": ""
    },
    {
        "hint": "Componente data",
        "group": "true",
        "label": "Componente data",
        "required": "true",
        "data_name": "data_1",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "date",
        "required_message": ""
    }
];

var i = 1;

class StepPage extends Component {
    state = { 
        move: new Animated.Value(20),
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.saveStep);
        Animated.timing(this.state.move, {
            toValue: 0,
            duration: 300,
            delay: 250,
          }).start()
    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.saveStep);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.saveStep);
    }

    render() {
        const { navigation } = this.props;
        const step = navigation.getParam('step'); // pra testar group comentar essa linha
        //console.tron.log(step.components)

        return (
            <View style={styles.container}>
            <Header 
                title={this.props.navigation.state.params.step.step_name} 
                showArrow
                showProgress 
                showInfo
                info={this.props.navigation.state.params.step.info_step}
                goBack={this.props.navigation.goBack} 
            />

                <ScrollView> 
                    {//troca step.components por COMPONENT_EXAMPLE para testar group 
                        COMPONENT_EXAMPLE.map((item, i) =>{
                            i = i + 1;
                            return (
                            <Animated.View style={{...styles.coluna, top: this.state.move }}>
                                <View style={styles.linha}>
                                    <View style={styles.ball}>
                                        <Text style={styles.numberType}>{i + 1}</Text>
                                    </View>
                                    <Text style={styles.textType}> {item.label}: </Text>
                                </View>
                                <ComponentList data={item} index={i} />
                            </Animated.View>)
                    })}
                </ScrollView>
            </View>
        );
    }
}

StepPage.navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.step.titulo,
});

const mapDispatchToProps = dispatch => bindActionCreators(FormActions, dispatch);

export default connect(null, mapDispatchToProps)(StepPage);

/*
 <Header 
        title={this.props.navigation.state.params.step.step_name} 
        showArrow
        showProgress 
        showInfo
        info={this.props.navigation.state.params.step.info_step}
        goBack={this.props.navigation.goBack} 
      />
*/