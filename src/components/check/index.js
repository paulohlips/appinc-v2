import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import { colors } from '../../styles';

import { TouchableOpacity, Text } from 'react-native';
import { ViewButtons, ViewButtonNo, ViewButtonYes, RadioText } from './styles';

export default class CheckBall extends Component {
    state = {
        checked: null,
    };

    render() {
        const { checked } = this.state;

        return (
            <ViewButtons>
                <RadioText>FOTO LEGÍVEL?</RadioText>
                <ViewButtonYes>
                    <RadioButton
                        value="yes"
                        status={checked === 'yes' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            this.setState({ checked: 'yes' });
                        }}
                        color={colors.secundary}
                        uncheckedColor={colors.black}
                    />
                    <RadioText>SIM</RadioText>
                </ViewButtonYes>
                <ViewButtonNo>
                    <RadioButton
                        value="no"
                        status={checked === 'no' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            this.setState({ checked: 'no' });
                        }}
                        color={colors.secundary}
                        uncheckedColor={colors.black}
                    />
                    <RadioText>NÃO</RadioText>
                </ViewButtonNo>
            </ViewButtons>
        )
    }
}