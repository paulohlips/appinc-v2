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
        "hint": "Componente data",
        "group": "true",
        "label": "Informações do veículo",
        "required": "true",
        "data_name": "info_veiculo",
        "lenght_max": "",
        "length_min": "",
        "invalid_text": "",
        "default_value": "",
        "component_type": "scanner",
        "required_message": ""
    }
];

var i = 1;

class StepPage extends Component {
    state = {
        move: new Animated.Value(0),
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.saveStep);
        Animated.timing(this.state.move, {
            toValue: 0,
            duration: 200,
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
                        step.components.map((item, i) => {
                            i = i + 1;
                            return (
                                <Animated.View style={{ ...styles.coluna, top: this.state.move }}>
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