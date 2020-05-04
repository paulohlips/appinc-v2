import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Camera from '../cameraVeiculo';
import Check from '../check';
import styles from './styles';

export default class Veiculo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Camera />
                <Check />
            </View>
        );
    }
}
